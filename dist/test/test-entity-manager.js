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
var entity_1 = require('entity');
var component_1 = require('component');
var Aspect = require('aspect');
var TestComponent = (function () {
    function TestComponent(foo) {
        this.foo = foo;
    }
    TestComponent = __decorate([
        component_1.ComponentClass, 
        __metadata('design:paramtypes', [String])
    ], TestComponent);
    return TestComponent;
}());
;
var TestFlagComponent0 = (function () {
    function TestFlagComponent0() {
    }
    TestFlagComponent0 = __decorate([
        component_1.ComponentClass, 
        __metadata('design:paramtypes', [])
    ], TestFlagComponent0);
    return TestFlagComponent0;
}());
;
var TestFlagComponent1 = (function () {
    function TestFlagComponent1() {
    }
    TestFlagComponent1 = __decorate([
        component_1.ComponentClass, 
        __metadata('design:paramtypes', [])
    ], TestFlagComponent1);
    return TestFlagComponent1;
}());
;
function test() {
    describe('EntityManager', function () {
        it('should be created', function () {
            var em = new entity_1.EntityManager();
            expect(em).toBeDefined();
        });
        it('should create entities', function () {
            var em = new entity_1.EntityManager();
            var id_a = em.create();
            var id_b = em.create();
            var ent_c = em.createEntity();
            expect(id_a).toBeDefined();
            expect(id_b).toBeDefined();
            expect(ent_c).toBeDefined();
        });
        it('should consider created entities valid', function () {
            var em = new entity_1.EntityManager();
            var id = em.create();
            expect(em.isValidId(id)).toBeTruthy();
        });
        it('should remove entities', function () {
            var em = new entity_1.EntityManager();
            var id_a = em.create();
            var id_b = em.create();
            var ent_c = em.createEntity();
            em.remove(id_a);
            em.remove(id_b);
            em.removeEntity(ent_c);
            expect(em.isValidId(id_a)).toBeFalsy();
            expect(em.isValidId(id_b)).toBeFalsy();
            expect(em.isValidId(ent_c.id)).toBeFalsy();
        });
        it('should add components to entity', function () {
            var em = new entity_1.EntityManager();
            var id0 = em.create(), id1 = em.create();
            expect(function () {
                em.addComponent(id0, new TestComponent('foo'));
                em.addComponent(id1, new TestComponent('bar'));
            }).not.toThrow();
            var comp0 = em.getComponent(id0, TestComponent);
            var comp1 = em.getComponent(id1, TestComponent);
            expect(comp0 ? comp0.foo : null).toEqual('foo');
            expect(comp1 ? comp1.foo : null).toEqual('bar');
        });
        it('should remove components from entity', function () {
            var em = new entity_1.EntityManager();
            var id0 = em.create(), id1 = em.create();
            em.addComponent(id0, new TestComponent('foo'));
            em.addComponent(id1, new TestComponent('bar'));
            expect(em.hasComponent(id0, TestComponent)).toBeTruthy();
            expect(em.hasComponent(id1, TestComponent)).toBeTruthy();
            em.removeComponent(id0, TestComponent);
            em.removeComponent(id1, TestComponent);
            expect(em.hasComponent(id0, TestComponent)).toBeFalsy();
            expect(em.hasComponent(id1, TestComponent)).toBeFalsy();
        });
        it('should check if entity has component', function () {
            var em = new entity_1.EntityManager();
            var id0 = em.create(), id1 = em.create();
            em.addComponent(id0, new TestComponent('foo'));
            em.addComponent(id1, new TestComponent('bar'));
            expect(em.hasComponent(id0, TestComponent)).toBeTruthy();
            expect(em.hasComponent(id1, TestComponent)).toBeTruthy();
        });
        it('should add aspects', function () {
            var em = new entity_1.EntityManager();
            var id0 = em.create(), id1 = em.create();
            expect(function () {
                em.addAspect(Aspect.all([TestComponent]));
            }).not.toThrow();
        });
        it('should remove aspects', function () {
            var em = new entity_1.EntityManager();
            var aspect = Aspect.all([TestComponent, TestFlagComponent0]);
            em.addAspect(aspect);
            expect(em.removeAspect(aspect)).toBeTruthy();
        });
        it('should return list of entities matching aspect', function () {
            var em = new entity_1.EntityManager();
            var aspect0 = Aspect.all([TestComponent, TestFlagComponent0]);
            var aspect1 = Aspect.all([TestComponent, TestFlagComponent1]);
            em.addAspect(aspect0);
            em.addAspect(aspect1);
            var id0 = em.create(), id1 = em.create();
            em.addComponent(id0, new TestComponent('foo'));
            em.addComponent(id0, new TestFlagComponent0());
            em.addComponent(id1, new TestComponent('bar'));
            em.addComponent(id1, new TestFlagComponent1());
            expect(em.getEntitiesByAspect(aspect0)).toEqual([id0]);
            expect(em.getEntitiesByAspect(aspect1)).toEqual([id1]);
            em.removeComponent(id1, TestComponent);
            expect(em.getEntitiesByAspect(aspect0)).toEqual([id0]);
            expect(em.getEntitiesByAspect(aspect1)).toEqual([]);
        });
    });
}
exports.test = test;
;
