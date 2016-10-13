import {GameUpdater} from '../src/barium-game-updater';

export function testGameUpdater(): void {
  describe('GameUpdater', () => {
    it('should be created', () => {
      var gu = new GameUpdater();
      expect(gu).toBeDefined();
    });
    it('should start and stop', (done) => {
      var gu = new GameUpdater();
      var spy = jasmine.createSpy('should not be called after GameUpdater#stop');

      gu.start();
      setTimeout(function() {
        gu.stop();
        gu.signals.updateStarted.listen(spy);
        setTimeout(function() {
          expect(spy).not.toHaveBeenCalled();
          done();
        }, 500);
      }, 500);

    });
    it('should call updateStarted', (done) => {
      var gu = new GameUpdater();
      var spy = jasmine.createSpy('updateStarted');
      gu.signals.updateStarted.listen(spy);
      gu.start();
      setTimeout(function() {
        expect(spy).toHaveBeenCalled();
        gu.stop();
        done();
      }, 500);
    });
    it('should call updateEnded', (done) => {
      var gu = new GameUpdater();
      var spy = jasmine.createSpy('updateEnded');
      gu.signals.updateEnded.listen(spy);
      gu.start();
      setTimeout(function() {
        expect(spy).toHaveBeenCalled();
        gu.stop();
        done();
      }, 500);
    });
    it('should call fixedUpdateStarted', (done) => {
      var gu = new GameUpdater();
      var spy = jasmine.createSpy('fixedUpdateStarted');
      gu.signals.fixedUpdateStarted.listen(spy);
      gu.start();
      setTimeout(function() {
        expect(spy).toHaveBeenCalled();
        gu.stop();
        done();
      }, 500);
    });
  });
};
