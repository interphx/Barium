export var totalComponentTypes = 0;

export var typeNameToIndex = {};

export function getNextComponentTypeId(): number {
  return totalComponentTypes++;
}
