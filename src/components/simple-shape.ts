import {ComponentClass} from 'barium-decorators';
import {Shape} from 'geometry/shape';

@ComponentClass
export class SimpleShape {
  _graphics: PIXI.Graphics;
  _valid: boolean = false;
  shape: Shape;
  fillColor: number;
  strokeColor: number;
  strokeWidth: number;
  constructor(shapeData: Shape, fillColor=0xFFFFFF, strokeColor=0x000000, strokeWidth=2) {
    this.shape = shapeData;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.strokeWidth = strokeWidth;
    this.invalidate();
  }
  isValid() {
    return this._valid;
  }
  invalidate() {
    this._valid = false;
  }
}
