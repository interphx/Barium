/******/ (function(modules) { // webpackBootstrap
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
	var testSignal = __webpack_require__(2);
	var testBitMask = __webpack_require__(12);
	var testAspect = __webpack_require__(13);
	var testEntityManager = __webpack_require__(15);
	var testGameUpdater = __webpack_require__(16);
	testSignal.test();
	testBitMask.test();
	testAspect.test();
	testEntityManager.test();
	testGameUpdater.test();


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var barium_1 = __webpack_require__(3);
	function test() {
	    describe('Signal', function () {
	        it('should be created', function () {
	            var sig0 = new barium_1.Signal.Signal();
	            var sig1 = new barium_1.Signal.Signal();
	            expect(sig0).toBeDefined();
	            expect(sig1).toBeDefined();
	        });
	        it('should accept listeners', function () {
	            var sig = new barium_1.Signal.Signal();
	            var a = sig.listen(function (n, s, b) { return; });
	            var b = sig.listen(function () { return; });
	            var c = sig.listen(function (n) { return; });
	            expect(a).toBeDefined();
	            expect(b).toBeDefined();
	            expect(c).toBeDefined();
	        });
	        it('should call listeners', function () {
	            var spyAll = jasmine.createSpy('spy for all');
	            var spySecond = jasmine.createSpy('spy for second method');
	            var sig0 = new barium_1.Signal.Signal();
	            var sig1 = new barium_1.Signal.Signal();
	            var sig2 = new barium_1.Signal.Signal();
	            sig0.listen(spyAll);
	            sig1.listen(spyAll);
	            sig1.listen(spySecond);
	            sig2.listen(spyAll);
	            sig0.emit(42, 'foo', true);
	            sig1.emit();
	            sig2.emit(42);
	            expect(spyAll).toHaveBeenCalledTimes(3);
	            expect(spySecond).toHaveBeenCalledTimes(1);
	        });
	        it('should unlisten', function () {
	            var spy = jasmine.createSpy('spy signal');
	            var sig0 = new barium_1.Signal.Signal();
	            var subscription = sig0.listen(spy);
	            sig0.unlisten(subscription);
	            sig0.emit();
	            sig0.emit();
	            sig0.emit();
	            expect(spy).not.toHaveBeenCalled();
	        });
	        it('subscriptions should be detachable', function () {
	            var spy = jasmine.createSpy('spy signal');
	            var sig0 = new barium_1.Signal.Signal();
	            var subscription = sig0.listen(spy);
	            subscription.detach();
	            sig0.emit();
	            sig0.emit();
	            sig0.emit();
	            expect(spy).not.toHaveBeenCalled();
	        });
	    });
	}
	exports.test = test;
	;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var entity_1 = __webpack_require__(4);
	exports.EntityManager = entity_1.EntityManager;
	exports.Entity = entity_1.Entity;
	var Signal = __webpack_require__(8);
	exports.Signal = Signal;
	var Util = __webpack_require__(10);
	exports.Util = Util;
	var game_updater_1 = __webpack_require__(11);
	exports.GameUpdater = game_updater_1.GameUpdater;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ComponentTypesInfo = __webpack_require__(5);
	var EntitySignature = __webpack_require__(6);
	var Sig = __webpack_require__(8);
	var aspect_1 = __webpack_require__(9);
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
/* 5 */
/***/ function(module, exports) {

	"use strict";
	exports.totalComponentTypes = 0;
	exports.typeNameToIndex = {};
	function getNextComponentTypeId() {
	    return exports.totalComponentTypes++;
	}
	exports.getNextComponentTypeId = getNextComponentTypeId;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ComponentTypesInfo = __webpack_require__(5);
	var BitMask = __webpack_require__(7);
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
/* 7 */
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
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ComponentTypesInfo = __webpack_require__(5);
	var BitMask = __webpack_require__(7);
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
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Sig = __webpack_require__(8);
	var Util = __webpack_require__(10);
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


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var BitMask = __webpack_require__(7);
	function test() {
	    describe('BitMask', function () {
	        it('should be created', function () {
	            var bm = BitMask.create(300);
	            expect(bm).toBeDefined();
	        });
	        it('should set bits', function () {
	            var bm = BitMask.create(300);
	            expect(function () {
	                BitMask.setBit(bm, 0, true);
	                BitMask.setBit(bm, 31, true);
	                BitMask.setBit(bm, 50, true);
	                BitMask.setBit(bm, 90, true);
	                BitMask.setBit(bm, 299, true);
	            }).not.toThrow();
	        });
	        it('should get bits', function () {
	            var bm = BitMask.create(300);
	            BitMask.setBit(bm, 0, true);
	            BitMask.setBit(bm, 31, true);
	            BitMask.setBit(bm, 90, true);
	            BitMask.setBit(bm, 299, true);
	            expect(BitMask.getBit(bm, 0)).toBeTruthy();
	            expect(BitMask.getBit(bm, 1)).toBeFalsy();
	            expect(BitMask.getBit(bm, 30)).toBeFalsy();
	            expect(BitMask.getBit(bm, 31)).toBeTruthy();
	            expect(BitMask.getBit(bm, 32)).toBeFalsy();
	            expect(BitMask.getBit(bm, 90)).toBeTruthy();
	            expect(BitMask.getBit(bm, 298)).toBeFalsy();
	            expect(BitMask.getBit(bm, 299)).toBeTruthy();
	        });
	        it('should check if one mask is a superset of the other', function () {
	            var superset = BitMask.create(300);
	            BitMask.setBit(superset, 0, true);
	            BitMask.setBit(superset, 5, true);
	            BitMask.setBit(superset, 100, true);
	            BitMask.setBit(superset, 150, true);
	            BitMask.setBit(superset, 200, true);
	            BitMask.setBit(superset, 250, true);
	            var bm = BitMask.create(300);
	            BitMask.setBit(bm, 0, true);
	            BitMask.setBit(bm, 100, true);
	            BitMask.setBit(bm, 200, true);
	            console.log('Contains ', superset, bm);
	            expect(BitMask.contains(superset, bm)).toBeTruthy();
	        });
	    });
	}
	exports.test = test;
	;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var Aspect = __webpack_require__(9);
	var EntitySignature = __webpack_require__(6);
	var component_1 = __webpack_require__(14);
	var TestComp0 = (function () {
	    function TestComp0() {
	    }
	    TestComp0 = __decorate([
	        component_1.ComponentClass, 
	        __metadata('design:paramtypes', [])
	    ], TestComp0);
	    return TestComp0;
	}());
	var TestComp1 = (function () {
	    function TestComp1() {
	    }
	    TestComp1 = __decorate([
	        component_1.ComponentClass, 
	        __metadata('design:paramtypes', [])
	    ], TestComp1);
	    return TestComp1;
	}());
	var TestComp2 = (function () {
	    function TestComp2() {
	    }
	    TestComp2 = __decorate([
	        component_1.ComponentClass, 
	        __metadata('design:paramtypes', [])
	    ], TestComp2);
	    return TestComp2;
	}());
	function test() {
	    describe('Aspect', function () {
	        it('should be created', function () {
	            var asp = Aspect.all([TestComp0, TestComp1, TestComp2]);
	            expect(asp).toBeDefined();
	        });
	        describe('should match signatures correcrtly', function () {
	            var asp0 = Aspect.all([TestComp0, TestComp1, TestComp2]);
	            var asp1 = Aspect.all([TestComp0]);
	            var asp2 = Aspect.all([TestComp1, TestComp2]);
	            var signature0 = EntitySignature.create();
	            EntitySignature.addComponent(signature0, TestComp0);
	            EntitySignature.addComponent(signature0, TestComp1);
	            EntitySignature.addComponent(signature0, TestComp2);
	            var signature1 = EntitySignature.create();
	            EntitySignature.addComponent(signature1, TestComp0);
	            var signature2 = EntitySignature.create();
	            EntitySignature.addComponent(signature2, TestComp1);
	            EntitySignature.addComponent(signature2, TestComp2);
	            it('should handle exact matches', function () {
	                console.log(signature0, asp0);
	                expect(Aspect.signatureMatchesAspect(signature0, asp0)).toBeTruthy();
	                expect(Aspect.signatureMatchesAspect(signature1, asp1)).toBeTruthy();
	                expect(Aspect.signatureMatchesAspect(signature2, asp2)).toBeTruthy();
	            });
	            it('should handle superset matches', function () {
	                expect(Aspect.signatureMatchesAspect(signature0, asp0)).toBeTruthy();
	                expect(Aspect.signatureMatchesAspect(signature0, asp1)).toBeTruthy();
	                expect(Aspect.signatureMatchesAspect(signature0, asp2)).toBeTruthy();
	            });
	            it('should handle falsy matches', function () {
	                expect(Aspect.signatureMatchesAspect(signature1, asp0)).toBeFalsy();
	                expect(Aspect.signatureMatchesAspect(signature2, asp0)).toBeFalsy();
	            });
	            it('should handle falsy matches for removed components', function () {
	                EntitySignature.removeComponent(signature0, TestComp0);
	                expect(Aspect.signatureMatchesAspect(signature0, asp0)).toBeFalsy();
	            });
	        });
	    });
	}
	exports.test = test;
	;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ComponentTypesInfo = __webpack_require__(5);
	var Util = __webpack_require__(10);
	;
	function ComponentClass(target) {
	    if (!('name' in target)) {
	        var parsedName = Util.parseFunctionName(target);
	        if (typeof parsedName !== 'string' || parsedName.trim() === '') {
	            throw new Error("Unable to parse component class name; please specify\n        static \"name\" property or use non-anonymous function");
	        }
	        else {
	            console.log("Name for component class " + parsedName + " was parsed from\n        function definition");
	        }
	        target['name'] = parsedName;
	    }
	    var index = ComponentTypesInfo.getNextComponentTypeId();
	    var name = target['name'];
	    ComponentTypesInfo.typeNameToIndex[name] = index;
	    return target;
	}
	exports.ComponentClass = ComponentClass;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var entity_1 = __webpack_require__(4);
	var component_1 = __webpack_require__(14);
	var Aspect = __webpack_require__(9);
	var TestComponent = (function () {
	    function TestComponent(foo) {
	        this.foo = foo;
	    }
	    TestComponent = __decorate([
	        component_1.ComponentClass, 
	        __metadata('design:paramtypes', [String])
	    ], TestComponent);
	    return TestComponent;
	}());
	;
	var TestFlagComponent0 = (function () {
	    function TestFlagComponent0() {
	    }
	    TestFlagComponent0 = __decorate([
	        component_1.ComponentClass, 
	        __metadata('design:paramtypes', [])
	    ], TestFlagComponent0);
	    return TestFlagComponent0;
	}());
	;
	var TestFlagComponent1 = (function () {
	    function TestFlagComponent1() {
	    }
	    TestFlagComponent1 = __decorate([
	        component_1.ComponentClass, 
	        __metadata('design:paramtypes', [])
	    ], TestFlagComponent1);
	    return TestFlagComponent1;
	}());
	;
	function test() {
	    describe('EntityManager', function () {
	        it('should be created', function () {
	            var em = new entity_1.EntityManager();
	            expect(em).toBeDefined();
	        });
	        it('should create entities', function () {
	            var em = new entity_1.EntityManager();
	            var id_a = em.create();
	            var id_b = em.create();
	            var ent_c = em.createEntity();
	            expect(id_a).toBeDefined();
	            expect(id_b).toBeDefined();
	            expect(ent_c).toBeDefined();
	        });
	        it('should consider created entities valid', function () {
	            var em = new entity_1.EntityManager();
	            var id = em.create();
	            expect(em.isValidId(id)).toBeTruthy();
	        });
	        it('should remove entities', function () {
	            var em = new entity_1.EntityManager();
	            var id_a = em.create();
	            var id_b = em.create();
	            var ent_c = em.createEntity();
	            em.remove(id_a);
	            em.remove(id_b);
	            em.removeEntity(ent_c);
	            expect(em.isValidId(id_a)).toBeFalsy();
	            expect(em.isValidId(id_b)).toBeFalsy();
	            expect(em.isValidId(ent_c.id)).toBeFalsy();
	        });
	        it('should add components to entity', function () {
	            var em = new entity_1.EntityManager();
	            var id0 = em.create(), id1 = em.create();
	            expect(function () {
	                em.addComponent(id0, new TestComponent('foo'));
	                em.addComponent(id1, new TestComponent('bar'));
	            }).not.toThrow();
	            var comp0 = em.getComponent(id0, TestComponent);
	            var comp1 = em.getComponent(id1, TestComponent);
	            expect(comp0 ? comp0.foo : null).toEqual('foo');
	            expect(comp1 ? comp1.foo : null).toEqual('bar');
	        });
	        it('should remove components from entity', function () {
	            var em = new entity_1.EntityManager();
	            var id0 = em.create(), id1 = em.create();
	            em.addComponent(id0, new TestComponent('foo'));
	            em.addComponent(id1, new TestComponent('bar'));
	            expect(em.hasComponent(id0, TestComponent)).toBeTruthy();
	            expect(em.hasComponent(id1, TestComponent)).toBeTruthy();
	            em.removeComponent(id0, TestComponent);
	            em.removeComponent(id1, TestComponent);
	            expect(em.hasComponent(id0, TestComponent)).toBeFalsy();
	            expect(em.hasComponent(id1, TestComponent)).toBeFalsy();
	        });
	        it('should check if entity has component', function () {
	            var em = new entity_1.EntityManager();
	            var id0 = em.create(), id1 = em.create();
	            em.addComponent(id0, new TestComponent('foo'));
	            em.addComponent(id1, new TestComponent('bar'));
	            expect(em.hasComponent(id0, TestComponent)).toBeTruthy();
	            expect(em.hasComponent(id1, TestComponent)).toBeTruthy();
	        });
	        it('should add aspects', function () {
	            var em = new entity_1.EntityManager();
	            var id0 = em.create(), id1 = em.create();
	            expect(function () {
	                em.addAspect(Aspect.all([TestComponent]));
	            }).not.toThrow();
	        });
	        it('should remove aspects', function () {
	            var em = new entity_1.EntityManager();
	            var aspect = Aspect.all([TestComponent, TestFlagComponent0]);
	            em.addAspect(aspect);
	            expect(em.removeAspect(aspect)).toBeTruthy();
	        });
	        it('should return list of entities matching aspect', function () {
	            var em = new entity_1.EntityManager();
	            var aspect0 = Aspect.all([TestComponent, TestFlagComponent0]);
	            var aspect1 = Aspect.all([TestComponent, TestFlagComponent1]);
	            em.addAspect(aspect0);
	            em.addAspect(aspect1);
	            var id0 = em.create(), id1 = em.create();
	            em.addComponent(id0, new TestComponent('foo'));
	            em.addComponent(id0, new TestFlagComponent0());
	            em.addComponent(id1, new TestComponent('bar'));
	            em.addComponent(id1, new TestFlagComponent1());
	            expect(em.getEntitiesByAspect(aspect0)).toEqual([id0]);
	            expect(em.getEntitiesByAspect(aspect1)).toEqual([id1]);
	            em.removeComponent(id1, TestComponent);
	            expect(em.getEntitiesByAspect(aspect0)).toEqual([id0]);
	            expect(em.getEntitiesByAspect(aspect1)).toEqual([]);
	        });
	    });
	}
	exports.test = test;
	;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var game_updater_1 = __webpack_require__(11);
	function test() {
	    describe('GameUpdater', function () {
	        it('should be created', function () {
	            var gu = new game_updater_1.GameUpdater();
	            expect(gu).toBeDefined();
	        });
	        it('should start and stop', function (done) {
	            var gu = new game_updater_1.GameUpdater();
	            var spy = jasmine.createSpy('should not be called after GameUpdater#stop');
	            gu.start();
	            setTimeout(function () {
	                gu.stop();
	                gu.signals.updateStarted.listen(spy);
	                setTimeout(function () {
	                    expect(spy).not.toHaveBeenCalled();
	                    done();
	                }, 500);
	            }, 500);
	        });
	        it('should call updateStarted', function (done) {
	            var gu = new game_updater_1.GameUpdater();
	            var spy = jasmine.createSpy('updateStarted');
	            gu.signals.updateStarted.listen(spy);
	            gu.start();
	            setTimeout(function () {
	                expect(spy).toHaveBeenCalled();
	                gu.stop();
	                done();
	            }, 500);
	        });
	        it('should call updateEnded', function (done) {
	            var gu = new game_updater_1.GameUpdater();
	            var spy = jasmine.createSpy('updateEnded');
	            gu.signals.updateEnded.listen(spy);
	            gu.start();
	            setTimeout(function () {
	                expect(spy).toHaveBeenCalled();
	                gu.stop();
	                done();
	            }, 500);
	        });
	        it('should call fixedUpdateStarted', function (done) {
	            var gu = new game_updater_1.GameUpdater();
	            var spy = jasmine.createSpy('fixedUpdateStarted');
	            gu.signals.fixedUpdateStarted.listen(spy);
	            gu.start();
	            setTimeout(function () {
	                expect(spy).toHaveBeenCalled();
	                gu.stop();
	                done();
	            }, 500);
	        });
	    });
	}
	exports.test = test;
	;


/***/ }
/******/ ]);