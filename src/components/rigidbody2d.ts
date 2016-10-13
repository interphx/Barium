import {ComponentClass} from 'barium-decorators';
import * as p2 from 'p2';

export enum BodyType {
  dynamic = 1,
  kinematic = 2,
  static = 3
}

@ComponentClass
export class RigidBody2d {
  _p2body: p2.Body;
  _valid: boolean;

  type: BodyType;
  mass: number;
  angle: number;
  fixedRotation: boolean;
  allowSleep: boolean;
  collisionResponse: boolean;

  constructor({type = BodyType.dynamic, mass = 1, fixedRotation = false, allowSleep = true, collisionResponse = true}: {
    type?: BodyType,
    mass?: number,
    fixedRotation?: boolean,
    allowSleep?: boolean,
    collisionResponse?: boolean
  } = {}) {
    this.type = type;
    this.mass = mass;
    this.fixedRotation = fixedRotation;
    this.allowSleep = allowSleep;
    this.collisionResponse = collisionResponse;

    this.invalidate();
  }
  isValid() {
    return this._valid;
  }
  invalidate() {
    this._valid = false;
  }
}
