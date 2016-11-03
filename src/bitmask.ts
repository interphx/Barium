// TODO: Does adding stringForm property to BitMask hurt performance?
var WORD_SIZE = 32;
export interface BitMaskType extends Array<number>{
  stringForm: string;
}
export var create = (function(): (size: number) => BitMaskType {
  return function(size: number): BitMaskType {
    var mask = Array.apply(null, Array(Math.ceil(size / WORD_SIZE))).map(Number.prototype.valueOf, 0);
    mask.stringForm = stringify(mask);
    return mask;
  }
})();

export function setBit(mask: BitMaskType, index: number, value: boolean) {
    index |= 0;
    var word = ~~(index / WORD_SIZE);

    if (value) {
        mask[word] |= 1 << (index % WORD_SIZE);
    } else {
        mask[word] &= ~(1 << (index % WORD_SIZE));
    }
    mask.stringForm = stringify(mask);
}
export function getBit(mask: BitMaskType, index: number): boolean {
    index |= 0;
    return (mask[~~(index / WORD_SIZE)] >> (index % WORD_SIZE) & 1) === 1;
}

export function contains(superset: BitMaskType, subset: BitMaskType): boolean {
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

function stringify(mask: BitMaskType) {
  return mask.join(',');
}
