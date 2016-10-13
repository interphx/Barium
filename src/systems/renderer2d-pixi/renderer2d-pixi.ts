import {EntityManager} from 'barium-entity';
import * as Aspect from 'barium-aspect';
import {SimpleShape} from 'components/simple-shape';
import {Transform2d} from 'components/transform2d';
import {ShapeType, Circle, Polygon, Capsule} from 'geometry/shape';

type PixiRenderer = PIXI.SystemRenderer;

export class Renderer2dPixi {
  entityManager: EntityManager;
  renderer: PixiRenderer;
  stage: PIXI.Container;
  renderableAspect: Aspect.Aspect = Aspect.all([SimpleShape, Transform2d]);
  width: number;
  height: number;

  // TODO: This will depend on Camera position
  xAxis: number;
  yAxis: number;
  meterToPixel: number;

  // TODO: Is it better to scale using stage.scale or by manually adjusting points in Graphics and Sprite objects>
  constructor(entityManager: EntityManager, {meterToPixel = 10, yAxis = -1, xAxis = 1, width = 800, height = 600, backgroundColor = 0x000000}={}) {
    this.entityManager = entityManager;
    this.entityManager.addAspect(this.renderableAspect);
    this.width = width;
    this.height = height;
    this.meterToPixel = meterToPixel;
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    this.renderer = PIXI.autoDetectRenderer(width, height, {backgroundColor: backgroundColor});
    this.stage = new PIXI.Container();

    /*var test = new PIXI.Graphics();
    test.beginFill(0xFF0000);
    test.lineColor = 0x00FF00;
    test.lineWidth = 2;
    test.drawCircle(0, 0, 50);
    test.endFill();
    this.stage.addChild(test);
    console.log(test);*/

    this.stage.position.x = (width / 2);
    this.stage.position.y = (height / 2);
    //this.stage.scale.x = this.width / (this.meterToPixel);
    //this.stage.scale.y = this.height / (this.meterToPixel);
  }

  setStagePos(x: number, y: number) {
    this.stage.position.x = (this.width / 2);
    this.stage.position.y = (this.height / 2);
  }

  getView(): HTMLCanvasElement {
    return this.renderer.view;
  }

  copyTransform2d(transform: Transform2d, target: PIXI.DisplayObject) {
    target.position.x = transform.x * this.xAxis * this.meterToPixel;
    target.position.y = transform.y * this.yAxis * this.meterToPixel;
    target.scale.x = transform.scaleX;
    target.scale.y = transform.scaleY;
    target.rotation = transform.rotation;
  }

  validateSimpleShape(shape: SimpleShape, transform: Transform2d) {
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
      //this.copyTransform2d(transform, graphics);

      switch(shapeData.type) {
        case ShapeType.Circle:
          var radius = (shapeData as Circle).radius;
          graphics.beginFill(shape.fillColor);
          graphics.drawEllipse(
            shapeData.position[0] * xAxis * meterToPixel,
            shapeData.position[1] * yAxis * meterToPixel,
            radius * meterToPixel,
            radius * meterToPixel
          );
          graphics.endFill();
          break;
        case ShapeType.Polygon:
          graphics.beginFill(shape.fillColor);
          // TODO: Cloning points is not nice; can we store just one array?
          // Or, if points are not stored by drawPolygon, use pooling

          var points = (shapeData as Polygon).points.slice(0);

          for (var i = 0, len = points.length; i < len; ++i) {
            if (i % 2 === 0) {
              points[i] *= meterToPixel * xAxis;
            } else {
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
  }

  tryValidateSimpleShape(component: SimpleShape, transform: Transform2d) {
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
  }

  update(dt: number): void {
    var entityManager = this.entityManager;

    var renderables = this.entityManager.getEntitiesByAspect(this.renderableAspect);
    for (var i = 0, len = renderables.length; i < len; ++i) {
      var renderable = renderables[i];
      var shape = entityManager.getComponentUnsafe(renderable, SimpleShape);
      var transform = entityManager.getComponentUnsafe(renderable, Transform2d);
      if (!this.tryValidateSimpleShape(shape, transform)) {
        this.copyTransform2d(transform, shape._graphics);
      }
      
    }
    this.renderer.render(this.stage);
  }
}
