"use strict";
var ComponentTypesInfo = require('./component-types-info');
var Util = require('./util');
;
function ComponentClass(target) {
    if (!('name' in target)) {
        var parsedName = Util.parseFunctionName(target);
        if (typeof parsedName !== 'string' || parsedName.trim() === '') {
            throw new Error("Unable to parse component class name; please specify\n        static \"name\" property or use non-anonymous function");
        }
        else {
            console.log("Name for component class " + parsedName + " was parsed from\n        function definition");
        }
        target['name'] = parsedName;
    }
    var index = ComponentTypesInfo.getNextComponentTypeId();
    var name = target['name'];
    ComponentTypesInfo.typeNameToIndex[name] = index;
    return target;
}
exports.ComponentClass = ComponentClass;
