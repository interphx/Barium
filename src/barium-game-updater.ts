import * as Sig from './barium-signal';
import * as Util from './barium-util';

export class GameUpdater {
  private fps: number;
  private timePerFrame: number;
  private maxTimePerFrame: number;
  private lastTime: number | null = null;
  private accumulator: number = 0;
  private isRunning: boolean = false;
  private requestedFrameId: number | null = null;
  public readonly signals = {
    updateStarted: new Sig.Signal() as Sig.Signal1<number>,
    updateEnded: new Sig.Signal() as Sig.Signal2<number, number>,
    fixedUpdateStarted: new Sig.Signal() as Sig.Signal1<number>,
    lagDetected: new Sig.Signal() as Sig.Signal1<number>
  };
  private requestFrame: (cb: Function) => number;
  private cancelFrame: (frameId: number) => void;
  constructor(fps: number = 60, maxTimePerFrame: number = 0.2) {
    this.fps = fps;
    this.timePerFrame = 1 / this.fps;
    this.maxTimePerFrame = maxTimePerFrame;
    this.run = this.run.bind(this);
  }
  update(sessionTime: number) {
    if (this.lastTime == null) {
      this.lastTime = sessionTime;
    }
    // Time passed since the last frame
    var delta = sessionTime - this.lastTime;

    // Preventing spiral of death, reporting lag
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
  }
  run(sessionTime: number) {
    if (!this.isRunning) {
      throw new Error('Invalid call to GameUpdater#run! GameUpdater is not running.');
    }
    this.update(sessionTime);
    this.requestedFrameId = Util.requestAnimationFrame(this.run);
  }
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.requestedFrameId = Util.requestAnimationFrame(this.run);
  }
  stop() {
    this.isRunning = false;
    Util.cancelAnimationFrame(this.requestedFrameId as number);
  }
}
