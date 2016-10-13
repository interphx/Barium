"use strict";
var barium_game_updater_1 = require('../src/barium-game-updater');
function testGameUpdater() {
    describe('GameUpdater', function () {
        it('should be created', function () {
            var gu = new barium_game_updater_1.GameUpdater();
            expect(gu).toBeDefined();
        });
        it('should start and stop', function (done) {
            var gu = new barium_game_updater_1.GameUpdater();
            var spy = jasmine.createSpy('should not be called after GameUpdater#stop');
            gu.start();
            setTimeout(function () {
                gu.stop();
                gu.signals.updateStarted.listen(spy);
                setTimeout(function () {
                    expect(spy).not.toHaveBeenCalled();
                    done();
                }, 500);
            }, 500);
        });
        it('should call updateStarted', function (done) {
            var gu = new barium_game_updater_1.GameUpdater();
            var spy = jasmine.createSpy('updateStarted');
            gu.signals.updateStarted.listen(spy);
            gu.start();
            setTimeout(function () {
                expect(spy).toHaveBeenCalled();
                gu.stop();
                done();
            }, 500);
        });
        it('should call updateEnded', function (done) {
            var gu = new barium_game_updater_1.GameUpdater();
            var spy = jasmine.createSpy('updateEnded');
            gu.signals.updateEnded.listen(spy);
            gu.start();
            setTimeout(function () {
                expect(spy).toHaveBeenCalled();
                gu.stop();
                done();
            }, 500);
        });
        it('should call fixedUpdateStarted', function (done) {
            var gu = new barium_game_updater_1.GameUpdater();
            var spy = jasmine.createSpy('fixedUpdateStarted');
            gu.signals.fixedUpdateStarted.listen(spy);
            gu.start();
            setTimeout(function () {
                expect(spy).toHaveBeenCalled();
                gu.stop();
                done();
            }, 500);
        });
    });
}
exports.testGameUpdater = testGameUpdater;
;
