interface Subscription {
  detach(): void;
  next: Subscription | null;
  prev: Subscription | null;
  signal: Signal | null;
  callback: Function;
  times: number;
}
interface SignalBase {
  unlisten(listener: Subscription): void;
  unlistenHandler(handler: Function): void;
}
export interface Signal0<> extends SignalBase {
  emit(): void;
  listen(listener: () => void): Subscription
}
export interface Signal1<T0> extends SignalBase {
  emit(arg0: T0): void;
  listen(listener: (arg0: T0) => void): Subscription;
}
export interface Signal2<T0, T1> extends SignalBase {
  emit(arg0: T0, arg1: T1): void;
  listen(listener: (arg0: T0, arg1: T1) => void): Subscription;
}
export interface Signal3<T0, T1, T2> extends SignalBase {
  emit(arg0: T0, arg1: T1, arg2: T2): void;
  listen(listener: (arg0: T0, arg1: T1, arg2: T2) => void): Subscription;
}
export interface Signal4<T0, T1, T2, T3> extends SignalBase {
  emit(arg0: T0, arg1: T1, arg2: T2): void;
  listen(listener: (arg0: T0, arg1: T1, arg2: T2, arg3: T3) => void): Subscription;
}
export interface Signal5<T0, T1, T2, T3, T4> extends SignalBase {
  emit(arg0: T0, arg1: T1, arg2: T2): void;
  listen(listener: (arg0: T0, arg1: T1, arg2: T2, arg3: T3, arg4: T4) => void): Subscription;
}
export interface Signal6<T0, T1, T2, T3, T4, T5> extends SignalBase {
  emit(arg0: T0, arg1: T1, arg2: T2): void;
  listen(listener: (arg0: T0, arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => void): Subscription;
}
export interface Signal7<T0, T1, T2, T3, T4, T5, T6> extends SignalBase {
  emit(arg0: T0, arg1: T1, arg2: T2): void;
  listen(listener: (arg0: T0, arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6) => void): Subscription;
}
export interface Signal8<T0, T1, T2, T3, T4, T5, T6, T7> extends SignalBase {
  emit(arg0: T0, arg1: T1, arg2: T2): void;
  listen(listener: (arg0: T0, arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7) => void): Subscription;
}
export interface Signal9<T0, T1, T2, T3, T4, T5, T6, T7, T8> extends SignalBase {
  emit(arg0: T0, arg1: T1, arg2: T2): void;
  listen(listener: (arg0: T0, arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7, arg8: T8) => void): Subscription;
}

function detachSubscription(this: Subscription) {
  // TODO: Measure exceptions impact on performance
  if (!this.signal) {
    throw new Error('Unable to unsubscrube: subscription does not belong to any Signal');
  }
  this.signal.unlisten(this);
}

export class Signal {
  head: Subscription | null = null;
  last: Subscription | null = null;

  constructor() {}

  emit(arg0?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any, arg6?: any, arg7?: any, arg8?: any) {
    var node = this.head;
    while(node) {
      node.callback(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
      node.times--;
      if (node.times < 1) {
        this.unlisten(node);
      }
      node = node.next;
    }
  }

  listen(listener: Function, times: number = Infinity): Subscription {
    var subscription = <Subscription> {
      callback: listener,
      times: times,
      signal: this,
      prev: this.last,
      next: null,
      detach: detachSubscription
    };
    if (!this.head) {
      this.head = subscription;
      this.last = subscription
    } else {
      (<Subscription> this.last).next = subscription;
      this.last = subscription;
    }
    return subscription;
  }

  unlisten(listener: Subscription) {
    // TODO: This may hurt optimizations, measure the effect and probably replace with noop
    if (listener.signal !== this) {
      throw new Error('Cannot unsubscribe listener: listener does not belong to this Signal');
    }
    if (listener.prev) listener.prev.next = listener.next;
    if (listener.next) listener.next.prev = listener.prev;
    if (listener === this.head) {
      this.head = listener.next;
      if (this.head === null) this.last = null;
    } else if (listener === this.last) {
      this.last = listener.prev;
      (<Subscription> this.last).next = null;
    }
  }
  unlistenHandler(handler: Function) {
    var node = this.head;
    while (node) {
      if (node.callback === handler) this.unlisten(node);
      node = node.next;
    }
  }
  unlistenAll() {
    var node = this.head;
    if (!node) return;
    while (node) {
      (<Subscription> node).signal = null;
      node = node.next;
    }
    this.head = this.last = null;
  }

}

var x = new Signal() as Signal2<number, string>;
x.emit(2, 'foo');
x.listen((foo: number, bar: string) => {
  console.log();
});
