import {Signal as Sig} from 'barium';

export function test(): void {
  describe('Signal', () => {
    it('should be created', () => {
      var sig0 = new Sig.Signal() as Sig.Signal0;
      var sig1 = new Sig.Signal() as Sig.Signal2<string, number>;
      expect(sig0).toBeDefined();
      expect(sig1).toBeDefined();
    });

    it('should accept listeners', () => {
      var sig = new Sig.Signal() as Sig.Signal3<number, string, boolean>;
      var a = sig.listen((n: number, s: string, b: boolean) => { return; });
      var b = sig.listen(() => { return; });
      var c = sig.listen((n: number) => { return; });
      expect(a).toBeDefined();
      expect(b).toBeDefined();
      expect(c).toBeDefined();
    });

    it('should call listeners', () => {
      var spyAll = jasmine.createSpy('spy for all');
      var spySecond = jasmine.createSpy('spy for second method');

      var sig0 = new Sig.Signal() as Sig.Signal3<number, string, boolean>;
      var sig1 = new Sig.Signal() as Sig.Signal0;
      var sig2 = new Sig.Signal() as Sig.Signal1<number>;
      sig0.listen(spyAll);
      sig1.listen(spyAll);
      sig1.listen(spySecond);
      sig2.listen(spyAll);

      sig0.emit(42, 'foo', true);
      sig1.emit();
      sig2.emit(42);

      expect(spyAll).toHaveBeenCalledTimes(3);
      expect(spySecond).toHaveBeenCalledTimes(1);
    });

    it('should unlisten', () => {
      var spy = jasmine.createSpy('spy signal');
      var sig0 = new Sig.Signal() as Sig.Signal0;
      var subscription = sig0.listen(spy);
      sig0.unlisten(subscription);
      sig0.emit();
      sig0.emit();
      sig0.emit();
      expect(spy).not.toHaveBeenCalled();
    });

    it('subscriptions should be detachable', () => {
      var spy = jasmine.createSpy('spy signal');
      var sig0 = new Sig.Signal() as Sig.Signal0;
      var subscription = sig0.listen(spy);
      subscription.detach();
      sig0.emit();
      sig0.emit();
      sig0.emit();
      expect(spy).not.toHaveBeenCalled();
    });

  });
};
