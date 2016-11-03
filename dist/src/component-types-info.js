"use strict";
exports.totalComponentTypes = 0;
exports.typeNameToIndex = {};
function getNextComponentTypeId() {
    return exports.totalComponentTypes++;
}
exports.getNextComponentTypeId = getNextComponentTypeId;
