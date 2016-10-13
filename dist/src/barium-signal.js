"use strict";
function detachSubscription() {
    if (!this.signal) {
        throw new Error('Unable to unsubscrube: subscription does not belong to any Signal');
    }
    this.signal.unlisten(this);
}
var Signal = (function () {
    function Signal() {
        this.head = null;
        this.last = null;
    }
    Signal.prototype.emit = function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
        var node = this.head;
        while (node) {
            node.callback(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
            node.times--;
            if (node.times < 1) {
                this.unlisten(node);
            }
            node = node.next;
        }
    };
    Signal.prototype.listen = function (listener, times) {
        if (times === void 0) { times = Infinity; }
        var subscription = {
            callback: listener,
            times: times,
            signal: this,
            prev: this.last,
            next: null,
            detach: detachSubscription
        };
        if (!this.head) {
            this.head = subscription;
            this.last = subscription;
        }
        else {
            this.last.next = subscription;
            this.last = subscription;
        }
        return subscription;
    };
    Signal.prototype.unlisten = function (listener) {
        if (listener.signal !== this) {
            throw new Error('Cannot unsubscribe listener: listener does not belong to this Signal');
        }
        if (listener.prev)
            listener.prev.next = listener.next;
        if (listener.next)
            listener.next.prev = listener.prev;
        if (listener === this.head) {
            this.head = listener.next;
            if (this.head === null)
                this.last = null;
        }
        else if (listener === this.last) {
            this.last = listener.prev;
            this.last.next = null;
        }
    };
    Signal.prototype.unlistenHandler = function (handler) {
        var node = this.head;
        while (node) {
            if (node.callback === handler)
                this.unlisten(node);
            node = node.next;
        }
    };
    Signal.prototype.unlistenAll = function () {
        var node = this.head;
        if (!node)
            return;
        while (node) {
            node.signal = null;
            node = node.next;
        }
        this.head = this.last = null;
    };
    return Signal;
}());
exports.Signal = Signal;
var x = new Signal();
x.emit(2, 'foo');
x.listen(function (foo, bar) {
    console.log();
});
