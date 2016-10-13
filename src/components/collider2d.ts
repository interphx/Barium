import {ComponentClass} from 'barium-decorators';
import {Shape} from 'geometry/shape';

@ComponentClass
export class Collider2d {
  shapes: Shape[];

  constructor({shapes}: {
    shapes: Shape[]
  }) {
    this.shapes = shapes.slice(0);
  }
}
