"use strict";
function drawEllipse(context, centerX, centerY, radiusX, radiusY) {
    context.save();
    context.beginPath();
    context.translate(centerX - radiusX, centerY - radiusY);
    context.scale(radiusX, radiusY);
    context.arc(1, 1, 1, 0, 2 * Math.PI, false);
    context.restore();
    context.stroke();
}
exports.drawEllipse = drawEllipse;
function parseFunctionName(f) {
    var parsed = /^function\s+([\w\$]+)\s*\(/.exec(f.toString());
    if (!parsed)
        return null;
    if (parsed.length < 2)
        return null;
    return parsed[1];
}
exports.parseFunctionName = parseFunctionName;
exports.global = (function () {
    var global;
    try {
        global = Function('return this')() || (42, eval)('this');
    }
    catch (e) {
        global = window;
    }
    return global;
})();
exports.now = Date.now ? Date.now : (function () { return +new Date(); });
exports.requestAnimationFrame = function (cb) {
    throw new Error('util.requestAnimationFrame not assigned');
};
exports.cancelAnimationFrame = function (frameId) {
    throw new Error('util.cancelAnimationFrame not assigned');
};
(function () {
    for (var _i = 0, _a = ['webkit', 'moz']; _i < _a.length; _i++) {
        var vendor = _a[_i];
        exports.requestAnimationFrame = exports.global[vendor + 'RequestAnimationFrame'];
        exports.cancelAnimationFrame = (exports.global[vendor + 'CancelAnimationFrame']
            || exports.global[vendor + 'CancelRequestAnimationFrame']);
        if (exports.requestAnimationFrame) {
            if (exports.cancelAnimationFrame) {
                exports.requestAnimationFrame = exports.requestAnimationFrame.bind(exports.global);
                exports.cancelAnimationFrame = exports.cancelAnimationFrame.bind(exports.global);
            }
            break;
        }
    }
    if (/iP(ad|hone|od).*OS 6/.test(exports.global.navigator.userAgent)
        || !exports.requestAnimationFrame || !exports.cancelAnimationFrame) {
        var lastTime = 0;
        var setTimeout = exports.global.setTimeout.bind(exports.global);
        var clearTimeout = exports.global.clearTimeout.bind(exports.global);
        exports.requestAnimationFrame = function (cb) {
            var currentTime = exports.now();
            var nextTime = Math.max(lastTime + 16, currentTime);
            return setTimeout(function () {
                lastTime = nextTime;
                cb(lastTime);
            }, nextTime - currentTime);
        };
        exports.cancelAnimationFrame = clearTimeout;
    }
})();
