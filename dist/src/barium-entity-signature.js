"use strict";
var ComponentTypesInfo = require('./barium-component-types-info');
var BitMask = require('./barium-bitmask');
function create() {
    return BitMask.create(ComponentTypesInfo.totalComponentTypes);
}
exports.create = create;
exports.containsAspect = BitMask.contains;
function addComponent(signature, componentClass) {
    BitMask.setBit(signature, ComponentTypesInfo.typeNameToIndex[componentClass.name], true);
}
exports.addComponent = addComponent;
function removeComponent(signature, componentClass) {
    BitMask.setBit(signature, ComponentTypesInfo.typeNameToIndex[componentClass.name], false);
}
exports.removeComponent = removeComponent;
