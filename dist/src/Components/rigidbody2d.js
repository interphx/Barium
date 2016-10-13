"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var barium_decorators_1 = require('barium-decorators');
(function (BodyType) {
    BodyType[BodyType["dynamic"] = 1] = "dynamic";
    BodyType[BodyType["kinematic"] = 2] = "kinematic";
    BodyType[BodyType["static"] = 3] = "static";
})(exports.BodyType || (exports.BodyType = {}));
var BodyType = exports.BodyType;
var RigidBody2d = (function () {
    function RigidBody2d(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.type, type = _c === void 0 ? BodyType.dynamic : _c, _d = _b.mass, mass = _d === void 0 ? 1 : _d, _e = _b.fixedRotation, fixedRotation = _e === void 0 ? false : _e, _f = _b.allowSleep, allowSleep = _f === void 0 ? true : _f, _g = _b.collisionResponse, collisionResponse = _g === void 0 ? true : _g;
        this.type = type;
        this.mass = mass;
        this.fixedRotation = fixedRotation;
        this.allowSleep = allowSleep;
        this.collisionResponse = collisionResponse;
        this.invalidate();
    }
    RigidBody2d.prototype.isValid = function () {
        return this._valid;
    };
    RigidBody2d.prototype.invalidate = function () {
        this._valid = false;
    };
    RigidBody2d = __decorate([
        barium_decorators_1.ComponentClass, 
        __metadata('design:paramtypes', [Object])
    ], RigidBody2d);
    return RigidBody2d;
}());
exports.RigidBody2d = RigidBody2d;
