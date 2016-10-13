"use strict";
var WORD_SIZE = 32;
exports.create = (function () {
    return function (size) {
        var mask = Array.apply(null, Array(Math.ceil(size / WORD_SIZE))).map(Number.prototype.valueOf, 0);
        mask.stringForm = stringify(mask);
        return mask;
    };
})();
function setBit(mask, index, value) {
    index |= 0;
    var word = ~~(index / WORD_SIZE);
    if (value) {
        mask[word] |= 1 << (index % WORD_SIZE);
    }
    else {
        mask[word] &= ~(1 << (index % WORD_SIZE));
    }
    mask.stringForm = stringify(mask);
}
exports.setBit = setBit;
function getBit(mask, index) {
    index |= 0;
    return (mask[~~(index / WORD_SIZE)] >> (index % WORD_SIZE) & 1) === 1;
}
exports.getBit = getBit;
function contains(superset, subset) {
    var len = superset.length;
    var wordSize = WORD_SIZE;
    var j = 0;
    for (var i = 0; i < len; ++i) {
        for (j = 0; j < wordSize; ++j) {
            var bitA = subset[i] >> j & 1;
            if ((bitA & (superset[i] >> j & 1)) !== bitA) {
                return false;
            }
        }
    }
    return true;
}
exports.contains = contains;
function stringify(mask) {
    return mask.join(',');
}
