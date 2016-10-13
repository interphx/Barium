"use strict";
var ComponentTypesInfo = require('./barium-component-types-info');
var EntitySignature = require('./barium-entity-signature');
var Sig = require('./barium-signal');
var barium_aspect_1 = require('./barium-aspect');
var Entity = (function () {
    function Entity(manager, id) {
        this.id = id;
        this.manager = manager;
    }
    Entity.prototype.toString = function () {
        return '<Entity ' + this.id.index + ':' + this.id.version + '>';
    };
    Entity.prototype.isValid = function () {
        return this.manager.isValidId(this.id);
    };
    Entity.prototype.add = function (component) {
        this.manager.addComponent(this.id, component);
    };
    Entity.prototype.remove = function (componentClass) {
        this.manager.removeComponent(this.id, componentClass);
    };
    Entity.prototype.hasComponent = function (componentClass) {
        return this.manager.hasComponent(this.id, componentClass);
    };
    Entity.prototype.matchesAspect = function (aspect) {
        var manager = this.manager;
        return manager.matchesAspect(manager.entitySignatures[this.id.index], aspect);
    };
    return Entity;
}());
exports.Entity = Entity;
var EntityManager = (function () {
    function EntityManager() {
        this.componentMapping = {};
        this.aspectMapping = {};
        this.aspectList = [];
        this.entitySignatures = {};
        this.freeIds = [];
        this.idCounter = 0;
        this.signals = {
            entityCreated: new Sig.Signal(),
            entityDestroyed: new Sig.Signal(),
            componentAdded: new Sig.Signal(),
            componentRemoved: new Sig.Signal()
        };
        for (var key in ComponentTypesInfo.typeNameToIndex) {
            if (!ComponentTypesInfo.typeNameToIndex.hasOwnProperty(key))
                continue;
            this.componentMapping[key] = {};
        }
    }
    EntityManager.prototype.matchesAspect = function (entitySignature, aspect) {
        return barium_aspect_1.signatureMatchesAspect(entitySignature, aspect);
    };
    EntityManager.prototype.addEntityToAspects = function (entityId, signature) {
        var aspectMapping = this.aspectMapping;
        var aspectList = this.aspectList;
        for (var i = 0, len = aspectList.length; i < len; ++i) {
            var aspect = aspectList[i];
            if (this.matchesAspect(signature, aspect)) {
                aspectMapping[aspect.stringForm].push(entityId);
            }
        }
    };
    EntityManager.prototype.removeEntityIdFromList = function (entityId, mapping) {
        for (var j = 0, len = mapping.length; j < len; ++j) {
            if (mapping[j].index !== entityId.index)
                continue;
            mapping[j] = mapping[len - 1];
            mapping.length -= 1;
            return;
        }
    };
    EntityManager.prototype.removeEntityFromAspects = function (entityId, signature) {
        var aspectMapping = this.aspectMapping;
        var aspectList = this.aspectList;
        for (var i = 0, len = aspectList.length; i < len; ++i) {
            var aspect = aspectList[i];
            if (!this.matchesAspect(signature, aspect))
                continue;
            var mapping = aspectMapping[aspect.stringForm];
            this.removeEntityIdFromList(entityId, mapping);
        }
    };
    EntityManager.prototype.updateEntityAspectsMapping = function (entityId, oldSignature, newSignature) {
        var aspectMapping = this.aspectMapping;
        var aspectList = this.aspectList;
        for (var i = 0, len = aspectList.length; i < len; ++i) {
            var aspect = aspectList[i];
            var oldMatches = this.matchesAspect(oldSignature, aspect);
            var newMatches = this.matchesAspect(newSignature, aspect);
            if (oldMatches && !newMatches) {
                this.removeEntityIdFromList(entityId, aspectMapping[aspect.stringForm]);
            }
            else if (!oldMatches && newMatches) {
                aspectMapping[aspect.stringForm].push(entityId);
            }
        }
    };
    EntityManager.prototype.addAspect = function (aspect) {
        if (this.aspectMapping.hasOwnProperty(aspect.stringForm)) {
            return;
        }
        this.aspectMapping[aspect.stringForm] = [];
        this.aspectList.push(aspect);
    };
    EntityManager.prototype.removeAspect = function (aspect) {
        if (!this.aspectMapping.hasOwnProperty(aspect.stringForm)) {
            return false;
        }
        this.aspectMapping[aspect.stringForm] = void 0;
        var aspectIndex = -1;
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
    };
    EntityManager.prototype.getEntitiesByAspect = function (aspect) {
        var mapping = this.aspectMapping;
        var stringForm = aspect.stringForm;
        var entityList = mapping[stringForm];
        if (entityList === undefined)
            return [];
        return entityList;
    };
    EntityManager.prototype.getSignature = function (entityId) {
        return this.entitySignatures[entityId.index.toString()];
    };
    EntityManager.prototype.createEntity = function () {
        return new Entity(this, this.create());
    };
    EntityManager.prototype.removeEntity = function (entity) {
        this.remove(entity.id);
    };
    EntityManager.prototype.create = function () {
        var id = this.freeIds.pop();
        if (id === undefined) {
            id = { index: this.idCounter++, version: 0 };
        }
        this.entitySignatures[id.index] = EntitySignature.create();
        this.signals.entityCreated.emit(id);
        return id;
    };
    EntityManager.prototype.remove = function (entityId) {
        this.removeEntityFromAspects(entityId, this.entitySignatures[entityId.index]);
        this.signals.entityDestroyed.emit(entityId);
        entityId.version += 1;
        this.freeIds.push(entityId);
    };
    EntityManager.prototype.get = function (id) {
        return new Entity(this, id);
    };
    EntityManager.prototype.isValidId = function (id) {
        var freeIds = this.freeIds;
        for (var i = 0, len = freeIds.length; i < len; ++i) {
            if (freeIds[i].index === id.index)
                return false;
        }
        return (id.index < this.idCounter);
    };
    EntityManager.prototype.hasComponent = function (entityId, componentClass) {
        return !!this.componentMapping[componentClass.name][entityId.index];
    };
    EntityManager.prototype.getComponent = function (entityId, componentClass) {
        var result = this.componentMapping[componentClass.name][entityId.index];
        if (!result) {
            throw new Error('Component "' + componentClass.name + '" not found for entity ' + JSON.stringify(entityId));
        }
        return result;
    };
    EntityManager.prototype.addComponent = function (entityId, component) {
        var componentMapping = this.componentMapping;
        var componentClassName = component.constructor.name;
        var mapping = componentMapping[componentClassName];
        if (this.hasComponent(entityId, component.constructor)) {
            throw new Error('The entity ' + entityId.index + ' already has ' +
                component.constructor.name);
        }
        mapping[entityId.index] = component;
        var oldSignature = this.entitySignatures[entityId.index].slice(0);
        EntitySignature.addComponent(this.entitySignatures[entityId.index], component.constructor);
        this.updateEntityAspectsMapping(entityId, oldSignature, this.entitySignatures[entityId.index]);
        this.signals.componentAdded.emit(entityId, component);
    };
    EntityManager.prototype.removeComponent = function (entityId, componentClass) {
        var mapping = this.componentMapping[componentClass.name];
        if (!mapping) {
            console.log('Unknown component type', componentClass);
            throw new Error('Unknown component type: ' + componentClass.name);
        }
        if (!this.hasComponent(entityId, componentClass)) {
            throw new Error('The entity ' + entityId + ' does not have a ' + componentClass.name);
        }
        mapping[entityId.index] = void 0;
        var oldSignature = this.entitySignatures[entityId.index].slice(0);
        EntitySignature.removeComponent(this.entitySignatures[entityId.index], componentClass);
        this.updateEntityAspectsMapping(entityId, oldSignature, this.entitySignatures[entityId.index]);
        this.signals.componentRemoved.emit(entityId, componentClass);
    };
    return EntityManager;
}());
exports.EntityManager = EntityManager;
