import * as ComponentTypesInfo from './component-types-info';
import {ComponentClass} from './component';
import * as BitMask from './bitmask';

export type EntitySignature = BitMask.BitMaskType;
export function create() {
  return BitMask.create(ComponentTypesInfo.totalComponentTypes);
}
export var containsAspect = BitMask.contains;
export function addComponent(signature: EntitySignature, componentClass: ComponentClass<any>) {
  BitMask.setBit(signature, ComponentTypesInfo.typeNameToIndex[componentClass.name as string], true);
}
export function removeComponent(signature: EntitySignature, componentClass: ComponentClass<any>) {
  BitMask.setBit(signature, ComponentTypesInfo.typeNameToIndex[componentClass.name as string], false);
}
