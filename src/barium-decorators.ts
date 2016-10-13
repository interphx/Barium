import * as ComponentTypesInfo from './barium-component-types-info';
import * as Util from './barium-util';

export function ComponentClass<T extends Function>(target: T) {
  // TODO: Warning if name is somehow wrong
  // TODO: Use defineProperty
  if (!('name' in target)) {
    target['name'] = Util.parseFunctionName(target);
  }
  var index = ComponentTypesInfo.getNextComponentTypeId();
  var name = target['name'];
  ComponentTypesInfo.typeNameToIndex[name] = index;
  return target as (T & {name: string});
}

// TODO: Generate arg0...argN with metaprogramming and allow to change
// the number of generated paremeters. This will require powerful
// metaprogramming capabilities with validation.
// Or even better: generate target.create with the same signature
// as target.prototype.initialize
/*export function Poolable(poolSize: number = 50, poolExpansionCount: number = 50) {
  return function(target: Function) {
    target.pool = new Pool(target, poolSize, poolExpansionCount);

    target.create = function(...args) {

    }
  }
}*/
