"use strict";
var Aspect = require('barium-aspect');
var simple_shape_1 = require('components/simple-shape');
var transform2d_1 = require('components/transform2d');
var shape_1 = require('geometry/shape');
var Renderer2dPixi = (function () {
    function Renderer2dPixi(entityManager, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.meterToPixel, meterToPixel = _c === void 0 ? 10 : _c, _d = _b.yAxis, yAxis = _d === void 0 ? -1 : _d, _e = _b.xAxis, xAxis = _e === void 0 ? 1 : _e, _f = _b.width, width = _f === void 0 ? 800 : _f, _g = _b.height, height = _g === void 0 ? 600 : _g, _h = _b.backgroundColor, backgroundColor = _h === void 0 ? 0x000000 : _h;
        this.renderableAspect = Aspect.all([simple_shape_1.SimpleShape, transform2d_1.Transform2d]);
        this.entityManager = entityManager;
        this.entityManager.addAspect(this.renderableAspect);
        this.width = width;
        this.height = height;
        this.meterToPixel = meterToPixel;
        this.xAxis = xAxis;
        this.yAxis = yAxis;
        this.renderer = PIXI.autoDetectRenderer(width, height, { backgroundColor: backgroundColor });
        this.stage = new PIXI.Container();
        this.stage.position.x = (width / 2);
        this.stage.position.y = (height / 2);
    }
    Renderer2dPixi.prototype.setStagePos = function (x, y) {
        this.stage.position.x = (this.width / 2);
        this.stage.position.y = (this.height / 2);
    };
    Renderer2dPixi.prototype.getView = function () {
        return this.renderer.view;
    };
    Renderer2dPixi.prototype.copyTransform2d = function (transform, target) {
        target.position.x = transform.x * this.xAxis * this.meterToPixel;
        target.position.y = transform.y * this.yAxis * this.meterToPixel;
        target.scale.x = transform.scaleX;
        target.scale.y = transform.scaleY;
        target.rotation = transform.rotation;
    };
    Renderer2dPixi.prototype.validateSimpleShape = function (shape, transform) {
        if (!shape._graphics) {
            shape._graphics = new PIXI.Graphics();
        }
        var graphics = shape._graphics;
        var shapeData = shape.shape;
        var xAxis = this.xAxis;
        var yAxis = this.yAxis;
        var meterToPixel = this.meterToPixel;
        graphics.lineColor = shape.strokeColor;
        graphics.lineWidth = shape.strokeWidth;
        switch (shapeData.type) {
            case shape_1.ShapeType.Circle:
                var radius = shapeData.radius;
                graphics.beginFill(shape.fillColor);
                graphics.drawEllipse(shapeData.position[0] * xAxis * meterToPixel, shapeData.position[1] * yAxis * meterToPixel, radius * meterToPixel, radius * meterToPixel);
                graphics.endFill();
                break;
            case shape_1.ShapeType.Polygon:
                graphics.beginFill(shape.fillColor);
                var points = shapeData.points.slice(0);
                for (var i = 0, len = points.length; i < len; ++i) {
                    if (i % 2 === 0) {
                        points[i] *= meterToPixel * xAxis;
                    }
                    else {
                        points[i] *= meterToPixel * yAxis;
                    }
                }
                graphics.drawPolygon(points);
                graphics.endFill();
                break;
            default:
                throw new Error('Not implemented');
        }
        shape._valid = true;
    };
    Renderer2dPixi.prototype.tryValidateSimpleShape = function (component, transform) {
        var result = false;
        if (!component.isValid()) {
            this.validateSimpleShape(component, transform);
            result = true;
        }
        if (!component._graphics.parent) {
            this.stage.addChild(component._graphics);
            result = true;
        }
        return result;
    };
    Renderer2dPixi.prototype.update = function (dt) {
        var entityManager = this.entityManager;
        var renderables = this.entityManager.getEntitiesByAspect(this.renderableAspect);
        for (var i = 0, len = renderables.length; i < len; ++i) {
            var renderable = renderables[i];
            var shape = entityManager.getComponent(renderable, simple_shape_1.SimpleShape);
            var transform = entityManager.getComponent(renderable, transform2d_1.Transform2d);
            if (!this.tryValidateSimpleShape(shape, transform)) {
                this.copyTransform2d(transform, shape._graphics);
            }
        }
        this.renderer.render(this.stage);
    };
    return Renderer2dPixi;
}());
exports.Renderer2dPixi = Renderer2dPixi;
