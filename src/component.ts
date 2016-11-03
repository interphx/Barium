import * as ComponentTypesInfo from './component-types-info';
import * as Util from './util';

export interface ComponentClass<T> {
  new(...args: any[]): T;
  name?: string;
};

export interface Component {}

export function ComponentClass<T extends Function>(target: T) {
  // TODO: Use polyfilled defineProperty here
  if (!('name' in target)) {
    var parsedName = Util.parseFunctionName(target);
    if (typeof parsedName !== 'string' || parsedName.trim() === '') {
      throw new Error(`Unable to parse component class name; please specify
        static "name" property or use non-anonymous function`);
    } else {
      console.log(`Name for component class ${parsedName} was parsed from
        function definition`);
    }
    target['name'] = parsedName;
  }
  var index = ComponentTypesInfo.getNextComponentTypeId();
  var name = target['name'];
  ComponentTypesInfo.typeNameToIndex[name] = index;
  return target as (T & {name: string});
}
