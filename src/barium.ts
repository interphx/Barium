export {EntityManager, Entity} from './barium-entity';

import * as Signal from './barium-signal';
export {Signal};

import * as Util from './barium-util';
export {Util};

import * as Decorators from './barium-decorators';
export {Decorators};

import * as SimpleShapeComponent from './components/simple-shape';
import * as Transform2dComponent from './components/transform2d';
import * as Collider2dComponent from './components/collider2d';
import * as RigidBody2dComponent from './components/rigidbody2d';
namespace Components {
  export var SimpleShape = SimpleShapeComponent.SimpleShape;
  export var Transform2d = Transform2dComponent.Transform2d;
  export var Collider2d = Collider2dComponent.Collider2d;
  export var RigidBody2d = RigidBody2dComponent.RigidBody2d;
  export var RigidBody2dType = RigidBody2dComponent.BodyType;
};
export {Components};

import * as Render2dPixiSystem from './systems/renderer2d-pixi/renderer2d-pixi';
import * as Physics2dP2System from './systems/physics2d-p2/physics2d-p2';
namespace Systems {
  export var Renderer2dPixi = Render2dPixiSystem.Renderer2dPixi;
  export var Physics2dP2 = Physics2dP2System.Physics2dP2;
};
export {Systems};

import * as ShapeModule from './geometry/shape';
namespace Geometry {
  export namespace Shape {
    export var Circle = ShapeModule.Circle;
    export var Polygon = ShapeModule.Polygon;
    export var Capsule = ShapeModule.Capsule;
  }
}
export {Geometry}

export {GameUpdater} from 'barium-game-updater';
