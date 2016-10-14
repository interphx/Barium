"use strict";
var Aspect = require('barium-aspect');
var transform2d_1 = require('components/transform2d');
var rigidbody2d_1 = require('components/rigidbody2d');
var collider2d_1 = require('components/collider2d');
var shape_1 = require('geometry/shape');
var p2 = require('p2');
var Physics2dP2 = (function () {
    function Physics2dP2(entityManager, _a) {
        var _b = (_a === void 0 ? {} : _a).gravity, gravity = _b === void 0 ? [0, -9.8] : _b;
        this.bodyAspect = Aspect.all([transform2d_1.Transform2d, rigidbody2d_1.RigidBody2d, collider2d_1.Collider2d]);
        this.entityManager = entityManager;
        this.entityManager.addAspect(this.bodyAspect);
        this.world = new p2.World({ gravity: gravity });
        this.yAxis = -1;
    }
    Physics2dP2.prototype.toP2Shape = function (shape) {
        var params = {
            angle: shape.angle,
            position: shape.position
        };
        switch (shape.type) {
            case shape_1.ShapeType.Circle:
                params['radius'] = shape.radius;
                return new p2.Circle(params);
            case shape_1.ShapeType.Polygon:
                var points = shape.points;
                if (points.length % 2 !== 0) {
                    throw new Error('Polygon points musts be an array of coordinates specified in pairs, length must be even');
                }
                var p2points = new Array(points.length / 2);
                for (var i = 0, len = points.length; i < len; i += 2) {
                    p2points[i / 2] = [points[i], points[i + 1]];
                }
                params['vertices'] = p2points;
                return new p2.Convex(params);
            case shape_1.ShapeType.Capsule:
                params['length'] = shape.length;
                params['radius'] = shape.radius;
                return new p2.Capsule(params);
            default:
                throw new Error('Not implemented');
        }
    };
    Physics2dP2.prototype.toP2Type = function (bodyType) {
        switch (bodyType) {
            case rigidbody2d_1.BodyType.dynamic: return p2.Body.DYNAMIC;
            case rigidbody2d_1.BodyType.kinematic: return p2.Body.KINEMATIC;
            case rigidbody2d_1.BodyType.static: return p2.Body.STATIC;
        }
        throw new Error('Not implemented');
    };
    Physics2dP2.prototype.update = function (dt, fixedDt) {
        if (fixedDt === void 0) { fixedDt = 1 / 60; }
        var entityManager = this.entityManager;
        var bodies = entityManager.getEntitiesByAspect(this.bodyAspect);
        for (var i = 0, len = bodies.length; i < len; ++i) {
            var item = bodies[i];
            var rigidBody = entityManager.getComponent(item, rigidbody2d_1.RigidBody2d);
            var transform = entityManager.getComponent(item, transform2d_1.Transform2d);
            if (!rigidBody.isValid()) {
                var collider = entityManager.getComponent(item, collider2d_1.Collider2d);
                var body = new p2.Body({
                    type: this.toP2Type(rigidBody.type),
                    mass: rigidBody.mass,
                    position: [transform.x, transform.y],
                    angle: transform.rotation,
                    fixedRotation: rigidBody.fixedRotation,
                    allowSleep: rigidBody.allowSleep,
                    collisionResponse: rigidBody.collisionResponse
                });
                for (var i = 0, len = collider.shapes.length; i < len; ++i) {
                    body.addShape(this.toP2Shape(collider.shapes[i]));
                }
                this.world.addBody(body);
                rigidBody._p2body = body;
                rigidBody._valid = true;
            }
            transform.x = rigidBody._p2body.position[0];
            transform.y = rigidBody._p2body.position[1];
            transform.rotation = rigidBody._p2body.angle;
        }
        this.world.step(fixedDt, dt);
    };
    return Physics2dP2;
}());
exports.Physics2dP2 = Physics2dP2;
