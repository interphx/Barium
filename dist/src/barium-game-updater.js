"use strict";
var Sig = require('./barium-signal');
var Util = require('./barium-util');
var GameUpdater = (function () {
    function GameUpdater(fps, maxTimePerFrame) {
        if (fps === void 0) { fps = 60; }
        if (maxTimePerFrame === void 0) { maxTimePerFrame = 0.2; }
        this.lastTime = null;
        this.accumulator = 0;
        this.isRunning = false;
        this.requestedFrameId = null;
        this.signals = {
            updateStarted: new Sig.Signal(),
            updateEnded: new Sig.Signal(),
            fixedUpdateStarted: new Sig.Signal(),
            lagDetected: new Sig.Signal()
        };
        this.fps = fps;
        this.timePerFrame = 1 / this.fps;
        this.maxTimePerFrame = maxTimePerFrame;
        this.run = this.run.bind(this);
    }
    GameUpdater.prototype.update = function (sessionTime) {
        if (this.lastTime == null) {
            this.lastTime = sessionTime;
        }
        var delta = sessionTime - this.lastTime;
        if (delta > this.maxTimePerFrame) {
            this.signals.lagDetected.emit(delta);
            delta = this.maxTimePerFrame;
        }
        this.lastTime = sessionTime;
        this.accumulator += delta;
        this.signals.updateStarted.emit(delta);
        while (this.accumulator >= this.timePerFrame) {
            this.signals.fixedUpdateStarted.emit(this.timePerFrame);
            this.accumulator -= this.timePerFrame;
        }
        var alpha = this.accumulator / this.timePerFrame;
        this.signals.updateEnded.emit(delta, alpha);
    };
    GameUpdater.prototype.run = function (sessionTime) {
        if (!this.isRunning) {
            throw new Error('Invalid call to GameUpdater#run! GameUpdater is not running.');
        }
        this.update(sessionTime);
        this.requestedFrameId = Util.requestAnimationFrame(this.run);
    };
    GameUpdater.prototype.start = function () {
        if (this.isRunning)
            return;
        this.isRunning = true;
        this.requestedFrameId = Util.requestAnimationFrame(this.run);
    };
    GameUpdater.prototype.stop = function () {
        this.isRunning = false;
        Util.cancelAnimationFrame(this.requestedFrameId);
    };
    return GameUpdater;
}());
exports.GameUpdater = GameUpdater;
