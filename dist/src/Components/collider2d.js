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
var Collider2d = (function () {
    function Collider2d(_a) {
        var shapes = _a.shapes;
        this.shapes = shapes.slice(0);
    }
    Collider2d = __decorate([
        barium_decorators_1.ComponentClass, 
        __metadata('design:paramtypes', [Object])
    ], Collider2d);
    return Collider2d;
}());
exports.Collider2d = Collider2d;
