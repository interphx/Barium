"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (ShapeType) {
    ShapeType[ShapeType["Polygon"] = 1] = "Polygon";
    ShapeType[ShapeType["Circle"] = 2] = "Circle";
    ShapeType[ShapeType["Capsule"] = 3] = "Capsule";
    ShapeType[ShapeType["Ellipse"] = 4] = "Ellipse";
})(exports.ShapeType || (exports.ShapeType = {}));
var ShapeType = exports.ShapeType;
var Shape = (function () {
    function Shape(angle, position) {
        if (angle === void 0) { angle = 0; }
        if (position === void 0) { position = [0, 0]; }
        this.angle = angle;
        this.position = position.slice(0);
    }
    return Shape;
}());
exports.Shape = Shape;
Shape.prototype.angle = 0;
Shape.prototype.position = [0, 0];
var Polygon = (function (_super) {
    __extends(Polygon, _super);
    function Polygon(_a) {
        var points = _a.points, _b = _a.angle, angle = _b === void 0 ? 0 : _b, _c = _a.position, position = _c === void 0 ? [0, 0] : _c;
        _super.call(this, angle, position);
        this.points = points.slice(0);
    }
    Polygon.prototype.clone = function () {
        return new Polygon({ points: this.points, angle: this.angle, position: this.position });
    };
    return Polygon;
}(Shape));
exports.Polygon = Polygon;
Polygon.prototype.points = null;
Polygon.prototype.type = ShapeType.Polygon;
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(_a) {
        var radius = _a.radius, _b = _a.angle, angle = _b === void 0 ? 0 : _b, _c = _a.position, position = _c === void 0 ? [0, 0] : _c;
        _super.call(this, angle, position);
        this.type = ShapeType.Circle;
        this.radius = radius;
    }
    Circle.prototype.clone = function () {
        return new Circle({ radius: this.radius, angle: this.angle, position: this.position });
    };
    return Circle;
}(Shape));
exports.Circle = Circle;
Circle.prototype.type = ShapeType.Circle;
Circle.prototype.radius = 1;
var Capsule = (function (_super) {
    __extends(Capsule, _super);
    function Capsule(_a) {
        var length = _a.length, radius = _a.radius, _b = _a.angle, angle = _b === void 0 ? 0 : _b, _c = _a.position, position = _c === void 0 ? [0, 0] : _c;
        _super.call(this, angle, position);
        this.length = length;
        this.radius = radius;
    }
    Capsule.prototype.clone = function () {
        return new Capsule({
            length: this.length,
            radius: this.radius,
            angle: this.angle,
            position: this.position
        });
    };
    return Capsule;
}(Shape));
exports.Capsule = Capsule;
Capsule.prototype.type = ShapeType.Capsule;
Capsule.prototype.length = 4;
Capsule.prototype.radius = 1;
