import * as ComponentTypesInfo from './barium-component-types-info';
import {Component, ComponentClass} from './barium-component';
import * as EntitySignature from './barium-entity-signature';
import * as Sig from './barium-signal';
import * as AspectModule from './barium-aspect';
import {Aspect, AspectHash, signatureMatchesAspect} from './barium-aspect';

export type EntityId = {index: number, version: number};

export class Entity {
  public readonly manager: EntityManager;
  constructor(manager: EntityManager, public id: EntityId) {
    this.manager = manager;
  }
  toString() {
    return '<Entity ' + this.id.index + ':' + this.id.version + '>';
  }
  isValid(): boolean {
    return this.manager.isValidId(this.id);
  }
  add(component: Component) {
    this.manager.addComponent(this.id, component);
  }
  remove<T>(componentClass: ComponentClass<T>) {
    this.manager.removeComponent(this.id, componentClass);
  }
  hasComponent<T>(componentClass: ComponentClass<T>): boolean {
    return this.manager.hasComponent(this.id, componentClass);
  }
  matchesAspect(aspect: Aspect): boolean {
    var manager = this.manager;
    return manager.matchesAspect(manager.entitySignatures[this.id.index], aspect);
  }
}

// TODO: A question: should we delete keys with empty values from componentMapping, etc? How often?
// TODO: Numerical access to object's properties is very slow on iOS, probably there are alternatives?
export class EntityManager {
  // ComponentClassName to (EntityId to (List of Component))
  componentMapping: {[key: string]: {[key: string]: Component | undefined}} = {};
  // Aspect#stringForm to (List of EntityId)
  aspectMapping: {[key: string]: Array<EntityId> | undefined} = {};
  aspectList: Array<Aspect> = [];

  entitySignatures: {[key: string]: EntitySignature.EntitySignature} = {};

  freeIds: Array<EntityId> = [];
  idCounter: number = 0;
  signals = {
    entityCreated: new Sig.Signal() as Sig.Signal1<EntityId>,
    entityDestroyed: new Sig.Signal() as Sig.Signal1<EntityId>,
    componentAdded: new Sig.Signal() as Sig.Signal2<EntityId, Component>,
    componentRemoved: new Sig.Signal() as Sig.Signal2<EntityId, ComponentClass<any>>
  };

  constructor() {
    for (var key in ComponentTypesInfo.typeNameToIndex) {
      if (!ComponentTypesInfo.typeNameToIndex.hasOwnProperty(key)) continue;
      this.componentMapping[key] = {};
    }
  }

  // TODO: Allow for more complex relations than "has-all"
  matchesAspect(entitySignature: EntitySignature.EntitySignature, aspect: Aspect) {
    return signatureMatchesAspect(entitySignature, aspect);
  }

  addEntityToAspects(entityId: EntityId, signature: EntitySignature.EntitySignature) {
    var aspectMapping = this.aspectMapping;
    var aspectList = this.aspectList;
    for (var i = 0, len = aspectList.length; i < len; ++i) {
      var aspect = aspectList[i];
      if (this.matchesAspect(signature, aspect)) {
        // This typecast is safe. If an aspect is in aspectList, it is
        // guaranteed to be in aspectMapping.
        (<Array<EntityId>>aspectMapping[aspect.stringForm]).push(entityId);
      }
    }
  }

  removeEntityIdFromList(entityId: EntityId, mapping: Array<EntityId>) {
    for (var j = 0, len = mapping.length; j < len; ++j) {
      if (mapping[j].index !== entityId.index) continue;
      // This removal is safe, as we break from the loop immediately after
      // Fast removal (non-order-preserving) is used
      mapping[j] = mapping[len - 1];
      mapping.length -= 1;
      return;
    }
  }

  removeEntityFromAspects(entityId: EntityId, signature: EntitySignature.EntitySignature) {
    var aspectMapping = this.aspectMapping;
    var aspectList = this.aspectList;
    for (var i = 0, len = aspectList.length; i < len; ++i) {
      var aspect = aspectList[i];
      // If entity matches, then it is in this aspect, let's remove it
      if (!this.matchesAspect(signature, aspect)) continue;
      var mapping = <Array<EntityId>> aspectMapping[aspect.stringForm];
      this.removeEntityIdFromList(entityId, mapping);
    }
  }

  // TODO: Probably can be implemented using bitwise XOR ob signature to find
  // changes
  updateEntityAspectsMapping(entityId: EntityId,
    oldSignature: EntitySignature.EntitySignature,
    newSignature: EntitySignature.EntitySignature) {
    var aspectMapping = this.aspectMapping;
    var aspectList = this.aspectList;
    for (var i = 0, len = aspectList.length; i < len; ++i) {
      var aspect = aspectList[i];
      var oldMatches = this.matchesAspect(oldSignature, aspect);
      var newMatches = this.matchesAspect(newSignature, aspect);
      // We are interested in cases when the match changes
      if (oldMatches && !newMatches) {
        // Was matching eralier, but no longer. Remove
        this.removeEntityIdFromList(entityId, <Array<EntityId>> aspectMapping[aspect.stringForm]);
      } else if (!oldMatches && newMatches) {
        // Started to match now. Add
        (<Array<EntityId>> aspectMapping[aspect.stringForm]).push(entityId);
      }
    }
  }

  // TODO: This will only track newly added/updated entities!
  addAspect(aspect: Aspect) {
    // TODO: Use fastest way to check if the object has this key
    if (this.aspectMapping.hasOwnProperty(aspect.stringForm)) {
      return;
    }
    this.aspectMapping[aspect.stringForm] = [];
    this.aspectList.push(aspect);
  }

  removeAspect(aspect: Aspect) {
    if (!this.aspectMapping.hasOwnProperty(aspect.stringForm)) {
      return false;
    }

    this.aspectMapping[aspect.stringForm] = void 0;

    // TODO: Use a helper or, preferably, a faster approach
    var aspectIndex: number = -1;
    for (var i = 0; i < this.aspectList.length; ++i) {
      if (this.aspectList[i].stringForm === aspect.stringForm) {
        aspectIndex = i;
        break;
      }
    }

    if (aspectIndex >= 0) {
      this.aspectList.splice(i, 1);
      return true;
    }

    throw new Error('Aspect mapping key was in aspectMapping but not in aspectsList, this is a bug');
  }

  getEntitiesByAspect(aspect: Aspect): Array<EntityId> {
    var mapping = this.aspectMapping;
    var stringForm = aspect.stringForm;
    var entityList = mapping[stringForm];
    // TODO: Should not create a new array each time
    if (entityList === undefined) return [];
    return entityList;
  }

  getSignature(entityId: EntityId) {
    return this.entitySignatures[entityId.index.toString()];
  }

  createEntity(): Entity {
    return new Entity(this, this.create());
  }

  removeEntity(entity: Entity) {
    this.remove(entity.id);
  }

  create(): EntityId {
    var id = this.freeIds.pop();
    if (id === undefined) {
      id = {index: this.idCounter++, version: 0};
    }
    this.entitySignatures[id.index] = EntitySignature.create();
    this.signals.entityCreated.emit(id);
    return id;
  }

  remove(entityId: EntityId) {
    this.removeEntityFromAspects(entityId, this.entitySignatures[entityId.index]);
    this.signals.entityDestroyed.emit(entityId);
    entityId.version += 1;
    this.freeIds.push(entityId);
  }

  // TODO: Probably phould be pooled. Measure and minify performance impact.
  get(id: EntityId): Entity {
    return new Entity(this, id);
  }

  isValidId(id: EntityId): boolean {
    // TODO: Improve search performance, maybe add an additional set of
    // existing entities or make freeIds a set
    var freeIds = this.freeIds;
    for (var i = 0, len = freeIds.length; i < len; ++i) {
      if (freeIds[i].index === id.index) return false;
    }
    return (id.index < this.idCounter);
  }

  hasComponent<T>(entityId: EntityId, componentClass: ComponentClass<T>): boolean {
    return !!this.componentMapping[componentClass.name as string][entityId.index];
  }

  getComponent<T>(entityId: EntityId, componentClass: ComponentClass<T>): T | null {
    return (this.componentMapping[componentClass.name as string][entityId.index] as T) || null;
  }

  getComponentUnsafe<T>(entityId: EntityId, componentClass: ComponentClass<T>): T {
    return (this.componentMapping[componentClass.name as string][entityId.index] as T);
  }

  addComponent<T>(entityId: EntityId, component: T) {
    var componentMapping = this.componentMapping;
    var componentClassName = (component.constructor as ComponentClass<T>).name as string;

    var mapping = componentMapping[componentClassName];
    if (this.hasComponent(entityId, component.constructor as ComponentClass<T>)) {
      throw new Error('The entity ' + entityId.index + ' already has ' +
        (component.constructor as ComponentClass<T>).name);
    }
    // TODO: SHOULD I REALLY USE A NUMBER INSTEAD OF AN OBJECT?
    mapping[entityId.index] = component;

    // TODO: Cloning an array is expensive. Would checking presence of
    // entity in aspect's entities array in updateEntityAspectsMapping
    // be faster?
    var oldSignature = this.entitySignatures[entityId.index].slice(0);
    EntitySignature.addComponent(
      this.entitySignatures[entityId.index],
      (component.constructor as ComponentClass<T>)
    );

    // TODO: Typecast is hacky, probably change types to NumericArray and EntitySignature
    // or other usable hierarchy
    this.updateEntityAspectsMapping(
      entityId,
      <EntitySignature.EntitySignature> oldSignature,
      this.entitySignatures[entityId.index]);
    this.signals.componentAdded.emit(entityId, component);
  }

  removeComponent<T>(entityId: EntityId, componentClass: ComponentClass<T>) {
    var mapping = this.componentMapping[componentClass.name as string];
    // TODO: Theoreticallly, redundant check.
    // May be useful for detecting errors in practice.
    if (!mapping) {
      console.log('Unknown component type', componentClass);
      throw new Error('Unknown component type: ' + componentClass.name);
    }
    if (!this.hasComponent(entityId, componentClass)) {
      throw new Error('The entity ' + entityId + ' does not have a ' + componentClass.name);
    }
    mapping[entityId.index] = void 0;

    // TODO: Cloning an array is expensive. Would checking presence of
    // entity in aspect's entities array in updateEntityAspectsMapping
    // be faster?
    var oldSignature = this.entitySignatures[entityId.index].slice(0);
    EntitySignature.removeComponent(
      this.entitySignatures[entityId.index],
      componentClass
    );

    // TODO: Typecast is hacky, probably change types to NumericArray and EntitySignature
    // or other usable hierarchy
    this.updateEntityAspectsMapping(
      entityId,
      <EntitySignature.EntitySignature> oldSignature,
      this.entitySignatures[entityId.index]);

    this.signals.componentRemoved.emit(entityId, componentClass);
  }
}
