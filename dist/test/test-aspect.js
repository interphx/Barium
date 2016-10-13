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
var Aspect = require('barium-aspect');
var EntitySignature = require('barium-entity-signature');
var Decorators = require('barium-decorators');
var TestComp0 = (function () {
    function TestComp0() {
    }
    TestComp0 = __decorate([
        Decorators.ComponentClass, 
        __metadata('design:paramtypes', [])
    ], TestComp0);
    return TestComp0;
}());
var TestComp1 = (function () {
    function TestComp1() {
    }
    TestComp1 = __decorate([
        Decorators.ComponentClass, 
        __metadata('design:paramtypes', [])
    ], TestComp1);
    return TestComp1;
}());
var TestComp2 = (function () {
    function TestComp2() {
    }
    TestComp2 = __decorate([
        Decorators.ComponentClass, 
        __metadata('design:paramtypes', [])
    ], TestComp2);
    return TestComp2;
}());
function testAspect() {
    describe('Aspect', function () {
        it('should be created', function () {
            var asp = Aspect.all([TestComp0, TestComp1, TestComp2]);
            expect(asp).toBeDefined();
        });
        describe('should match signatures correcrtly', function () {
            var asp0 = Aspect.all([TestComp0, TestComp1, TestComp2]);
            var asp1 = Aspect.all([TestComp0]);
            var asp2 = Aspect.all([TestComp1, TestComp2]);
            var signature0 = EntitySignature.create();
            EntitySignature.addComponent(signature0, TestComp0);
            EntitySignature.addComponent(signature0, TestComp1);
            EntitySignature.addComponent(signature0, TestComp2);
            var signature1 = EntitySignature.create();
            EntitySignature.addComponent(signature1, TestComp0);
            var signature2 = EntitySignature.create();
            EntitySignature.addComponent(signature2, TestComp1);
            EntitySignature.addComponent(signature2, TestComp2);
            it('should handle exact matches', function () {
                console.log(signature0, asp0);
                expect(Aspect.signatureMatchesAspect(signature0, asp0)).toBeTruthy();
                expect(Aspect.signatureMatchesAspect(signature1, asp1)).toBeTruthy();
                expect(Aspect.signatureMatchesAspect(signature2, asp2)).toBeTruthy();
            });
            it('should handle superset matches', function () {
                expect(Aspect.signatureMatchesAspect(signature0, asp0)).toBeTruthy();
                expect(Aspect.signatureMatchesAspect(signature0, asp1)).toBeTruthy();
                expect(Aspect.signatureMatchesAspect(signature0, asp2)).toBeTruthy();
            });
            it('should handle falsy matches', function () {
                expect(Aspect.signatureMatchesAspect(signature1, asp0)).toBeFalsy();
                expect(Aspect.signatureMatchesAspect(signature2, asp0)).toBeFalsy();
            });
            it('should handle falsy matches for removed components', function () {
                EntitySignature.removeComponent(signature0, TestComp0);
                expect(Aspect.signatureMatchesAspect(signature0, asp0)).toBeFalsy();
            });
        });
    });
}
exports.testAspect = testAspect;
;
