"use strict";
var ComponentTypesInfo = require('./barium-component-types-info');
var BitMask = require('./barium-bitmask');
function all(componentClasses) {
    var aspect = BitMask.create(ComponentTypesInfo.totalComponentTypes);
    for (var _i = 0, componentClasses_1 = componentClasses; _i < componentClasses_1.length; _i++) {
        var componentClass = componentClasses_1[_i];
        BitMask.setBit(aspect, ComponentTypesInfo.typeNameToIndex[componentClass.name], true);
    }
    return aspect;
}
exports.all = all;
function signatureMatchesAspect(signature, aspect) {
    return BitMask.contains(signature, aspect);
}
exports.signatureMatchesAspect = signatureMatchesAspect;
