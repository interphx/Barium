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
	var test_signal_1 = __webpack_require__(2);
	var test_bitmask_1 = __webpack_require__(19);
	var test_aspect_1 = __webpack_require__(20);
	var test_entity_manager_1 = __webpack_require__(21);
	var test_game_updater_1 = __webpack_require__(22);
	test_signal_1.testSignal();
	test_bitmask_1.testBitMask();
	test_aspect_1.testAspect();
	test_entity_manager_1.testEntityManager();
	test_game_updater_1.testGameUpdater();


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var barium_1 = __webpack_require__(3);
	function testSignal() {
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
	exports.testSignal = testSignal;
	;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var barium_entity_1 = __webpack_require__(4);
	exports.EntityManager = barium_entity_1.EntityManager;
	exports.Entity = barium_entity_1.Entity;
	var Signal = __webpack_require__(8);
	exports.Signal = Signal;
	var Util = __webpack_require__(10);
	exports.Util = Util;
	var Decorators = __webpack_require__(11);
	exports.Decorators = Decorators;
	var SimpleShapeComponent = __webpack_require__(12);
	var Transform2dComponent = __webpack_require__(14);
	var Collider2dComponent = __webpack_require__(15);
	var RigidBody2dComponent = __webpack_require__(16);
	var Components;
	(function (Components) {
	    Components.SimpleShape = SimpleShapeComponent.SimpleShape;
	    Components.Transform2d = Transform2dComponent.Transform2d;
	    Components.Collider2d = Collider2dComponent.Collider2d;
	    Components.RigidBody2d = RigidBody2dComponent.RigidBody2d;
	})(Components || (Components = {}));
	exports.Components = Components;
	;
	var Render2dPixiSystem = __webpack_require__(17);
	var Physics2dP2System = __webpack_require__(18);
	var Systems;
	(function (Systems) {
	    Systems.Renderer2dPixi = Render2dPixiSystem.Renderer2dPixi;
	    Systems.Physics2dP2 = Physics2dP2System.Physics2dP2;
	})(Systems || (Systems = {}));
	exports.Systems = Systems;
	;
	var ShapeModule = __webpack_require__(13);
	var Geometry;
	(function (Geometry) {
	    var Shape;
	    (function (Shape) {
	        Shape.Circle = ShapeModule.Circle;
	        Shape.Polygon = ShapeModule.Polygon;
	        Shape.Capsule = ShapeModule.Capsule;
	    })(Shape = Geometry.Shape || (Geometry.Shape = {}));
	})(Geometry || (Geometry = {}));
	exports.Geometry = Geometry;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ComponentTypesInfo = __webpack_require__(5);
	var EntitySignature = __webpack_require__(6);
	var Sig = __webpack_require__(8);
	var barium_aspect_1 = __webpack_require__(9);
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
	        return this.componentMapping[componentClass.name][entityId.index] || null;
	    };
	    EntityManager.prototype.getComponentUnsafe = function (entityId, componentClass) {
	        return this.componentMapping[componentClass.name][entityId.index];
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
	var ComponentTypesInfo = __webpack_require__(5);
	var Util = __webpack_require__(10);
	function ComponentClass(target) {
	    if (!('name' in target)) {
	        target['name'] = Util.parseFunctionName(target);
	    }
	    var index = ComponentTypesInfo.getNextComponentTypeId();
	    var name = target['name'];
	    ComponentTypesInfo.typeNameToIndex[name] = index;
	    return target;
	}
	exports.ComponentClass = ComponentClass;


/***/ },
/* 12 */
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
	var barium_decorators_1 = __webpack_require__(11);
	var shape_1 = __webpack_require__(13);
	var SimpleShape = (function () {
	    function SimpleShape(shapeData, fillColor, strokeColor, strokeWidth) {
	        if (fillColor === void 0) { fillColor = 0xFFFFFF; }
	        if (strokeColor === void 0) { strokeColor = 0x000000; }
	        if (strokeWidth === void 0) { strokeWidth = 2; }
	        this._valid = false;
	        this.shape = shapeData;
	        this.fillColor = fillColor;
	        this.strokeColor = strokeColor;
	        this.strokeWidth = strokeWidth;
	        this.invalidate();
	    }
	    SimpleShape.prototype.isValid = function () {
	        return this._valid;
	    };
	    SimpleShape.prototype.invalidate = function () {
	        this._valid = false;
	    };
	    SimpleShape = __decorate([
	        barium_decorators_1.ComponentClass, 
	        __metadata('design:paramtypes', [shape_1.Shape, Object, Object, Object])
	    ], SimpleShape);
	    return SimpleShape;
	}());
	exports.SimpleShape = SimpleShape;


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	(function (ShapeType) {
	    ShapeType[ShapeType["Polygon"] = 1] = "Polygon";
	    ShapeType[ShapeType["Circle"] = 2] = "Circle";
	    ShapeType[ShapeType["Capsule"] = 3] = "Capsule";
	    ShapeType[ShapeType["Ellipse"] = 4] = "Ellipse";
	})(exports.ShapeType || (exports.ShapeType = {}));
	var ShapeType = exports.ShapeType;
	var Shape = (function () {
	    function Shape(angle, position) {
	        if (angle === void 0) { angle = 0; }
	        if (position === void 0) { position = [0, 0]; }
	        this.angle = angle;
	        this.position = position.slice(0);
	    }
	    return Shape;
	}());
	exports.Shape = Shape;
	Shape.prototype.angle = 0;
	Shape.prototype.position = [0, 0];
	var Polygon = (function (_super) {
	    __extends(Polygon, _super);
	    function Polygon(_a) {
	        var points = _a.points, _b = _a.angle, angle = _b === void 0 ? 0 : _b, _c = _a.position, position = _c === void 0 ? [0, 0] : _c;
	        _super.call(this, angle, position);
	        this.points = points.slice(0);
	    }
	    Polygon.prototype.clone = function () {
	        return new Polygon({ points: this.points, angle: this.angle, position: this.position });
	    };
	    return Polygon;
	}(Shape));
	exports.Polygon = Polygon;
	Polygon.prototype.points = null;
	Polygon.prototype.type = ShapeType.Polygon;
	var Circle = (function (_super) {
	    __extends(Circle, _super);
	    function Circle(_a) {
	        var radius = _a.radius, _b = _a.angle, angle = _b === void 0 ? 0 : _b, _c = _a.position, position = _c === void 0 ? [0, 0] : _c;
	        _super.call(this, angle, position);
	        this.type = ShapeType.Circle;
	        this.radius = radius;
	    }
	    Circle.prototype.clone = function () {
	        return new Circle({ radius: this.radius, angle: this.angle, position: this.position });
	    };
	    return Circle;
	}(Shape));
	exports.Circle = Circle;
	Circle.prototype.type = ShapeType.Circle;
	Circle.prototype.radius = 1;
	var Capsule = (function (_super) {
	    __extends(Capsule, _super);
	    function Capsule(_a) {
	        var length = _a.length, radius = _a.radius, _b = _a.angle, angle = _b === void 0 ? 0 : _b, _c = _a.position, position = _c === void 0 ? [0, 0] : _c;
	        _super.call(this, angle, position);
	        this.length = length;
	        this.radius = radius;
	    }
	    Capsule.prototype.clone = function () {
	        return new Capsule({
	            length: this.length,
	            radius: this.radius,
	            angle: this.angle,
	            position: this.position
	        });
	    };
	    return Capsule;
	}(Shape));
	exports.Capsule = Capsule;
	Capsule.prototype.type = ShapeType.Capsule;
	Capsule.prototype.length = 4;
	Capsule.prototype.radius = 1;


/***/ },
/* 14 */
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
	var barium_decorators_1 = __webpack_require__(11);
	var Transform2d = (function () {
	    function Transform2d(x, y, z, rotation, scaleX, scaleY) {
	        if (x === void 0) { x = 0; }
	        if (y === void 0) { y = 0; }
	        if (z === void 0) { z = 0; }
	        if (rotation === void 0) { rotation = 0; }
	        if (scaleX === void 0) { scaleX = 1; }
	        if (scaleY === void 0) { scaleY = 1; }
	        this.x = x;
	        this.y = y;
	        this.z = z;
	        this.rotation = rotation;
	        this.scaleX = scaleX;
	        this.scaleY = scaleY;
	    }
	    Transform2d = __decorate([
	        barium_decorators_1.ComponentClass, 
	        __metadata('design:paramtypes', [Number, Number, Number, Number, Number, Number])
	    ], Transform2d);
	    return Transform2d;
	}());
	exports.Transform2d = Transform2d;


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
	var barium_decorators_1 = __webpack_require__(11);
	var Collider2d = (function () {
	    function Collider2d(_a) {
	        var shapes = _a.shapes;
	        this.shapes = shapes.slice(0);
	    }
	    Collider2d = __decorate([
	        barium_decorators_1.ComponentClass, 
	        __metadata('design:paramtypes', [Object])
	    ], Collider2d);
	    return Collider2d;
	}());
	exports.Collider2d = Collider2d;


/***/ },
/* 16 */
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
	var barium_decorators_1 = __webpack_require__(11);
	var RigidBody2d = (function () {
	    function RigidBody2d(_a) {
	        var _b = _a.mass, mass = _b === void 0 ? 1 : _b, _c = _a.fixedRotation, fixedRotation = _c === void 0 ? false : _c, _d = _a.allowSleep, allowSleep = _d === void 0 ? true : _d, _e = _a.collisionResponse, collisionResponse = _e === void 0 ? true : _e;
	        this.mass = mass;
	        this.fixedRotation = fixedRotation;
	        this.allowSleep = allowSleep;
	        this.collisionResponse = collisionResponse;
	        this.invalidate();
	    }
	    RigidBody2d.prototype.isValid = function () {
	        return this._valid;
	    };
	    RigidBody2d.prototype.invalidate = function () {
	        this._valid = false;
	    };
	    RigidBody2d = __decorate([
	        barium_decorators_1.ComponentClass, 
	        __metadata('design:paramtypes', [Object])
	    ], RigidBody2d);
	    return RigidBody2d;
	}());
	exports.RigidBody2d = RigidBody2d;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Aspect = __webpack_require__(9);
	var simple_shape_1 = __webpack_require__(12);
	var transform2d_1 = __webpack_require__(14);
	var shape_1 = __webpack_require__(13);
	var Renderer2dPixi = (function () {
	    function Renderer2dPixi(entityManager, _a) {
	        var _b = _a === void 0 ? {} : _a, _c = _b.meterToPixel, meterToPixel = _c === void 0 ? 10 : _c, _d = _b.yAxis, yAxis = _d === void 0 ? -1 : _d, _e = _b.xAxis, xAxis = _e === void 0 ? 1 : _e, _f = _b.width, width = _f === void 0 ? 800 : _f, _g = _b.height, height = _g === void 0 ? 600 : _g, _h = _b.backgroundColor, backgroundColor = _h === void 0 ? 0x000000 : _h;
	        this.renderableAspect = Aspect.all([simple_shape_1.SimpleShape, transform2d_1.Transform2d]);
	        this.entityManager = entityManager;
	        this.entityManager.addAspect(this.renderableAspect);
	        this.width = width;
	        this.height = height;
	        this.meterToPixel = meterToPixel;
	        this.xAxis = xAxis;
	        this.yAxis = yAxis;
	        this.renderer = PIXI.autoDetectRenderer(width, height, { backgroundColor: backgroundColor });
	        this.stage = new PIXI.Container();
	        this.stage.position.x = (width / 2);
	        this.stage.position.y = (height / 2);
	        this.stage.scale.x = 1 / (this.meterToPixel);
	        this.stage.scale.y = 1 / (this.meterToPixel);
	    }
	    Renderer2dPixi.prototype.setStagePos = function (x, y) {
	        this.stage.position.x = (this.width / 2);
	        this.stage.position.y = (this.height / 2);
	    };
	    Renderer2dPixi.prototype.getView = function () {
	        return this.renderer.view;
	    };
	    Renderer2dPixi.prototype.copyTransform2d = function (transform, target) {
	    };
	    Renderer2dPixi.prototype.validateSimpleShape = function (shape, transform) {
	        if (!shape._graphics) {
	            shape._graphics = new PIXI.Graphics();
	        }
	        var graphics = shape._graphics;
	        var shapeData = shape.shape;
	        var xAxis = this.xAxis;
	        var yAxis = this.yAxis;
	        var meterToPixel = this.meterToPixel;
	        graphics.lineColor = shape.strokeColor;
	        graphics.lineWidth = shape.strokeWidth;
	        switch (shapeData.type) {
	            case shape_1.ShapeType.Circle:
	                var radius = shapeData.radius;
	                graphics.beginFill(shape.fillColor);
	                graphics.drawEllipse(shapeData.position[0] * xAxis * meterToPixel, shapeData.position[1] * yAxis * meterToPixel, radius * meterToPixel, radius * meterToPixel);
	                graphics.endFill();
	                break;
	            case shape_1.ShapeType.Polygon:
	                graphics.beginFill(shape.fillColor);
	                var points = shapeData.points.slice(0);
	                for (var i = 0, len = points.length; i < len; ++i) {
	                    if (i % 2 === 0) {
	                        points[i] *= meterToPixel * xAxis;
	                    }
	                    else {
	                        points[i] *= meterToPixel * yAxis;
	                    }
	                }
	                graphics.drawPolygon(points);
	                graphics.endFill();
	                break;
	            default:
	                throw new Error('Not implemented');
	        }
	        shape._valid = true;
	    };
	    Renderer2dPixi.prototype.tryValidateSimpleShape = function (component, transform) {
	        var result = false;
	        if (!component.isValid()) {
	            this.validateSimpleShape(component, transform);
	            result = true;
	        }
	        if (!component._graphics.parent) {
	            this.stage.addChild(component._graphics);
	            result = true;
	        }
	        return result;
	    };
	    Renderer2dPixi.prototype.update = function (dt) {
	        var entityManager = this.entityManager;
	        var renderables = this.entityManager.getEntitiesByAspect(this.renderableAspect);
	        for (var i = 0, len = renderables.length; i < len; ++i) {
	            var renderable = renderables[i];
	            var shape = entityManager.getComponentUnsafe(renderable, simple_shape_1.SimpleShape);
	            var transform = entityManager.getComponentUnsafe(renderable, transform2d_1.Transform2d);
	            if (!this.tryValidateSimpleShape(shape, transform)) {
	                this.copyTransform2d(transform, shape._graphics);
	            }
	            console.log(shape._graphics);
	        }
	        this.renderer.render(this.stage);
	    };
	    return Renderer2dPixi;
	}());
	exports.Renderer2dPixi = Renderer2dPixi;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Aspect = __webpack_require__(9);
	var transform2d_1 = __webpack_require__(14);
	var rigidbody2d_1 = __webpack_require__(16);
	var collider2d_1 = __webpack_require__(15);
	var shape_1 = __webpack_require__(13);
	var p2 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"p2\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var Physics2dP2 = (function () {
	    function Physics2dP2(entityManager, _a) {
	        var _b = _a.gravity, gravity = _b === void 0 ? [0, -9.8] : _b;
	        this.bodyAspect = Aspect.all([transform2d_1.Transform2d, rigidbody2d_1.RigidBody2d, collider2d_1.Collider2d]);
	        this.entityManager = entityManager;
	        this.world = new p2.World({ gravity: gravity });
	    }
	    Physics2dP2.prototype.toP2Shape = function (shape) {
	        var params = {
	            angle: shape.angle,
	            position: shape.position
	        };
	        switch (shape.type) {
	            case shape_1.ShapeType.Circle:
	                params['radius'] = shape.radius;
	                return new p2.Circle(params);
	            case shape_1.ShapeType.Polygon:
	                var points = shape.points;
	                if (points.length % 2 !== 0) {
	                    throw new Error('Polygon points musts be an array of coordinates specified in pairs, length must be even');
	                }
	                var p2points = new Array(points.length / 2);
	                for (var i = 0, len = points.length; i < len; i += 2) {
	                    p2points[i / 2] = [points[i], points[i + 1]];
	                }
	                params['points'] = p2points;
	                return new p2.Convex(params);
	            case shape_1.ShapeType.Capsule:
	                params['length'] = shape.length;
	                params['radius'] = shape.radius;
	                return new p2.Capsule(params);
	            default:
	                throw new Error('Not implemented');
	        }
	    };
	    Physics2dP2.prototype.update = function (dt) {
	        var entityManager = this.entityManager;
	        var bodies = entityManager.getEntitiesByAspect(this.bodyAspect);
	        for (var i = 0, len = bodies.length; i < len; ++i) {
	            var item = bodies[i];
	            var rigidBody = entityManager.getComponentUnsafe(item, rigidbody2d_1.RigidBody2d);
	            var transform = entityManager.getComponentUnsafe(item, transform2d_1.Transform2d);
	            if (!rigidBody.isValid()) {
	                var collider = entityManager.getComponentUnsafe(item, collider2d_1.Collider2d);
	                var body = new p2.Body({
	                    mass: rigidBody.mass,
	                    position: [transform.x, transform.y],
	                    angle: transform.rotation,
	                    fixedRotation: rigidBody.fixedRotation,
	                    allowSleep: rigidBody.allowSleep,
	                    collisionResponse: rigidBody.collisionResponse
	                });
	                for (var i = 0, len = collider.shapes.length; i < len; ++i) {
	                    body.addShape(this.toP2Shape(collider.shapes[i]));
	                }
	                rigidBody._p2body = body;
	            }
	            transform.x = rigidBody._p2body.position[0];
	            transform.y = rigidBody._p2body.position[1];
	            transform.rotation = rigidBody._p2body.angle;
	        }
	        this.world.step(dt);
	    };
	    return Physics2dP2;
	}());
	exports.Physics2dP2 = Physics2dP2;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var BitMask = __webpack_require__(7);
	function testBitMask() {
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
	exports.testBitMask = testBitMask;
	;


/***/ },
/* 20 */
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
	var Decorators = __webpack_require__(11);
	var TestComp0 = (function () {
	    function TestComp0() {
	    }
	    TestComp0 = __decorate([
	        Decorators.ComponentClass, 
	        __metadata('design:paramtypes', [])
	    ], TestComp0);
	    return TestComp0;
	}());
	var TestComp1 = (function () {
	    function TestComp1() {
	    }
	    TestComp1 = __decorate([
	        Decorators.ComponentClass, 
	        __metadata('design:paramtypes', [])
	    ], TestComp1);
	    return TestComp1;
	}());
	var TestComp2 = (function () {
	    function TestComp2() {
	    }
	    TestComp2 = __decorate([
	        Decorators.ComponentClass, 
	        __metadata('design:paramtypes', [])
	    ], TestComp2);
	    return TestComp2;
	}());
	function testAspect() {
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
	exports.testAspect = testAspect;
	;


/***/ },
/* 21 */
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
	var barium_entity_1 = __webpack_require__(4);
	var Decorators = __webpack_require__(11);
	var Aspect = __webpack_require__(9);
	var TestComponent = (function () {
	    function TestComponent(foo) {
	        this.foo = foo;
	    }
	    TestComponent = __decorate([
	        Decorators.ComponentClass, 
	        __metadata('design:paramtypes', [String])
	    ], TestComponent);
	    return TestComponent;
	}());
	;
	var TestFlagComponent0 = (function () {
	    function TestFlagComponent0() {
	    }
	    TestFlagComponent0 = __decorate([
	        Decorators.ComponentClass, 
	        __metadata('design:paramtypes', [])
	    ], TestFlagComponent0);
	    return TestFlagComponent0;
	}());
	;
	var TestFlagComponent1 = (function () {
	    function TestFlagComponent1() {
	    }
	    TestFlagComponent1 = __decorate([
	        Decorators.ComponentClass, 
	        __metadata('design:paramtypes', [])
	    ], TestFlagComponent1);
	    return TestFlagComponent1;
	}());
	;
	function testEntityManager() {
	    describe('EntityManager', function () {
	        it('should be created', function () {
	            var em = new barium_entity_1.EntityManager();
	            expect(em).toBeDefined();
	        });
	        it('should create entities', function () {
	            var em = new barium_entity_1.EntityManager();
	            var id_a = em.create();
	            var id_b = em.create();
	            var ent_c = em.createEntity();
	            expect(id_a).toBeDefined();
	            expect(id_b).toBeDefined();
	            expect(ent_c).toBeDefined();
	        });
	        it('should consider created entities valid', function () {
	            var em = new barium_entity_1.EntityManager();
	            var id = em.create();
	            expect(em.isValidId(id)).toBeTruthy();
	        });
	        it('should remove entities', function () {
	            var em = new barium_entity_1.EntityManager();
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
	            var em = new barium_entity_1.EntityManager();
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
	            var em = new barium_entity_1.EntityManager();
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
	            var em = new barium_entity_1.EntityManager();
	            var id0 = em.create(), id1 = em.create();
	            em.addComponent(id0, new TestComponent('foo'));
	            em.addComponent(id1, new TestComponent('bar'));
	            expect(em.hasComponent(id0, TestComponent)).toBeTruthy();
	            expect(em.hasComponent(id1, TestComponent)).toBeTruthy();
	        });
	        it('should add aspects', function () {
	            var em = new barium_entity_1.EntityManager();
	            var id0 = em.create(), id1 = em.create();
	            expect(function () {
	                em.addAspect(Aspect.all([TestComponent]));
	            }).not.toThrow();
	        });
	        it('should remove aspects', function () {
	            var em = new barium_entity_1.EntityManager();
	            var aspect = Aspect.all([TestComponent, TestFlagComponent0]);
	            em.addAspect(aspect);
	            expect(em.removeAspect(aspect)).toBeTruthy();
	        });
	        it('should return list of entities matching aspect', function () {
	            var em = new barium_entity_1.EntityManager();
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
	exports.testEntityManager = testEntityManager;
	;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var barium_game_updater_1 = __webpack_require__(23);
	function testGameUpdater() {
	    describe('GameUpdater', function () {
	        it('should be created', function () {
	            var gu = new barium_game_updater_1.GameUpdater();
	            expect(gu).toBeDefined();
	        });
	        it('should start and stop', function (done) {
	            var gu = new barium_game_updater_1.GameUpdater();
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
	            var gu = new barium_game_updater_1.GameUpdater();
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
	            var gu = new barium_game_updater_1.GameUpdater();
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
	            var gu = new barium_game_updater_1.GameUpdater();
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
	exports.testGameUpdater = testGameUpdater;
	;


/***/ },
/* 23 */
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


/***/ }
/******/ ]);