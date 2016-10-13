"use strict";
var ComponentTypesInfo = require('./barium-component-types-info');
var Util = require('./barium-util');
function ComponentClass(target) {
    if (!('name' in target)) {
        target['name'] = Util.parseFunctionName(target);
    }
    var index = ComponentTypesInfo.getNextComponentTypeId();
    var name = target['name'];
    ComponentTypesInfo.typeNameToIndex[name] = index;
    return target;
}
exports.ComponentClass = ComponentClass;
