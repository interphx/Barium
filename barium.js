(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Barium", [], factory);
	else if(typeof exports === 'object')
		exports["Barium"] = factory();
	else
		root["Barium"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var entity_1 = __webpack_require__(2);
	exports.EntityManager = entity_1.EntityManager;
	exports.Entity = entity_1.Entity;
	var Signal = __webpack_require__(6);
	exports.Signal = Signal;
	var Util = __webpack_require__(8);
	exports.Util = Util;
	var game_updater_1 = __webpack_require__(9);
	exports.GameUpdater = game_updater_1.GameUpdater;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ComponentTypesInfo = __webpack_require__(3);
	var EntitySignature = __webpack_require__(4);
	var Sig = __webpack_require__(6);
	var aspect_1 = __webpack_require__(7);
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
	        return aspect_1.signatureMatchesAspect(entitySignature, aspect);
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


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	exports.totalComponentTypes = 0;
	exports.typeNameToIndex = {};
	function getNextComponentTypeId() {
	    return exports.totalComponentTypes++;
	}
	exports.getNextComponentTypeId = getNextComponentTypeId;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ComponentTypesInfo = __webpack_require__(3);
	var BitMask = __webpack_require__(5);
	function create() {
	    return BitMask.create(ComponentTypesInfo.totalComponentTypes);
	}
	exports.create = create;
	exports.containsAspect = BitMask.contains;
	function addComponent(signature, componentClass) {
	    BitMask.setBit(signature, ComponentTypesInfo.typeNameToIndex[componentClass.name], true);
	}
	exports.addComponent = addComponent;
	function removeComponent(signature, componentClass) {
	    BitMask.setBit(signature, ComponentTypesInfo.typeNameToIndex[componentClass.name], false);
	}
	exports.removeComponent = removeComponent;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	var WORD_SIZE = 32;
	exports.create = (function () {
	    return function (size) {
	        var mask = Array.apply(null, Array(Math.ceil(size / WORD_SIZE))).map(Number.prototype.valueOf, 0);
	        mask.stringForm = stringify(mask);
	        return mask;
	    };
	})();
	function setBit(mask, index, value) {
	    index |= 0;
	    var word = ~~(index / WORD_SIZE);
	    if (value) {
	        mask[word] |= 1 << (index % WORD_SIZE);
	    }
	    else {
	        mask[word] &= ~(1 << (index % WORD_SIZE));
	    }
	    mask.stringForm = stringify(mask);
	}
	exports.setBit = setBit;
	function getBit(mask, index) {
	    index |= 0;
	    return (mask[~~(index / WORD_SIZE)] >> (index % WORD_SIZE) & 1) === 1;
	}
	exports.getBit = getBit;
	function contains(superset, subset) {
	    var len = superset.length;
	    var wordSize = WORD_SIZE;
	    var j = 0;
	    for (var i = 0; i < len; ++i) {
	        for (j = 0; j < wordSize; ++j) {
	            var bitA = subset[i] >> j & 1;
	            if ((bitA & (superset[i] >> j & 1)) !== bitA) {
	                return false;
	            }
	        }
	    }
	    return true;
	}
	exports.contains = contains;
	function stringify(mask) {
	    return mask.join(',');
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	function detachSubscription() {
	    if (!this.signal) {
	        throw new Error('Unable to unsubscrube: subscription does not belong to any Signal');
	    }
	    this.signal.unlisten(this);
	}
	var Signal = (function () {
	    function Signal() {
	        this.head = null;
	        this.last = null;
	    }
	    Signal.prototype.emit = function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
	        var node = this.head;
	        while (node) {
	            node.callback(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
	            node.times--;
	            if (node.times < 1) {
	                this.unlisten(node);
	            }
	            node = node.next;
	        }
	    };
	    Signal.prototype.listen = function (listener, times) {
	        if (times === void 0) { times = Infinity; }
	        var subscription = {
	            callback: listener,
	            times: times,
	            signal: this,
	            prev: this.last,
	            next: null,
	            detach: detachSubscription
	        };
	        if (!this.head) {
	            this.head = subscription;
	            this.last = subscription;
	        }
	        else {
	            this.last.next = subscription;
	            this.last = subscription;
	        }
	        return subscription;
	    };
	    Signal.prototype.unlisten = function (listener) {
	        if (listener.signal !== this) {
	            throw new Error('Cannot unsubscribe listener: listener does not belong to this Signal');
	        }
	        if (listener.prev)
	            listener.prev.next = listener.next;
	        if (listener.next)
	            listener.next.prev = listener.prev;
	        if (listener === this.head) {
	            this.head = listener.next;
	            if (this.head === null)
	                this.last = null;
	        }
	        else if (listener === this.last) {
	            this.last = listener.prev;
	            this.last.next = null;
	        }
	    };
	    Signal.prototype.unlistenHandler = function (handler) {
	        var node = this.head;
	        while (node) {
	            if (node.callback === handler)
	                this.unlisten(node);
	            node = node.next;
	        }
	    };
	    Signal.prototype.unlistenAll = function () {
	        var node = this.head;
	        if (!node)
	            return;
	        while (node) {
	            node.signal = null;
	            node = node.next;
	        }
	        this.head = this.last = null;
	    };
	    return Signal;
	}());
	exports.Signal = Signal;
	var x = new Signal();
	x.emit(2, 'foo');
	x.listen(function (foo, bar) {
	    console.log();
	});


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ComponentTypesInfo = __webpack_require__(3);
	var BitMask = __webpack_require__(5);
	function all(componentClasses) {
	    var aspect = BitMask.create(ComponentTypesInfo.totalComponentTypes);
	    for (var _i = 0, componentClasses_1 = componentClasses; _i < componentClasses_1.length; _i++) {
	        var componentClass = componentClasses_1[_i];
	        BitMask.setBit(aspect, ComponentTypesInfo.typeNameToIndex[componentClass.name], true);
	    }
	    return aspect;
	}
	exports.all = all;
	function signatureMatchesAspect(signature, aspect) {
	    return BitMask.contains(signature, aspect);
	}
	exports.signatureMatchesAspect = signatureMatchesAspect;


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	function drawEllipse(context, centerX, centerY, radiusX, radiusY) {
	    context.save();
	    context.beginPath();
	    context.translate(centerX - radiusX, centerY - radiusY);
	    context.scale(radiusX, radiusY);
	    context.arc(1, 1, 1, 0, 2 * Math.PI, false);
	    context.restore();
	    context.stroke();
	}
	exports.drawEllipse = drawEllipse;
	function parseFunctionName(f) {
	    var parsed = /^function\s+([\w\$]+)\s*\(/.exec(f.toString());
	    if (!parsed)
	        return null;
	    if (parsed.length < 2)
	        return null;
	    return parsed[1];
	}
	exports.parseFunctionName = parseFunctionName;
	exports.global = (function () {
	    var global;
	    try {
	        global = Function('return this')() || (42, eval)('this');
	    }
	    catch (e) {
	        global = window;
	    }
	    return global;
	})();
	exports.now = Date.now ? Date.now : (function () { return +new Date(); });
	exports.requestAnimationFrame = function (cb) {
	    throw new Error('util.requestAnimationFrame not assigned');
	};
	exports.cancelAnimationFrame = function (frameId) {
	    throw new Error('util.cancelAnimationFrame not assigned');
	};
	(function () {
	    for (var _i = 0, _a = ['webkit', 'moz']; _i < _a.length; _i++) {
	        var vendor = _a[_i];
	        exports.requestAnimationFrame = exports.global[vendor + 'RequestAnimationFrame'];
	        exports.cancelAnimationFrame = (exports.global[vendor + 'CancelAnimationFrame']
	            || exports.global[vendor + 'CancelRequestAnimationFrame']);
	        if (exports.requestAnimationFrame) {
	            if (exports.cancelAnimationFrame) {
	                exports.requestAnimationFrame = exports.requestAnimationFrame.bind(exports.global);
	                exports.cancelAnimationFrame = exports.cancelAnimationFrame.bind(exports.global);
	            }
	            break;
	        }
	    }
	    if (/iP(ad|hone|od).*OS 6/.test(exports.global.navigator.userAgent)
	        || !exports.requestAnimationFrame || !exports.cancelAnimationFrame) {
	        var lastTime = 0;
	        var setTimeout = exports.global.setTimeout.bind(exports.global);
	        var clearTimeout = exports.global.clearTimeout.bind(exports.global);
	        exports.requestAnimationFrame = function (cb) {
	            var currentTime = exports.now();
	            var nextTime = Math.max(lastTime + 16, currentTime);
	            return setTimeout(function () {
	                lastTime = nextTime;
	                cb(lastTime);
	            }, nextTime - currentTime);
	        };
	        exports.cancelAnimationFrame = clearTimeout;
	    }
	})();


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Sig = __webpack_require__(6);
	var Util = __webpack_require__(8);
	var GameUpdater = (function () {
	    function GameUpdater(fps, maxTimePerFrame) {
	        if (fps === void 0) { fps = 60; }
	        if (maxTimePerFrame === void 0) { maxTimePerFrame = 0.2; }
	        this.lastTime = null;
	        this.accumulator = 0;
	        this.isRunning = false;
	        this.requestedFrameId = null;
	        this.signals = {
	            updateStarted: new Sig.Signal(),
	            updateEnded: new Sig.Signal(),
	            fixedUpdateStarted: new Sig.Signal(),
	            lagDetected: new Sig.Signal()
	        };
	        this.fps = fps;
	        this.timePerFrame = 1 / this.fps;
	        this.maxTimePerFrame = maxTimePerFrame;
	        this.run = this.run.bind(this);
	    }
	    GameUpdater.prototype.update = function (sessionTime) {
	        if (this.lastTime == null) {
	            this.lastTime = sessionTime;
	        }
	        var delta = sessionTime - this.lastTime;
	        if (delta > this.maxTimePerFrame) {
	            this.signals.lagDetected.emit(delta);
	            delta = this.maxTimePerFrame;
	        }
	        this.lastTime = sessionTime;
	        this.accumulator += delta;
	        this.signals.updateStarted.emit(delta);
	        while (this.accumulator >= this.timePerFrame) {
	            this.signals.fixedUpdateStarted.emit(this.timePerFrame);
	            this.accumulator -= this.timePerFrame;
	        }
	        var alpha = this.accumulator / this.timePerFrame;
	        this.signals.updateEnded.emit(delta, alpha);
	    };
	    GameUpdater.prototype.run = function (sessionTime) {
	        if (!this.isRunning) {
	            throw new Error('Invalid call to GameUpdater#run! GameUpdater is not running.');
	        }
	        this.update(sessionTime);
	        this.requestedFrameId = Util.requestAnimationFrame(this.run);
	    };
	    GameUpdater.prototype.start = function () {
	        if (this.isRunning)
	            return;
	        this.isRunning = true;
	        this.requestedFrameId = Util.requestAnimationFrame(this.run);
	    };
	    GameUpdater.prototype.stop = function () {
	        this.isRunning = false;
	        Util.cancelAnimationFrame(this.requestedFrameId);
	    };
	    return GameUpdater;
	}());
	exports.GameUpdater = GameUpdater;


/***/ }
/******/ ])
});
;