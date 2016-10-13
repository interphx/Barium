import * as ComponentTypesInfo from './barium-component-types-info';
import {ComponentClass} from './barium-component';
import * as EntitySignature from './barium-entity-signature';
import * as BitMask from './barium-bitmask';

export type Aspect = BitMask.BitMaskType;
export type AspectHash = string;

export function all(componentClasses: ComponentClass<any>[]): Aspect {
  var aspect = BitMask.create(ComponentTypesInfo.totalComponentTypes);
  for (var componentClass of componentClasses) {
    BitMask.setBit(
      aspect,
      ComponentTypesInfo.typeNameToIndex[componentClass.name as string],
      true
    );
  }
  return aspect;
}

// TODO: Support other relationshipts, not just "contains all"
export function signatureMatchesAspect(signature: EntitySignature.EntitySignature, aspect: Aspect): boolean {
  return BitMask.contains(signature, aspect);
}
