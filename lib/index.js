/*! ceval@1.2.0 */
exports["ceval"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Ceval; });
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(111);
/* harmony import */ var _systemMap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(115);
/* harmony import */ var _token_stream__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(118);
/* harmony import */ var _calculation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(120);
/* harmony import */ var _utils_presetVariable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(121);
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(116);
/* harmony import */ var _interface__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(122);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










var Ceval =
/**
 * 操作符映射表，可做在presetValues覆盖运算
 */
function Ceval() {
  var _this = this;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, Ceval);

  this.options = options;

  _defineProperty(this, "unaryOps", void 0);

  _defineProperty(this, "binaryOps", void 0);

  _defineProperty(this, "ternaryOps", void 0);

  _defineProperty(this, "consts", void 0);

  _defineProperty(this, "functions", void 0);

  _defineProperty(this, "operatorMap", _systemMap__WEBPACK_IMPORTED_MODULE_2__["operatorMap"]);

  _defineProperty(this, "currentValues", lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(_utils_presetVariable__WEBPACK_IMPORTED_MODULE_5__["default"]));

  _defineProperty(this, "getSupportOperationMap", function (ops) {
    return Object.prototype.hasOwnProperty.call(_systemMap__WEBPACK_IMPORTED_MODULE_2__["operatorMap"], ops) ? _systemMap__WEBPACK_IMPORTED_MODULE_2__["operatorMap"][ops] : null;
  });

  _defineProperty(this, "parseString", function (expression) {
    var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var instr = [];
    var isDev = "none" !== 'development';
    var value;

    if (isDev) {
      _parser__WEBPACK_IMPORTED_MODULE_1__["default"].generatorParser(_this, new _token_stream__WEBPACK_IMPORTED_MODULE_3__["default"](_this, expression), instr);
      value = _this.injectValueToCalc(instr, values);
    } else {
      try {
        _parser__WEBPACK_IMPORTED_MODULE_1__["default"].generatorParser(_this, new _token_stream__WEBPACK_IMPORTED_MODULE_3__["default"](_this, expression), instr);
        value = _this.injectValueToCalc(instr, values);
      } catch (e) {
        console.error(e);
      }
    }

    return value;
  });

  _defineProperty(this, "getCurrentValues", function () {
    return lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(_this.currentValues);
  });

  _defineProperty(this, "injectValueToCalc", function (tokens) {
    var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // @TODO 检查敏感字
    // @TODO 检查关键字
    _this.updatePresetValues(values);

    var result = Object(_calculation__WEBPACK_IMPORTED_MODULE_4__["default"])(tokens, _this.currentValues, _this);
    return result === undefined ? _this.options.defaultReturnValues : result;
  });

  _defineProperty(this, "updatePresetValues", function (values) {
    Object.assign(_this.currentValues, values);
  });

  _defineProperty(this, "updateOptions", function (Options) {
    Object.assign(_this.options, Options);
  });

  _defineProperty(this, "getOptions", function () {
    return lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(_this.options);
  });

  Object.assign(this, _systemMap__WEBPACK_IMPORTED_MODULE_2__["default"]);
  Object(_utils_index__WEBPACK_IMPORTED_MODULE_6__["merge"])(this.options, new _interface__WEBPACK_IMPORTED_MODULE_7__["CevalOptions"]());
}
/**
 * 查询支持的操作符方法名称, 可做覆盖
 * @param ops 操作符
 * @memberof Ceval
 */
;



/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var baseClone = __webpack_require__(2);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

module.exports = cloneDeep;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(3),
    arrayEach = __webpack_require__(48),
    assignValue = __webpack_require__(49),
    baseAssign = __webpack_require__(52),
    baseAssignIn = __webpack_require__(75),
    cloneBuffer = __webpack_require__(79),
    copyArray = __webpack_require__(80),
    copySymbols = __webpack_require__(81),
    copySymbolsIn = __webpack_require__(85),
    getAllKeys = __webpack_require__(89),
    getAllKeysIn = __webpack_require__(91),
    getTag = __webpack_require__(92),
    initCloneArray = __webpack_require__(97),
    initCloneByTag = __webpack_require__(98),
    initCloneObject = __webpack_require__(105),
    isArray = __webpack_require__(60),
    isBuffer = __webpack_require__(61),
    isMap = __webpack_require__(107),
    isObject = __webpack_require__(28),
    isSet = __webpack_require__(109),
    keys = __webpack_require__(54);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
  }

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

module.exports = baseClone;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(4),
    stackClear = __webpack_require__(12),
    stackDelete = __webpack_require__(13),
    stackGet = __webpack_require__(14),
    stackHas = __webpack_require__(15),
    stackSet = __webpack_require__(16);

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(5),
    listCacheDelete = __webpack_require__(6),
    listCacheGet = __webpack_require__(9),
    listCacheHas = __webpack_require__(10),
    listCacheSet = __webpack_require__(11);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(7);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(8);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(7);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(7);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(7);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(4);

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(4),
    Map = __webpack_require__(17),
    MapCache = __webpack_require__(33);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(18),
    root = __webpack_require__(23);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(19),
    getValue = __webpack_require__(32);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(20),
    isMasked = __webpack_require__(29),
    isObject = __webpack_require__(28),
    toSource = __webpack_require__(31);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(21),
    isObject = __webpack_require__(28);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(22),
    getRawTag = __webpack_require__(26),
    objectToString = __webpack_require__(27);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(23);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(24);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(25)))

/***/ }),
/* 25 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(22);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 27 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 28 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(30);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(23);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),
/* 31 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),
/* 32 */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(34),
    mapCacheDelete = __webpack_require__(42),
    mapCacheGet = __webpack_require__(45),
    mapCacheHas = __webpack_require__(46),
    mapCacheSet = __webpack_require__(47);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(35),
    ListCache = __webpack_require__(4),
    Map = __webpack_require__(17);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(36),
    hashDelete = __webpack_require__(38),
    hashGet = __webpack_require__(39),
    hashHas = __webpack_require__(40),
    hashSet = __webpack_require__(41);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(37);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(18);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),
/* 38 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(37);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(37);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(37);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(43);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(44);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),
/* 44 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(43);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(43);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(43);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),
/* 48 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(50),
    eq = __webpack_require__(8);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(51);

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(18);

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(53),
    keys = __webpack_require__(54);

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

module.exports = baseAssign;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(49),
    baseAssignValue = __webpack_require__(50);

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(55),
    baseKeys = __webpack_require__(70),
    isArrayLike = __webpack_require__(74);

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(56),
    isArguments = __webpack_require__(57),
    isArray = __webpack_require__(60),
    isBuffer = __webpack_require__(61),
    isIndex = __webpack_require__(64),
    isTypedArray = __webpack_require__(65);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),
/* 56 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(58),
    isObjectLike = __webpack_require__(59);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(21),
    isObjectLike = __webpack_require__(59);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),
/* 59 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 60 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(23),
    stubFalse = __webpack_require__(63);

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(62)(module)))

/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 63 */
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),
/* 64 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(66),
    baseUnary = __webpack_require__(68),
    nodeUtil = __webpack_require__(69);

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(21),
    isLength = __webpack_require__(67),
    isObjectLike = __webpack_require__(59);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),
/* 67 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),
/* 68 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(24);

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(62)(module)))

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(71),
    nativeKeys = __webpack_require__(72);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),
/* 71 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(73);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),
/* 73 */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(20),
    isLength = __webpack_require__(67);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(53),
    keysIn = __webpack_require__(76);

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

module.exports = baseAssignIn;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(55),
    baseKeysIn = __webpack_require__(77),
    isArrayLike = __webpack_require__(74);

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(28),
    isPrototype = __webpack_require__(71),
    nativeKeysIn = __webpack_require__(78);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ }),
/* 78 */
/***/ (function(module, exports) {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(23);

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(62)(module)))

/***/ }),
/* 80 */
/***/ (function(module, exports) {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(53),
    getSymbols = __webpack_require__(82);

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

module.exports = copySymbols;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var arrayFilter = __webpack_require__(83),
    stubArray = __webpack_require__(84);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;


/***/ }),
/* 83 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;


/***/ }),
/* 84 */
/***/ (function(module, exports) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(53),
    getSymbolsIn = __webpack_require__(86);

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

module.exports = copySymbolsIn;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(87),
    getPrototype = __webpack_require__(88),
    getSymbols = __webpack_require__(82),
    stubArray = __webpack_require__(84);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

module.exports = getSymbolsIn;


/***/ }),
/* 87 */
/***/ (function(module, exports) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(73);

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(90),
    getSymbols = __webpack_require__(82),
    keys = __webpack_require__(54);

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(87),
    isArray = __webpack_require__(60);

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(90),
    getSymbolsIn = __webpack_require__(86),
    keysIn = __webpack_require__(76);

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

module.exports = getAllKeysIn;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var DataView = __webpack_require__(93),
    Map = __webpack_require__(17),
    Promise = __webpack_require__(94),
    Set = __webpack_require__(95),
    WeakMap = __webpack_require__(96),
    baseGetTag = __webpack_require__(21),
    toSource = __webpack_require__(31);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(18),
    root = __webpack_require__(23);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(18),
    root = __webpack_require__(23);

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(18),
    root = __webpack_require__(23);

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(18),
    root = __webpack_require__(23);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),
/* 97 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(99),
    cloneDataView = __webpack_require__(101),
    cloneRegExp = __webpack_require__(102),
    cloneSymbol = __webpack_require__(103),
    cloneTypedArray = __webpack_require__(104);

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return new Ctor;

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return new Ctor;

    case symbolTag:
      return cloneSymbol(object);
  }
}

module.exports = initCloneByTag;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var Uint8Array = __webpack_require__(100);

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(23);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(99);

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

module.exports = cloneDataView;


/***/ }),
/* 102 */
/***/ (function(module, exports) {

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

module.exports = cloneRegExp;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(22);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

module.exports = cloneSymbol;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(99);

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(106),
    getPrototype = __webpack_require__(88),
    isPrototype = __webpack_require__(71);

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(28);

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsMap = __webpack_require__(108),
    baseUnary = __webpack_require__(68),
    nodeUtil = __webpack_require__(69);

/* Node.js helper references. */
var nodeIsMap = nodeUtil && nodeUtil.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

module.exports = isMap;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var getTag = __webpack_require__(92),
    isObjectLike = __webpack_require__(59);

/** `Object#toString` result references. */
var mapTag = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike(value) && getTag(value) == mapTag;
}

module.exports = baseIsMap;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsSet = __webpack_require__(110),
    baseUnary = __webpack_require__(68),
    nodeUtil = __webpack_require__(69);

/* Node.js helper references. */
var nodeIsSet = nodeUtil && nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

module.exports = isSet;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var getTag = __webpack_require__(92),
    isObjectLike = __webpack_require__(59);

/** `Object#toString` result references. */
var setTag = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike(value) && getTag(value) == setTag;
}

module.exports = baseIsSet;


/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Parser; });
/* harmony import */ var _instruction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(112);
/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(113);
/* harmony import */ var _utils_regExp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(114);
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(116);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





/**
 * 解析器
 * @export
 * @class Parser
 */

var Parser =
/**
 * @desc 当前TOKEN指针
 */

/**
 * @desc 暂存指针
 */

/**
 * @desc 下个TOKEN指针对象
 */

/**
 * @desc 暂存next TOKEN
 */
function Parser(ceval, tokens, _exprInstr) {
  var _this = this;

  _classCallCheck(this, Parser);

  this.ceval = ceval;
  this.tokens = tokens;

  _defineProperty(this, "current", null);

  _defineProperty(this, "savedCurrent", null);

  _defineProperty(this, "nextToken", null);

  _defineProperty(this, "savedNextToken", null);

  _defineProperty(this, "inspectParseEnd", function (exprInstr) {
    var len = _this.tokens.expression.length;

    do {
      _this.parseExpression(exprInstr);
    } while (_this.current.index < len && _this.nextToken.type !== _token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_END"]);
  });

  _defineProperty(this, "next", function () {
    _this.current = _this.nextToken;
    return _this.nextToken = _this.tokens.next();
  });

  _defineProperty(this, "matchToken", function (value) {
    if (value === undefined) {
      return true;
    } else if (Array.isArray(value)) {
      return value.indexOf(_this.nextToken.value) !== -1;
    } else if (typeof value === 'function') {
      return value(_this.nextToken);
    } else if (typeof value === 'string' || typeof value === 'number') {
      return value === _this.nextToken.value;
    } else {
      return false;
    }
  });

  _defineProperty(this, "accept", function (type, value) {
    var next = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    if (_this.nextToken && _this.nextToken.type === type && _this.matchToken(value)) {
      if (next) _this.next();
      return true;
    }

    return false;
  });

  _defineProperty(this, "expect", function (type, value) {
    if (!_this.accept(type, value)) {
      var _this$tokens$getCoord = _this.tokens.getCoordinates(),
          line = _this$tokens$getCoord.line,
          column = _this$tokens$getCoord.column;

      _this.printLog("> line:".concat(line, " column:").concat(column - 1, " \"").concat(_this.current.value, "\"\nThe next tag should be \"").concat(value, "\", But the reality is"), "".concat(_this.nextToken.type === _token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_END"] ? 'empty content' : "\"".concat(_this.nextToken.value, "\"")), console.error);

      throw new Error('Unexpected Tag');
    } else {
      return true;
    }
  });

  _defineProperty(this, "temporarySaved", function () {
    _this.savedCurrent = _this.current;
    _this.savedNextToken = _this.nextToken;

    _this.tokens.temporarySaved();
  });

  _defineProperty(this, "restore", function () {
    _this.current = _this.savedCurrent;
    _this.nextToken = _this.savedNextToken;

    _this.tokens.restore();

    return void 0;
  });

  _defineProperty(this, "parseExpression", function (instr) {
    var exprInstr = [];

    _this.parseMultipleEvaluation(exprInstr);

    exprInstr.forEach(function (exp) {
      return instr.push(exp);
    });
  });

  _defineProperty(this, "parseMultipleEvaluation", function (exprInstr) {
    _this.parseAssignmentExpression(exprInstr);

    while (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_COMMA"], ',')) {
      _this.parseConditionalExpression(exprInstr);
    }
  });

  _defineProperty(this, "parseAssignmentExpression", function (exprInstr) {
    _this.parseConditionalExpression(exprInstr);

    while (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_OPERATOR"], '=')) {
      var ident = void 0;

      if (exprInstr[exprInstr.length - 1].type === _instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_VAR"]) {
        ident = exprInstr.pop();
      }

      ;
      var instr = [];

      _this.parseConditionalExpression(instr);

      exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_EXPRE"], instr));

      if (ident) {
        exprInstr.push(ident);
      } else {
        exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_OPERA2"], '='));
      }
    }
  });

  _defineProperty(this, "parseConditionalExpression", function (exprInstr) {
    _this.parseOrExpression(exprInstr);

    while (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_OPERATOR"], '?')) {
      var trueBranch = [];
      var falseBranch = [];

      _this.parseConditionalExpression(trueBranch);

      _this.expect(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_OPERATOR"], ':');

      _this.parseConditionalExpression(falseBranch);

      exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_EXPRE"], trueBranch));
      exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_EXPRE"], falseBranch));
      exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_OPERA3"], '?'));
    }
  });

  _defineProperty(this, "parseOrExpression", function (exprInstr) {
    _this.parseAndExpression(exprInstr);

    while (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_OPERATOR"], '||')) {
      var branch = [];

      _this.parseAndExpression(branch);

      exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_EXPRE"], branch));
      exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_OPERA2"], '||'));
    }
  });

  _defineProperty(this, "parseAndExpression", function (exprInstr) {
    _this.parseBitwiseOrExpression(exprInstr);

    while (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_OPERATOR"], '&&')) {
      var branch = [];

      _this.parseBitwiseOrExpression(branch);

      exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_EXPRE"], branch));
      exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_OPERA2"], '&&'));
    }
  });

  _defineProperty(this, "parseBitwiseOrExpression", function (exprInstr) {
    _this.parseBitwiseAndExpression(exprInstr);

    while (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_OPERATOR"], '^')) {
      _this.parseBitwiseAndExpression(exprInstr);

      exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_OPERA2"], '^'));
    }
  });

  _defineProperty(this, "parseBitwiseAndExpression", function (exprInstr) {
    _this.parseEqualExpression(exprInstr);

    while (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_OPERATOR"], '&')) {
      _this.parseBitwiseAndExpression(exprInstr);

      exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_OPERA2"], '&'));
    }
  });

  _defineProperty(this, "parseEqualExpression", function (exprInstr) {
    _this.parseCompareExpression(exprInstr);

    while (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_OPERATOR"], ['==', '===', '!=', '!=='])) {
      var op = _this.current;

      _this.parseCompareExpression(exprInstr);

      exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_OPERA2"], op.value));
    }
  });

  _defineProperty(this, "parseCompareExpression", function (exprInstr) {
    _this.parseInOrAtExpression(exprInstr);

    while (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_OPERATOR"], ['<', '<=', '>=', '>'])) {
      var op = _this.current;

      _this.parseInOrAtExpression(exprInstr);

      exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_OPERA2"], op.value));
    }
  });

  _defineProperty(this, "parseInOrAtExpression", function (exprInstr) {
    _this.parseBitwiseMoveExpression(exprInstr);

    while (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_OPERATOR"], ['in'
    /** ,"@" */
    ])) {
      var op = _this.current;

      _this.parseBitwiseMoveExpression(exprInstr);

      exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_OPERA2"], op.value));
    }
  });

  _defineProperty(this, "parseBitwiseMoveExpression", function (exprInstr) {
    _this.parseAddOrSubExpression(exprInstr);

    while (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_OPERATOR"], [">>", ">>>", "<<"])) {
      var op = _this.current;

      _this.parseAddOrSubExpression(exprInstr);

      exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_OPERA2"], op.value));
    }
  });

  _defineProperty(this, "parseAddOrSubExpression", function (exprInstr) {
    _this.parseMulOrDivExpression(exprInstr);

    while (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_OPERATOR"], ["+", "-"])) {
      var op = _this.current;

      _this.parseMulOrDivExpression(exprInstr);

      exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_OPERA2"], op.value));
    }
  });

  _defineProperty(this, "parseMulOrDivExpression", function (exprInstr) {
    _this.parseUnaryExpression(exprInstr);

    while (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_OPERATOR"], ["*", "/", "%"])) {
      var op = _this.current;

      _this.parseUnaryExpression(exprInstr);

      exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_OPERA2"], op.value));
    }
  });

  _defineProperty(this, "parseUnaryExpression", function (exprInstr) {
    _this.temporarySaved();

    if (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_OPERATOR"], _utils_regExp__WEBPACK_IMPORTED_MODULE_2__["isUnaryOpeator"])) {
      // 内置函数调用
      if (_utils_regExp__WEBPACK_IMPORTED_MODULE_2__["unarySymbolMapReg"].test(_this.current.value)) {
        // +, ++, +, -, !, ~,
        var op = _this.current;

        _this.parseUnaryExpression(exprInstr); // 兼容 ++-1


        exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_OPERA1"], op.value));
      } else if (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_PAREN"], '(', false)) {
        // typeof(
        var _op = _this.current;

        _this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_PAREN"], '(');

        _this.parseConditionalExpression(exprInstr);

        _this.expect(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_PAREN"], ')');

        exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_OPERA1"], _op.value));
      } else if ([_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_COMMA"], _token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_SEMICOLON"], _token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_END"]].indexOf(_this.nextToken.type) !== -1 || // typeof, typeof; typeof
      _this.nextToken.type === _token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_PAREN"] && _this.nextToken.value === ')' // typeof)
      ) {
          _this.restore();

          _this.parseField(exprInstr);
        } else {
        // 需要支持typeof 1 ; typeof typeof 1 === typeof(typeof(1)) === typeof(typeof 1);
        var _op2 = _this.current;

        _this.parseUnaryExpression(exprInstr); // 外置函数 || 内声明函数


        exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_OPERA1"], _op2.value));
      }
    } else {
      _this.parseOuterFunctionCallExpression(exprInstr); // 外置函数 || 内声明函数

    }
  });

  _defineProperty(this, "parseOuterFunctionCallExpression", function (exprInstr) {
    _this.parseMemberAccessExpression(exprInstr);

    if (_this.current.type === _token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_NAME"] && _this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_PAREN"], '(', false)) {
      _this.parseArguments(exprInstr);
    }
  });

  _defineProperty(this, "parseArguments", function (exprInstr) {
    while (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_PAREN"], '(')) {
      if (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_PAREN"], ')')) {
        // 立即调用
        exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_FUNCALL"], 0)); // 参数长度 
      } else {
        var count = 0;

        while (!_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_PAREN"], ')')) {
          do {
            _this.parseConditionalExpression(exprInstr);

            count++;
          } while (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_COMMA"]));
        }

        exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_FUNCALL"], count));
      }
    }
  });

  _defineProperty(this, "parseMemberAccessExpression", function (exprInstr) {
    _this.parseField(exprInstr);

    var refPath = [];
    var currentItem = exprInstr[exprInstr.length - 1];

    if (currentItem && currentItem.type === _instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_NAME"]) {
      refPath.push(currentItem.value); // 尝试最后一个是否是NAME变量
    }

    while (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_OPERATOR"], '.') || Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["contains"])([_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_SQUARE"], _token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_NAME"]], _this.current.type) && _this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_SQUARE"], '[')) {
      if (!_this.ceval.getOptions().allowMemberAccess) {
        throw new Error("options \"allowMemberAccess\": You have disabled member access and cannot use syntax such as \"a.b\" \"a['b']\"");
      }

      if (_this.current.value === '.') {
        _this.expect(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_NAME"]); // a.name ✔️  a.1×


        refPath.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_PLAIN"], _this.current.value));
      } else if (_this.current.value === '[' && (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_NAME"]) || _this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_NUMBER"]) || _this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_STRING"]))) {
        refPath.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_this.current.type === _token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_NAME"] ? _instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_NAME"] : _instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_PLAIN"], _this.current.value));

        _this.expect(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_SQUARE"], ']');
      }
    }

    if (refPath.length > 1) {
      exprInstr.pop(); // 拿到全部引用

      exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_MEMBER"], refPath));
    }
  });

  _defineProperty(this, "parseField", function (exprInstr) {
    if (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_OPERATOR"], _utils_regExp__WEBPACK_IMPORTED_MODULE_2__["isUnaryOpeator"])) {
      // 内置前缀运算符 cos tan - +
      exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_OPERA1"], _this.current.value));
    } else if (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_NAME"])) {
      // 变量名称
      if (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_OPERATOR"], '=', false)) {
        // 赋值操作，避免转成TOKEN_NAME去取值了。
        exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_VARNAME"], _this.current.value));
      } else {
        exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_NAME"], _this.current.value));
      }
    } else if (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_NUMBER"])) {
      // 数字类型
      exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_NUMBER"], _this.current.value));
    } else if (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_STRING"])) {
      // 字符串类型 \"name\"
      exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_PLAIN"], _this.current.value));
    } else if (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_PAREN"], '(')) {
      // 圆括号，调用 或 表达式(a=1)
      _this.parseExpression(exprInstr);

      _this.expect(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_PAREN"], ')');
    } else if (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_SQUARE"], '[')) {
      //  数组字面量
      _this.parseArrayLiteralDeclaration(exprInstr);
    } else if (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_CURLY"], '{', false)) {
      // Object字面量声明
      _this.parseObjectLiteralDeclaration(exprInstr);
    } else if (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_VAR"], ['const', 'var', 'let'])) {
      // 赋值表达式 需要收集ident 和 variableName 避免variableName识别成varName 引发error
      var identifier = _this.current;

      _this.expect(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_NAME"]);

      exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_VARNAME"], _this.current.value));
      exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_VAR"], identifier.value));
    } else if (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_FUNC"], undefined, false)) {
      _this.parseFunctionDefinedDeclaration(exprInstr);
    } else if (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_SEMICOLON"])) {// empty, fault tolerant 
    } else {
      throw new Error('unexpected ' + _this.nextToken);
    }
  });

  _defineProperty(this, "parseArrayLiteralDeclaration", function (exprInstr) {
    // Array字面量声明 TODO: 需要和 obj['a'] 做区分
    var instr = [];

    if (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_SQUARE"], ']')) {
      // []
      exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_ARRAY"], instr));
      return;
    }

    _this.parseExpression(instr);

    _this.expect(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_SQUARE"], ']');

    exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_ARRAY"], instr));
  });

  _defineProperty(this, "parseObjectLiteralDeclaration", function (exprInstr) {
    while (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_CURLY"], '{')) {
      var instr = {};

      if (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_CURLY"], '}')) {
        // {}
        exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_OBJECT"], instr));
        return;
      }

      while (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_NAME"]) || _this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_NUMBER"]) || _this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_STRING"])) {
        var key = _this.current.value;

        _this.expect(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_OPERATOR"], ':');

        instr[key] = [];

        if (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_CURLY"], '{', false)) {
          _this.parseObjectLiteralDeclaration(instr[key]);
        } else {
          _this.parseConditionalExpression(instr[key]);
        }

        _this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_COMMA"], ',');
      }

      _this.expect(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_CURLY"], '}');

      _this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_SEMICOLON"], ';');

      exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_OBJECT"], instr));
    }
  });

  _defineProperty(this, "parseFunctionDefinedDeclaration", function (expreInstr) {
    while (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_FUNC"])) {
      if (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_NAME"])) {
        // function fn(){}
        var funcName = _this.current.value;
        var instr = []; // 参数 与 函数体

        if (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_PAREN"], '(')) {
          do {
            _this.parseField(instr); // TODO fn(a=1) 待兼容

          } while (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_COMMA"]));

          _this.expect(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_PAREN"], ')');
        }

        _this.parseFunctionBodyExpression(instr);

        expreInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_FUNCDEF"], instr));
        expreInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_FUNCDEF"], funcName));
      }
    }
  });

  _defineProperty(this, "parseFunctionBodyExpression", function (exprInstr) {
    if (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_CURLY"], '{')) {
      var instr = [];

      do {
        _this.parseExpression(instr);
      } while (_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_SEMICOLON"], ';') && !_this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_CURLY"], '}', false));

      if (_this.current.type !== _token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_SEMICOLON"]) {
        throw new SyntaxError("Function parse error: Function body each line must end with semicolon ';'");
      }

      _this.expect(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_CURLY"], '}');

      _this.accept(_token__WEBPACK_IMPORTED_MODULE_1__["TOKEN_SEMICOLON"], ';');

      exprInstr.push(new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_EXPRE"], instr));
    }
  });

  _defineProperty(this, "printLog", function (msg, tip) {
    var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : console.log;
    c("".concat(msg, " %c").concat(tip), "margin: 0 .5em;text-decoration-line: underline;text-decoration-color: red;text-decoration-style: wavy;line-height: 2em;color: red;");
  });

  this.next();
  this.inspectParseEnd(_exprInstr);
}
/**
 * 检查是否解析完毕
 */
;

_defineProperty(Parser, "generatorParser", function (parser, tokens, exprInstr) {
  return new Parser(parser, tokens, exprInstr);
});



/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INSTR_OPERA1", function() { return INSTR_OPERA1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INSTR_OPERA2", function() { return INSTR_OPERA2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INSTR_OPERA3", function() { return INSTR_OPERA3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INSTR_NUMBER", function() { return INSTR_NUMBER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INSTR_ARRAY", function() { return INSTR_ARRAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INSTR_OBJECT", function() { return INSTR_OBJECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INSTR_PLAIN", function() { return INSTR_PLAIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INSTR_MEMBER", function() { return INSTR_MEMBER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INSTR_EXPRE", function() { return INSTR_EXPRE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INSTR_VAR", function() { return INSTR_VAR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INSTR_VARNAME", function() { return INSTR_VARNAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INSTR_NAME", function() { return INSTR_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INSTR_FUNCALL", function() { return INSTR_FUNCALL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INSTR_FUNCDEF", function() { return INSTR_FUNCDEF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INSTR_EXECUTBODY", function() { return INSTR_EXECUTBODY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Instruction; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @desc 一元运算符 */
var INSTR_OPERA1 = 'INSTR_OP1';
/** @desc 二元运算符 */

var INSTR_OPERA2 = 'INSTR_OP2';
/** @desc 三元运算符 */

var INSTR_OPERA3 = 'INSTR_OP3';
/** @desc 数字 */

var INSTR_NUMBER = 'INSTR_NUMBER';
/** @desc 数组字面量 */

var INSTR_ARRAY = 'INSTR_ARRAY';
/** @desc 对象字面量 */

var INSTR_OBJECT = 'INSTR_OBJECT';
/** @desc 简单类型，表示不用处理 */

var INSTR_PLAIN = 'INSTR_PLAIN';
/** @desc 对象成员访问 */

var INSTR_MEMBER = 'INSTR_MEMBER';
/** @desc 表达式, 内置表达式 */

var INSTR_EXPRE = 'INSTR_EXPRE';
/** @desc 变量类型 const let var */

var INSTR_VAR = 'INSTR_VAR';
/** @desc 变量名称, 区别是内声明 TODO: var obj = {} */

var INSTR_VARNAME = 'INSTR_VARNAME';
/** @desc 变量名称, 取值, 没有经过声明的名称，例如 undefined, null, 以及数据池中的数据 */

var INSTR_NAME = 'INSTR_NAME';
/** @desc 函数调用 */

var INSTR_FUNCALL = 'INSTR_FUNCALL'; // TODO: 函数声明

/** @desc 函数定义指令 */

var INSTR_FUNCDEF = 'INSTR_FUNCDEF';
/** @desc 函数执行体 */

var INSTR_EXECUTBODY = 'INSTR_EXECUTBODY';
/**
 * @desc 指令实例
 */

var Instruction = function Instruction(type, value) {
  _classCallCheck(this, Instruction);

  this.type = type;

  _defineProperty(this, "value", void 0);

  this.value = value !== undefined && value !== null ? value : 0;
};



/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOKEN_END", function() { return TOKEN_END; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOKEN_OPERATOR", function() { return TOKEN_OPERATOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOKEN_NUMBER", function() { return TOKEN_NUMBER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOKEN_STRING", function() { return TOKEN_STRING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOKEN_PAREN", function() { return TOKEN_PAREN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOKEN_SQUARE", function() { return TOKEN_SQUARE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOKEN_CURLY", function() { return TOKEN_CURLY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOKEN_COMMA", function() { return TOKEN_COMMA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOKEN_VAR", function() { return TOKEN_VAR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOKEN_NAME", function() { return TOKEN_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOKEN_FUNC", function() { return TOKEN_FUNC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOKEN_SEMICOLON", function() { return TOKEN_SEMICOLON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Token; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @desc 结束标记 */
var TOKEN_END = 'TOKEN_END';
/** @desc 操作符类型 */

var TOKEN_OPERATOR = 'TOKEN_OP';
/** @desc 数字类型 */

var TOKEN_NUMBER = 'TOKEN_NUMBER';
/** @desc 字符串类型 */

var TOKEN_STRING = 'TOKEN_STRING';
/** @desc 圆括号，调用 */

var TOKEN_PAREN = 'TOKEN_PAREN';
/** @desc 方括号，成员访问 [] */

var TOKEN_SQUARE = 'TOKEN_SQUARE';
/** @desc 花括号，字面量声明 */

var TOKEN_CURLY = 'TOKEN_CURLY';
/** @desc 逗号 , */

var TOKEN_COMMA = 'TOKEN_COMMA';
/** @desc 变量 , */

var TOKEN_VAR = 'TOKEN_VAR';
/** @desc 变量名称 */

var TOKEN_NAME = 'TOKEN_NAME';
/** @desc 函数定义 */

var TOKEN_FUNC = 'TOKEN_FUNC';
/** @desc 结束标记; */

var TOKEN_SEMICOLON = 'TOKEN_SEMICOLON';
/**
 * tokenStream 解析阶段指令
 * @export 
 * @class Token
 */

var Token = function Token(type, value, index) {
  var _this = this;

  _classCallCheck(this, Token);

  this.type = type;
  this.value = value;
  this.index = index;

  _defineProperty(this, "toString", function () {
    return _this.type + ': ' + _this.value;
  });

  if (window && window._debug) {
    console.log("type: ".concat(type, "; value: ").concat(value, "; index: ").concat(index));
  }
};



/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "whitespaceReg", function() { return whitespaceReg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "booleanReg", function() { return booleanReg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commentReg", function() { return commentReg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringReg", function() { return stringReg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringGreedyReg", function() { return stringGreedyReg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "number2bitReg", function() { return number2bitReg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "number8bitReg", function() { return number8bitReg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "number010bitReg", function() { return number010bitReg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "number10bitReg", function() { return number10bitReg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "number16bitReg", function() { return number16bitReg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numberEbitReg", function() { return numberEbitReg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "variableReg", function() { return variableReg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "operatorReg", function() { return operatorReg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unaryMapReg", function() { return unaryMapReg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unarySymbolMapReg", function() { return unarySymbolMapReg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "constsMapReg", function() { return constsMapReg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "execFactoryReg", function() { return execFactoryReg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUnaryOpeator", function() { return isUnaryOpeator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBinaryOpeator", function() { return isBinaryOpeator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTernaryOpeator", function() { return isTernaryOpeator; });
/* harmony import */ var _systemMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(115);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(116);
/** 
 * @desc   : desc 
 * @author : ziwen
 * @date   : 2020-6-2 10:55:30
 */


var BLACK_LIST_OPERATORS = [];
var supportOperator = Array.from(new Set([].concat(Object.keys(_systemMap__WEBPACK_IMPORTED_MODULE_0__["default"].unaryOps).filter(function (item) {
  return !/\b\w+\b/.test(item);
}), Object.keys(_systemMap__WEBPACK_IMPORTED_MODULE_0__["default"].binaryOps), Object.keys(_systemMap__WEBPACK_IMPORTED_MODULE_0__["default"].ternaryOps), Object.keys(_systemMap__WEBPACK_IMPORTED_MODULE_0__["default"].syntaxOperator)).filter(function (op) {
  return !Object(_index__WEBPACK_IMPORTED_MODULE_1__["contains"])(BLACK_LIST_OPERATORS, op);
}).sort(function (a, b) {
  return b.length - a.length;
})));
var whitespaceReg = /(\t|\n|\r|\s+)/;
var booleanReg = /^(false|true)/;
var commentReg = /^\/\*(.*?)\*\//;
var stringReg = /^\'(.*?)\'|^\"(.*?)\"/;
var stringGreedyReg = /^\'(.*)\'|^\"(.*)\"/; // export const regExpReg = /^ExecReg\((.*)\)/;

var number2bitReg = /^(0b[0|1]{1,})$/;
var number8bitReg = /^(0[0-7]{1,})$/;
var number010bitReg = /^(0\d*[8-9]{1,}\d*(\.\d+)?)$/; // 0开头的十进制 019 038 078

var number10bitReg = /(^([1-9]\d*(\.\d+)|(\d*(\.\d+)?)))/; // 1-9 或者.开头的十进制

var number16bitReg = /^(0x[0-9a-fA-F]{1,})$/;
var numberEbitReg = /^((\d*\.?\d*)[e|E]((\-|\+)?\d+))/; // 科学计数法

var variableReg = /^((_|$)?[0-9a-zA-Z|$|_]{1,})/;
var operatorReg = new RegExp("^(".concat(supportOperator.map(function (r) {
  return "(\\".concat(/\b\w+\b/.test(r) ? "".concat(r, "\\s+") : r.split('').join('\\'), ")");
}).join('|'), ")"));
var unaryMapReg = new RegExp("^(".concat(Object.keys(_systemMap__WEBPACK_IMPORTED_MODULE_0__["default"].unaryOps).filter(function (item) {
  return /\b\w+\b/.test(item);
}).join('|'), ")"));
var unarySymbolMapReg = new RegExp("^(".concat(Object.keys(_systemMap__WEBPACK_IMPORTED_MODULE_0__["default"].unaryOps).filter(function (item) {
  return !/\b\w+\b/.test(item);
}).map(function (r) {
  return "\\s*\\".concat(r, "\\s*");
}).join('|'), ")"));
var constsMapReg = new RegExp("^(".concat(Object.keys(_systemMap__WEBPACK_IMPORTED_MODULE_0__["default"].consts).map(function (k) {
  return "".concat(k);
}).join('|'), ")"));
var execFactoryReg = function execFactoryReg(reg, expr) {
  var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (v) {
    return v;
  };
  reg.lastIndex = 0;
  var result = reg.exec(expr);

  if (result === null || result[0] === '') {
    return cb(undefined);
  } else {
    return cb(result[1]);
  }
};
var isUnaryOpeator = function isUnaryOpeator(_ref) {
  var value = _ref.value;
  return Object.prototype.hasOwnProperty.call(_systemMap__WEBPACK_IMPORTED_MODULE_0__["default"].unaryOps, value);
};
var isBinaryOpeator = function isBinaryOpeator(_ref2) {
  var value = _ref2.value;
  return Object.prototype.hasOwnProperty.call(_systemMap__WEBPACK_IMPORTED_MODULE_0__["default"].binaryOps, value);
};
var isTernaryOpeator = function isTernaryOpeator(_ref3) {
  var value = _ref3.value;
  return Object.prototype.hasOwnProperty.call(_systemMap__WEBPACK_IMPORTED_MODULE_0__["default"].ternaryOps, value);
};

/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "operatorMap", function() { return operatorMap; });
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(116);
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(117);


var system = {
  functions: {
    random: _utils_functions__WEBPACK_IMPORTED_MODULE_1__["random"],
    min: _utils_functions__WEBPACK_IMPORTED_MODULE_1__["min"],
    max: _utils_functions__WEBPACK_IMPORTED_MODULE_1__["max"],
    map: _utils_functions__WEBPACK_IMPORTED_MODULE_1__["arrayMap"],
    pow: Math.pow
  },
  consts: {
    E: Math.E,
    PI: Math.PI,
    'true': true,
    'false': false,
    "undefined": undefined,
    "null": null,
    "NaN": Number.NaN,
    "Infinity": Infinity
  },
  binaryOps: {
    '+': _utils_functions__WEBPACK_IMPORTED_MODULE_1__["add"],
    '-': _utils_functions__WEBPACK_IMPORTED_MODULE_1__["sub"],
    '*': _utils_functions__WEBPACK_IMPORTED_MODULE_1__["mul"],
    '/': _utils_functions__WEBPACK_IMPORTED_MODULE_1__["divide"],
    '%': _utils_functions__WEBPACK_IMPORTED_MODULE_1__["mod"],
    '^': _utils_functions__WEBPACK_IMPORTED_MODULE_1__["bitWiseOr"],
    '||': _utils_functions__WEBPACK_IMPORTED_MODULE_1__["withOr"],
    '&&': _utils_functions__WEBPACK_IMPORTED_MODULE_1__["withAlso"],
    '==': _utils_functions__WEBPACK_IMPORTED_MODULE_1__["equal"],
    '!=': _utils_functions__WEBPACK_IMPORTED_MODULE_1__["notEqual"],
    '!==': _utils_functions__WEBPACK_IMPORTED_MODULE_1__["strictNotEqual"],
    '>': _utils_functions__WEBPACK_IMPORTED_MODULE_1__["greaterThan"],
    '<': _utils_functions__WEBPACK_IMPORTED_MODULE_1__["lessThan"],
    '>=': _utils_functions__WEBPACK_IMPORTED_MODULE_1__["greaterThanEqual"],
    '<=': _utils_functions__WEBPACK_IMPORTED_MODULE_1__["lessThanEqual"],
    '=': _utils_functions__WEBPACK_IMPORTED_MODULE_1__["setVar"],
    '[': _utils_functions__WEBPACK_IMPORTED_MODULE_1__["arrayIndex"],
    '===': _utils_functions__WEBPACK_IMPORTED_MODULE_1__["strictEqual"],
    'in': _utils_functions__WEBPACK_IMPORTED_MODULE_1__["inTheTarget"] // 'instanceOf'

  },
  ternaryOps: {
    '?': _utils_functions__WEBPACK_IMPORTED_MODULE_1__["condition"]
  },
  unaryOps: {
    '+': function _(v) {
      return +v;
    },
    '-': function _(v) {
      return -v;
    },
    '!': function _(v) {
      return !v;
    },
    '~': function _(v) {
      return ~v;
    },
    '++': function _(v) {
      return v += 1;
    },
    '--': function _(v) {
      return v -= 1;
    },
    'typeof': function _typeof(v) {
      return Object(_utils_functions__WEBPACK_IMPORTED_MODULE_1__["_typeof"])(v);
    },
    'return': function _return(v) {
      return v;
    },
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan
  },
  syntaxOperator: {
    ':': null,
    '.': null
  }
};
/* harmony default export */ __webpack_exports__["default"] = (system);
/** @desc 功能函数 */

// 有些运算符不能被修改。
var excludeOperator = ['=', '['];
/** @desc 运算符映射表 */

var operatorMap = Object(_utils_index__WEBPACK_IMPORTED_MODULE_0__["mapVal"])(Object.create(null), {
  functions: system.functions,
  consts: system.consts,
  unaryOps: system.unaryOps,
  ternaryOps: system.ternaryOps
}, function (maps, key, val) {
  if (!excludeOperator.includes(key)) {
    maps[key] = val;
  }
});

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contains", function() { return contains; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTime", function() { return getTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapVal", function() { return mapVal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return merge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eliminateQuote", function() { return eliminateQuote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPalindrome", function() { return isPalindrome; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterUndefine", function() { return filterUndefine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasAttribute", function() { return hasAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapToObject", function() { return mapToObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "someCondition", function() { return someCondition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getReference", function() { return getReference; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Reference", function() { return Reference; });
/* harmony import */ var _instruction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(112);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


var toString = Object.prototype.toString;
function isObject(obj) {
  return toString.call(obj) === '[object Object]';
}
/**
 * @export
 * @template T
 * @param {array|object|string} source 
 * @param {string} value
 * @returns {boolean}
 */

function contains(source, value) {
  if (isObject(source)) {
    return Object.prototype.hasOwnProperty.call(source, value);
  } else if (Array.isArray(source)) {
    return source.some(function (v) {
      return v === value;
    });
  }

  return source.indexOf(value) > -1;
}
/**
 * 获取日期时间
 * @export getTime
 * @param {number} [offset=0] 偏移量
 * @returns {string[]} [date, time]
 */

function getTime() {
  var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var o = new Date(Date.now() + offset);
  var date = "".concat(o.getFullYear(), "-").concat(o.getMonth() + 1, "-").concat(o.getDate());
  var clock = "".concat(o.getHours(), ":").concat(o.getMinutes(), ":").concat(o.getSeconds()).replace(/\d+/g, function (t) {
    return parseInt(t, 10) < 10 ? "0".concat(t) : t;
  });
  return [date, clock];
}
/**
 * 递归foreach
 * @export mapVal
 * @template T
 * @param {T} data
 * @param {Record<string, Record<string, any>>} object
 * @param {(data: T, key:string, val: any) => void} cb
 * @returns
 */

function mapVal(data, object, cb) {
  Object.keys(object).map(function (key) {
    return isObject(object[key]) ? mapVal(data, object[key], cb) : cb(data, key, object[key]);
  });
  return data;
}
/**
 * 前者为主，仅合并不存在属性
 * @template T object
 * @param {T} target
 * @param {T} source
 */

function merge(target, source) {
  Object.keys(source).forEach(function (key) {
    var val = source[key];
    if (Object.prototype.hasOwnProperty.call(target, key)) return;

    if (Array.isArray(val)) {
      merge(target[key] = [], val);
    } else if (isObject(val)) {
      merge(target[key] = {}, val);
    } else {
      target[key] = val;
    }
  });
  return target;
}
/**
 * 替换\'\' \"\" 在 处理 in operator 需要到
 * @param {string} str string Field
 * @returns {string} 没有对称引号的字符串
 */

function eliminateQuote(str) {
  var quoteReg = /^\"(.*)\"$|^\'(.*)\'$/;
  if (!quoteReg.test(str)) return str;
  var result = quoteReg.exec(str);
  var s = result[1] !== undefined ? result[1] : result[2];
  return eliminateQuote(s);
}
/**
 * 回文字符串 \'\'a\'\' ✅  \'\'a\'❌
 * @param {string} str
 * @returns
 */

function isPalindrome(str) {
  var i = 0;

  while (contains(['\'', '\"'], str.charAt(i)) && str.charAt(i) === str.charAt(str.length - 1 - i)) {
    i++;
  }

  var surplusStr = str.substring(i, str.length - i);
  return surplusStr.indexOf('\"') === -1 && surplusStr.indexOf('\'') === -1;
}
/**
 * 返回首个有效数据， 非undefined null false true
 * @param {*} args
 */

function filterUndefine() {
  var one;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  args.some(function (item) {
    if (contains([undefined, null, true, false], item)) return false;
    one = item;
    return true;
  });
  return one;
}
function hasAttribute(obj, name) {
  return Object.prototype.hasOwnProperty.call(obj, name);
}
/**
 * Array to Object e.g. ['a', 'b'] => { a: undefined, b: undefined }
 * @param {string[]} arr 
 */

function mapToObject(arr) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  if (typeof arr[0] === 'string' && arr.length !== _toConsumableArray(new Set(arr)).length) {
    // 参数重复
    throw new Error("Duplicate parameter: ".concat(arr.join(',')));
  }

  var obj = Object.create(null);
  arr.forEach(function (item) {
    var key;

    if (item instanceof _instruction__WEBPACK_IMPORTED_MODULE_0__["default"]) {
      key = item.value;
    } else {
      key = item;
    }

    obj[key] = typeof defaultValue === 'function' ? defaultValue(key) : defaultValue;
  });
  return obj;
}
function someCondition() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  var errMsg = args.pop();

  if (!args.find(function (d) {
    return !!d;
  })) {
    throw new Error(errMsg);
  }
}
/**
 * 
 * @param keyQueue ["obj", "arr"] key path
 * @param scope 当前作用域
 * @param values 顶层作用域
 */

function getReference(keyQueue, scope, values) {
  if (keyQueue.length < 2) return hasAttribute(scope, keyQueue[0]) ? scope[keyQueue[0]] : values[keyQueue[0]];
  var path = keyQueue.shift();
  var lastKey = keyQueue.pop();
  var target = hasAttribute(scope, path) ? scope : values;

  while (path) {
    if (hasAttribute(target, path)) {
      target = target[path];
    } else if (!target) {
      throw new TypeError("Uncaught TypeError: Cannot read property '".concat(path, "' of ").concat(target));
    } else {
      target = undefined;
    }

    path = keyQueue.shift();
  }

  return new Reference(target, lastKey);
}
var Reference = /*#__PURE__*/function () {
  function Reference(target, path) {
    _classCallCheck(this, Reference);

    this.target = target;
    this.path = path;

    _defineProperty(this, "destoryed", void 0);

    this.destoryed = false;
  }

  _createClass(Reference, [{
    key: "setValue",
    value: function setValue(value) {
      if (this.destoryed) return value;
      return this.target[this.path] = value;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      if (this.destoryed) return undefined;
      return this.target[this.path];
    }
  }, {
    key: "destory",
    value: function destory() {
      // 使用一次就释放掉内存
      this.destoryed = true;
      this.target = null;
    }
  }]);

  return Reference;
}();

/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "divide", function() { return divide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mod", function() { return mod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equal", function() { return equal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strictEqual", function() { return strictEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notEqual", function() { return notEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strictNotEqual", function() { return strictNotEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "greaterThan", function() { return greaterThan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lessThan", function() { return lessThan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "greaterThanEqual", function() { return greaterThanEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_typeof", function() { return _typeof; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lessThanEqual", function() { return lessThanEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inTheTarget", function() { return inTheTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bitWiseOr", function() { return bitWiseOr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setVar", function() { return setVar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayIndex", function() { return arrayIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "condition", function() { return condition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withOr", function() { return withOr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withAlso", function() { return withAlso; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "max", function() { return max; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "min", function() { return min; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayMap", function() { return arrayMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(116);
function _typeof2(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }



function getDigitLength(num) {
  return (num.toString().split('.')[1] || '').length;
}

function checkBounds(number) {
  return number > Number.MAX_SAFE_INTEGER || number < Number.MIN_SAFE_INTEGER;
}

function getBaseNum(a, b) {
  var baseNum = Math.pow(10, Math.max(getDigitLength(a), getDigitLength(b)));

  if (checkBounds(a * baseNum) || checkBounds(b * baseNum)) {
    // 超出边界的情况不予处理
    return 0;
  }

  return baseNum;
}

var unwantedHandlePercision = function unwantedHandlePercision(a, b) {
  // 整数不需要处理 || 非Number也不需要
  return Number.isInteger(a) && Number.isInteger(b) || typeof a !== 'number' || typeof b !== 'number';
};

function add(a, b, options) {
  if (options.allowHandleNumberPrecision === false || unwantedHandlePercision(a, b)) return a + b;
  var baseNum = getBaseNum(a, b);
  return baseNum === 0 ? a + b : (Math.round(a * baseNum) + Math.round(b * baseNum)) / baseNum;
}
function sub(a, b, options) {
  if (options.allowHandleNumberPrecision === false || unwantedHandlePercision(a, b)) return a - b;
  var baseNum = getBaseNum(a, b);
  return baseNum === 0 ? a - b : (Math.round(a * baseNum) - Math.round(b * baseNum)) / baseNum;
}
function mul(a, b, options) {
  if (options.allowHandleNumberPrecision === false || unwantedHandlePercision(a, b)) return a * b;
  var baseNum = getBaseNum(a, b);
  return baseNum === 0 ? a * b : Math.round(a * baseNum) * Math.round(b * baseNum) / Math.pow(baseNum, 2);
}
function divide(a, b, options) {
  if (options.allowHandleNumberPrecision === false || unwantedHandlePercision(a, b)) return a / b;
  var baseNum = getBaseNum(a, b);
  return baseNum === 0 ? a / b : Math.round(a * baseNum) / Math.round(b * baseNum);
}
function mod(a, b) {
  return a % b;
}
function equal(a, b) {
  // eslint-disable-next-line
  return a == b;
}
function strictEqual(a, b) {
  return a === b;
}
function notEqual(a, b) {
  // eslint-disable-next-line
  return a != b;
}
function strictNotEqual(a, b) {
  return a !== b;
}
function greaterThan(a, b) {
  return a > b;
}
function lessThan(a, b) {
  return a < b;
}
function greaterThanEqual(a, b) {
  return a >= b;
}
function _typeof(a) {
  return Object.prototype.toString.call(a).match(/^\[object\s*(\w+?)\]$/)[1].toLowerCase();
}
function lessThanEqual(a, b) {
  return a <= b;
}
function inTheTarget(a, b) {
  if (_typeof2(b) !== 'object' || String(a) !== "".concat(a)) throw new Error('first argument must be original type, second must be Array or Object');
  return Object(_index__WEBPACK_IMPORTED_MODULE_0__["isObject"])(b) ? Object.prototype.hasOwnProperty.call(b, Object(_index__WEBPACK_IMPORTED_MODULE_0__["eliminateQuote"])(a)) : Object(_index__WEBPACK_IMPORTED_MODULE_0__["contains"])(b, a);
}
function bitWiseOr(a, b) {
  return a ^ b;
}
function setVar(name, value, variables) {
  if (variables) variables[name] = value;
  return value;
}
function arrayIndex(array, index) {
  return array[index | 0];
}
function condition(cond, yep, nope) {
  return cond ? yep : nope;
}
function withOr(n1, n2) {
  return n1 ? n1 : n2;
}
function withAlso(n1, n2) {
  return n1 ? n2 : n1;
}
function max() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length === 1) {
    return Math.max.apply(Math, args);
  } else {
    return Math.max.apply(Math, args);
  }
}
function min() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  if (args.length === 1) {
    return Math.min.apply(Math, args);
  } else {
    return Math.min.apply(Math, args);
  }
}
function arrayMap(f, a) {
  if (typeof f !== 'function') {
    throw new Error('First argument is not a function');
  }

  if (!Array.isArray(a)) {
    throw new Error('Second argument is not an array');
  }

  return a.map(function (x, i) {
    return f(x, i);
  });
}
function random(a) {
  return Math.random() * (a || 1);
}

function decimalAdd(num1, num2) {
  var num1Digits = (num1.toString().split('.')[1] || '').length;
  var num2Digits = (num2.toString().split('.')[1] || '').length;
  var baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
  return (num1 * baseNum + num2 * baseNum) / baseNum;
}

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TokenStream; });
/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(113);
/* harmony import */ var _utils_regExp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(114);
/* harmony import */ var _utils_reservedWord__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(119);
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(116);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





/**
 * 语法解析
 * @class TokenStream
 */

var TokenStream = // 当前指针下标
// 当前解析character
// 暂存指针
// 暂存解析character，在某些情况下做预判比如, cos是函数，cos() || map(cos) “cos)” 可能被函数parser判定为语法错误
// eslint-disable-next-line
function TokenStream(ceval, expression) {
  var _this = this;

  _classCallCheck(this, TokenStream);

  this.ceval = ceval;
  this.expression = expression;

  _defineProperty(this, "pos", 0);

  _defineProperty(this, "current", null);

  _defineProperty(this, "savedPosition", 0);

  _defineProperty(this, "savedCurrent", null);

  _defineProperty(this, "checkNextAccessGrammar", function () {
    _this.temporarySaved();

    var next = _this.next();

    _this.restore();

    return next;
  });

  _defineProperty(this, "getSomeCode", function () {
    var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var start = offset + _this.pos;
    var length = _this.expression.length; // debugger

    return _this.expression.substr(start, start + len > length ? length - start : len);
  });

  _defineProperty(this, "getFirstWord", function () {
    var result = _this.expression.substr(_this.pos).match(/\b\w*\b/);

    return result ? result[0] : '';
  });

  _defineProperty(this, "newToken", function (type, value, pos) {
    return new _token__WEBPACK_IMPORTED_MODULE_0__["default"](type, value, pos != null ? pos : _this.pos);
  });

  _defineProperty(this, "next", function () {
    if (!_this.expression.length) {
      return _this.newToken(_token__WEBPACK_IMPORTED_MODULE_0__["TOKEN_NAME"], "undefined");
    }

    if (_this.pos >= _this.expression.length) {
      return _this.newToken(_token__WEBPACK_IMPORTED_MODULE_0__["TOKEN_END"], 'END');
    }

    if (_this.isWhiteSpace() || _this.isComment()) {
      return _this.next();
    } else if (_this.isNumber() || _this.isString() || _this.isBoolean() || _this.isParenthesis() || _this.isComma() || _this.isOperator() || _this.isSemicolon() || _this.isConst() || _this.isVariable() || _this.isFunctionDefined() || _this.isName()) {
      return _this.current;
    } else {
      _this.parseError("unknown character: ".concat(_this.expression.charAt(_this.pos)), SyntaxError);
    }
  });

  _defineProperty(this, "temporarySaved", function () {
    _this.savedPosition = _this.pos;
    _this.savedCurrent = _this.current;
  });

  _defineProperty(this, "restore", function () {
    _this.pos = _this.savedPosition;
    _this.current = _this.savedCurrent;
  });

  _defineProperty(this, "isWhiteSpace", function () {
    var matchWS = _utils_regExp__WEBPACK_IMPORTED_MODULE_1__["whitespaceReg"].exec(_this.getSomeCode());

    while (matchWS && matchWS[1]) {
      _this.pos++;
      return true;
    }

    return false;
  });

  _defineProperty(this, "isComment", function () {
    var prefixCm = _this.getSomeCode(2);

    var matchResult;

    if (prefixCm === '/*') {
      matchResult = Object(_utils_regExp__WEBPACK_IMPORTED_MODULE_1__["execFactoryReg"])(_utils_regExp__WEBPACK_IMPORTED_MODULE_1__["commentReg"], _this.getSomeCode(Infinity));
    } else if (prefixCm === '//') {
      // comment break line
      matchResult = Object(_utils_regExp__WEBPACK_IMPORTED_MODULE_1__["execFactoryReg"])(/^(\/\/.*\n?)/, _this.getSomeCode(Infinity));
    }

    if (matchResult) {
      _this.pos += matchResult.length + (prefixCm === '/*' ? 2 + 2 : 0); // /*matchResult*/

      return true;
    }

    return false;
  });

  _defineProperty(this, "isBoolean", function () {
    var matchWS = _utils_regExp__WEBPACK_IMPORTED_MODULE_1__["booleanReg"].exec(_this.getSomeCode());

    while (matchWS && matchWS[1]) {
      _this.pos++;
      return true;
    }

    return false;
  });

  _defineProperty(this, "isVariable", function () {
    var word = _this.getFirstWord();

    if (Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["contains"])(['const', 'var', 'let'], word)) {
      _this.pos += word.length;
      _this.current = _this.newToken(_token__WEBPACK_IMPORTED_MODULE_0__["TOKEN_VAR"], word);

      var nextToken = _this.checkNextAccessGrammar();

      if (nextToken.type !== _token__WEBPACK_IMPORTED_MODULE_0__["TOKEN_NAME"]) {
        throw new Error("".concat(word, " ").concat(nextToken.value, " : This syntax Not as expected, should be \"").concat(_token__WEBPACK_IMPORTED_MODULE_0__["TOKEN_NAME"], "\", but is \"").concat(nextToken, "\""));
      } else if (Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["contains"])(_this.ceval.consts, nextToken.value)) {
        throw new SyntaxError("SyntaxError:  Unexpected token '".concat(nextToken.value, "', it has been stated in consts."));
      }

      return true;
    }

    return false;
  });

  _defineProperty(this, "isNumber", function () {
    var first = _this.getSomeCode();

    var number;
    var bit;

    var expr = _this.getSomeCode(_this.expression.length - _this.pos);

    if (/\d|\./.test(first) === false || first === '.' && /\.\d/.test(_this.getSomeCode(2)) === false) return false;

    var _expr$match = expr.match(/^(0(x|b)+[0-9a-zA-Z]{1,})|(^0?\d*(\.\d+)?)/),
        _expr$match2 = _slicedToArray(_expr$match, 1),
        n = _expr$match2[0]; // 019 可能会被8进制拦截掉01， 所以必须要做^$


    _utils_regExp__WEBPACK_IMPORTED_MODULE_1__["number10bitReg"].lastIndex = 0;

    if (first === '0' && n.length > 1 && !/^0\.\d/.test(n)) {
      // 0.x 不是进制数
      if (Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["contains"])(['b', 'x'], _this.getSomeCode(1, 1)) && _this.getSomeCode(1, n.length) === '.') {
        // 0b0101.1 0xaf.1 ❌
        // 099.1 属于十进制 ✅
        _this.parseError("number '".concat(n, "' cannot is a floating point number, but actual is: '").concat(n).concat(_this.getSomeCode(3, n.length), "'"), SyntaxError);

        return false;
      }

      if (_utils_regExp__WEBPACK_IMPORTED_MODULE_1__["number2bitReg"].test(n)) {
        // 2进制
        // @see 0b01 0b1110
        number = Object(_utils_regExp__WEBPACK_IMPORTED_MODULE_1__["execFactoryReg"])(_utils_regExp__WEBPACK_IMPORTED_MODULE_1__["number2bitReg"], n);
        bit = number === undefined ? undefined : 2;
      } else if (_utils_regExp__WEBPACK_IMPORTED_MODULE_1__["number8bitReg"].test(n)) {
        // 8进制
        // @see 012 || 077 ✅ 
        // @warn 080 || 079 ❌都是十进制  并非8进制
        number = Object(_utils_regExp__WEBPACK_IMPORTED_MODULE_1__["execFactoryReg"])(_utils_regExp__WEBPACK_IMPORTED_MODULE_1__["number8bitReg"], n);
        bit = number === undefined ? undefined : 8;
      } else if (_utils_regExp__WEBPACK_IMPORTED_MODULE_1__["number16bitReg"].test(n)) {
        // 16进制 
        // @see 0xadf
        number = Object(_utils_regExp__WEBPACK_IMPORTED_MODULE_1__["execFactoryReg"])(_utils_regExp__WEBPACK_IMPORTED_MODULE_1__["number16bitReg"], n);
        bit = number === undefined ? undefined : 16;
      } else if (_utils_regExp__WEBPACK_IMPORTED_MODULE_1__["number010bitReg"].test(n)) {
        // 0开头十进制 
        // @see 079 || 080  ✅
        // @warn 03.1 || 00.1 || 00.  ❌ 
        number = Object(_utils_regExp__WEBPACK_IMPORTED_MODULE_1__["execFactoryReg"])(_utils_regExp__WEBPACK_IMPORTED_MODULE_1__["number010bitReg"], n);
        bit = number === undefined ? undefined : 10;
      } else {
        _this.parseError('number bitbase parser error', SyntaxError);

        return false;
      }

      if (number !== undefined && !_this.ceval.getOptions().endableBitNumber) {
        // 给出准确的warning 
        throw new Error("options \"endableBitNumber\": You have disabled bitbase number parsing, Not allowed ".concat(number));
      }
    } else if (_utils_regExp__WEBPACK_IMPORTED_MODULE_1__["numberEbitReg"].test(expr)) {
      // 科学计数法
      var _numberEbitReg$exec = _utils_regExp__WEBPACK_IMPORTED_MODULE_1__["numberEbitReg"].exec(expr),
          _numberEbitReg$exec2 = _slicedToArray(_numberEbitReg$exec, 4),
          base = _numberEbitReg$exec2[2],
          times = _numberEbitReg$exec2[3];

      number = (Number(base) * Math.pow(10, Number(times))).toString();
      bit = 10;
    } else if (_utils_regExp__WEBPACK_IMPORTED_MODULE_1__["number10bitReg"].test(expr)) {
      // 十进制
      // 100 || 100.1 || 0.1 || .100 || .0  ✅ 
      // parseFloat是支持 0100.1 的。
      number = Object(_utils_regExp__WEBPACK_IMPORTED_MODULE_1__["execFactoryReg"])(_utils_regExp__WEBPACK_IMPORTED_MODULE_1__["number10bitReg"], expr);
      bit = number === undefined ? undefined : 10;
    } else {
      return false;
    }

    if (bit === 10) {
      _this.current = _this.newToken(_token__WEBPACK_IMPORTED_MODULE_0__["TOKEN_NUMBER"], parseFloat(number));
    } else {
      _this.current = _this.newToken(_token__WEBPACK_IMPORTED_MODULE_0__["TOKEN_NUMBER"], parseInt(number.replace('0b', '').replace('0x', ''), bit));
    }

    _this.pos += number.length;
    return true;
  });

  _defineProperty(this, "isString", function () {
    var first = _this.getSomeCode();

    var expr = _this.getSomeCode(Infinity);

    var matchString;
    var strContent;

    if (first === '\"' || first === '\'') {
      _utils_regExp__WEBPACK_IMPORTED_MODULE_1__["stringGreedyReg"].lastIndex = 0; // 一种情况是需要贪婪匹配 \'\'a\'\', 判断是否需要贪婪匹配

      matchString = _utils_regExp__WEBPACK_IMPORTED_MODULE_1__["stringGreedyReg"].exec(expr);
      strContent = Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["filterUndefine"])(matchString[1], matchString[2]);

      if (!Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["isPalindrome"])(strContent)) {
        // 不属于回文字符串则需要重新做惰性匹配
        // 另一种则需要惰性 "'a', 'b'" => "a"
        _utils_regExp__WEBPACK_IMPORTED_MODULE_1__["stringReg"].lastIndex = 0;
        matchString = _utils_regExp__WEBPACK_IMPORTED_MODULE_1__["stringReg"].exec(expr);
        strContent = Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["filterUndefine"])(matchString[1], matchString[2]);
      }

      if (strContent !== undefined) {
        _this.current = _this.newToken(_token__WEBPACK_IMPORTED_MODULE_0__["TOKEN_STRING"], strContent, _this.pos);
        _this.pos += strContent.length + first.length * 2; // "" 是没有长度的，会导致Token指针一直处于 "" 

        return true;
      }
    }

    return false;
  });

  _defineProperty(this, "isFunctionDefined", function () {
    var word = _this.getFirstWord();

    if (word === 'function') {
      // TODO: 初期只支持 第一种, 同时支持 function fn() {} || const a = () => {} || const b = function(){}
      _this.current = _this.newToken(_token__WEBPACK_IMPORTED_MODULE_0__["TOKEN_FUNC"], undefined);
      _this.pos += word.length;

      var nextToken = _this.checkNextAccessGrammar();

      if (nextToken.type !== _token__WEBPACK_IMPORTED_MODULE_0__["TOKEN_NAME"]) {
        _this.parseError('function definition should have function name');

        return false;
      }

      return true;
    }

    return false;
  });

  _defineProperty(this, "isName", function () {
    var first = _this.getSomeCode();

    var result;

    if (first === '_' || first === '$' || /^[a-zA-Z]/.test(first)) {
      _utils_regExp__WEBPACK_IMPORTED_MODULE_1__["variableReg"].lastIndex = 0;
      result = _utils_regExp__WEBPACK_IMPORTED_MODULE_1__["variableReg"].exec(_this.getSomeCode(Infinity));
    }

    if (result === undefined || result === null || typeof result[1] !== "string") {
      return false;
    }

    result = result[1];

    if (_utils_reservedWord__WEBPACK_IMPORTED_MODULE_2__["jsWord"][result] === false) {
      // 检测到保留字
      _this.parseError("parser an reserved word: ".concat(result));

      return false;
    }

    if (_utils_reservedWord__WEBPACK_IMPORTED_MODULE_2__["jsAttr"][result] === false) {
      // 检测到window属性 TODO: 应该命中 window.xxx
      _this.parseError("parser an window native attributes or methods: ".concat(result));

      return false;
    }

    _this.pos += result.length;
    _this.current = _this.newToken(_token__WEBPACK_IMPORTED_MODULE_0__["TOKEN_NAME"], result);
    return true;
  });

  _defineProperty(this, "isConst", function () {
    _utils_regExp__WEBPACK_IMPORTED_MODULE_1__["constsMapReg"].lastIndex = 0;
    var result = _utils_regExp__WEBPACK_IMPORTED_MODULE_1__["constsMapReg"].exec(_this.getSomeCode(Infinity));

    if (result && result[1]) {
      _this.current = _this.newToken(_token__WEBPACK_IMPORTED_MODULE_0__["TOKEN_NAME"], result[1]);
      _this.pos += result[1].length;

      var constKey = _this.checkNextAccessGrammar(); // 检查是否是const常量赋值


      if (constKey.type === _token__WEBPACK_IMPORTED_MODULE_0__["TOKEN_OPERATOR"] && constKey.value === '=') {
        _this.parseError("parser error: consts of ".concat(_this.current.value, " can not assignment;"), SyntaxError);
      }

      return true;
    }

    return false;
  });

  _defineProperty(this, "isSemicolon", function () {
    var first = _this.getSomeCode();

    if (first === ';') {
      _this.current = _this.newToken(_token__WEBPACK_IMPORTED_MODULE_0__["TOKEN_SEMICOLON"], ';');
      _this.pos++;
      return true;
    }

    return false;
  });

  _defineProperty(this, "isComma", function () {
    var first = _this.getSomeCode();

    if (first === ',') {
      _this.current = _this.newToken(_token__WEBPACK_IMPORTED_MODULE_0__["TOKEN_COMMA"], ',');
      _this.pos++;
      return true;
    }

    return false;
  });

  _defineProperty(this, "isParenthesis", function () {
    var first = _this.getSomeCode();

    if (Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["contains"])(['(', ')'], first)) {
      _this.current = _this.newToken(_token__WEBPACK_IMPORTED_MODULE_0__["TOKEN_PAREN"], first);
    } else if (Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["contains"])(['[', ']'], first)) {
      _this.current = _this.newToken(_token__WEBPACK_IMPORTED_MODULE_0__["TOKEN_SQUARE"], first);
    } else if (Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["contains"])(['{', '}'], first)) {
      _this.current = _this.newToken(_token__WEBPACK_IMPORTED_MODULE_0__["TOKEN_CURLY"], first);
    } else {
      return false;
    }

    _this.pos++;
    return true;
  });

  _defineProperty(this, "isOperator", function () {
    var str = _this.getSomeCode(Infinity);

    var result;

    if (_utils_regExp__WEBPACK_IMPORTED_MODULE_1__["operatorReg"].test(str)) {
      result = Object(_utils_regExp__WEBPACK_IMPORTED_MODULE_1__["execFactoryReg"])(_utils_regExp__WEBPACK_IMPORTED_MODULE_1__["operatorReg"], str);
    } else if (_utils_regExp__WEBPACK_IMPORTED_MODULE_1__["unaryMapReg"].test(str)) {
      result = Object(_utils_regExp__WEBPACK_IMPORTED_MODULE_1__["execFactoryReg"])(_utils_regExp__WEBPACK_IMPORTED_MODULE_1__["unaryMapReg"], str);
    }

    if (!result) return false;

    if (_this.ceval.getOptions().endableOperators === false) {
      throw new Error("options \"endableOperators\": You disabled the operator, Therefore, \"".concat(result, "\" it can not be used"));
    }

    result = result.replace(/\s/g, '');
    _this.pos += result.length;
    _this.current = _this.newToken(_token__WEBPACK_IMPORTED_MODULE_0__["TOKEN_OPERATOR"], result);
    return true;
  });

  _defineProperty(this, "getCoordinates", function () {
    var line = 0;
    var column = 0;
    var index = -1;

    do {
      line++;
      column = _this.pos - index;
      index += 1;
      index += _this.expression.substr(index).indexOf('\n'); // 从每一行第一位开始寻找下一个换行符
    } while (index >= 0 && index < _this.pos && line < _this.pos);

    return {
      line: line,
      column: column
    };
  });

  _defineProperty(this, "parseError", function (msg) {
    var ErrorType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Error;

    var coords = _this.getCoordinates();

    throw new ErrorType('parse error [' + coords.line + ':' + coords.column + '] => ' + msg);
  });
}
/**
 * @desc 获取nextToken，适用语法前置校验
 * @memberof TokenStream
 */
;



/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsWord", function() { return jsWord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsAttr", function() { return jsAttr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "windowWord", function() { return windowWord; });
/** @desc javascript保留字 */
var jsWord = {
  "abstract": false,
  "arguments": false,
  "boolean": false,
  "break": false,
  "byte": false,
  "case": false,
  "catch": false,
  "char": false,
  "class": false,
  "const": false,
  "continue": false,
  "debugger": false,
  "default": false,
  "delete": false,
  "do": false,
  "double": false,
  "else": false,
  "enum": false,
  "eval": false,
  "export": false,
  "extends": false,
  "final": false,
  "finally": false,
  "float": false,
  "for": false,
  "function": false,
  "goto": false,
  "if": false,
  "implements": false,
  "import": false,
  "in": true,
  "instanceof": false,
  "int": false,
  "interface": false,
  "let": false,
  "long": false,
  "native": false,
  "new": false,
  "null": false,
  "package": false,
  "private": false,
  "protected": false,
  "public": false,
  "return": true,
  "short": false,
  "static": false,
  "super": false,
  "switch": false,
  "synchronized": false,
  "this": false,
  "throw": false,
  "throws": false,
  "transient": false,
  "try": false,
  "typeof": false,
  "var": false,
  "void": false,
  "volatile": false,
  "while": false,
  "with": false,
  "yield": false
};
/** @desc JavaScript属性方法保留字 */

var jsAttr = {
  "Array": false,
  "Date": false,
  "eval": false,
  "function": false,
  "hasOwnProperty": false,
  "Infinity": false,
  "isFinite": false,
  "isNaN": false,
  "isPrototypeOf": false,
  "length": false,
  "Math": false,
  "NaN": true,
  "name": false,
  "Number": false,
  "Object": false,
  "prototype": false,
  "String": false,
  "toString": false,
  "undefined": false,
  "valueOf": false
};
/** @desc window保留字 */

var windowWord = {
  "alert": false,
  "all": false,
  "anchor": false,
  "anchors": false,
  "area": false,
  "assign": false,
  "blur": false,
  "button": false,
  "checkbox": false,
  "clearInterval": false,
  "clearTimeout": false,
  "clientInformation": false,
  "close": false,
  "closed": false,
  "confirm": false,
  "constructor": false,
  "crypto": false,
  "decodeURI": false,
  "decodeURIComponent": false,
  "defaultStatus": false,
  "document": false,
  "element": false,
  "elements": false,
  "embed": false,
  "embeds": false,
  "encodeURI": false,
  "encodeURIComponent": false,
  "escape": false,
  "event": false,
  "fileUpload": false,
  "focus": false,
  "form": false,
  "forms": false,
  "frame": false,
  "innerHeight": false,
  "innerWidth": false,
  "layer": false,
  "layers": false,
  "link": false,
  "location": false,
  "mimeTypes": false,
  "navigate": false,
  "navigator": false,
  "frames": false,
  "frameRate": false,
  "hidden": false,
  "history": false,
  "image": false,
  "images": false,
  "offscreenBuffering": false,
  "open": false,
  "opener": false,
  "option": false,
  "outerHeight": false,
  "outerWidth": false,
  "packages": false,
  "pageXOffset": false,
  "pageYOffset": false,
  "parent": false,
  "parseFloat": false,
  "parseInt": false,
  "password": false,
  "pkcs11": false,
  "plugin": false,
  "prompt": false,
  "propertyIsEnum": false,
  "radio": false,
  "reset": false,
  "screenX": false,
  "screenY": false,
  "scroll": false,
  "secure": false,
  "select": false,
  "self": false,
  "setInterval": false,
  "setTimeout": false,
  "status": false,
  "submit": false,
  "taint": false,
  "text": false,
  "textarea": false,
  "top": false,
  "unescape": false,
  "untaint": false,
  "window": false
};

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return calculation; });
/* harmony import */ var _instruction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(112);
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(116);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



/**
 * 运算
 * @export calculation
 * @param {Instruction[]} tokens    TokenQueue
 * @param {object} [values={}]      数据池
 * @param {Ceval} ceval             instance of eval
 * @param {boolean} [statis=false]  true全量返回 默认false
 * @param {object} [scope={}]       作用域
 * @returns result or result[]
 */

function calculation(tokens) {
  var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object.create(null);
  var ceval = arguments.length > 2 ? arguments[2] : undefined;
  var statis = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var scope = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Object.create(null);

  if (window && window.name) {
    console.group('calclation Dev');
    console.log('tokens: ', tokens);
    console.log('values', values);
    console.log('scope', scope);
    console.groupEnd();
  }

  var options = ceval.getOptions();
  var unaryOps = ceval.unaryOps,
      binaryOps = ceval.binaryOps,
      ternaryOps = ceval.ternaryOps;
  var stack = [];
  var length = tokens.length;
  var n1, n2, n3;
  var fn;

  var _loop = function _loop(_i) {
    var item = tokens[_i];

    var _ref = item || {},
        type = _ref.type,
        value = _ref.value;

    if (!type) {
      stack.push(item);
      i = _i;
      return "continue";
    }

    switch (type) {
      case _instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_NUMBER"]:
      case _instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_PLAIN"]:
      case _instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_VARNAME"]:
        {
          stack.push(value);
          break;
        }

      case _instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_NAME"]:
        {
          // 变量名称，范围作用域有functions consts values _scope 后者优先
          if (Object(_utils_index__WEBPACK_IMPORTED_MODULE_1__["hasAttribute"])(scope, value)) {
            // scope,作用域
            stack.push(scope[value]);
          } else if (Object(_utils_index__WEBPACK_IMPORTED_MODULE_1__["hasAttribute"])(values, value)) {
            // customVal
            stack.push(values[value]);
          } else if (Object(_utils_index__WEBPACK_IMPORTED_MODULE_1__["hasAttribute"])(ceval.consts, value)) {
            // 常量
            stack.push(ceval.consts[value]);
          } else if (Object(_utils_index__WEBPACK_IMPORTED_MODULE_1__["hasAttribute"])(ceval.functions, value)) {
            // 内置函数
            stack.push(ceval.functions[value]);
          } else {
            throw new Error("".concat(value, " is not defined in values or consts"));
          }

          break;
        }

      case _instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_OPERA1"]:
        {
          if (stack.length === 0) break; // 一元运算，需要一个操作数

          var _stack$splice = stack.splice(-1, 1);

          var _stack$splice2 = _slicedToArray(_stack$splice, 1);

          n1 = _stack$splice2[0];
          fn = specifyAttr(value, [values, unaryOps], options.allowOperatorsCovered);
          stack.push(fn(n1)); // 当操作符是return 时，终止该运算循环

          if (value === 'return') {
            _i = length;
          }

          break;
        }

      case _instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_OPERA2"]:
        {
          // 二元运算，需要有两个操作数
          if (stack.length < 2) break;

          var _stack$splice3 = stack.splice(-2, 2);

          var _stack$splice4 = _slicedToArray(_stack$splice3, 2);

          n1 = _stack$splice4[0];
          n2 = _stack$splice4[1];
          fn = specifyAttr(value, [values, binaryOps], options.allowOperatorsCovered);

          if (value === '&&') {
            // 1&&0&&3可能是连续的
            stack.push(fn(n1, calculation([n2], values, ceval, statis, scope), false)); // true && true && false
          } else if (value === '=') {
            // 写操作分为属性赋值和引用赋值
            if (n1 instanceof _utils_index__WEBPACK_IMPORTED_MODULE_1__["Reference"]) {
              // left hide 为引用
              n1.setValue(n2);
              n1.destory();
            } else {
              Object(_utils_index__WEBPACK_IMPORTED_MODULE_1__["someCondition"])(Object(_utils_index__WEBPACK_IMPORTED_MODULE_1__["hasAttribute"])(scope, n1), Object(_utils_index__WEBPACK_IMPORTED_MODULE_1__["hasAttribute"])(values, n1), "".concat(n1, " is not define in values or current scope, if you are declaring a new variable, please add var, const or let operator"));
              fn(n1, n2, Object(_utils_index__WEBPACK_IMPORTED_MODULE_1__["hasAttribute"])(scope, n1) ? scope : values); // 如果当前作用域含有该属性，作用域优先
            }
          } else {
            stack.push(fn(n1, calculation([n2], values, ceval, statis, scope), options));
          }

          break;
        }

      case _instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_OPERA3"]:
        {
          // 三元运算，需要有三个操作数
          if (stack.length < 3) break;

          var _stack$splice5 = stack.splice(-3, 3);

          var _stack$splice6 = _slicedToArray(_stack$splice5, 3);

          n1 = _stack$splice6[0];
          n2 = _stack$splice6[1];
          n3 = _stack$splice6[2];
          fn = specifyAttr(value, [values, ternaryOps], options.allowOperatorsCovered);
          stack.push(fn(n1, n2, n3));
          break;
        }

      case _instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_EXPRE"]:
        {
          // 表达式
          stack.push(calculation(item.value, values, ceval, statis, scope));
          break;
        }

      case _instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_MEMBER"]:
        {
          // 成员访问
          // 有可能是读，也有可能是写；
          var nextItem = tokens[_i + 2]; // 解析顺序 INSTR_MEMBER => INSTR_EXPRE => INSTR_OP2

          var keys = calculation(value, values, ceval, true, scope);
          var ref = Object(_utils_index__WEBPACK_IMPORTED_MODULE_1__["getReference"])(keys, scope, values);

          if (nextItem && nextItem.type === _instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_OPERA2"] && nextItem.value === '=') {
            // 写操作, JavaScript是拿不到引用的，push到stack，等待引用赋值
            stack.push(ref);
          } else {
            stack.push(ref.getValue());
            ref.destory();
          }

          break;
        }

      case _instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_ARRAY"]:
        {
          // 数组字面量
          stack.push(calculation(value, values, ceval, true, scope));
          break;
        }

      case _instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_OBJECT"]:
        {
          // 对象字面量
          var instr = Object.create(null);
          Object.keys(value).forEach(function (key) {
            instr[key] = calculation(value[key], values, ceval, statis, scope);
          });
          stack.push(instr);
          break;
        }

      case _instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_VAR"]:
        {
          // 赋值语句
          var _stack$splice7 = stack.splice(-2, 2);

          var _stack$splice8 = _slicedToArray(_stack$splice7, 2);

          n1 = _stack$splice8[0];
          n2 = _stack$splice8[1];

          switch (value) {
            case 'let':
            case 'const':
              {
                // let const的行为待定义, let 和 const 应该挂载到作用域上，而var 可以赋给 values 
                // TODO: 需要判定assgin给scope还是values
                if (Object(_utils_index__WEBPACK_IMPORTED_MODULE_1__["hasAttribute"])(scope, n1)) {
                  console.warn("".concat(n1, " already statement in consts or scope"));
                }

                scope[n1] = n2;
                break;
              }

            case 'var':
              {
                values[n1] = n2;
                break;
              }

            default:
              {
                console.warn('Unexpected statement identifier');
                break;
              }
          }

          break;
        }

      case _instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_FUNCALL"]:
        {
          // 自声明函数调用，区分是外部函数还是内声明函数
          var args = stack.splice(-value, value);
          fn = stack.pop(); // if(args.length !== value) {} // TODO: 参数不够的情况 warning

          if (typeof fn === 'function') {
            // 外置函数，即在consts内声明的
            stack.push(fn.apply(null, args));
            i = _i;
            return "continue";
          } else if (fn.value instanceof CustomFunc) {
            // 内置函数
            fn.value.updateScope(args);
            stack.push(fn.value.invokeBody());
          }

          break;
        }

      case _instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_FUNCDEF"]:
        {
          // 函数定义
          if (typeof value !== 'string') {
            stack.push(value); // 函数体

            i = _i;
            return "continue";
          }

          if (stack.length === 0) {
            i = _i;
            return {
              v: void 0
            };
          }

          var _scope2 = Object(_utils_index__WEBPACK_IMPORTED_MODULE_1__["merge"])(Object.create(null), scope); // 作用域
          // done: 嵌套函数区分, 挂载到当前_scope上


          _scope2[value] = new _instruction__WEBPACK_IMPORTED_MODULE_0__["default"](_instruction__WEBPACK_IMPORTED_MODULE_0__["INSTR_EXECUTBODY"], new CustomFunc(stack.pop(), values, _scope2, ceval));
          Object.assign(scope, _scope2);
          break;
        }

      default:
        {
          var _val = Symbol('_init'); // 值可能就是undefined，做区分


          var val = _val;

          try {
            val = item.value;
          } catch (e) {// item = undefined | null | false | true ....
          }

          if (val !== _val) {
            stack.push(val);
          }
        }
    }

    i = _i;
  };

  for (var i = 0; i < length; i++) {
    var _ret = _loop(i);

    switch (_ret) {
      case "continue":
        continue;

      default:
        if (_typeof(_ret) === "object") return _ret.v;
    }
  }

  return statis ? stack : stack[0];
}

function specifyAttr(value, _ref2) {
  var _ref3 = _slicedToArray(_ref2, 2),
      customValues = _ref3[0],
      defaultValues = _ref3[1];

  var shouldCustom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var fn;

  if (shouldCustom && Object(_utils_index__WEBPACK_IMPORTED_MODULE_1__["hasAttribute"])(customValues, value)) {
    fn = customValues[value];
  } else {
    fn = defaultValues[value];
  }

  return fn;
}

; // class Data {
//   constructor()
// }

var CustomFunc = function CustomFunc(func, values, _scope, ceval) {
  var _this = this;

  _classCallCheck(this, CustomFunc);

  this.func = func;
  this.values = values;
  this._scope = _scope;
  this.ceval = ceval;

  _defineProperty(this, "args", void 0);

  _defineProperty(this, "updateScope", function (scope) {
    // 假设 Object attribute 是不保证顺序的。
    _this.args.forEach(function (key, index) {
      if (Object(_utils_index__WEBPACK_IMPORTED_MODULE_1__["hasAttribute"])(_this._scope, key)) {
        _this._scope[key] = scope[index];
      }
    });
  });

  _defineProperty(this, "invokeBody", function () {
    return calculation(_this.func, _this.values, _this.ceval, false, _this._scope);
  });

  var args = this.func.splice(0, func.length - 1);
  this.args = calculation(args, Object(_utils_index__WEBPACK_IMPORTED_MODULE_1__["mapToObject"])(args, function (k) {
    return k;
  }), ceval, true);
  this._scope = Object(_utils_index__WEBPACK_IMPORTED_MODULE_1__["merge"])(Object(_utils_index__WEBPACK_IMPORTED_MODULE_1__["mapToObject"])(args), _scope);
};

/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(116);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var _getTime = Object(_index__WEBPACK_IMPORTED_MODULE_0__["getTime"])(),
    _getTime2 = _slicedToArray(_getTime, 2),
    date = _getTime2[0],
    time = _getTime2[1];

/* harmony default export */ __webpack_exports__["default"] = ({
  now: Date.now(),
  date: date,
  time: time
});

/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CevalOptions", function() { return CevalOptions; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CevalOptions = function CevalOptions() {
  _classCallCheck(this, CevalOptions);

  _defineProperty(this, "endableOperators", true);

  _defineProperty(this, "endableBitNumber", true);

  _defineProperty(this, "allowMemberAccess", true);

  _defineProperty(this, "allowHandleNumberPrecision", true);

  _defineProperty(this, "allowOperatorsCovered", false);

  _defineProperty(this, "defaultReturnValues", '');
} // done
;

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map