import {ComponentClass} from 'barium-decorators';

@ComponentClass
export class Transform2d {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public z: number = 0,
    public rotation: number = 0,
    public scaleX: number = 1,
    public scaleY: number = 1) {
  }
}
