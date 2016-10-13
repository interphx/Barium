export enum ShapeType {
  Polygon = 1,
  Circle = 2,
  Capsule = 3,
  Ellipse = 4
}

export abstract class Shape {
  angle: number;
  position: Array<number>;
  type: ShapeType;

  constructor(angle: number = 0, position: Array<number> = [0, 0]) {
    this.angle = angle;
    this.position = position.slice(0);
  }

  abstract clone(): Shape;
}
Shape.prototype.angle = 0;
Shape.prototype.position = [0, 0];

export class Polygon extends Shape {
  points: Array<number>;
  constructor ({points, angle = 0, position = [0, 0]}:
    {
      points: Array<number>,
      angle?: number,
      position?: Array<number>
    }) {
    super(angle, position);
    this.points = points.slice(0);
  }
  clone() {
    return new Polygon({points: this.points, angle: this.angle, position: this.position});
  }
}
Polygon.prototype.points = (null as Array<number> | null) as Array<number>;
Polygon.prototype.type = ShapeType.Polygon;

export class Circle extends Shape {
  type = ShapeType.Circle;
  radius: number;
  constructor({radius, angle = 0, position = [0, 0]}:
    {
      radius: number,
      angle?: number,
      position?: Array<number>
    }) {
    super(angle, position);
    this.radius = radius;
  }
  clone() {
    return new Circle({radius: this.radius, angle: this.angle, position: this.position});
  }
}
Circle.prototype.type = ShapeType.Circle;
Circle.prototype.radius = 1;

export class Capsule extends Shape {
  length: number;
  radius: number;
  constructor({length, radius, angle = 0, position = [0, 0]}:
    {
      length: number,
      radius: number,
      angle?: number,
      position?: Array<number>
    }) {
    super(angle, position);
    this.length = length;
    this.radius = radius;
  }
  clone() {
    return new Capsule({
      length: this.length,
      radius: this.radius,
      angle: this.angle,
      position: this.position
    });
  }
}
Capsule.prototype.type = ShapeType.Capsule;
Capsule.prototype.length = 4;
Capsule.prototype.radius = 1;
