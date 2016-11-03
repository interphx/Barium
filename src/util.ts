export function drawEllipse(
  context: CanvasRenderingContext2D,
  centerX: number, centerY: number,
  radiusX: number, radiusY: number) {
        context.save();
        context.beginPath();
        context.translate(centerX - radiusX, centerY - radiusY);
        context.scale(radiusX, radiusY);
        context.arc(1, 1, 1, 0, 2 * Math.PI, false);
        context.restore();
        context.stroke();
}

export function parseFunctionName(f: Function) {
    var parsed = /^function\s+([\w\$]+)\s*\(/.exec(f.toString());
    if (!parsed) return null;
    if (parsed.length < 2) return null;
    return parsed[1];
}

export var global: any = (function() {
    var global: any;
    try {
        global = Function('return this')() || (42, eval)('this');
    } catch (e) {
        global = window;
    }
    return global;
})();

export var now = Date.now ? Date.now : (function() { return +new Date(); });

// We need to assign something to avoid TypeScript complaint
export var requestAnimationFrame: (cb: Function) => number = function(cb: Function){
  throw new Error('util.requestAnimationFrame not assigned');
};
export var cancelAnimationFrame: (frameId: number) => void = function(frameId: number){
  throw new Error('util.cancelAnimationFrame not assigned');
};

// Use native or polyfilled requestAnimationFrame/cancelAnimationFrame
(function() {
  for (var vendor of ['webkit', 'moz']) {
    requestAnimationFrame = global[vendor + 'RequestAnimationFrame'];
    cancelAnimationFrame = (global[vendor + 'CancelAnimationFrame']
        || global[vendor + 'CancelRequestAnimationFrame']);
    if (requestAnimationFrame) {
      if (cancelAnimationFrame) {
        requestAnimationFrame = requestAnimationFrame.bind(global);
        cancelAnimationFrame = cancelAnimationFrame.bind(global);
      }
      break;
    }
  }
  if (/iP(ad|hone|od).*OS 6/.test(global.navigator.userAgent)
      || !requestAnimationFrame || !cancelAnimationFrame) {
      var lastTime = 0;
      var setTimeout = global.setTimeout.bind(global);
      var clearTimeout = global.clearTimeout.bind(global);
      requestAnimationFrame = function(cb: Function) {
          var currentTime = now();
          var nextTime = Math.max(lastTime + 16, currentTime);
          return setTimeout(function() {
            lastTime = nextTime;
            cb(lastTime);
          }, nextTime - currentTime);
      };
      cancelAnimationFrame = clearTimeout;
  }
})();
