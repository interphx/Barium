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
var shape_1 = require('geometry/shape');
var SimpleShape = (function () {
    function SimpleShape(shapeData, fillColor, strokeColor, strokeWidth) {
        if (fillColor === void 0) { fillColor = 0xFFFFFF; }
        if (strokeColor === void 0) { strokeColor = 0x000000; }
        if (strokeWidth === void 0) { strokeWidth = 2; }
        this._valid = false;
        this.shape = shapeData;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.strokeWidth = strokeWidth;
        this.invalidate();
    }
    SimpleShape.prototype.isValid = function () {
        return this._valid;
    };
    SimpleShape.prototype.invalidate = function () {
        this._valid = false;
    };
    SimpleShape = __decorate([
        barium_decorators_1.ComponentClass, 
        __metadata('design:paramtypes', [shape_1.Shape, Object, Object, Object])
    ], SimpleShape);
    return SimpleShape;
}());
exports.SimpleShape = SimpleShape;
