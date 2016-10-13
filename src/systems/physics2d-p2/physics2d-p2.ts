import {EntityManager} from 'barium-entity';
import * as Aspect from 'barium-aspect';
import {Transform2d} from 'components/transform2d';
import {RigidBody2d, BodyType} from 'components/rigidbody2d';
import {Collider2d} from 'components/collider2d';
import {Shape, ShapeType, Circle, Polygon, Capsule} from 'geometry/shape';

import * as p2 from 'p2';

export class Physics2dP2 {
  entityManager: EntityManager;
  world: p2.World;
  bodyAspect = Aspect.all([Transform2d, RigidBody2d, Collider2d])

  constructor(entityManager: EntityManager, {gravity = [0, -9.8]}: {gravity?: number[]} = {}) {
    this.entityManager = entityManager;
    this.entityManager.addAspect(this.bodyAspect);
    this.world = new p2.World({gravity: gravity});

  }

  // TODO: Very hacky convert to typesafe variant
  toP2Shape(shape: Shape): p2.Shape {
    var params = {
      angle: shape.angle,
      position: shape.position
    };
    switch(shape.type) {
      case ShapeType.Circle:
        params['radius'] = (shape as Circle).radius;
        return new p2.Circle(params);
      case ShapeType.Polygon:
        var points = (shape as Polygon).points;
        if (points.length % 2 !== 0) {
          throw new Error('Polygon points musts be an array of coordinates specified in pairs, length must be even');
        }
        var p2points = new Array(points.length / 2);
        for (var i = 0, len = points.length; i < len; i += 2) {
          p2points[i / 2] = [points[i], points[i + 1]];
        }
        params['vertices'] = p2points;
        return new p2.Convex(params);
      case ShapeType.Capsule:
        params['length'] = (shape as Capsule).length;
        params['radius'] = (shape as Capsule).radius;
        return new p2.Capsule(params);
      default:
        throw new Error('Not implemented');
    }
  }

  toP2Type(bodyType: BodyType) {
    switch(bodyType) {
      case BodyType.dynamic: return p2.Body.DYNAMIC;
      case BodyType.kinematic: return p2.Body.KINEMATIC;
      case BodyType.static: return p2.Body.STATIC;
    }
    throw new Error('Not implemented');
  }

  update(dt: number, fixedDt: number = 1/60) {
    var entityManager = this.entityManager;
    var bodies = entityManager.getEntitiesByAspect(this.bodyAspect);

    for (var i = 0, len = bodies.length; i < len; ++i) {
      var item = bodies[i];

      var rigidBody = entityManager.getComponent(item, RigidBody2d);
      var transform = entityManager.getComponent(item, Transform2d);

      if (!rigidBody.isValid()) {
        var collider = entityManager.getComponent(item, Collider2d);
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
  }
}
