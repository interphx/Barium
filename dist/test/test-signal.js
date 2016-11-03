"use strict";
var barium_1 = require('barium');
function test() {
    describe('Signal', function () {
        it('should be created', function () {
            var sig0 = new barium_1.Signal.Signal();
            var sig1 = new barium_1.Signal.Signal();
            expect(sig0).toBeDefined();
            expect(sig1).toBeDefined();
        });
        it('should accept listeners', function () {
            var sig = new barium_1.Signal.Signal();
            var a = sig.listen(function (n, s, b) { return; });
            var b = sig.listen(function () { return; });
            var c = sig.listen(function (n) { return; });
            expect(a).toBeDefined();
            expect(b).toBeDefined();
            expect(c).toBeDefined();
        });
        it('should call listeners', function () {
            var spyAll = jasmine.createSpy('spy for all');
            var spySecond = jasmine.createSpy('spy for second method');
            var sig0 = new barium_1.Signal.Signal();
            var sig1 = new barium_1.Signal.Signal();
            var sig2 = new barium_1.Signal.Signal();
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
        it('should unlisten', function () {
            var spy = jasmine.createSpy('spy signal');
            var sig0 = new barium_1.Signal.Signal();
            var subscription = sig0.listen(spy);
            sig0.unlisten(subscription);
            sig0.emit();
            sig0.emit();
            sig0.emit();
            expect(spy).not.toHaveBeenCalled();
        });
        it('subscriptions should be detachable', function () {
            var spy = jasmine.createSpy('spy signal');
            var sig0 = new barium_1.Signal.Signal();
            var subscription = sig0.listen(spy);
            subscription.detach();
            sig0.emit();
            sig0.emit();
            sig0.emit();
            expect(spy).not.toHaveBeenCalled();
        });
    });
}
exports.test = test;
;
