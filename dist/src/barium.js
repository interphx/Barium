"use strict";
var barium_entity_1 = require('./barium-entity');
exports.EntityManager = barium_entity_1.EntityManager;
exports.Entity = barium_entity_1.Entity;
var Signal = require('./barium-signal');
exports.Signal = Signal;
var Util = require('./barium-util');
exports.Util = Util;
var Decorators = require('./barium-decorators');
exports.Decorators = Decorators;
var SimpleShapeComponent = require('./components/simple-shape');
var Transform2dComponent = require('./components/transform2d');
var Collider2dComponent = require('./components/collider2d');
var RigidBody2dComponent = require('./components/rigidbody2d');
var Components;
(function (Components) {
    Components.SimpleShape = SimpleShapeComponent.SimpleShape;
    Components.Transform2d = Transform2dComponent.Transform2d;
    Components.Collider2d = Collider2dComponent.Collider2d;
    Components.RigidBody2d = RigidBody2dComponent.RigidBody2d;
    Components.RigidBody2dType = RigidBody2dComponent.BodyType;
})(Components || (Components = {}));
exports.Components = Components;
;
var Render2dPixiSystem = require('./systems/renderer2d-pixi/renderer2d-pixi');
var Physics2dP2System = require('./systems/physics2d-p2/physics2d-p2');
var Systems;
(function (Systems) {
    Systems.Renderer2dPixi = Render2dPixiSystem.Renderer2dPixi;
    Systems.Physics2dP2 = Physics2dP2System.Physics2dP2;
})(Systems || (Systems = {}));
exports.Systems = Systems;
;
var ShapeModule = require('./geometry/shape');
var Geometry;
(function (Geometry) {
    var Shape;
    (function (Shape) {
        Shape.Circle = ShapeModule.Circle;
        Shape.Polygon = ShapeModule.Polygon;
        Shape.Capsule = ShapeModule.Capsule;
    })(Shape = Geometry.Shape || (Geometry.Shape = {}));
})(Geometry || (Geometry = {}));
exports.Geometry = Geometry;
var barium_game_updater_1 = require('barium-game-updater');
exports.GameUpdater = barium_game_updater_1.GameUpdater;
