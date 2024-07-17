"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/decamelize/index.js
var require_decamelize = __commonJS({
  "node_modules/decamelize/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function(str, sep) {
      if (typeof str !== "string") {
        throw new TypeError("Expected a string");
      }
      sep = typeof sep === "undefined" ? "_" : sep;
      return str.replace(/([a-z\d])([A-Z])/g, "$1" + sep + "$2").replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1" + sep + "$2").toLowerCase();
    };
  }
});

// node_modules/camelcase/index.js
var require_camelcase = __commonJS({
  "node_modules/camelcase/index.js"(exports2, module2) {
    "use strict";
    var UPPERCASE = /[\p{Lu}]/u;
    var LOWERCASE = /[\p{Ll}]/u;
    var LEADING_CAPITAL = /^[\p{Lu}](?![\p{Lu}])/gu;
    var IDENTIFIER = /([\p{Alpha}\p{N}_]|$)/u;
    var SEPARATORS = /[_.\- ]+/;
    var LEADING_SEPARATORS = new RegExp("^" + SEPARATORS.source);
    var SEPARATORS_AND_IDENTIFIER = new RegExp(SEPARATORS.source + IDENTIFIER.source, "gu");
    var NUMBERS_AND_IDENTIFIER = new RegExp("\\d+" + IDENTIFIER.source, "gu");
    var preserveCamelCase = (string, toLowerCase, toUpperCase) => {
      let isLastCharLower = false;
      let isLastCharUpper = false;
      let isLastLastCharUpper = false;
      for (let i = 0; i < string.length; i++) {
        const character = string[i];
        if (isLastCharLower && UPPERCASE.test(character)) {
          string = string.slice(0, i) + "-" + string.slice(i);
          isLastCharLower = false;
          isLastLastCharUpper = isLastCharUpper;
          isLastCharUpper = true;
          i++;
        } else if (isLastCharUpper && isLastLastCharUpper && LOWERCASE.test(character)) {
          string = string.slice(0, i - 1) + "-" + string.slice(i - 1);
          isLastLastCharUpper = isLastCharUpper;
          isLastCharUpper = false;
          isLastCharLower = true;
        } else {
          isLastCharLower = toLowerCase(character) === character && toUpperCase(character) !== character;
          isLastLastCharUpper = isLastCharUpper;
          isLastCharUpper = toUpperCase(character) === character && toLowerCase(character) !== character;
        }
      }
      return string;
    };
    var preserveConsecutiveUppercase = (input, toLowerCase) => {
      LEADING_CAPITAL.lastIndex = 0;
      return input.replace(LEADING_CAPITAL, (m1) => toLowerCase(m1));
    };
    var postProcess = (input, toUpperCase) => {
      SEPARATORS_AND_IDENTIFIER.lastIndex = 0;
      NUMBERS_AND_IDENTIFIER.lastIndex = 0;
      return input.replace(SEPARATORS_AND_IDENTIFIER, (_, identifier) => toUpperCase(identifier)).replace(NUMBERS_AND_IDENTIFIER, (m) => toUpperCase(m));
    };
    var camelCase2 = (input, options) => {
      if (!(typeof input === "string" || Array.isArray(input))) {
        throw new TypeError("Expected the input to be `string | string[]`");
      }
      options = {
        pascalCase: false,
        preserveConsecutiveUppercase: false,
        ...options
      };
      if (Array.isArray(input)) {
        input = input.map((x) => x.trim()).filter((x) => x.length).join("-");
      } else {
        input = input.trim();
      }
      if (input.length === 0) {
        return "";
      }
      const toLowerCase = options.locale === false ? (string) => string.toLowerCase() : (string) => string.toLocaleLowerCase(options.locale);
      const toUpperCase = options.locale === false ? (string) => string.toUpperCase() : (string) => string.toLocaleUpperCase(options.locale);
      if (input.length === 1) {
        return options.pascalCase ? toUpperCase(input) : toLowerCase(input);
      }
      const hasUpperCase = input !== toLowerCase(input);
      if (hasUpperCase) {
        input = preserveCamelCase(input, toLowerCase, toUpperCase);
      }
      input = input.replace(LEADING_SEPARATORS, "");
      if (options.preserveConsecutiveUppercase) {
        input = preserveConsecutiveUppercase(input, toLowerCase);
      } else {
        input = toLowerCase(input);
      }
      if (options.pascalCase) {
        input = toUpperCase(input.charAt(0)) + input.slice(1);
      }
      return postProcess(input, toUpperCase);
    };
    module2.exports = camelCase2;
    module2.exports.default = camelCase2;
  }
});

// node_modules/retry/lib/retry_operation.js
var require_retry_operation = __commonJS({
  "node_modules/retry/lib/retry_operation.js"(exports2, module2) {
    function RetryOperation(timeouts, options) {
      if (typeof options === "boolean") {
        options = { forever: options };
      }
      this._originalTimeouts = JSON.parse(JSON.stringify(timeouts));
      this._timeouts = timeouts;
      this._options = options || {};
      this._maxRetryTime = options && options.maxRetryTime || Infinity;
      this._fn = null;
      this._errors = [];
      this._attempts = 1;
      this._operationTimeout = null;
      this._operationTimeoutCb = null;
      this._timeout = null;
      this._operationStart = null;
      this._timer = null;
      if (this._options.forever) {
        this._cachedTimeouts = this._timeouts.slice(0);
      }
    }
    module2.exports = RetryOperation;
    RetryOperation.prototype.reset = function() {
      this._attempts = 1;
      this._timeouts = this._originalTimeouts.slice(0);
    };
    RetryOperation.prototype.stop = function() {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
      if (this._timer) {
        clearTimeout(this._timer);
      }
      this._timeouts = [];
      this._cachedTimeouts = null;
    };
    RetryOperation.prototype.retry = function(err) {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
      if (!err) {
        return false;
      }
      var currentTime = (/* @__PURE__ */ new Date()).getTime();
      if (err && currentTime - this._operationStart >= this._maxRetryTime) {
        this._errors.push(err);
        this._errors.unshift(new Error("RetryOperation timeout occurred"));
        return false;
      }
      this._errors.push(err);
      var timeout = this._timeouts.shift();
      if (timeout === void 0) {
        if (this._cachedTimeouts) {
          this._errors.splice(0, this._errors.length - 1);
          timeout = this._cachedTimeouts.slice(-1);
        } else {
          return false;
        }
      }
      var self2 = this;
      this._timer = setTimeout(function() {
        self2._attempts++;
        if (self2._operationTimeoutCb) {
          self2._timeout = setTimeout(function() {
            self2._operationTimeoutCb(self2._attempts);
          }, self2._operationTimeout);
          if (self2._options.unref) {
            self2._timeout.unref();
          }
        }
        self2._fn(self2._attempts);
      }, timeout);
      if (this._options.unref) {
        this._timer.unref();
      }
      return true;
    };
    RetryOperation.prototype.attempt = function(fn, timeoutOps) {
      this._fn = fn;
      if (timeoutOps) {
        if (timeoutOps.timeout) {
          this._operationTimeout = timeoutOps.timeout;
        }
        if (timeoutOps.cb) {
          this._operationTimeoutCb = timeoutOps.cb;
        }
      }
      var self2 = this;
      if (this._operationTimeoutCb) {
        this._timeout = setTimeout(function() {
          self2._operationTimeoutCb();
        }, self2._operationTimeout);
      }
      this._operationStart = (/* @__PURE__ */ new Date()).getTime();
      this._fn(this._attempts);
    };
    RetryOperation.prototype.try = function(fn) {
      console.log("Using RetryOperation.try() is deprecated");
      this.attempt(fn);
    };
    RetryOperation.prototype.start = function(fn) {
      console.log("Using RetryOperation.start() is deprecated");
      this.attempt(fn);
    };
    RetryOperation.prototype.start = RetryOperation.prototype.try;
    RetryOperation.prototype.errors = function() {
      return this._errors;
    };
    RetryOperation.prototype.attempts = function() {
      return this._attempts;
    };
    RetryOperation.prototype.mainError = function() {
      if (this._errors.length === 0) {
        return null;
      }
      var counts = {};
      var mainError = null;
      var mainErrorCount = 0;
      for (var i = 0; i < this._errors.length; i++) {
        var error = this._errors[i];
        var message = error.message;
        var count = (counts[message] || 0) + 1;
        counts[message] = count;
        if (count >= mainErrorCount) {
          mainError = error;
          mainErrorCount = count;
        }
      }
      return mainError;
    };
  }
});

// node_modules/retry/lib/retry.js
var require_retry = __commonJS({
  "node_modules/retry/lib/retry.js"(exports2) {
    var RetryOperation = require_retry_operation();
    exports2.operation = function(options) {
      var timeouts = exports2.timeouts(options);
      return new RetryOperation(timeouts, {
        forever: options && (options.forever || options.retries === Infinity),
        unref: options && options.unref,
        maxRetryTime: options && options.maxRetryTime
      });
    };
    exports2.timeouts = function(options) {
      if (options instanceof Array) {
        return [].concat(options);
      }
      var opts = {
        retries: 10,
        factor: 2,
        minTimeout: 1 * 1e3,
        maxTimeout: Infinity,
        randomize: false
      };
      for (var key in options) {
        opts[key] = options[key];
      }
      if (opts.minTimeout > opts.maxTimeout) {
        throw new Error("minTimeout is greater than maxTimeout");
      }
      var timeouts = [];
      for (var i = 0; i < opts.retries; i++) {
        timeouts.push(this.createTimeout(i, opts));
      }
      if (options && options.forever && !timeouts.length) {
        timeouts.push(this.createTimeout(i, opts));
      }
      timeouts.sort(function(a, b) {
        return a - b;
      });
      return timeouts;
    };
    exports2.createTimeout = function(attempt, opts) {
      var random = opts.randomize ? Math.random() + 1 : 1;
      var timeout = Math.round(random * Math.max(opts.minTimeout, 1) * Math.pow(opts.factor, attempt));
      timeout = Math.min(timeout, opts.maxTimeout);
      return timeout;
    };
    exports2.wrap = function(obj, options, methods) {
      if (options instanceof Array) {
        methods = options;
        options = null;
      }
      if (!methods) {
        methods = [];
        for (var key in obj) {
          if (typeof obj[key] === "function") {
            methods.push(key);
          }
        }
      }
      for (var i = 0; i < methods.length; i++) {
        var method = methods[i];
        var original = obj[method];
        obj[method] = function retryWrapper(original2) {
          var op = exports2.operation(options);
          var args = Array.prototype.slice.call(arguments, 1);
          var callback = args.pop();
          args.push(function(err) {
            if (op.retry(err)) {
              return;
            }
            if (err) {
              arguments[0] = op.mainError();
            }
            callback.apply(this, arguments);
          });
          op.attempt(function() {
            original2.apply(obj, args);
          });
        }.bind(obj, original);
        obj[method].options = options;
      }
    };
  }
});

// node_modules/retry/index.js
var require_retry2 = __commonJS({
  "node_modules/retry/index.js"(exports2, module2) {
    module2.exports = require_retry();
  }
});

// node_modules/p-retry/index.js
var require_p_retry = __commonJS({
  "node_modules/p-retry/index.js"(exports2, module2) {
    "use strict";
    var retry = require_retry2();
    var networkErrorMsgs = [
      "Failed to fetch",
      // Chrome
      "NetworkError when attempting to fetch resource.",
      // Firefox
      "The Internet connection appears to be offline.",
      // Safari
      "Network request failed"
      // `cross-fetch`
    ];
    var AbortError = class extends Error {
      constructor(message) {
        super();
        if (message instanceof Error) {
          this.originalError = message;
          ({ message } = message);
        } else {
          this.originalError = new Error(message);
          this.originalError.stack = this.stack;
        }
        this.name = "AbortError";
        this.message = message;
      }
    };
    var decorateErrorWithCounts = (error, attemptNumber, options) => {
      const retriesLeft = options.retries - (attemptNumber - 1);
      error.attemptNumber = attemptNumber;
      error.retriesLeft = retriesLeft;
      return error;
    };
    var isNetworkError = (errorMessage) => networkErrorMsgs.includes(errorMessage);
    var pRetry4 = (input, options) => new Promise((resolve, reject) => {
      options = {
        onFailedAttempt: () => {
        },
        retries: 10,
        ...options
      };
      const operation = retry.operation(options);
      operation.attempt(async (attemptNumber) => {
        try {
          resolve(await input(attemptNumber));
        } catch (error) {
          if (!(error instanceof Error)) {
            reject(new TypeError(`Non-error was thrown: "${error}". You should only throw errors.`));
            return;
          }
          if (error instanceof AbortError) {
            operation.stop();
            reject(error.originalError);
          } else if (error instanceof TypeError && !isNetworkError(error.message)) {
            operation.stop();
            reject(error);
          } else {
            decorateErrorWithCounts(error, attemptNumber, options);
            try {
              await options.onFailedAttempt(error);
            } catch (error2) {
              reject(error2);
              return;
            }
            if (!operation.retry(error)) {
              reject(operation.mainError());
            }
          }
        }
      });
    });
    module2.exports = pRetry4;
    module2.exports.default = pRetry4;
    module2.exports.AbortError = AbortError;
  }
});

// node_modules/ansi-styles/index.js
var require_ansi_styles = __commonJS({
  "node_modules/ansi-styles/index.js"(exports2, module2) {
    "use strict";
    var ANSI_BACKGROUND_OFFSET = 10;
    var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
    var wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
    function assembleStyles() {
      const codes = /* @__PURE__ */ new Map();
      const styles2 = {
        modifier: {
          reset: [0, 0],
          // 21 isn't widely supported and 22 does the same thing
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          overline: [53, 55],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29]
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          // Bright color
          blackBright: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39]
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          // Bright color
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49]
        }
      };
      styles2.color.gray = styles2.color.blackBright;
      styles2.bgColor.bgGray = styles2.bgColor.bgBlackBright;
      styles2.color.grey = styles2.color.blackBright;
      styles2.bgColor.bgGrey = styles2.bgColor.bgBlackBright;
      for (const [groupName, group] of Object.entries(styles2)) {
        for (const [styleName, style] of Object.entries(group)) {
          styles2[styleName] = {
            open: `\x1B[${style[0]}m`,
            close: `\x1B[${style[1]}m`
          };
          group[styleName] = styles2[styleName];
          codes.set(style[0], style[1]);
        }
        Object.defineProperty(styles2, groupName, {
          value: group,
          enumerable: false
        });
      }
      Object.defineProperty(styles2, "codes", {
        value: codes,
        enumerable: false
      });
      styles2.color.close = "\x1B[39m";
      styles2.bgColor.close = "\x1B[49m";
      styles2.color.ansi256 = wrapAnsi256();
      styles2.color.ansi16m = wrapAnsi16m();
      styles2.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
      styles2.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
      Object.defineProperties(styles2, {
        rgbToAnsi256: {
          value: (red, green, blue) => {
            if (red === green && green === blue) {
              if (red < 8) {
                return 16;
              }
              if (red > 248) {
                return 231;
              }
              return Math.round((red - 8) / 247 * 24) + 232;
            }
            return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
          },
          enumerable: false
        },
        hexToRgb: {
          value: (hex) => {
            const matches = /(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(hex.toString(16));
            if (!matches) {
              return [0, 0, 0];
            }
            let { colorString } = matches.groups;
            if (colorString.length === 3) {
              colorString = colorString.split("").map((character) => character + character).join("");
            }
            const integer = Number.parseInt(colorString, 16);
            return [
              integer >> 16 & 255,
              integer >> 8 & 255,
              integer & 255
            ];
          },
          enumerable: false
        },
        hexToAnsi256: {
          value: (hex) => styles2.rgbToAnsi256(...styles2.hexToRgb(hex)),
          enumerable: false
        }
      });
      return styles2;
    }
    Object.defineProperty(module2, "exports", {
      enumerable: true,
      get: assembleStyles
    });
  }
});

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/eventemitter3/index.js"(exports2, module2) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }
    function EventEmitter() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.addListener = EventEmitter.prototype.on;
    EventEmitter.prefixed = prefix;
    EventEmitter.EventEmitter = EventEmitter;
    if ("undefined" !== typeof module2) {
      module2.exports = EventEmitter;
    }
  }
});

// node_modules/p-finally/index.js
var require_p_finally = __commonJS({
  "node_modules/p-finally/index.js"(exports2, module2) {
    "use strict";
    module2.exports = (promise, onFinally) => {
      onFinally = onFinally || (() => {
      });
      return promise.then(
        (val) => new Promise((resolve) => {
          resolve(onFinally());
        }).then(() => val),
        (err) => new Promise((resolve) => {
          resolve(onFinally());
        }).then(() => {
          throw err;
        })
      );
    };
  }
});

// node_modules/p-timeout/index.js
var require_p_timeout = __commonJS({
  "node_modules/p-timeout/index.js"(exports2, module2) {
    "use strict";
    var pFinally = require_p_finally();
    var TimeoutError = class extends Error {
      constructor(message) {
        super(message);
        this.name = "TimeoutError";
      }
    };
    var pTimeout = (promise, milliseconds, fallback) => new Promise((resolve, reject) => {
      if (typeof milliseconds !== "number" || milliseconds < 0) {
        throw new TypeError("Expected `milliseconds` to be a positive number");
      }
      if (milliseconds === Infinity) {
        resolve(promise);
        return;
      }
      const timer = setTimeout(() => {
        if (typeof fallback === "function") {
          try {
            resolve(fallback());
          } catch (error) {
            reject(error);
          }
          return;
        }
        const message = typeof fallback === "string" ? fallback : `Promise timed out after ${milliseconds} milliseconds`;
        const timeoutError = fallback instanceof Error ? fallback : new TimeoutError(message);
        if (typeof promise.cancel === "function") {
          promise.cancel();
        }
        reject(timeoutError);
      }, milliseconds);
      pFinally(
        // eslint-disable-next-line promise/prefer-await-to-then
        promise.then(resolve, reject),
        () => {
          clearTimeout(timer);
        }
      );
    });
    module2.exports = pTimeout;
    module2.exports.default = pTimeout;
    module2.exports.TimeoutError = TimeoutError;
  }
});

// node_modules/p-queue/dist/lower-bound.js
var require_lower_bound = __commonJS({
  "node_modules/p-queue/dist/lower-bound.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function lowerBound(array, value, comparator) {
      let first = 0;
      let count = array.length;
      while (count > 0) {
        const step = count / 2 | 0;
        let it = first + step;
        if (comparator(array[it], value) <= 0) {
          first = ++it;
          count -= step + 1;
        } else {
          count = step;
        }
      }
      return first;
    }
    exports2.default = lowerBound;
  }
});

// node_modules/p-queue/dist/priority-queue.js
var require_priority_queue = __commonJS({
  "node_modules/p-queue/dist/priority-queue.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var lower_bound_1 = require_lower_bound();
    var PriorityQueue = class {
      constructor() {
        this._queue = [];
      }
      enqueue(run, options) {
        options = Object.assign({ priority: 0 }, options);
        const element = {
          priority: options.priority,
          run
        };
        if (this.size && this._queue[this.size - 1].priority >= options.priority) {
          this._queue.push(element);
          return;
        }
        const index = lower_bound_1.default(this._queue, element, (a, b) => b.priority - a.priority);
        this._queue.splice(index, 0, element);
      }
      dequeue() {
        const item = this._queue.shift();
        return item === null || item === void 0 ? void 0 : item.run;
      }
      filter(options) {
        return this._queue.filter((element) => element.priority === options.priority).map((element) => element.run);
      }
      get size() {
        return this._queue.length;
      }
    };
    exports2.default = PriorityQueue;
  }
});

// node_modules/p-queue/dist/index.js
var require_dist = __commonJS({
  "node_modules/p-queue/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var EventEmitter = require_eventemitter3();
    var p_timeout_1 = require_p_timeout();
    var priority_queue_1 = require_priority_queue();
    var empty = () => {
    };
    var timeoutError = new p_timeout_1.TimeoutError();
    var PQueue = class extends EventEmitter {
      constructor(options) {
        var _a, _b, _c, _d;
        super();
        this._intervalCount = 0;
        this._intervalEnd = 0;
        this._pendingCount = 0;
        this._resolveEmpty = empty;
        this._resolveIdle = empty;
        options = Object.assign({ carryoverConcurrencyCount: false, intervalCap: Infinity, interval: 0, concurrency: Infinity, autoStart: true, queueClass: priority_queue_1.default }, options);
        if (!(typeof options.intervalCap === "number" && options.intervalCap >= 1)) {
          throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${(_b = (_a = options.intervalCap) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : ""}\` (${typeof options.intervalCap})`);
        }
        if (options.interval === void 0 || !(Number.isFinite(options.interval) && options.interval >= 0)) {
          throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${(_d = (_c = options.interval) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ""}\` (${typeof options.interval})`);
        }
        this._carryoverConcurrencyCount = options.carryoverConcurrencyCount;
        this._isIntervalIgnored = options.intervalCap === Infinity || options.interval === 0;
        this._intervalCap = options.intervalCap;
        this._interval = options.interval;
        this._queue = new options.queueClass();
        this._queueClass = options.queueClass;
        this.concurrency = options.concurrency;
        this._timeout = options.timeout;
        this._throwOnTimeout = options.throwOnTimeout === true;
        this._isPaused = options.autoStart === false;
      }
      get _doesIntervalAllowAnother() {
        return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
      }
      get _doesConcurrentAllowAnother() {
        return this._pendingCount < this._concurrency;
      }
      _next() {
        this._pendingCount--;
        this._tryToStartAnother();
        this.emit("next");
      }
      _resolvePromises() {
        this._resolveEmpty();
        this._resolveEmpty = empty;
        if (this._pendingCount === 0) {
          this._resolveIdle();
          this._resolveIdle = empty;
          this.emit("idle");
        }
      }
      _onResumeInterval() {
        this._onInterval();
        this._initializeIntervalIfNeeded();
        this._timeoutId = void 0;
      }
      _isIntervalPaused() {
        const now = Date.now();
        if (this._intervalId === void 0) {
          const delay = this._intervalEnd - now;
          if (delay < 0) {
            this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
          } else {
            if (this._timeoutId === void 0) {
              this._timeoutId = setTimeout(() => {
                this._onResumeInterval();
              }, delay);
            }
            return true;
          }
        }
        return false;
      }
      _tryToStartAnother() {
        if (this._queue.size === 0) {
          if (this._intervalId) {
            clearInterval(this._intervalId);
          }
          this._intervalId = void 0;
          this._resolvePromises();
          return false;
        }
        if (!this._isPaused) {
          const canInitializeInterval = !this._isIntervalPaused();
          if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
            const job = this._queue.dequeue();
            if (!job) {
              return false;
            }
            this.emit("active");
            job();
            if (canInitializeInterval) {
              this._initializeIntervalIfNeeded();
            }
            return true;
          }
        }
        return false;
      }
      _initializeIntervalIfNeeded() {
        if (this._isIntervalIgnored || this._intervalId !== void 0) {
          return;
        }
        this._intervalId = setInterval(() => {
          this._onInterval();
        }, this._interval);
        this._intervalEnd = Date.now() + this._interval;
      }
      _onInterval() {
        if (this._intervalCount === 0 && this._pendingCount === 0 && this._intervalId) {
          clearInterval(this._intervalId);
          this._intervalId = void 0;
        }
        this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
        this._processQueue();
      }
      /**
      Executes all queued functions until it reaches the limit.
      */
      _processQueue() {
        while (this._tryToStartAnother()) {
        }
      }
      get concurrency() {
        return this._concurrency;
      }
      set concurrency(newConcurrency) {
        if (!(typeof newConcurrency === "number" && newConcurrency >= 1)) {
          throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${newConcurrency}\` (${typeof newConcurrency})`);
        }
        this._concurrency = newConcurrency;
        this._processQueue();
      }
      /**
      Adds a sync or async task to the queue. Always returns a promise.
      */
      async add(fn, options = {}) {
        return new Promise((resolve, reject) => {
          const run = async () => {
            this._pendingCount++;
            this._intervalCount++;
            try {
              const operation = this._timeout === void 0 && options.timeout === void 0 ? fn() : p_timeout_1.default(Promise.resolve(fn()), options.timeout === void 0 ? this._timeout : options.timeout, () => {
                if (options.throwOnTimeout === void 0 ? this._throwOnTimeout : options.throwOnTimeout) {
                  reject(timeoutError);
                }
                return void 0;
              });
              resolve(await operation);
            } catch (error) {
              reject(error);
            }
            this._next();
          };
          this._queue.enqueue(run, options);
          this._tryToStartAnother();
          this.emit("add");
        });
      }
      /**
          Same as `.add()`, but accepts an array of sync or async functions.
      
          @returns A promise that resolves when all functions are resolved.
          */
      async addAll(functions, options) {
        return Promise.all(functions.map(async (function_) => this.add(function_, options)));
      }
      /**
      Start (or resume) executing enqueued tasks within concurrency limit. No need to call this if queue is not paused (via `options.autoStart = false` or by `.pause()` method.)
      */
      start() {
        if (!this._isPaused) {
          return this;
        }
        this._isPaused = false;
        this._processQueue();
        return this;
      }
      /**
      Put queue execution on hold.
      */
      pause() {
        this._isPaused = true;
      }
      /**
      Clear the queue.
      */
      clear() {
        this._queue = new this._queueClass();
      }
      /**
          Can be called multiple times. Useful if you for example add additional items at a later time.
      
          @returns A promise that settles when the queue becomes empty.
          */
      async onEmpty() {
        if (this._queue.size === 0) {
          return;
        }
        return new Promise((resolve) => {
          const existingResolve = this._resolveEmpty;
          this._resolveEmpty = () => {
            existingResolve();
            resolve();
          };
        });
      }
      /**
          The difference with `.onEmpty` is that `.onIdle` guarantees that all work from the queue has finished. `.onEmpty` merely signals that the queue is empty, but it could mean that some promises haven't completed yet.
      
          @returns A promise that settles when the queue becomes empty, and all promises have completed; `queue.size === 0 && queue.pending === 0`.
          */
      async onIdle() {
        if (this._pendingCount === 0 && this._queue.size === 0) {
          return;
        }
        return new Promise((resolve) => {
          const existingResolve = this._resolveIdle;
          this._resolveIdle = () => {
            existingResolve();
            resolve();
          };
        });
      }
      /**
      Size of the queue.
      */
      get size() {
        return this._queue.size;
      }
      /**
          Size of the queue, filtered by the given options.
      
          For example, this can be used to find the number of items remaining in the queue with a specific priority level.
          */
      sizeBy(options) {
        return this._queue.filter(options).length;
      }
      /**
      Number of pending promises.
      */
      get pending() {
        return this._pendingCount;
      }
      /**
      Whether the queue is currently paused.
      */
      get isPaused() {
        return this._isPaused;
      }
      get timeout() {
        return this._timeout;
      }
      /**
      Set the timeout for future operations.
      */
      set timeout(milliseconds) {
        this._timeout = milliseconds;
      }
    };
    exports2.default = PQueue;
  }
});

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports2) {
    "use strict";
    exports2.byteLength = byteLength;
    exports2.toByteArray = toByteArray;
    exports2.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1) validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  }
});

// node_modules/@hono/node-server/dist/index.mjs
var import_http = require("http");
var import_http2 = require("http2");
var import_stream = require("stream");
var import_crypto = __toESM(require("crypto"), 1);
var RequestError = class extends Error {
  static name = "RequestError";
  constructor(message, options) {
    super(message, options);
  }
};
var toRequestError = (e) => {
  if (e instanceof RequestError) {
    return e;
  }
  return new RequestError(e.message, { cause: e });
};
var GlobalRequest = global.Request;
var Request2 = class extends GlobalRequest {
  constructor(input, options) {
    if (typeof input === "object" && getRequestCache in input) {
      input = input[getRequestCache]();
    }
    if (typeof options?.body?.getReader !== "undefined") {
      ;
      options.duplex ??= "half";
    }
    super(input, options);
  }
};
var newRequestFromIncoming = (method, url, incoming, abortController) => {
  const headerRecord = [];
  const rawHeaders = incoming.rawHeaders;
  for (let i = 0; i < rawHeaders.length; i += 2) {
    const { [i]: key, [i + 1]: value } = rawHeaders;
    if (key.charCodeAt(0) !== /*:*/
    58) {
      headerRecord.push([key, value]);
    }
  }
  const init = {
    method,
    headers: headerRecord,
    signal: abortController.signal
  };
  if (method === "TRACE") {
    init.method = "GET";
    const req = new Request2(url, init);
    Object.defineProperty(req, "method", {
      get() {
        return "TRACE";
      }
    });
    return req;
  }
  if (!(method === "GET" || method === "HEAD")) {
    init.body = import_stream.Readable.toWeb(incoming);
  }
  return new Request2(url, init);
};
var getRequestCache = Symbol("getRequestCache");
var requestCache = Symbol("requestCache");
var incomingKey = Symbol("incomingKey");
var urlKey = Symbol("urlKey");
var abortControllerKey = Symbol("abortControllerKey");
var getAbortController = Symbol("getAbortController");
var requestPrototype = {
  get method() {
    return this[incomingKey].method || "GET";
  },
  get url() {
    return this[urlKey];
  },
  [getAbortController]() {
    this[getRequestCache]();
    return this[abortControllerKey];
  },
  [getRequestCache]() {
    this[abortControllerKey] ||= new AbortController();
    return this[requestCache] ||= newRequestFromIncoming(
      this.method,
      this[urlKey],
      this[incomingKey],
      this[abortControllerKey]
    );
  }
};
[
  "body",
  "bodyUsed",
  "cache",
  "credentials",
  "destination",
  "headers",
  "integrity",
  "mode",
  "redirect",
  "referrer",
  "referrerPolicy",
  "signal",
  "keepalive"
].forEach((k) => {
  Object.defineProperty(requestPrototype, k, {
    get() {
      return this[getRequestCache]()[k];
    }
  });
});
["arrayBuffer", "blob", "clone", "formData", "json", "text"].forEach((k) => {
  Object.defineProperty(requestPrototype, k, {
    value: function() {
      return this[getRequestCache]()[k]();
    }
  });
});
Object.setPrototypeOf(requestPrototype, Request2.prototype);
var newRequest = (incoming, defaultHostname) => {
  const req = Object.create(requestPrototype);
  req[incomingKey] = incoming;
  const host = (incoming instanceof import_http2.Http2ServerRequest ? incoming.authority : incoming.headers.host) || defaultHostname;
  if (!host) {
    throw new RequestError("Missing host header");
  }
  const url = new URL(
    `${incoming instanceof import_http2.Http2ServerRequest || incoming.socket && incoming.socket.encrypted ? "https" : "http"}://${host}${incoming.url}`
  );
  if (url.hostname.length !== host.length && url.hostname !== host.replace(/:\d+$/, "")) {
    throw new RequestError("Invalid host header");
  }
  req[urlKey] = url.href;
  return req;
};
function writeFromReadableStream(stream, writable) {
  if (stream.locked) {
    throw new TypeError("ReadableStream is locked.");
  } else if (writable.destroyed) {
    stream.cancel();
    return;
  }
  const reader = stream.getReader();
  writable.on("close", cancel);
  writable.on("error", cancel);
  reader.read().then(flow, cancel);
  return reader.closed.finally(() => {
    writable.off("close", cancel);
    writable.off("error", cancel);
  });
  function cancel(error) {
    reader.cancel(error).catch(() => {
    });
    if (error) {
      writable.destroy(error);
    }
  }
  function onDrain() {
    reader.read().then(flow, cancel);
  }
  function flow({ done, value }) {
    try {
      if (done) {
        writable.end();
      } else if (!writable.write(value)) {
        writable.once("drain", onDrain);
      } else {
        return reader.read().then(flow, cancel);
      }
    } catch (e) {
      cancel(e);
    }
  }
}
var buildOutgoingHttpHeaders = (headers) => {
  const res = {};
  const cookies = [];
  for (const [k, v] of headers) {
    if (k === "set-cookie") {
      cookies.push(v);
    } else {
      res[k] = v;
    }
  }
  if (cookies.length > 0) {
    res["set-cookie"] = cookies;
  }
  res["content-type"] ??= "text/plain; charset=UTF-8";
  return res;
};
var responseCache = Symbol("responseCache");
var getResponseCache = Symbol("getResponseCache");
var cacheKey = Symbol("cache");
var GlobalResponse = global.Response;
var Response2 = class _Response {
  #body;
  #init;
  [getResponseCache]() {
    delete this[cacheKey];
    return this[responseCache] ||= new GlobalResponse(this.#body, this.#init);
  }
  constructor(body, init) {
    this.#body = body;
    if (init instanceof _Response) {
      const cachedGlobalResponse = init[responseCache];
      if (cachedGlobalResponse) {
        this.#init = cachedGlobalResponse;
        this[getResponseCache]();
        return;
      } else {
        this.#init = init.#init;
      }
    } else {
      this.#init = init;
    }
    if (typeof body === "string" || typeof body?.getReader !== "undefined") {
      let headers = init?.headers || { "content-type": "text/plain; charset=UTF-8" };
      if (headers instanceof Headers) {
        headers = buildOutgoingHttpHeaders(headers);
      }
      ;
      this[cacheKey] = [init?.status || 200, body, headers];
    }
  }
};
[
  "body",
  "bodyUsed",
  "headers",
  "ok",
  "redirected",
  "status",
  "statusText",
  "trailers",
  "type",
  "url"
].forEach((k) => {
  Object.defineProperty(Response2.prototype, k, {
    get() {
      return this[getResponseCache]()[k];
    }
  });
});
["arrayBuffer", "blob", "clone", "formData", "json", "text"].forEach((k) => {
  Object.defineProperty(Response2.prototype, k, {
    value: function() {
      return this[getResponseCache]()[k]();
    }
  });
});
Object.setPrototypeOf(Response2, GlobalResponse);
Object.setPrototypeOf(Response2.prototype, GlobalResponse.prototype);
var stateKey = Reflect.ownKeys(new GlobalResponse()).find(
  (k) => typeof k === "symbol" && k.toString() === "Symbol(state)"
);
if (!stateKey) {
  console.warn("Failed to find Response internal state key");
}
function getInternalBody(response) {
  if (!stateKey) {
    return;
  }
  if (response instanceof Response2) {
    response = response[getResponseCache]();
  }
  const state = response[stateKey];
  return state && state.body || void 0;
}
var X_ALREADY_SENT = "x-hono-already-sent";
var webFetch = global.fetch;
if (typeof global.crypto === "undefined") {
  global.crypto = import_crypto.default;
}
global.fetch = (info, init) => {
  init = {
    // Disable compression handling so people can return the result of a fetch
    // directly in the loader without messing with the Content-Encoding header.
    compress: false,
    ...init
  };
  return webFetch(info, init);
};
var regBuffer = /^no$/i;
var regContentType = /^(application\/json\b|text\/(?!event-stream\b))/i;
var handleRequestError = () => new Response(null, {
  status: 400
});
var handleFetchError = (e) => new Response(null, {
  status: e instanceof Error && (e.name === "TimeoutError" || e.constructor.name === "TimeoutError") ? 504 : 500
});
var handleResponseError = (e, outgoing) => {
  const err = e instanceof Error ? e : new Error("unknown error", { cause: e });
  if (err.code === "ERR_STREAM_PREMATURE_CLOSE") {
    console.info("The user aborted a request.");
  } else {
    console.error(e);
    if (!outgoing.headersSent) {
      outgoing.writeHead(500, { "Content-Type": "text/plain" });
    }
    outgoing.end(`Error: ${err.message}`);
    outgoing.destroy(err);
  }
};
var responseViaCache = (res, outgoing) => {
  const [status, body, header] = res[cacheKey];
  if (typeof body === "string") {
    header["Content-Length"] = Buffer.byteLength(body);
    outgoing.writeHead(status, header);
    outgoing.end(body);
  } else {
    outgoing.writeHead(status, header);
    return writeFromReadableStream(body, outgoing)?.catch(
      (e) => handleResponseError(e, outgoing)
    );
  }
};
var responseViaResponseObject = async (res, outgoing, options = {}) => {
  if (res instanceof Promise) {
    if (options.errorHandler) {
      try {
        res = await res;
      } catch (err) {
        const errRes = await options.errorHandler(err);
        if (!errRes) {
          return;
        }
        res = errRes;
      }
    } else {
      res = await res.catch(handleFetchError);
    }
  }
  if (cacheKey in res) {
    return responseViaCache(res, outgoing);
  }
  const resHeaderRecord = buildOutgoingHttpHeaders(res.headers);
  const internalBody = getInternalBody(res);
  if (internalBody) {
    if (internalBody.length) {
      resHeaderRecord["content-length"] = internalBody.length;
    }
    outgoing.writeHead(res.status, resHeaderRecord);
    if (typeof internalBody.source === "string" || internalBody.source instanceof Uint8Array) {
      outgoing.end(internalBody.source);
    } else if (internalBody.source instanceof Blob) {
      outgoing.end(new Uint8Array(await internalBody.source.arrayBuffer()));
    } else {
      await writeFromReadableStream(internalBody.stream, outgoing);
    }
  } else if (res.body) {
    const {
      "transfer-encoding": transferEncoding,
      "content-encoding": contentEncoding,
      "content-length": contentLength,
      "x-accel-buffering": accelBuffering,
      "content-type": contentType
    } = resHeaderRecord;
    if (transferEncoding || contentEncoding || contentLength || // nginx buffering variant
    accelBuffering && regBuffer.test(accelBuffering) || !regContentType.test(contentType)) {
      outgoing.writeHead(res.status, resHeaderRecord);
      await writeFromReadableStream(res.body, outgoing);
    } else {
      const buffer = await res.arrayBuffer();
      resHeaderRecord["content-length"] = buffer.byteLength;
      outgoing.writeHead(res.status, resHeaderRecord);
      outgoing.end(new Uint8Array(buffer));
    }
  } else if (resHeaderRecord[X_ALREADY_SENT]) {
  } else {
    outgoing.writeHead(res.status, resHeaderRecord);
    outgoing.end();
  }
};
var getRequestListener = (fetchCallback, options = {}) => {
  if (options.overrideGlobalObjects !== false && global.Request !== Request2) {
    Object.defineProperty(global, "Request", {
      value: Request2
    });
    Object.defineProperty(global, "Response", {
      value: Response2
    });
  }
  return async (incoming, outgoing) => {
    let res, req;
    try {
      req = newRequest(incoming, options.hostname);
      outgoing.on("close", () => {
        if (incoming.errored) {
          req[getAbortController]().abort(incoming.errored.toString());
        }
      });
      res = fetchCallback(req, { incoming, outgoing });
      if (cacheKey in res) {
        return responseViaCache(res, outgoing);
      }
    } catch (e) {
      if (!res) {
        if (options.errorHandler) {
          res = await options.errorHandler(req ? e : toRequestError(e));
          if (!res) {
            return;
          }
        } else if (!req) {
          res = handleRequestError();
        } else {
          res = handleFetchError(e);
        }
      } else {
        return handleResponseError(e, outgoing);
      }
    }
    try {
      return responseViaResponseObject(res, outgoing, options);
    } catch (e) {
      return handleResponseError(e, outgoing);
    }
  };
};
var createAdaptorServer = (options) => {
  const fetchCallback = options.fetch;
  const requestListener = getRequestListener(fetchCallback, {
    hostname: options.hostname,
    overrideGlobalObjects: options.overrideGlobalObjects
  });
  const createServer = options.createServer || import_http.createServer;
  const server = createServer(options.serverOptions || {}, requestListener);
  return server;
};
var serve = (options, listeningListener) => {
  const server = createAdaptorServer(options);
  server.listen(options?.port ?? 3e3, options.hostname ?? "0.0.0.0", () => {
    const serverInfo = server.address();
    listeningListener && listeningListener(serverInfo);
  });
  return server;
};

// node_modules/hono/dist/utils/body.js
var parseBody = async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (contentType !== null && contentType.startsWith("multipart/form-data") || contentType !== null && contentType.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request, { all, dot });
  }
  return {};
};
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
var handleParsingAllValues = (form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    form[key] = value;
  }
};
var handleParsingNestedValues = (form, key, value) => {
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
};

// node_modules/hono/dist/utils/url.js
var splitPath = (path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
};
var splitRoutingPath = (routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
};
var extractGroupsFromPath = (path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match, index) => {
    const mark = `@${index}`;
    groups.push([mark, match]);
    return mark;
  });
  return { groups, path };
};
var replaceGroupMarks = (paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
};
var patternCache = {};
var getPattern = (label) => {
  if (label === "*") {
    return "*";
  }
  const match = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match) {
    if (!patternCache[label]) {
      if (match[2]) {
        patternCache[label] = [label, match[1], new RegExp("^" + match[2] + "$")];
      } else {
        patternCache[label] = [label, match[1], true];
      }
    }
    return patternCache[label];
  }
  return null;
};
var tryDecodeURI = (str) => {
  try {
    return decodeURI(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match) => {
      try {
        return decodeURI(match);
      } catch {
        return match;
      }
    });
  }
};
var getPath = (request) => {
  const url = request.url;
  const start = url.indexOf("/", 8);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const path = url.slice(start, queryIndex === -1 ? void 0 : queryIndex);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63) {
      break;
    }
  }
  return url.slice(start, i);
};
var getPathNoStrict = (request) => {
  const result = getPath(request);
  return result.length > 1 && result[result.length - 1] === "/" ? result.slice(0, -1) : result;
};
var mergePath = (...paths) => {
  let p = "";
  let endsWithSlash = false;
  for (let path of paths) {
    if (p[p.length - 1] === "/") {
      p = p.slice(0, -1);
      endsWithSlash = true;
    }
    if (path[0] !== "/") {
      path = `/${path}`;
    }
    if (path === "/" && endsWithSlash) {
      p = `${p}/`;
    } else if (path !== "/") {
      p = `${p}${path}`;
    }
    if (path === "/" && p === "") {
      p = "/";
    }
  }
  return p;
};
var checkOptionalParameter = (path) => {
  if (!path.match(/\:.+\?$/)) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
};
var _decodeURI = (value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return /%/.test(value) ? decodeURIComponent_(value) : value;
};
var _getQueryParam = (url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf(`?${key}`, 8);
    if (keyIndex2 === -1) {
      keyIndex2 = url.indexOf(`&${key}`, 8);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
};
var getQueryParam = _getQueryParam;
var getQueryParams = (url, key) => {
  return _getQueryParam(url, key, true);
};
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var HonoRequest = class {
  raw;
  #validatedData;
  #matchResult;
  routeIndex = 0;
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.getDecodedParam(key) : this.getAllDecodedParams();
  }
  getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.getParamValue(paramKey);
    return param ? /\%/.test(param) ? decodeURIComponent_(param) : param : void 0;
  }
  getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value && typeof value === "string") {
        decoded[key] = /\%/.test(value) ? decodeURIComponent_(value) : value;
      }
    }
    return decoded;
  }
  getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name.toLowerCase()) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return this.bodyCache.parsedBody ??= await parseBody(this, options);
  }
  cachedBody = (key) => {
    const { bodyCache, raw: raw2 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw2[key]();
  };
  json() {
    return this.cachedBody("json");
  }
  text() {
    return this.cachedBody("text");
  }
  arrayBuffer() {
    return this.cachedBody("arrayBuffer");
  }
  blob() {
    return this.cachedBody("blob");
  }
  formData() {
    return this.cachedBody("formData");
  }
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};

// node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = (value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
};
var resolveCallback = async (str, phase, preserveCallbacks, context, buffer) => {
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
};

// node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setHeaders = (headers, map = {}) => {
  Object.entries(map).forEach(([key, value]) => headers.set(key, value));
  return headers;
};
var Context = class {
  #rawRequest;
  #req;
  env = {};
  #var;
  finalized = false;
  error;
  #status = 200;
  #executionCtx;
  #headers;
  #preparedHeaders;
  #res;
  #isFresh = true;
  #layout;
  #renderer;
  #notFoundHandler;
  #matchResult;
  #path;
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  get res() {
    this.#isFresh = false;
    return this.#res ||= new Response("404 Not Found", { status: 404 });
  }
  set res(_res) {
    this.#isFresh = false;
    if (this.#res && _res) {
      this.#res.headers.delete("content-type");
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  render = (...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  };
  setLayout = (layout) => this.#layout = layout;
  getLayout = () => this.#layout;
  setRenderer = (renderer) => {
    this.#renderer = renderer;
  };
  header = (name, value, options) => {
    if (value === void 0) {
      if (this.#headers) {
        this.#headers.delete(name);
      } else if (this.#preparedHeaders) {
        delete this.#preparedHeaders[name.toLocaleLowerCase()];
      }
      if (this.finalized) {
        this.res.headers.delete(name);
      }
      return;
    }
    if (options?.append) {
      if (!this.#headers) {
        this.#isFresh = false;
        this.#headers = new Headers(this.#preparedHeaders);
        this.#preparedHeaders = {};
      }
      this.#headers.append(name, value);
    } else {
      if (this.#headers) {
        this.#headers.set(name, value);
      } else {
        this.#preparedHeaders ??= {};
        this.#preparedHeaders[name.toLowerCase()] = value;
      }
    }
    if (this.finalized) {
      if (options?.append) {
        this.res.headers.append(name, value);
      } else {
        this.res.headers.set(name, value);
      }
    }
  };
  status = (status) => {
    this.#isFresh = false;
    this.#status = status;
  };
  set = (key, value) => {
    this.#var ??= {};
    this.#var[key] = value;
  };
  get = (key) => {
    return this.#var ? this.#var[key] : void 0;
  };
  get var() {
    return { ...this.#var };
  }
  newResponse = (data, arg, headers) => {
    if (this.#isFresh && !headers && !arg && this.#status === 200) {
      return new Response(data, {
        headers: this.#preparedHeaders
      });
    }
    if (arg && typeof arg !== "number") {
      const header = new Headers(arg.headers);
      if (this.#headers) {
        this.#headers.forEach((v, k) => {
          if (k === "set-cookie") {
            header.append(k, v);
          } else {
            header.set(k, v);
          }
        });
      }
      const headers2 = setHeaders(header, this.#preparedHeaders);
      return new Response(data, {
        headers: headers2,
        status: arg.status ?? this.#status
      });
    }
    const status = typeof arg === "number" ? arg : this.#status;
    this.#preparedHeaders ??= {};
    this.#headers ??= new Headers();
    setHeaders(this.#headers, this.#preparedHeaders);
    if (this.#res) {
      this.#res.headers.forEach((v, k) => {
        if (k === "set-cookie") {
          this.#headers?.append(k, v);
        } else {
          this.#headers?.set(k, v);
        }
      });
      setHeaders(this.#headers, this.#preparedHeaders);
    }
    headers ??= {};
    for (const [k, v] of Object.entries(headers)) {
      if (typeof v === "string") {
        this.#headers.set(k, v);
      } else {
        this.#headers.delete(k);
        for (const v2 of v) {
          this.#headers.append(k, v2);
        }
      }
    }
    return new Response(data, {
      status,
      headers: this.#headers
    });
  };
  body = (data, arg, headers) => {
    return typeof arg === "number" ? this.newResponse(data, arg, headers) : this.newResponse(data, arg);
  };
  text = (text, arg, headers) => {
    if (!this.#preparedHeaders) {
      if (this.#isFresh && !headers && !arg) {
        return new Response(text);
      }
      this.#preparedHeaders = {};
    }
    this.#preparedHeaders["content-type"] = TEXT_PLAIN;
    return typeof arg === "number" ? this.newResponse(text, arg, headers) : this.newResponse(text, arg);
  };
  json = (object, arg, headers) => {
    const body = JSON.stringify(object);
    this.#preparedHeaders ??= {};
    this.#preparedHeaders["content-type"] = "application/json; charset=UTF-8";
    return typeof arg === "number" ? this.newResponse(body, arg, headers) : this.newResponse(body, arg);
  };
  html = (html, arg, headers) => {
    this.#preparedHeaders ??= {};
    this.#preparedHeaders["content-type"] = "text/html; charset=UTF-8";
    if (typeof html === "object") {
      if (!(html instanceof Promise)) {
        html = html.toString();
      }
      if (html instanceof Promise) {
        return html.then((html2) => resolveCallback(html2, HtmlEscapedCallbackPhase.Stringify, false, {})).then((html2) => {
          return typeof arg === "number" ? this.newResponse(html2, arg, headers) : this.newResponse(html2, arg);
        });
      }
    }
    return typeof arg === "number" ? this.newResponse(html, arg, headers) : this.newResponse(html, arg);
  };
  redirect = (location2, status) => {
    this.#headers ??= new Headers();
    this.#headers.set("Location", location2);
    return this.newResponse(null, status ?? 302);
  };
  notFound = () => {
    this.#notFoundHandler ??= () => new Response();
    return this.#notFoundHandler(this);
  };
};

// node_modules/hono/dist/compose.js
var compose = (middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        if (context instanceof Context) {
          context.req.routeIndex = i;
        }
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (!handler) {
        if (context instanceof Context && context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      } else {
        try {
          res = await handler(context, () => {
            return dispatch(i + 1);
          });
        } catch (err) {
          if (err instanceof Error && context instanceof Context && onError) {
            context.error = err;
            res = await onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
  };
};

// node_modules/hono/dist/router.js
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
};

// node_modules/hono/dist/hono-base.js
var COMPOSED_HANDLER = Symbol("composedHandler");
var notFoundHandler = (c) => {
  return c.text("404 Not Found", 404);
};
var errorHandler = (err, c) => {
  if ("getResponse" in err) {
    return err.getResponse();
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
};
var Hono = class {
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  router;
  getPath;
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          if (typeof handler !== "string") {
            this.addRoute(method, this.#path, handler);
          }
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const strict = options.strict ?? true;
    delete options.strict;
    Object.assign(this, options);
    this.getPath = strict ? options.getPath ?? getPath : getPathNoStrict;
  }
  clone() {
    const clone = new Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.routes = this.routes;
    return clone;
  }
  notFoundHandler = notFoundHandler;
  errorHandler = errorHandler;
  route(path, app2) {
    const subApp = this.basePath(path);
    app2.routes.map((r) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res;
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.addRoute(r.method, r.path, handler);
    });
    return this;
  }
  basePath(path) {
    const subApp = this.clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  onError = (handler) => {
    this.errorHandler = handler;
    return this;
  };
  notFound = (handler) => {
    this.notFoundHandler = handler;
    return this;
  };
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        replaceRequest = options.replaceRequest;
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = url.pathname.slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    };
    this.addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  addRoute(method, path, handler) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = { path, method, handler };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  matchRoute(method, path) {
    return this.router.match(method, path);
  }
  handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  dispatch(request, executionCtx, env, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.dispatch(request, executionCtx, env, "GET")))();
    }
    const path = this.getPath(request, { env });
    const matchResult = this.matchRoute(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env,
      executionCtx,
      notFoundHandler: this.notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.notFoundHandler(c);
        });
      } catch (err) {
        return this.handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.notFoundHandler(c))
      ).catch((err) => this.handleError(err, c)) : res ?? this.notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context.res;
      } catch (err) {
        return this.handleError(err, c);
      }
    })();
  }
  fetch = (request, ...rest) => {
    return this.dispatch(request, rest[1], rest[0], request.method);
  };
  request = (input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      if (requestInit !== void 0) {
        input = new Request(input, requestInit);
      }
      return this.fetch(input, Env, executionCtx);
    }
    input = input.toString();
    const path = /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`;
    const req = new Request(path, requestInit);
    return this.fetch(req, Env, executionCtx);
  };
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.dispatch(event.request, event, void 0, event.request.method));
    });
  };
};

// node_modules/hono/dist/router/reg-exp-router/node.js
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
var Node = class {
  index;
  varIndex;
  children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.children[regexpStr];
      if (!node) {
        if (Object.keys(this.children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.children[regexpStr] = new Node();
        if (name !== "") {
          node.varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.varIndex]);
      }
    } else {
      node = this.children[token];
      if (!node) {
        if (Object.keys(this.children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.children[token] = new Node();
      }
    }
    node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.children[k];
      return (typeof c.varIndex === "number" ? `(${k})@${c.varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.index === "number") {
      strList.unshift(`#${this.index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};

// node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie = class {
  context = { varIndex: 0 };
  root = new Node();
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.root.insert(tokens, index, paramAssoc, this.context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (typeof handlerIndex !== "undefined") {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (typeof paramIndex !== "undefined") {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};

// node_modules/hono/dist/router/reg-exp-router/router.js
var emptyParam = [];
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    path === "*" ? "" : `^${path.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
function buildMatcherFromPreprocessedRoutes(routes2) {
  const trie = new Trie();
  const handlerData = [];
  if (routes2.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes2.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
var RegExpRouter = class {
  name = "RegExpRouter";
  middleware;
  routes;
  constructor() {
    this.middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler) {
    const { middleware, routes: routes2 } = this;
    if (!middleware || !routes2) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes2].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          middleware[m][path] ||= findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes2).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes2[m]).forEach(
            (p) => re.test(p) && routes2[m][p].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes2).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes2[m][path2] ||= [
            ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes2[m][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match(method, path) {
    clearWildcardRegExpCache();
    const matchers = this.buildAllMatchers();
    this.match = (method2, path2) => {
      const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
      const staticMatch = matcher[2][path2];
      if (staticMatch) {
        return staticMatch;
      }
      const match = path2.match(matcher[0]);
      if (!match) {
        return [[], emptyParam];
      }
      const index = match.indexOf("", 1);
      return [matcher[1][index], match];
    };
    return this.match(method, path);
  }
  buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    [...Object.keys(this.routes), ...Object.keys(this.middleware)].forEach((method) => {
      matchers[method] ||= this.buildMatcher(method);
    });
    this.middleware = this.routes = void 0;
    return matchers;
  }
  buildMatcher(method) {
    const routes2 = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.middleware, this.routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes2.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes2.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes2);
    }
  }
};

// node_modules/hono/dist/router/smart-router/router.js
var SmartRouter = class {
  name = "SmartRouter";
  routers = [];
  routes = [];
  constructor(init) {
    Object.assign(this, init);
  }
  add(method, path, handler) {
    if (!this.routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.routes) {
      throw new Error("Fatal error");
    }
    const { routers, routes: routes2 } = this;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        routes2.forEach((args) => {
          router.add(...args);
        });
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.routers = [router];
      this.routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.routes || this.routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.routers[0];
  }
};

// node_modules/hono/dist/router/trie-router/node.js
var Node2 = class {
  methods;
  children;
  patterns;
  order = 0;
  name;
  params = /* @__PURE__ */ Object.create(null);
  constructor(method, handler, children) {
    this.children = children || /* @__PURE__ */ Object.create(null);
    this.methods = [];
    this.name = "";
    if (method && handler) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler, possibleKeys: [], score: 0, name: this.name };
      this.methods = [m];
    }
    this.patterns = [];
  }
  insert(method, path, handler) {
    this.name = `${method} ${path}`;
    this.order = ++this.order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p = parts[i];
      if (Object.keys(curNode.children).includes(p)) {
        curNode = curNode.children[p];
        const pattern2 = getPattern(p);
        if (pattern2) {
          possibleKeys.push(pattern2[1]);
        }
        continue;
      }
      curNode.children[p] = new Node2();
      const pattern = getPattern(p);
      if (pattern) {
        curNode.patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.children[p];
    }
    if (!curNode.methods.length) {
      curNode.methods = [];
    }
    const m = /* @__PURE__ */ Object.create(null);
    const handlerSet = {
      handler,
      possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
      name: this.name,
      score: this.order
    };
    m[method] = handlerSet;
    curNode.methods.push(m);
    return curNode;
  }
  gHSets(node, method, nodeParams, params) {
    const handlerSets = [];
    for (let i = 0, len = node.methods.length; i < len; i++) {
      const m = node.methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = /* @__PURE__ */ Object.create(null);
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSet.possibleKeys.forEach((key) => {
          const processed = processedSet[handlerSet.name];
          handlerSet.params[key] = params[key] && !processed ? params[key] : nodeParams[key] ?? params[key];
          processedSet[handlerSet.name] = true;
        });
        handlerSets.push(handlerSet);
      }
    }
    return handlerSets;
  }
  search(method, path) {
    const handlerSets = [];
    this.params = /* @__PURE__ */ Object.create(null);
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    for (let i = 0, len = parts.length; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.children[part];
        if (nextNode) {
          nextNode.params = node.params;
          if (isLast === true) {
            if (nextNode.children["*"]) {
              handlerSets.push(
                ...this.gHSets(nextNode.children["*"], method, node.params, /* @__PURE__ */ Object.create(null))
              );
            }
            handlerSets.push(...this.gHSets(nextNode, method, node.params, /* @__PURE__ */ Object.create(null)));
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.patterns.length; k < len3; k++) {
          const pattern = node.patterns[k];
          const params = { ...node.params };
          if (pattern === "*") {
            const astNode = node.children["*"];
            if (astNode) {
              handlerSets.push(...this.gHSets(astNode, method, node.params, /* @__PURE__ */ Object.create(null)));
              tempNodes.push(astNode);
            }
            continue;
          }
          if (part === "") {
            continue;
          }
          const [key, name, matcher] = pattern;
          const child = node.children[key];
          const restPathString = parts.slice(i).join("/");
          if (matcher instanceof RegExp && matcher.test(restPathString)) {
            params[name] = restPathString;
            handlerSets.push(...this.gHSets(child, method, node.params, params));
            continue;
          }
          if (matcher === true || matcher instanceof RegExp && matcher.test(part)) {
            if (typeof key === "string") {
              params[name] = part;
              if (isLast === true) {
                handlerSets.push(...this.gHSets(child, method, params, node.params));
                if (child.children["*"]) {
                  handlerSets.push(...this.gHSets(child.children["*"], method, params, node.params));
                }
              } else {
                child.params = params;
                tempNodes.push(child);
              }
            }
          }
        }
      }
      curNodes = tempNodes;
    }
    const results = handlerSets.sort((a, b) => {
      return a.score - b.score;
    });
    return [results.map(({ handler, params }) => [handler, params])];
  }
};

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  name = "TrieRouter";
  node;
  constructor() {
    this.node = new Node2();
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (const p of results) {
        this.node.insert(method, p, handler);
      }
      return;
    }
    this.node.insert(method, path, handler);
  }
  match(method, path) {
    return this.node.search(method, path);
  }
};

// node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
};

// node_modules/@google/generative-ai/dist/index.mjs
var POSSIBLE_ROLES = ["user", "model", "function", "system"];
var HarmCategory;
(function(HarmCategory2) {
  HarmCategory2["HARM_CATEGORY_UNSPECIFIED"] = "HARM_CATEGORY_UNSPECIFIED";
  HarmCategory2["HARM_CATEGORY_HATE_SPEECH"] = "HARM_CATEGORY_HATE_SPEECH";
  HarmCategory2["HARM_CATEGORY_SEXUALLY_EXPLICIT"] = "HARM_CATEGORY_SEXUALLY_EXPLICIT";
  HarmCategory2["HARM_CATEGORY_HARASSMENT"] = "HARM_CATEGORY_HARASSMENT";
  HarmCategory2["HARM_CATEGORY_DANGEROUS_CONTENT"] = "HARM_CATEGORY_DANGEROUS_CONTENT";
})(HarmCategory || (HarmCategory = {}));
var HarmBlockThreshold;
(function(HarmBlockThreshold2) {
  HarmBlockThreshold2["HARM_BLOCK_THRESHOLD_UNSPECIFIED"] = "HARM_BLOCK_THRESHOLD_UNSPECIFIED";
  HarmBlockThreshold2["BLOCK_LOW_AND_ABOVE"] = "BLOCK_LOW_AND_ABOVE";
  HarmBlockThreshold2["BLOCK_MEDIUM_AND_ABOVE"] = "BLOCK_MEDIUM_AND_ABOVE";
  HarmBlockThreshold2["BLOCK_ONLY_HIGH"] = "BLOCK_ONLY_HIGH";
  HarmBlockThreshold2["BLOCK_NONE"] = "BLOCK_NONE";
})(HarmBlockThreshold || (HarmBlockThreshold = {}));
var HarmProbability;
(function(HarmProbability2) {
  HarmProbability2["HARM_PROBABILITY_UNSPECIFIED"] = "HARM_PROBABILITY_UNSPECIFIED";
  HarmProbability2["NEGLIGIBLE"] = "NEGLIGIBLE";
  HarmProbability2["LOW"] = "LOW";
  HarmProbability2["MEDIUM"] = "MEDIUM";
  HarmProbability2["HIGH"] = "HIGH";
})(HarmProbability || (HarmProbability = {}));
var BlockReason;
(function(BlockReason2) {
  BlockReason2["BLOCKED_REASON_UNSPECIFIED"] = "BLOCKED_REASON_UNSPECIFIED";
  BlockReason2["SAFETY"] = "SAFETY";
  BlockReason2["OTHER"] = "OTHER";
})(BlockReason || (BlockReason = {}));
var FinishReason;
(function(FinishReason2) {
  FinishReason2["FINISH_REASON_UNSPECIFIED"] = "FINISH_REASON_UNSPECIFIED";
  FinishReason2["STOP"] = "STOP";
  FinishReason2["MAX_TOKENS"] = "MAX_TOKENS";
  FinishReason2["SAFETY"] = "SAFETY";
  FinishReason2["RECITATION"] = "RECITATION";
  FinishReason2["OTHER"] = "OTHER";
})(FinishReason || (FinishReason = {}));
var TaskType;
(function(TaskType2) {
  TaskType2["TASK_TYPE_UNSPECIFIED"] = "TASK_TYPE_UNSPECIFIED";
  TaskType2["RETRIEVAL_QUERY"] = "RETRIEVAL_QUERY";
  TaskType2["RETRIEVAL_DOCUMENT"] = "RETRIEVAL_DOCUMENT";
  TaskType2["SEMANTIC_SIMILARITY"] = "SEMANTIC_SIMILARITY";
  TaskType2["CLASSIFICATION"] = "CLASSIFICATION";
  TaskType2["CLUSTERING"] = "CLUSTERING";
})(TaskType || (TaskType = {}));
var FunctionCallingMode;
(function(FunctionCallingMode2) {
  FunctionCallingMode2["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
  FunctionCallingMode2["AUTO"] = "AUTO";
  FunctionCallingMode2["ANY"] = "ANY";
  FunctionCallingMode2["NONE"] = "NONE";
})(FunctionCallingMode || (FunctionCallingMode = {}));
var FunctionDeclarationSchemaType;
(function(FunctionDeclarationSchemaType2) {
  FunctionDeclarationSchemaType2["STRING"] = "STRING";
  FunctionDeclarationSchemaType2["NUMBER"] = "NUMBER";
  FunctionDeclarationSchemaType2["INTEGER"] = "INTEGER";
  FunctionDeclarationSchemaType2["BOOLEAN"] = "BOOLEAN";
  FunctionDeclarationSchemaType2["ARRAY"] = "ARRAY";
  FunctionDeclarationSchemaType2["OBJECT"] = "OBJECT";
})(FunctionDeclarationSchemaType || (FunctionDeclarationSchemaType = {}));
var GoogleGenerativeAIError = class extends Error {
  constructor(message) {
    super(`[GoogleGenerativeAI Error]: ${message}`);
  }
};
var GoogleGenerativeAIResponseError = class extends GoogleGenerativeAIError {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
};
var DEFAULT_BASE_URL = "https://generativelanguage.googleapis.com";
var DEFAULT_API_VERSION = "v1beta";
var PACKAGE_VERSION = "0.7.1";
var PACKAGE_LOG_HEADER = "genai-js";
var Task;
(function(Task2) {
  Task2["GENERATE_CONTENT"] = "generateContent";
  Task2["STREAM_GENERATE_CONTENT"] = "streamGenerateContent";
  Task2["COUNT_TOKENS"] = "countTokens";
  Task2["EMBED_CONTENT"] = "embedContent";
  Task2["BATCH_EMBED_CONTENTS"] = "batchEmbedContents";
})(Task || (Task = {}));
var RequestUrl = class {
  constructor(model, task, apiKey, stream, requestOptions) {
    this.model = model;
    this.task = task;
    this.apiKey = apiKey;
    this.stream = stream;
    this.requestOptions = requestOptions;
  }
  toString() {
    var _a, _b;
    const apiVersion = ((_a = this.requestOptions) === null || _a === void 0 ? void 0 : _a.apiVersion) || DEFAULT_API_VERSION;
    const baseUrl = ((_b = this.requestOptions) === null || _b === void 0 ? void 0 : _b.baseUrl) || DEFAULT_BASE_URL;
    let url = `${baseUrl}/${apiVersion}/${this.model}:${this.task}`;
    if (this.stream) {
      url += "?alt=sse";
    }
    return url;
  }
};
function getClientHeaders(requestOptions) {
  const clientHeaders = [];
  if (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.apiClient) {
    clientHeaders.push(requestOptions.apiClient);
  }
  clientHeaders.push(`${PACKAGE_LOG_HEADER}/${PACKAGE_VERSION}`);
  return clientHeaders.join(" ");
}
async function getHeaders(url) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("x-goog-api-client", getClientHeaders(url.requestOptions));
  headers.append("x-goog-api-key", url.apiKey);
  return headers;
}
async function constructRequest(model, task, apiKey, stream, body, requestOptions) {
  const url = new RequestUrl(model, task, apiKey, stream, requestOptions);
  return {
    url: url.toString(),
    fetchOptions: Object.assign(Object.assign({}, buildFetchOptions(requestOptions)), { method: "POST", headers: await getHeaders(url), body })
  };
}
async function makeRequest(model, task, apiKey, stream, body, requestOptions) {
  return _makeRequestInternal(model, task, apiKey, stream, body, requestOptions, fetch);
}
async function _makeRequestInternal(model, task, apiKey, stream, body, requestOptions, fetchFn = fetch) {
  const url = new RequestUrl(model, task, apiKey, stream, requestOptions);
  let response;
  try {
    const request = await constructRequest(model, task, apiKey, stream, body, requestOptions);
    response = await fetchFn(request.url, request.fetchOptions);
    if (!response.ok) {
      let message = "";
      try {
        const json = await response.json();
        message = json.error.message;
        if (json.error.details) {
          message += ` ${JSON.stringify(json.error.details)}`;
        }
      } catch (e) {
      }
      throw new Error(`[${response.status} ${response.statusText}] ${message}`);
    }
  } catch (e) {
    const err = new GoogleGenerativeAIError(`Error fetching from ${url.toString()}: ${e.message}`);
    err.stack = e.stack;
    throw err;
  }
  return response;
}
function buildFetchOptions(requestOptions) {
  const fetchOptions = {};
  if ((requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeout) >= 0) {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setTimeout(() => abortController.abort(), requestOptions.timeout);
    fetchOptions.signal = signal;
  }
  return fetchOptions;
}
function addHelpers(response) {
  response.text = () => {
    if (response.candidates && response.candidates.length > 0) {
      if (response.candidates.length > 1) {
        console.warn(`This response had ${response.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`);
      }
      if (hadBadFinishReason(response.candidates[0])) {
        throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
      }
      return getText(response);
    } else if (response.promptFeedback) {
      throw new GoogleGenerativeAIResponseError(`Text not available. ${formatBlockErrorMessage(response)}`, response);
    }
    return "";
  };
  response.functionCall = () => {
    if (response.candidates && response.candidates.length > 0) {
      if (response.candidates.length > 1) {
        console.warn(`This response had ${response.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`);
      }
      if (hadBadFinishReason(response.candidates[0])) {
        throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
      }
      console.warn(`response.functionCall() is deprecated. Use response.functionCalls() instead.`);
      return getFunctionCalls(response)[0];
    } else if (response.promptFeedback) {
      throw new GoogleGenerativeAIResponseError(`Function call not available. ${formatBlockErrorMessage(response)}`, response);
    }
    return void 0;
  };
  response.functionCalls = () => {
    if (response.candidates && response.candidates.length > 0) {
      if (response.candidates.length > 1) {
        console.warn(`This response had ${response.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`);
      }
      if (hadBadFinishReason(response.candidates[0])) {
        throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
      }
      return getFunctionCalls(response);
    } else if (response.promptFeedback) {
      throw new GoogleGenerativeAIResponseError(`Function call not available. ${formatBlockErrorMessage(response)}`, response);
    }
    return void 0;
  };
  return response;
}
function getText(response) {
  var _a, _b, _c, _d;
  if ((_d = (_c = (_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0].content) === null || _b === void 0 ? void 0 : _b.parts) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.text) {
    return response.candidates[0].content.parts.map(({ text }) => text).join("");
  } else {
    return "";
  }
}
function getFunctionCalls(response) {
  var _a, _b, _c, _d;
  const functionCalls = [];
  if ((_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0].content) === null || _b === void 0 ? void 0 : _b.parts) {
    for (const part of (_d = (_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0].content) === null || _d === void 0 ? void 0 : _d.parts) {
      if (part.functionCall) {
        functionCalls.push(part.functionCall);
      }
    }
  }
  if (functionCalls.length > 0) {
    return functionCalls;
  } else {
    return void 0;
  }
}
var badFinishReasons = [FinishReason.RECITATION, FinishReason.SAFETY];
function hadBadFinishReason(candidate) {
  return !!candidate.finishReason && badFinishReasons.includes(candidate.finishReason);
}
function formatBlockErrorMessage(response) {
  var _a, _b, _c;
  let message = "";
  if ((!response.candidates || response.candidates.length === 0) && response.promptFeedback) {
    message += "Response was blocked";
    if ((_a = response.promptFeedback) === null || _a === void 0 ? void 0 : _a.blockReason) {
      message += ` due to ${response.promptFeedback.blockReason}`;
    }
    if ((_b = response.promptFeedback) === null || _b === void 0 ? void 0 : _b.blockReasonMessage) {
      message += `: ${response.promptFeedback.blockReasonMessage}`;
    }
  } else if ((_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0]) {
    const firstCandidate = response.candidates[0];
    if (hadBadFinishReason(firstCandidate)) {
      message += `Candidate was blocked due to ${firstCandidate.finishReason}`;
      if (firstCandidate.finishMessage) {
        message += `: ${firstCandidate.finishMessage}`;
      }
    }
  }
  return message;
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function verb(n) {
    if (g[n]) i[n] = function(v) {
      return new Promise(function(a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
var responseLineRE = /^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;
function processStream(response) {
  const inputStream = response.body.pipeThrough(new TextDecoderStream("utf8", { fatal: true }));
  const responseStream = getResponseStream(inputStream);
  const [stream1, stream2] = responseStream.tee();
  return {
    stream: generateResponseSequence(stream1),
    response: getResponsePromise(stream2)
  };
}
async function getResponsePromise(stream) {
  const allResponses = [];
  const reader = stream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      return addHelpers(aggregateResponses(allResponses));
    }
    allResponses.push(value);
  }
}
function generateResponseSequence(stream) {
  return __asyncGenerator(this, arguments, function* generateResponseSequence_1() {
    const reader = stream.getReader();
    while (true) {
      const { value, done } = yield __await(reader.read());
      if (done) {
        break;
      }
      yield yield __await(addHelpers(value));
    }
  });
}
function getResponseStream(inputStream) {
  const reader = inputStream.getReader();
  const stream = new ReadableStream({
    start(controller) {
      let currentText = "";
      return pump();
      function pump() {
        return reader.read().then(({ value, done }) => {
          if (done) {
            if (currentText.trim()) {
              controller.error(new GoogleGenerativeAIError("Failed to parse stream"));
              return;
            }
            controller.close();
            return;
          }
          currentText += value;
          let match = currentText.match(responseLineRE);
          let parsedResponse;
          while (match) {
            try {
              parsedResponse = JSON.parse(match[1]);
            } catch (e) {
              controller.error(new GoogleGenerativeAIError(`Error parsing JSON response: "${match[1]}"`));
              return;
            }
            controller.enqueue(parsedResponse);
            currentText = currentText.substring(match[0].length);
            match = currentText.match(responseLineRE);
          }
          return pump();
        });
      }
    }
  });
  return stream;
}
function aggregateResponses(responses) {
  const lastResponse = responses[responses.length - 1];
  const aggregatedResponse = {
    promptFeedback: lastResponse === null || lastResponse === void 0 ? void 0 : lastResponse.promptFeedback
  };
  for (const response of responses) {
    if (response.candidates) {
      for (const candidate of response.candidates) {
        const i = candidate.index;
        if (!aggregatedResponse.candidates) {
          aggregatedResponse.candidates = [];
        }
        if (!aggregatedResponse.candidates[i]) {
          aggregatedResponse.candidates[i] = {
            index: candidate.index
          };
        }
        aggregatedResponse.candidates[i].citationMetadata = candidate.citationMetadata;
        aggregatedResponse.candidates[i].finishReason = candidate.finishReason;
        aggregatedResponse.candidates[i].finishMessage = candidate.finishMessage;
        aggregatedResponse.candidates[i].safetyRatings = candidate.safetyRatings;
        if (candidate.content && candidate.content.parts) {
          if (!aggregatedResponse.candidates[i].content) {
            aggregatedResponse.candidates[i].content = {
              role: candidate.content.role || "user",
              parts: []
            };
          }
          const newPart = {};
          for (const part of candidate.content.parts) {
            if (part.text) {
              newPart.text = part.text;
            }
            if (part.functionCall) {
              newPart.functionCall = part.functionCall;
            }
            if (Object.keys(newPart).length === 0) {
              newPart.text = "";
            }
            aggregatedResponse.candidates[i].content.parts.push(newPart);
          }
        }
      }
    }
  }
  return aggregatedResponse;
}
async function generateContentStream(apiKey, model, params, requestOptions) {
  const response = await makeRequest(
    model,
    Task.STREAM_GENERATE_CONTENT,
    apiKey,
    /* stream */
    true,
    JSON.stringify(params),
    requestOptions
  );
  return processStream(response);
}
async function generateContent(apiKey, model, params, requestOptions) {
  const response = await makeRequest(
    model,
    Task.GENERATE_CONTENT,
    apiKey,
    /* stream */
    false,
    JSON.stringify(params),
    requestOptions
  );
  const responseJson = await response.json();
  const enhancedResponse = addHelpers(responseJson);
  return {
    response: enhancedResponse
  };
}
function formatNewContent(request) {
  let newParts = [];
  if (typeof request === "string") {
    newParts = [{ text: request }];
  } else {
    for (const partOrString of request) {
      if (typeof partOrString === "string") {
        newParts.push({ text: partOrString });
      } else {
        newParts.push(partOrString);
      }
    }
  }
  return assignRoleToPartsAndValidateSendMessageRequest(newParts);
}
function assignRoleToPartsAndValidateSendMessageRequest(parts) {
  const userContent = { role: "user", parts: [] };
  const functionContent = { role: "function", parts: [] };
  let hasUserContent = false;
  let hasFunctionContent = false;
  for (const part of parts) {
    if ("functionResponse" in part) {
      functionContent.parts.push(part);
      hasFunctionContent = true;
    } else {
      userContent.parts.push(part);
      hasUserContent = true;
    }
  }
  if (hasUserContent && hasFunctionContent) {
    throw new GoogleGenerativeAIError("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");
  }
  if (!hasUserContent && !hasFunctionContent) {
    throw new GoogleGenerativeAIError("No content is provided for sending chat message.");
  }
  if (hasUserContent) {
    return userContent;
  }
  return functionContent;
}
function formatGenerateContentInput(params) {
  if (params.contents) {
    return params;
  } else {
    const content = formatNewContent(params);
    return { contents: [content] };
  }
}
function formatEmbedContentInput(params) {
  if (typeof params === "string" || Array.isArray(params)) {
    const content = formatNewContent(params);
    return { content };
  }
  return params;
}
var VALID_PART_FIELDS = [
  "text",
  "inlineData",
  "functionCall",
  "functionResponse"
];
var VALID_PARTS_PER_ROLE = {
  user: ["text", "inlineData"],
  function: ["functionResponse"],
  model: ["text", "functionCall"],
  // System instructions shouldn't be in history anyway.
  system: ["text"]
};
var VALID_PREVIOUS_CONTENT_ROLES = {
  user: ["model"],
  function: ["model"],
  model: ["user", "function"],
  // System instructions shouldn't be in history.
  system: []
};
function validateChatHistory(history) {
  let prevContent;
  for (const currContent of history) {
    const { role, parts } = currContent;
    if (!prevContent && role !== "user") {
      throw new GoogleGenerativeAIError(`First content should be with role 'user', got ${role}`);
    }
    if (!POSSIBLE_ROLES.includes(role)) {
      throw new GoogleGenerativeAIError(`Each item should include role field. Got ${role} but valid roles are: ${JSON.stringify(POSSIBLE_ROLES)}`);
    }
    if (!Array.isArray(parts)) {
      throw new GoogleGenerativeAIError("Content should have 'parts' property with an array of Parts");
    }
    if (parts.length === 0) {
      throw new GoogleGenerativeAIError("Each Content should have at least one part");
    }
    const countFields = {
      text: 0,
      inlineData: 0,
      functionCall: 0,
      functionResponse: 0
    };
    for (const part of parts) {
      for (const key of VALID_PART_FIELDS) {
        if (key in part) {
          countFields[key] += 1;
        }
      }
    }
    const validParts = VALID_PARTS_PER_ROLE[role];
    for (const key of VALID_PART_FIELDS) {
      if (!validParts.includes(key) && countFields[key] > 0) {
        throw new GoogleGenerativeAIError(`Content with role '${role}' can't contain '${key}' part`);
      }
    }
    if (prevContent) {
      const validPreviousContentRoles = VALID_PREVIOUS_CONTENT_ROLES[role];
      if (!validPreviousContentRoles.includes(prevContent.role)) {
        throw new GoogleGenerativeAIError(`Content with role '${role}' can't follow '${prevContent.role}'. Valid previous roles: ${JSON.stringify(VALID_PREVIOUS_CONTENT_ROLES)}`);
      }
    }
    prevContent = currContent;
  }
}
var SILENT_ERROR = "SILENT_ERROR";
var ChatSession = class {
  constructor(apiKey, model, params, requestOptions) {
    this.model = model;
    this.params = params;
    this.requestOptions = requestOptions;
    this._history = [];
    this._sendPromise = Promise.resolve();
    this._apiKey = apiKey;
    if (params === null || params === void 0 ? void 0 : params.history) {
      validateChatHistory(params.history);
      this._history = params.history;
    }
  }
  /**
   * Gets the chat history so far. Blocked prompts are not added to history.
   * Blocked candidates are not added to history, nor are the prompts that
   * generated them.
   */
  async getHistory() {
    await this._sendPromise;
    return this._history;
  }
  /**
   * Sends a chat message and receives a non-streaming
   * {@link GenerateContentResult}
   */
  async sendMessage(request) {
    var _a, _b, _c, _d, _e;
    await this._sendPromise;
    const newContent = formatNewContent(request);
    const generateContentRequest = {
      safetySettings: (_a = this.params) === null || _a === void 0 ? void 0 : _a.safetySettings,
      generationConfig: (_b = this.params) === null || _b === void 0 ? void 0 : _b.generationConfig,
      tools: (_c = this.params) === null || _c === void 0 ? void 0 : _c.tools,
      toolConfig: (_d = this.params) === null || _d === void 0 ? void 0 : _d.toolConfig,
      systemInstruction: (_e = this.params) === null || _e === void 0 ? void 0 : _e.systemInstruction,
      contents: [...this._history, newContent]
    };
    let finalResult;
    this._sendPromise = this._sendPromise.then(() => generateContent(this._apiKey, this.model, generateContentRequest, this.requestOptions)).then((result) => {
      var _a2;
      if (result.response.candidates && result.response.candidates.length > 0) {
        this._history.push(newContent);
        const responseContent = Object.assign({
          parts: [],
          // Response seems to come back without a role set.
          role: "model"
        }, (_a2 = result.response.candidates) === null || _a2 === void 0 ? void 0 : _a2[0].content);
        this._history.push(responseContent);
      } else {
        const blockErrorMessage = formatBlockErrorMessage(result.response);
        if (blockErrorMessage) {
          console.warn(`sendMessage() was unsuccessful. ${blockErrorMessage}. Inspect response object for details.`);
        }
      }
      finalResult = result;
    });
    await this._sendPromise;
    return finalResult;
  }
  /**
   * Sends a chat message and receives the response as a
   * {@link GenerateContentStreamResult} containing an iterable stream
   * and a response promise.
   */
  async sendMessageStream(request) {
    var _a, _b, _c, _d, _e;
    await this._sendPromise;
    const newContent = formatNewContent(request);
    const generateContentRequest = {
      safetySettings: (_a = this.params) === null || _a === void 0 ? void 0 : _a.safetySettings,
      generationConfig: (_b = this.params) === null || _b === void 0 ? void 0 : _b.generationConfig,
      tools: (_c = this.params) === null || _c === void 0 ? void 0 : _c.tools,
      toolConfig: (_d = this.params) === null || _d === void 0 ? void 0 : _d.toolConfig,
      systemInstruction: (_e = this.params) === null || _e === void 0 ? void 0 : _e.systemInstruction,
      contents: [...this._history, newContent]
    };
    const streamPromise = generateContentStream(this._apiKey, this.model, generateContentRequest, this.requestOptions);
    this._sendPromise = this._sendPromise.then(() => streamPromise).catch((_ignored) => {
      throw new Error(SILENT_ERROR);
    }).then((streamResult) => streamResult.response).then((response) => {
      if (response.candidates && response.candidates.length > 0) {
        this._history.push(newContent);
        const responseContent = Object.assign({}, response.candidates[0].content);
        if (!responseContent.role) {
          responseContent.role = "model";
        }
        this._history.push(responseContent);
      } else {
        const blockErrorMessage = formatBlockErrorMessage(response);
        if (blockErrorMessage) {
          console.warn(`sendMessageStream() was unsuccessful. ${blockErrorMessage}. Inspect response object for details.`);
        }
      }
    }).catch((e) => {
      if (e.message !== SILENT_ERROR) {
        console.error(e);
      }
    });
    return streamPromise;
  }
};
async function countTokens(apiKey, model, params, requestOptions) {
  const response = await makeRequest(model, Task.COUNT_TOKENS, apiKey, false, JSON.stringify(Object.assign(Object.assign({}, params), { model })), requestOptions);
  return response.json();
}
async function embedContent(apiKey, model, params, requestOptions) {
  const response = await makeRequest(model, Task.EMBED_CONTENT, apiKey, false, JSON.stringify(params), requestOptions);
  return response.json();
}
async function batchEmbedContents(apiKey, model, params, requestOptions) {
  const requestsWithModel = params.requests.map((request) => {
    return Object.assign(Object.assign({}, request), { model });
  });
  const response = await makeRequest(model, Task.BATCH_EMBED_CONTENTS, apiKey, false, JSON.stringify({ requests: requestsWithModel }), requestOptions);
  return response.json();
}
var GenerativeModel = class {
  constructor(apiKey, modelParams, requestOptions) {
    this.apiKey = apiKey;
    if (modelParams.model.includes("/")) {
      this.model = modelParams.model;
    } else {
      this.model = `models/${modelParams.model}`;
    }
    this.generationConfig = modelParams.generationConfig || {};
    this.safetySettings = modelParams.safetySettings || [];
    this.tools = modelParams.tools;
    this.toolConfig = modelParams.toolConfig;
    this.systemInstruction = modelParams.systemInstruction;
    this.requestOptions = requestOptions || {};
  }
  /**
   * Makes a single non-streaming call to the model
   * and returns an object containing a single {@link GenerateContentResponse}.
   */
  async generateContent(request) {
    const formattedParams = formatGenerateContentInput(request);
    return generateContent(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction }, formattedParams), this.requestOptions);
  }
  /**
   * Makes a single streaming call to the model
   * and returns an object containing an iterable stream that iterates
   * over all chunks in the streaming response as well as
   * a promise that returns the final aggregated response.
   */
  async generateContentStream(request) {
    const formattedParams = formatGenerateContentInput(request);
    return generateContentStream(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction }, formattedParams), this.requestOptions);
  }
  /**
   * Gets a new {@link ChatSession} instance which can be used for
   * multi-turn chats.
   */
  startChat(startChatParams) {
    return new ChatSession(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction }, startChatParams), this.requestOptions);
  }
  /**
   * Counts the tokens in the provided request.
   */
  async countTokens(request) {
    const formattedParams = formatGenerateContentInput(request);
    return countTokens(this.apiKey, this.model, formattedParams, this.requestOptions);
  }
  /**
   * Embeds the provided content.
   */
  async embedContent(request) {
    const formattedParams = formatEmbedContentInput(request);
    return embedContent(this.apiKey, this.model, formattedParams, this.requestOptions);
  }
  /**
   * Embeds an array of {@link EmbedContentRequest}s.
   */
  async batchEmbedContents(batchEmbedContentRequest) {
    return batchEmbedContents(this.apiKey, this.model, batchEmbedContentRequest, this.requestOptions);
  }
};
var GoogleGenerativeAI = class {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }
  /**
   * Gets a {@link GenerativeModel} instance for the provided model name.
   */
  getGenerativeModel(modelParams, requestOptions) {
    if (!modelParams.model) {
      throw new GoogleGenerativeAIError(`Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })`);
    }
    return new GenerativeModel(this.apiKey, modelParams, requestOptions);
  }
};

// node_modules/@langchain/core/dist/utils/env.js
var isBrowser = () => typeof window !== "undefined" && typeof window.document !== "undefined";
var isWebWorker = () => typeof globalThis === "object" && globalThis.constructor && globalThis.constructor.name === "DedicatedWorkerGlobalScope";
var isJsDom = () => typeof window !== "undefined" && window.name === "nodejs" || typeof navigator !== "undefined" && (navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom"));
var isDeno = () => typeof Deno !== "undefined";
var isNode = () => typeof process !== "undefined" && typeof process.versions !== "undefined" && typeof process.versions.node !== "undefined" && !isDeno();
var getEnv = () => {
  let env;
  if (isBrowser()) {
    env = "browser";
  } else if (isNode()) {
    env = "node";
  } else if (isWebWorker()) {
    env = "webworker";
  } else if (isJsDom()) {
    env = "jsdom";
  } else if (isDeno()) {
    env = "deno";
  } else {
    env = "other";
  }
  return env;
};
var runtimeEnvironment;
async function getRuntimeEnvironment() {
  if (runtimeEnvironment === void 0) {
    const env = getEnv();
    runtimeEnvironment = {
      library: "langchain-js",
      runtime: env
    };
  }
  return runtimeEnvironment;
}
function getEnvironmentVariable(name) {
  try {
    return typeof process !== "undefined" ? (
      // eslint-disable-next-line no-process-env
      process.env?.[name]
    ) : void 0;
  } catch (e) {
    return void 0;
  }
}

// node_modules/zod-to-json-schema/dist/esm/Options.js
var ignoreOverride = Symbol("Let zodToJsonSchema decide on which parser to use");
var defaultOptions = {
  name: void 0,
  $refStrategy: "root",
  basePath: ["#"],
  effectStrategy: "input",
  pipeStrategy: "all",
  dateStrategy: "format:date-time",
  mapStrategy: "entries",
  removeAdditionalStrategy: "passthrough",
  definitionPath: "definitions",
  target: "jsonSchema7",
  strictUnions: false,
  definitions: {},
  errorMessages: false,
  markdownDescription: false,
  patternStrategy: "escape",
  applyRegexFlags: false,
  emailStrategy: "format:email",
  base64Strategy: "contentEncoding:base64",
  nameStrategy: "ref"
};
var getDefaultOptions = (options) => typeof options === "string" ? {
  ...defaultOptions,
  name: options
} : {
  ...defaultOptions,
  ...options
};

// node_modules/zod-to-json-schema/dist/esm/Refs.js
var getRefs = (options) => {
  const _options = getDefaultOptions(options);
  const currentPath = _options.name !== void 0 ? [..._options.basePath, _options.definitionPath, _options.name] : _options.basePath;
  return {
    ..._options,
    currentPath,
    propertyPath: void 0,
    seen: new Map(Object.entries(_options.definitions).map(([name, def]) => [
      def._def,
      {
        def: def._def,
        path: [..._options.basePath, _options.definitionPath, name],
        // Resolution of references will be forced even though seen, so it's ok that the schema is undefined here for now.
        jsonSchema: void 0
      }
    ]))
  };
};

// node_modules/zod-to-json-schema/dist/esm/errorMessages.js
function addErrorMessage(res, key, errorMessage, refs) {
  if (!refs?.errorMessages)
    return;
  if (errorMessage) {
    res.errorMessage = {
      ...res.errorMessage,
      [key]: errorMessage
    };
  }
}
function setResponseValueAndErrors(res, key, value, errorMessage, refs) {
  res[key] = value;
  addErrorMessage(res, key, errorMessage, refs);
}

// node_modules/zod/lib/index.mjs
var util;
(function(util2) {
  util2.assertEqual = (val) => val;
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = class _ZodError extends Error {
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  get errors() {
    return this.issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof _ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
        fieldErrors[sub.path[0]].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var overrideErrorMap = errorMap;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}
var makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      ctx.schemaErrorMap,
      overrideMap,
      overrideMap === errorMap ? void 0 : errorMap
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
var ParseStatus = class _ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return _ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
})(errorUtil || (errorUtil = {}));
var _ZodEnum_cache;
var _ZodNativeEnum_cache;
var ParseInputLazyPath = class {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (this._key instanceof Array) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    var _a, _b;
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message !== null && message !== void 0 ? message : ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: (_a = message !== null && message !== void 0 ? message : required_error) !== null && _a !== void 0 ? _a : ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: (_b = message !== null && message !== void 0 ? message : invalid_type_error) !== null && _b !== void 0 ? _b : ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
var ZodType = class {
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    var _a;
    const ctx = {
      common: {
        issues: [],
        async: (_a = params === null || params === void 0 ? void 0 : params.async) !== null && _a !== void 0 ? _a : false,
        contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap
      },
      path: (params === null || params === void 0 ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
        async: true
      },
      path: (params === null || params === void 0 ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this, this._def);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv6Regex = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let regex2 = `([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d`;
  if (args.precision) {
    regex2 = `${regex2}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    regex2 = `${regex2}(\\.\\d+)?`;
  }
  return regex2;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex2 = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex2 = `${regex2}(${opts.join("|")})`;
  return new RegExp(`^${regex2}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
var ZodString = class _ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch (_a) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex2 = datetimeRegex(check);
        if (!regex2.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex2 = dateRegex;
        if (!regex2.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex2 = timeRegex(check);
        if (!regex2.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex2, validation, message) {
    return this.refinement((data) => regex2.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    var _a, _b;
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
      offset: (_a = options === null || options === void 0 ? void 0 : options.offset) !== null && _a !== void 0 ? _a : false,
      local: (_b = options === null || options === void 0 ? void 0 : options.local) !== null && _b !== void 0 ? _b : false,
      ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
      ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex2, message) {
    return this._addCheck({
      kind: "regex",
      regex: regex2,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options === null || options === void 0 ? void 0 : options.position,
      ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * @deprecated Use z.string().min(1) instead.
   * @see {@link ZodString.min}
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params) => {
  var _a;
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / Math.pow(10, decCount);
}
var ZodNumber = class _ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null, min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class _ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = BigInt(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.bigint,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodBigInt.create = (params) => {
  var _a;
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class _ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new _ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class _ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new _ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new _ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new _ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
var ZodObject = class _ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    return this._cached = { shape, keys };
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") ;
      else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          var _a, _b, _c, _d;
          const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: (_d = errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new _ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new _ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new _ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    util.objectKeys(mask).forEach((key) => {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    });
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    util.objectKeys(this.shape).forEach((key) => {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    });
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    util.objectKeys(this.shape).forEach((key) => {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    });
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    util.objectKeys(this.shape).forEach((key) => {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    });
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};
var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new _ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
var ZodIntersection = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class _ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new _ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class _ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new _ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new _ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class _ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new _ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new _ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class _ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new _ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new _ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new _ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var ZodEnum = class _ZodEnum extends ZodType {
  constructor() {
    super(...arguments);
    _ZodEnum_cache.set(this, void 0);
  }
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f")) {
      __classPrivateFieldSet(this, _ZodEnum_cache, new Set(this._def.values), "f");
    }
    if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f").has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return _ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
};
_ZodEnum_cache = /* @__PURE__ */ new WeakMap();
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  constructor() {
    super(...arguments);
    _ZodNativeEnum_cache.set(this, void 0);
  }
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f")) {
      __classPrivateFieldSet(this, _ZodNativeEnum_cache, new Set(util.getValidEnumValues(this._def.values)), "f");
    }
    if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f").has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
_ZodNativeEnum_cache = /* @__PURE__ */ new WeakMap();
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return base;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return base;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class _ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new _ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var ZodReadonly = class extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function custom(check, params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      var _a, _b;
      if (!check(data)) {
        const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
        const _fatal = (_b = (_a = p.fatal) !== null && _a !== void 0 ? _a : fatal) !== null && _b !== void 0 ? _b : true;
        const p2 = typeof p === "string" ? { message: p } : p;
        ctx.addIssue({ code: "custom", ...p2, fatal: _fatal });
      }
    });
  return ZodAny.create();
}
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: (arg) => ZodString.create({ ...arg, coerce: true }),
  number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
  boolean: (arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  }),
  bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
  date: (arg) => ZodDate.create({ ...arg, coerce: true })
};
var NEVER = INVALID;
var z = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: errorMap,
  setErrorMap,
  getErrorMap,
  makeIssue,
  EMPTY_PATH,
  addIssueToContext,
  ParseStatus,
  INVALID,
  DIRTY,
  OK,
  isAborted,
  isDirty,
  isValid,
  isAsync,
  get util() {
    return util;
  },
  get objectUtil() {
    return objectUtil;
  },
  ZodParsedType,
  getParsedType,
  ZodType,
  datetimeRegex,
  ZodString,
  ZodNumber,
  ZodBigInt,
  ZodBoolean,
  ZodDate,
  ZodSymbol,
  ZodUndefined,
  ZodNull,
  ZodAny,
  ZodUnknown,
  ZodNever,
  ZodVoid,
  ZodArray,
  ZodObject,
  ZodUnion,
  ZodDiscriminatedUnion,
  ZodIntersection,
  ZodTuple,
  ZodRecord,
  ZodMap,
  ZodSet,
  ZodFunction,
  ZodLazy,
  ZodLiteral,
  ZodEnum,
  ZodNativeEnum,
  ZodPromise,
  ZodEffects,
  ZodTransformer: ZodEffects,
  ZodOptional,
  ZodNullable,
  ZodDefault,
  ZodCatch,
  ZodNaN,
  BRAND,
  ZodBranded,
  ZodPipeline,
  ZodReadonly,
  custom,
  Schema: ZodType,
  ZodSchema: ZodType,
  late,
  get ZodFirstPartyTypeKind() {
    return ZodFirstPartyTypeKind;
  },
  coerce,
  any: anyType,
  array: arrayType,
  bigint: bigIntType,
  boolean: booleanType,
  date: dateType,
  discriminatedUnion: discriminatedUnionType,
  effect: effectsType,
  "enum": enumType,
  "function": functionType,
  "instanceof": instanceOfType,
  intersection: intersectionType,
  lazy: lazyType,
  literal: literalType,
  map: mapType,
  nan: nanType,
  nativeEnum: nativeEnumType,
  never: neverType,
  "null": nullType,
  nullable: nullableType,
  number: numberType,
  object: objectType,
  oboolean,
  onumber,
  optional: optionalType,
  ostring,
  pipeline: pipelineType,
  preprocess: preprocessType,
  promise: promiseType,
  record: recordType,
  set: setType,
  strictObject: strictObjectType,
  string: stringType,
  symbol: symbolType,
  transformer: effectsType,
  tuple: tupleType,
  "undefined": undefinedType,
  union: unionType,
  unknown: unknownType,
  "void": voidType,
  NEVER,
  ZodIssueCode,
  quotelessJson,
  ZodError
});

// node_modules/zod-to-json-schema/dist/esm/parsers/any.js
function parseAnyDef() {
  return {};
}

// node_modules/zod-to-json-schema/dist/esm/parsers/array.js
function parseArrayDef(def, refs) {
  const res = {
    type: "array"
  };
  if (def.type?._def?.typeName !== ZodFirstPartyTypeKind.ZodAny) {
    res.items = parseDef(def.type._def, {
      ...refs,
      currentPath: [...refs.currentPath, "items"]
    });
  }
  if (def.minLength) {
    setResponseValueAndErrors(res, "minItems", def.minLength.value, def.minLength.message, refs);
  }
  if (def.maxLength) {
    setResponseValueAndErrors(res, "maxItems", def.maxLength.value, def.maxLength.message, refs);
  }
  if (def.exactLength) {
    setResponseValueAndErrors(res, "minItems", def.exactLength.value, def.exactLength.message, refs);
    setResponseValueAndErrors(res, "maxItems", def.exactLength.value, def.exactLength.message, refs);
  }
  return res;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/bigint.js
function parseBigintDef(def, refs) {
  const res = {
    type: "integer",
    format: "int64"
  };
  if (!def.checks)
    return res;
  for (const check of def.checks) {
    switch (check.kind) {
      case "min":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMinimum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMinimum = true;
          }
          setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
        }
        break;
      case "max":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMaximum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMaximum = true;
          }
          setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
        }
        break;
      case "multipleOf":
        setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
        break;
    }
  }
  return res;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/boolean.js
function parseBooleanDef() {
  return {
    type: "boolean"
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/branded.js
function parseBrandedDef(_def, refs) {
  return parseDef(_def.type._def, refs);
}

// node_modules/zod-to-json-schema/dist/esm/parsers/catch.js
var parseCatchDef = (def, refs) => {
  return parseDef(def.innerType._def, refs);
};

// node_modules/zod-to-json-schema/dist/esm/parsers/date.js
function parseDateDef(def, refs, overrideDateStrategy) {
  const strategy = overrideDateStrategy ?? refs.dateStrategy;
  if (Array.isArray(strategy)) {
    return {
      anyOf: strategy.map((item, i) => parseDateDef(def, refs, item))
    };
  }
  switch (strategy) {
    case "string":
    case "format:date-time":
      return {
        type: "string",
        format: "date-time"
      };
    case "format:date":
      return {
        type: "string",
        format: "date"
      };
    case "integer":
      return integerDateParser(def, refs);
  }
}
var integerDateParser = (def, refs) => {
  const res = {
    type: "integer",
    format: "unix-time"
  };
  if (refs.target === "openApi3") {
    return res;
  }
  for (const check of def.checks) {
    switch (check.kind) {
      case "min":
        setResponseValueAndErrors(
          res,
          "minimum",
          check.value,
          // This is in milliseconds
          check.message,
          refs
        );
        break;
      case "max":
        setResponseValueAndErrors(
          res,
          "maximum",
          check.value,
          // This is in milliseconds
          check.message,
          refs
        );
        break;
    }
  }
  return res;
};

// node_modules/zod-to-json-schema/dist/esm/parsers/default.js
function parseDefaultDef(_def, refs) {
  return {
    ...parseDef(_def.innerType._def, refs),
    default: _def.defaultValue()
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/effects.js
function parseEffectsDef(_def, refs) {
  return refs.effectStrategy === "input" ? parseDef(_def.schema._def, refs) : {};
}

// node_modules/zod-to-json-schema/dist/esm/parsers/enum.js
function parseEnumDef(def) {
  return {
    type: "string",
    enum: def.values
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/intersection.js
var isJsonSchema7AllOfType = (type) => {
  if ("type" in type && type.type === "string")
    return false;
  return "allOf" in type;
};
function parseIntersectionDef(def, refs) {
  const allOf = [
    parseDef(def.left._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "0"]
    }),
    parseDef(def.right._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "1"]
    })
  ].filter((x) => !!x);
  let unevaluatedProperties = refs.target === "jsonSchema2019-09" ? { unevaluatedProperties: false } : void 0;
  const mergedAllOf = [];
  allOf.forEach((schema) => {
    if (isJsonSchema7AllOfType(schema)) {
      mergedAllOf.push(...schema.allOf);
      if (schema.unevaluatedProperties === void 0) {
        unevaluatedProperties = void 0;
      }
    } else {
      let nestedSchema = schema;
      if ("additionalProperties" in schema && schema.additionalProperties === false) {
        const { additionalProperties, ...rest } = schema;
        nestedSchema = rest;
      } else {
        unevaluatedProperties = void 0;
      }
      mergedAllOf.push(nestedSchema);
    }
  });
  return mergedAllOf.length ? {
    allOf: mergedAllOf,
    ...unevaluatedProperties
  } : void 0;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/literal.js
function parseLiteralDef(def, refs) {
  const parsedType = typeof def.value;
  if (parsedType !== "bigint" && parsedType !== "number" && parsedType !== "boolean" && parsedType !== "string") {
    return {
      type: Array.isArray(def.value) ? "array" : "object"
    };
  }
  if (refs.target === "openApi3") {
    return {
      type: parsedType === "bigint" ? "integer" : parsedType,
      enum: [def.value]
    };
  }
  return {
    type: parsedType === "bigint" ? "integer" : parsedType,
    const: def.value
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/string.js
var zodPatterns = {
  /**
   * `c` was changed to `[cC]` to replicate /i flag
   */
  cuid: /^[cC][^\s-]{8,}$/,
  cuid2: /^[0-9a-z]+$/,
  ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
  /**
   * `a-z` was added to replicate /i flag
   */
  email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
  /**
   * Constructed a valid Unicode RegExp
   */
  emoji: RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u"),
  /**
   * Unused
   */
  uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
  /**
   * Unused
   */
  ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  /**
   * Unused
   */
  ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
  base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  nanoid: /^[a-zA-Z0-9_-]{21}$/
};
function parseStringDef(def, refs) {
  const res = {
    type: "string"
  };
  function processPattern(value) {
    return refs.patternStrategy === "escape" ? escapeNonAlphaNumeric(value) : value;
  }
  if (def.checks) {
    for (const check of def.checks) {
      switch (check.kind) {
        case "min":
          setResponseValueAndErrors(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
          break;
        case "max":
          setResponseValueAndErrors(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
          break;
        case "email":
          switch (refs.emailStrategy) {
            case "format:email":
              addFormat(res, "email", check.message, refs);
              break;
            case "format:idn-email":
              addFormat(res, "idn-email", check.message, refs);
              break;
            case "pattern:zod":
              addPattern(res, zodPatterns.email, check.message, refs);
              break;
          }
          break;
        case "url":
          addFormat(res, "uri", check.message, refs);
          break;
        case "uuid":
          addFormat(res, "uuid", check.message, refs);
          break;
        case "regex":
          addPattern(res, check.regex, check.message, refs);
          break;
        case "cuid":
          addPattern(res, zodPatterns.cuid, check.message, refs);
          break;
        case "cuid2":
          addPattern(res, zodPatterns.cuid2, check.message, refs);
          break;
        case "startsWith":
          addPattern(res, RegExp(`^${processPattern(check.value)}`), check.message, refs);
          break;
        case "endsWith":
          addPattern(res, RegExp(`${processPattern(check.value)}$`), check.message, refs);
          break;
        case "datetime":
          addFormat(res, "date-time", check.message, refs);
          break;
        case "date":
          addFormat(res, "date", check.message, refs);
          break;
        case "time":
          addFormat(res, "time", check.message, refs);
          break;
        case "duration":
          addFormat(res, "duration", check.message, refs);
          break;
        case "length":
          setResponseValueAndErrors(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
          setResponseValueAndErrors(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
          break;
        case "includes": {
          addPattern(res, RegExp(processPattern(check.value)), check.message, refs);
          break;
        }
        case "ip": {
          if (check.version !== "v6") {
            addFormat(res, "ipv4", check.message, refs);
          }
          if (check.version !== "v4") {
            addFormat(res, "ipv6", check.message, refs);
          }
          break;
        }
        case "emoji":
          addPattern(res, zodPatterns.emoji, check.message, refs);
          break;
        case "ulid": {
          addPattern(res, zodPatterns.ulid, check.message, refs);
          break;
        }
        case "base64": {
          switch (refs.base64Strategy) {
            case "format:binary": {
              addFormat(res, "binary", check.message, refs);
              break;
            }
            case "contentEncoding:base64": {
              setResponseValueAndErrors(res, "contentEncoding", "base64", check.message, refs);
              break;
            }
            case "pattern:zod": {
              addPattern(res, zodPatterns.base64, check.message, refs);
              break;
            }
          }
          break;
        }
        case "nanoid": {
          addPattern(res, zodPatterns.nanoid, check.message, refs);
        }
        case "toLowerCase":
        case "toUpperCase":
        case "trim":
          break;
        default:
          /* @__PURE__ */ ((_) => {
          })(check);
      }
    }
  }
  return res;
}
var escapeNonAlphaNumeric = (value) => Array.from(value).map((c) => /[a-zA-Z0-9]/.test(c) ? c : `\\${c}`).join("");
var addFormat = (schema, value, message, refs) => {
  if (schema.format || schema.anyOf?.some((x) => x.format)) {
    if (!schema.anyOf) {
      schema.anyOf = [];
    }
    if (schema.format) {
      schema.anyOf.push({
        format: schema.format,
        ...schema.errorMessage && refs.errorMessages && {
          errorMessage: { format: schema.errorMessage.format }
        }
      });
      delete schema.format;
      if (schema.errorMessage) {
        delete schema.errorMessage.format;
        if (Object.keys(schema.errorMessage).length === 0) {
          delete schema.errorMessage;
        }
      }
    }
    schema.anyOf.push({
      format: value,
      ...message && refs.errorMessages && { errorMessage: { format: message } }
    });
  } else {
    setResponseValueAndErrors(schema, "format", value, message, refs);
  }
};
var addPattern = (schema, regex2, message, refs) => {
  if (schema.pattern || schema.allOf?.some((x) => x.pattern)) {
    if (!schema.allOf) {
      schema.allOf = [];
    }
    if (schema.pattern) {
      schema.allOf.push({
        pattern: schema.pattern,
        ...schema.errorMessage && refs.errorMessages && {
          errorMessage: { pattern: schema.errorMessage.pattern }
        }
      });
      delete schema.pattern;
      if (schema.errorMessage) {
        delete schema.errorMessage.pattern;
        if (Object.keys(schema.errorMessage).length === 0) {
          delete schema.errorMessage;
        }
      }
    }
    schema.allOf.push({
      pattern: processRegExp(regex2, refs),
      ...message && refs.errorMessages && { errorMessage: { pattern: message } }
    });
  } else {
    setResponseValueAndErrors(schema, "pattern", processRegExp(regex2, refs), message, refs);
  }
};
var processRegExp = (regex2, refs) => {
  if (!refs.applyRegexFlags || !regex2.flags)
    return regex2.source;
  const flags = {
    i: regex2.flags.includes("i"),
    m: regex2.flags.includes("m"),
    s: regex2.flags.includes("s")
    // `.` matches newlines
  };
  const source = flags.i ? regex2.source.toLowerCase() : regex2.source;
  let pattern = "";
  let isEscaped = false;
  let inCharGroup = false;
  let inCharRange = false;
  for (let i = 0; i < source.length; i++) {
    if (isEscaped) {
      pattern += source[i];
      isEscaped = false;
      continue;
    }
    if (flags.i) {
      if (inCharGroup) {
        if (source[i].match(/[a-z]/)) {
          if (inCharRange) {
            pattern += source[i];
            pattern += `${source[i - 2]}-${source[i]}`.toUpperCase();
            inCharRange = false;
          } else if (source[i + 1] === "-" && source[i + 2]?.match(/[a-z]/)) {
            pattern += source[i];
            inCharRange = true;
          } else {
            pattern += `${source[i]}${source[i].toUpperCase()}`;
          }
          continue;
        }
      } else if (source[i].match(/[a-z]/)) {
        pattern += `[${source[i]}${source[i].toUpperCase()}]`;
        continue;
      }
    }
    if (flags.m) {
      if (source[i] === "^") {
        pattern += `(^|(?<=[\r
]))`;
        continue;
      } else if (source[i] === "$") {
        pattern += `($|(?=[\r
]))`;
        continue;
      }
    }
    if (flags.s && source[i] === ".") {
      pattern += inCharGroup ? `${source[i]}\r
` : `[${source[i]}\r
]`;
      continue;
    }
    pattern += source[i];
    if (source[i] === "\\") {
      isEscaped = true;
    } else if (inCharGroup && source[i] === "]") {
      inCharGroup = false;
    } else if (!inCharGroup && source[i] === "[") {
      inCharGroup = true;
    }
  }
  try {
    const regexTest = new RegExp(pattern);
  } catch {
    console.warn(`Could not convert regex pattern at ${refs.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`);
    return regex2.source;
  }
  return pattern;
};

// node_modules/zod-to-json-schema/dist/esm/parsers/record.js
function parseRecordDef(def, refs) {
  if (refs.target === "openApi3" && def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodEnum) {
    return {
      type: "object",
      required: def.keyType._def.values,
      properties: def.keyType._def.values.reduce((acc, key) => ({
        ...acc,
        [key]: parseDef(def.valueType._def, {
          ...refs,
          currentPath: [...refs.currentPath, "properties", key]
        }) ?? {}
      }), {}),
      additionalProperties: false
    };
  }
  const schema = {
    type: "object",
    additionalProperties: parseDef(def.valueType._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    }) ?? {}
  };
  if (refs.target === "openApi3") {
    return schema;
  }
  if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodString && def.keyType._def.checks?.length) {
    const keyType = Object.entries(parseStringDef(def.keyType._def, refs)).reduce((acc, [key, value]) => key === "type" ? acc : { ...acc, [key]: value }, {});
    return {
      ...schema,
      propertyNames: keyType
    };
  } else if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodEnum) {
    return {
      ...schema,
      propertyNames: {
        enum: def.keyType._def.values
      }
    };
  }
  return schema;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/map.js
function parseMapDef(def, refs) {
  if (refs.mapStrategy === "record") {
    return parseRecordDef(def, refs);
  }
  const keys = parseDef(def.keyType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "0"]
  }) || {};
  const values = parseDef(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "1"]
  }) || {};
  return {
    type: "array",
    maxItems: 125,
    items: {
      type: "array",
      items: [keys, values],
      minItems: 2,
      maxItems: 2
    }
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/nativeEnum.js
function parseNativeEnumDef(def) {
  const object = def.values;
  const actualKeys = Object.keys(def.values).filter((key) => {
    return typeof object[object[key]] !== "number";
  });
  const actualValues = actualKeys.map((key) => object[key]);
  const parsedTypes = Array.from(new Set(actualValues.map((values) => typeof values)));
  return {
    type: parsedTypes.length === 1 ? parsedTypes[0] === "string" ? "string" : "number" : ["string", "number"],
    enum: actualValues
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/never.js
function parseNeverDef() {
  return {
    not: {}
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/null.js
function parseNullDef(refs) {
  return refs.target === "openApi3" ? {
    enum: ["null"],
    nullable: true
  } : {
    type: "null"
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/union.js
var primitiveMappings = {
  ZodString: "string",
  ZodNumber: "number",
  ZodBigInt: "integer",
  ZodBoolean: "boolean",
  ZodNull: "null"
};
function parseUnionDef(def, refs) {
  if (refs.target === "openApi3")
    return asAnyOf(def, refs);
  const options = def.options instanceof Map ? Array.from(def.options.values()) : def.options;
  if (options.every((x) => x._def.typeName in primitiveMappings && (!x._def.checks || !x._def.checks.length))) {
    const types = options.reduce((types2, x) => {
      const type = primitiveMappings[x._def.typeName];
      return type && !types2.includes(type) ? [...types2, type] : types2;
    }, []);
    return {
      type: types.length > 1 ? types : types[0]
    };
  } else if (options.every((x) => x._def.typeName === "ZodLiteral" && !x.description)) {
    const types = options.reduce((acc, x) => {
      const type = typeof x._def.value;
      switch (type) {
        case "string":
        case "number":
        case "boolean":
          return [...acc, type];
        case "bigint":
          return [...acc, "integer"];
        case "object":
          if (x._def.value === null)
            return [...acc, "null"];
        case "symbol":
        case "undefined":
        case "function":
        default:
          return acc;
      }
    }, []);
    if (types.length === options.length) {
      const uniqueTypes = types.filter((x, i, a) => a.indexOf(x) === i);
      return {
        type: uniqueTypes.length > 1 ? uniqueTypes : uniqueTypes[0],
        enum: options.reduce((acc, x) => {
          return acc.includes(x._def.value) ? acc : [...acc, x._def.value];
        }, [])
      };
    }
  } else if (options.every((x) => x._def.typeName === "ZodEnum")) {
    return {
      type: "string",
      enum: options.reduce((acc, x) => [
        ...acc,
        ...x._def.values.filter((x2) => !acc.includes(x2))
      ], [])
    };
  }
  return asAnyOf(def, refs);
}
var asAnyOf = (def, refs) => {
  const anyOf = (def.options instanceof Map ? Array.from(def.options.values()) : def.options).map((x, i) => parseDef(x._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", `${i}`]
  })).filter((x) => !!x && (!refs.strictUnions || typeof x === "object" && Object.keys(x).length > 0));
  return anyOf.length ? { anyOf } : void 0;
};

// node_modules/zod-to-json-schema/dist/esm/parsers/nullable.js
function parseNullableDef(def, refs) {
  if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(def.innerType._def.typeName) && (!def.innerType._def.checks || !def.innerType._def.checks.length)) {
    if (refs.target === "openApi3") {
      return {
        type: primitiveMappings[def.innerType._def.typeName],
        nullable: true
      };
    }
    return {
      type: [
        primitiveMappings[def.innerType._def.typeName],
        "null"
      ]
    };
  }
  if (refs.target === "openApi3") {
    const base2 = parseDef(def.innerType._def, {
      ...refs,
      currentPath: [...refs.currentPath]
    });
    if (base2 && "$ref" in base2)
      return { allOf: [base2], nullable: true };
    return base2 && { ...base2, nullable: true };
  }
  const base = parseDef(def.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", "0"]
  });
  return base && { anyOf: [base, { type: "null" }] };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/number.js
function parseNumberDef(def, refs) {
  const res = {
    type: "number"
  };
  if (!def.checks)
    return res;
  for (const check of def.checks) {
    switch (check.kind) {
      case "int":
        res.type = "integer";
        addErrorMessage(res, "type", check.message, refs);
        break;
      case "min":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMinimum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMinimum = true;
          }
          setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
        }
        break;
      case "max":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMaximum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMaximum = true;
          }
          setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
        }
        break;
      case "multipleOf":
        setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
        break;
    }
  }
  return res;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/object.js
function decideAdditionalProperties(def, refs) {
  if (refs.removeAdditionalStrategy === "strict") {
    return def.catchall._def.typeName === "ZodNever" ? def.unknownKeys !== "strict" : parseDef(def.catchall._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    }) ?? true;
  } else {
    return def.catchall._def.typeName === "ZodNever" ? def.unknownKeys === "passthrough" : parseDef(def.catchall._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    }) ?? true;
  }
}
function parseObjectDef(def, refs) {
  const result = {
    type: "object",
    ...Object.entries(def.shape()).reduce((acc, [propName, propDef]) => {
      if (propDef === void 0 || propDef._def === void 0)
        return acc;
      const parsedDef = parseDef(propDef._def, {
        ...refs,
        currentPath: [...refs.currentPath, "properties", propName],
        propertyPath: [...refs.currentPath, "properties", propName]
      });
      if (parsedDef === void 0)
        return acc;
      return {
        properties: { ...acc.properties, [propName]: parsedDef },
        required: propDef.isOptional() ? acc.required : [...acc.required, propName]
      };
    }, { properties: {}, required: [] }),
    additionalProperties: decideAdditionalProperties(def, refs)
  };
  if (!result.required.length)
    delete result.required;
  return result;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/optional.js
var parseOptionalDef = (def, refs) => {
  if (refs.currentPath.toString() === refs.propertyPath?.toString()) {
    return parseDef(def.innerType._def, refs);
  }
  const innerSchema = parseDef(def.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", "1"]
  });
  return innerSchema ? {
    anyOf: [
      {
        not: {}
      },
      innerSchema
    ]
  } : {};
};

// node_modules/zod-to-json-schema/dist/esm/parsers/pipeline.js
var parsePipelineDef = (def, refs) => {
  if (refs.pipeStrategy === "input") {
    return parseDef(def.in._def, refs);
  } else if (refs.pipeStrategy === "output") {
    return parseDef(def.out._def, refs);
  }
  const a = parseDef(def.in._def, {
    ...refs,
    currentPath: [...refs.currentPath, "allOf", "0"]
  });
  const b = parseDef(def.out._def, {
    ...refs,
    currentPath: [...refs.currentPath, "allOf", a ? "1" : "0"]
  });
  return {
    allOf: [a, b].filter((x) => x !== void 0)
  };
};

// node_modules/zod-to-json-schema/dist/esm/parsers/promise.js
function parsePromiseDef(def, refs) {
  return parseDef(def.type._def, refs);
}

// node_modules/zod-to-json-schema/dist/esm/parsers/set.js
function parseSetDef(def, refs) {
  const items = parseDef(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items"]
  });
  const schema = {
    type: "array",
    uniqueItems: true,
    items
  };
  if (def.minSize) {
    setResponseValueAndErrors(schema, "minItems", def.minSize.value, def.minSize.message, refs);
  }
  if (def.maxSize) {
    setResponseValueAndErrors(schema, "maxItems", def.maxSize.value, def.maxSize.message, refs);
  }
  return schema;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/tuple.js
function parseTupleDef(def, refs) {
  if (def.rest) {
    return {
      type: "array",
      minItems: def.items.length,
      items: def.items.map((x, i) => parseDef(x._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items", `${i}`]
      })).reduce((acc, x) => x === void 0 ? acc : [...acc, x], []),
      additionalItems: parseDef(def.rest._def, {
        ...refs,
        currentPath: [...refs.currentPath, "additionalItems"]
      })
    };
  } else {
    return {
      type: "array",
      minItems: def.items.length,
      maxItems: def.items.length,
      items: def.items.map((x, i) => parseDef(x._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items", `${i}`]
      })).reduce((acc, x) => x === void 0 ? acc : [...acc, x], [])
    };
  }
}

// node_modules/zod-to-json-schema/dist/esm/parsers/undefined.js
function parseUndefinedDef() {
  return {
    not: {}
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/unknown.js
function parseUnknownDef() {
  return {};
}

// node_modules/zod-to-json-schema/dist/esm/parsers/readonly.js
var parseReadonlyDef = (def, refs) => {
  return parseDef(def.innerType._def, refs);
};

// node_modules/zod-to-json-schema/dist/esm/parseDef.js
function parseDef(def, refs, forceResolution = false) {
  const seenItem = refs.seen.get(def);
  if (refs.override) {
    const overrideResult = refs.override?.(def, refs, seenItem, forceResolution);
    if (overrideResult !== ignoreOverride) {
      return overrideResult;
    }
  }
  if (seenItem && !forceResolution) {
    const seenSchema = get$ref(seenItem, refs);
    if (seenSchema !== void 0) {
      return seenSchema;
    }
  }
  const newItem = { def, path: refs.currentPath, jsonSchema: void 0 };
  refs.seen.set(def, newItem);
  const jsonSchema = selectParser(def, def.typeName, refs);
  if (jsonSchema) {
    addMeta(def, refs, jsonSchema);
  }
  newItem.jsonSchema = jsonSchema;
  return jsonSchema;
}
var get$ref = (item, refs) => {
  switch (refs.$refStrategy) {
    case "root":
      return { $ref: item.path.join("/") };
    case "relative":
      return { $ref: getRelativePath(refs.currentPath, item.path) };
    case "none":
    case "seen": {
      if (item.path.length < refs.currentPath.length && item.path.every((value, index) => refs.currentPath[index] === value)) {
        console.warn(`Recursive reference detected at ${refs.currentPath.join("/")}! Defaulting to any`);
        return {};
      }
      return refs.$refStrategy === "seen" ? {} : void 0;
    }
  }
};
var getRelativePath = (pathA, pathB) => {
  let i = 0;
  for (; i < pathA.length && i < pathB.length; i++) {
    if (pathA[i] !== pathB[i])
      break;
  }
  return [(pathA.length - i).toString(), ...pathB.slice(i)].join("/");
};
var selectParser = (def, typeName, refs) => {
  switch (typeName) {
    case ZodFirstPartyTypeKind.ZodString:
      return parseStringDef(def, refs);
    case ZodFirstPartyTypeKind.ZodNumber:
      return parseNumberDef(def, refs);
    case ZodFirstPartyTypeKind.ZodObject:
      return parseObjectDef(def, refs);
    case ZodFirstPartyTypeKind.ZodBigInt:
      return parseBigintDef(def, refs);
    case ZodFirstPartyTypeKind.ZodBoolean:
      return parseBooleanDef();
    case ZodFirstPartyTypeKind.ZodDate:
      return parseDateDef(def, refs);
    case ZodFirstPartyTypeKind.ZodUndefined:
      return parseUndefinedDef();
    case ZodFirstPartyTypeKind.ZodNull:
      return parseNullDef(refs);
    case ZodFirstPartyTypeKind.ZodArray:
      return parseArrayDef(def, refs);
    case ZodFirstPartyTypeKind.ZodUnion:
    case ZodFirstPartyTypeKind.ZodDiscriminatedUnion:
      return parseUnionDef(def, refs);
    case ZodFirstPartyTypeKind.ZodIntersection:
      return parseIntersectionDef(def, refs);
    case ZodFirstPartyTypeKind.ZodTuple:
      return parseTupleDef(def, refs);
    case ZodFirstPartyTypeKind.ZodRecord:
      return parseRecordDef(def, refs);
    case ZodFirstPartyTypeKind.ZodLiteral:
      return parseLiteralDef(def, refs);
    case ZodFirstPartyTypeKind.ZodEnum:
      return parseEnumDef(def);
    case ZodFirstPartyTypeKind.ZodNativeEnum:
      return parseNativeEnumDef(def);
    case ZodFirstPartyTypeKind.ZodNullable:
      return parseNullableDef(def, refs);
    case ZodFirstPartyTypeKind.ZodOptional:
      return parseOptionalDef(def, refs);
    case ZodFirstPartyTypeKind.ZodMap:
      return parseMapDef(def, refs);
    case ZodFirstPartyTypeKind.ZodSet:
      return parseSetDef(def, refs);
    case ZodFirstPartyTypeKind.ZodLazy:
      return parseDef(def.getter()._def, refs);
    case ZodFirstPartyTypeKind.ZodPromise:
      return parsePromiseDef(def, refs);
    case ZodFirstPartyTypeKind.ZodNaN:
    case ZodFirstPartyTypeKind.ZodNever:
      return parseNeverDef();
    case ZodFirstPartyTypeKind.ZodEffects:
      return parseEffectsDef(def, refs);
    case ZodFirstPartyTypeKind.ZodAny:
      return parseAnyDef();
    case ZodFirstPartyTypeKind.ZodUnknown:
      return parseUnknownDef();
    case ZodFirstPartyTypeKind.ZodDefault:
      return parseDefaultDef(def, refs);
    case ZodFirstPartyTypeKind.ZodBranded:
      return parseBrandedDef(def, refs);
    case ZodFirstPartyTypeKind.ZodReadonly:
      return parseReadonlyDef(def, refs);
    case ZodFirstPartyTypeKind.ZodCatch:
      return parseCatchDef(def, refs);
    case ZodFirstPartyTypeKind.ZodPipeline:
      return parsePipelineDef(def, refs);
    case ZodFirstPartyTypeKind.ZodFunction:
    case ZodFirstPartyTypeKind.ZodVoid:
    case ZodFirstPartyTypeKind.ZodSymbol:
      return void 0;
    default:
      return /* @__PURE__ */ ((_) => void 0)(typeName);
  }
};
var addMeta = (def, refs, jsonSchema) => {
  if (def.description) {
    jsonSchema.description = def.description;
    if (refs.markdownDescription) {
      jsonSchema.markdownDescription = def.description;
    }
  }
  return jsonSchema;
};

// node_modules/zod-to-json-schema/dist/esm/zodToJsonSchema.js
var zodToJsonSchema = (schema, options) => {
  const refs = getRefs(options);
  const definitions = typeof options === "object" && options.definitions ? Object.entries(options.definitions).reduce((acc, [name2, schema2]) => ({
    ...acc,
    [name2]: parseDef(schema2._def, {
      ...refs,
      currentPath: [...refs.basePath, refs.definitionPath, name2]
    }, true) ?? {}
  }), {}) : void 0;
  const name = typeof options === "string" ? options : options?.nameStrategy === "title" ? void 0 : options?.name;
  const main = parseDef(schema._def, name === void 0 ? refs : {
    ...refs,
    currentPath: [...refs.basePath, refs.definitionPath, name]
  }, false) ?? {};
  const title = typeof options === "object" && options.name !== void 0 && options.nameStrategy === "title" ? options.name : void 0;
  if (title !== void 0) {
    main.title = title;
  }
  const combined = name === void 0 ? definitions ? {
    ...main,
    [refs.definitionPath]: definitions
  } : main : {
    $ref: [
      ...refs.$refStrategy === "relative" ? [] : refs.basePath,
      refs.definitionPath,
      name
    ].join("/"),
    [refs.definitionPath]: {
      ...definitions,
      [name]: main
    }
  };
  if (refs.target === "jsonSchema7") {
    combined.$schema = "http://json-schema.org/draft-07/schema#";
  } else if (refs.target === "jsonSchema2019-09") {
    combined.$schema = "https://json-schema.org/draft/2019-09/schema#";
  }
  return combined;
};

// node_modules/@langchain/core/dist/utils/json.js
function parsePartialJson(s) {
  if (typeof s === "undefined") {
    return null;
  }
  try {
    return JSON.parse(s);
  } catch (error) {
  }
  let new_s = "";
  const stack = [];
  let isInsideString = false;
  let escaped = false;
  for (let char of s) {
    if (isInsideString) {
      if (char === '"' && !escaped) {
        isInsideString = false;
      } else if (char === "\n" && !escaped) {
        char = "\\n";
      } else if (char === "\\") {
        escaped = !escaped;
      } else {
        escaped = false;
      }
    } else {
      if (char === '"') {
        isInsideString = true;
        escaped = false;
      } else if (char === "{") {
        stack.push("}");
      } else if (char === "[") {
        stack.push("]");
      } else if (char === "}" || char === "]") {
        if (stack && stack[stack.length - 1] === char) {
          stack.pop();
        } else {
          return null;
        }
      }
    }
    new_s += char;
  }
  if (isInsideString) {
    new_s += '"';
  }
  for (let i = stack.length - 1; i >= 0; i -= 1) {
    new_s += stack[i];
  }
  try {
    return JSON.parse(new_s);
  } catch (error) {
    return null;
  }
}

// node_modules/@langchain/core/dist/load/map_keys.js
var import_decamelize = __toESM(require_decamelize(), 1);
var import_camelcase = __toESM(require_camelcase(), 1);
function keyToJson(key, map) {
  return map?.[key] || (0, import_decamelize.default)(key);
}
function mapKeys(fields, mapper, map) {
  const mapped = {};
  for (const key in fields) {
    if (Object.hasOwn(fields, key)) {
      mapped[mapper(key, map)] = fields[key];
    }
  }
  return mapped;
}

// node_modules/@langchain/core/dist/load/serializable.js
function shallowCopy(obj) {
  return Array.isArray(obj) ? [...obj] : { ...obj };
}
function replaceSecrets(root2, secretsMap) {
  const result = shallowCopy(root2);
  for (const [path, secretId] of Object.entries(secretsMap)) {
    const [last, ...partsReverse] = path.split(".").reverse();
    let current = result;
    for (const part of partsReverse.reverse()) {
      if (current[part] === void 0) {
        break;
      }
      current[part] = shallowCopy(current[part]);
      current = current[part];
    }
    if (current[last] !== void 0) {
      current[last] = {
        lc: 1,
        type: "secret",
        id: [secretId]
      };
    }
  }
  return result;
}
function get_lc_unique_name(serializableClass) {
  const parentClass = Object.getPrototypeOf(serializableClass);
  const lcNameIsSubclassed = typeof serializableClass.lc_name === "function" && (typeof parentClass.lc_name !== "function" || serializableClass.lc_name() !== parentClass.lc_name());
  if (lcNameIsSubclassed) {
    return serializableClass.lc_name();
  } else {
    return serializableClass.name;
  }
}
var Serializable = class _Serializable {
  /**
   * The name of the serializable. Override to provide an alias or
   * to preserve the serialized module name in minified environments.
   *
   * Implemented as a static method to support loading logic.
   */
  static lc_name() {
    return this.name;
  }
  /**
   * The final serialized identifier for the module.
   */
  get lc_id() {
    return [
      ...this.lc_namespace,
      get_lc_unique_name(this.constructor)
    ];
  }
  /**
   * A map of secrets, which will be omitted from serialization.
   * Keys are paths to the secret in constructor args, e.g. "foo.bar.baz".
   * Values are the secret ids, which will be used when deserializing.
   */
  get lc_secrets() {
    return void 0;
  }
  /**
   * A map of additional attributes to merge with constructor args.
   * Keys are the attribute names, e.g. "foo".
   * Values are the attribute values, which will be serialized.
   * These attributes need to be accepted by the constructor as arguments.
   */
  get lc_attributes() {
    return void 0;
  }
  /**
   * A map of aliases for constructor args.
   * Keys are the attribute names, e.g. "foo".
   * Values are the alias that will replace the key in serialization.
   * This is used to eg. make argument names match Python.
   */
  get lc_aliases() {
    return void 0;
  }
  constructor(kwargs, ..._args) {
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "lc_kwargs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.lc_kwargs = kwargs || {};
  }
  toJSON() {
    if (!this.lc_serializable) {
      return this.toJSONNotImplemented();
    }
    if (
      // eslint-disable-next-line no-instanceof/no-instanceof
      this.lc_kwargs instanceof _Serializable || typeof this.lc_kwargs !== "object" || Array.isArray(this.lc_kwargs)
    ) {
      return this.toJSONNotImplemented();
    }
    const aliases = {};
    const secrets = {};
    const kwargs = Object.keys(this.lc_kwargs).reduce((acc, key) => {
      acc[key] = key in this ? this[key] : this.lc_kwargs[key];
      return acc;
    }, {});
    for (let current = Object.getPrototypeOf(this); current; current = Object.getPrototypeOf(current)) {
      Object.assign(aliases, Reflect.get(current, "lc_aliases", this));
      Object.assign(secrets, Reflect.get(current, "lc_secrets", this));
      Object.assign(kwargs, Reflect.get(current, "lc_attributes", this));
    }
    Object.keys(secrets).forEach((keyPath) => {
      let read = this;
      let write = kwargs;
      const [last, ...partsReverse] = keyPath.split(".").reverse();
      for (const key of partsReverse.reverse()) {
        if (!(key in read) || read[key] === void 0)
          return;
        if (!(key in write) || write[key] === void 0) {
          if (typeof read[key] === "object" && read[key] != null) {
            write[key] = {};
          } else if (Array.isArray(read[key])) {
            write[key] = [];
          }
        }
        read = read[key];
        write = write[key];
      }
      if (last in read && read[last] !== void 0) {
        write[last] = write[last] || read[last];
      }
    });
    return {
      lc: 1,
      type: "constructor",
      id: this.lc_id,
      kwargs: mapKeys(Object.keys(secrets).length ? replaceSecrets(kwargs, secrets) : kwargs, keyToJson, aliases)
    };
  }
  toJSONNotImplemented() {
    return {
      lc: 1,
      type: "not_implemented",
      id: this.lc_id
    };
  }
};

// node_modules/@langchain/core/dist/messages/base.js
function mergeContent(firstContent, secondContent) {
  if (typeof firstContent === "string") {
    if (typeof secondContent === "string") {
      return firstContent + secondContent;
    } else {
      return [{ type: "text", text: firstContent }, ...secondContent];
    }
  } else if (Array.isArray(secondContent)) {
    return [...firstContent, ...secondContent];
  } else {
    return [...firstContent, { type: "text", text: secondContent }];
  }
}
var BaseMessage = class extends Serializable {
  get lc_aliases() {
    return {
      additional_kwargs: "additional_kwargs",
      response_metadata: "response_metadata"
    };
  }
  /**
   * @deprecated
   * Use {@link BaseMessage.content} instead.
   */
  get text() {
    return typeof this.content === "string" ? this.content : "";
  }
  constructor(fields, kwargs) {
    if (typeof fields === "string") {
      fields = {
        content: fields,
        additional_kwargs: kwargs,
        response_metadata: {}
      };
    }
    if (!fields.additional_kwargs) {
      fields.additional_kwargs = {};
    }
    if (!fields.response_metadata) {
      fields.response_metadata = {};
    }
    super(fields);
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "messages"]
    });
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "content", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "additional_kwargs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "response_metadata", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "id", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.name = fields.name;
    this.content = fields.content;
    this.additional_kwargs = fields.additional_kwargs;
    this.response_metadata = fields.response_metadata;
    this.id = fields.id;
  }
  toDict() {
    return {
      type: this._getType(),
      data: this.toJSON().kwargs
    };
  }
};
function _mergeDicts(left, right) {
  const merged = { ...left };
  for (const [key, value] of Object.entries(right)) {
    if (merged[key] == null) {
      merged[key] = value;
    } else if (value == null) {
      continue;
    } else if (typeof merged[key] !== typeof value || Array.isArray(merged[key]) !== Array.isArray(value)) {
      throw new Error(`field[${key}] already exists in the message chunk, but with a different type.`);
    } else if (typeof merged[key] === "string") {
      merged[key] = merged[key] + value;
    } else if (!Array.isArray(merged[key]) && typeof merged[key] === "object") {
      merged[key] = _mergeDicts(merged[key], value);
    } else if (Array.isArray(merged[key])) {
      merged[key] = _mergeLists(merged[key], value);
    } else if (merged[key] === value) {
      continue;
    } else {
      console.warn(`field[${key}] already exists in this message chunk and value has unsupported type.`);
    }
  }
  return merged;
}
function _mergeLists(left, right) {
  if (left === void 0 && right === void 0) {
    return void 0;
  } else if (left === void 0 || right === void 0) {
    return left || right;
  } else {
    const merged = [...left];
    for (const item of right) {
      if (typeof item === "object" && "index" in item && typeof item.index === "number") {
        const toMerge = merged.findIndex((leftItem) => leftItem.index === item.index);
        if (toMerge !== -1) {
          merged[toMerge] = _mergeDicts(merged[toMerge], item);
        } else {
          merged.push(item);
        }
      } else {
        merged.push(item);
      }
    }
    return merged;
  }
}
var BaseMessageChunk = class extends BaseMessage {
};
function isBaseMessage(messageLike) {
  return typeof messageLike?._getType === "function";
}

// node_modules/@langchain/core/dist/messages/tool.js
function defaultToolCallParser(rawToolCalls) {
  const toolCalls = [];
  const invalidToolCalls = [];
  for (const toolCall of rawToolCalls) {
    if (!toolCall.function) {
      continue;
    } else {
      const functionName = toolCall.function.name;
      try {
        const functionArgs = JSON.parse(toolCall.function.arguments);
        const parsed = {
          name: functionName || "",
          args: functionArgs || {},
          id: toolCall.id
        };
        toolCalls.push(parsed);
      } catch (error) {
        invalidToolCalls.push({
          name: functionName,
          args: toolCall.function.arguments,
          id: toolCall.id,
          error: "Malformed args."
        });
      }
    }
  }
  return [toolCalls, invalidToolCalls];
}

// node_modules/@langchain/core/dist/messages/ai.js
var AIMessage = class extends BaseMessage {
  get lc_aliases() {
    return {
      ...super.lc_aliases,
      tool_calls: "tool_calls",
      invalid_tool_calls: "invalid_tool_calls"
    };
  }
  constructor(fields, kwargs) {
    let initParams;
    if (typeof fields === "string") {
      initParams = {
        content: fields,
        tool_calls: [],
        invalid_tool_calls: [],
        additional_kwargs: kwargs ?? {}
      };
    } else {
      initParams = fields;
      const rawToolCalls = initParams.additional_kwargs?.tool_calls;
      const toolCalls = initParams.tool_calls;
      if (!(rawToolCalls == null) && rawToolCalls.length > 0 && (toolCalls === void 0 || toolCalls.length === 0)) {
        console.warn([
          "New LangChain packages are available that more efficiently handle",
          "tool calling.\n\nPlease upgrade your packages to versions that set",
          "message tool calls. e.g., `yarn add @langchain/anthropic`,",
          "yarn add @langchain/openai`, etc."
        ].join(" "));
      }
      try {
        if (!(rawToolCalls == null) && toolCalls === void 0) {
          const [toolCalls2, invalidToolCalls] = defaultToolCallParser(rawToolCalls);
          initParams.tool_calls = toolCalls2 ?? [];
          initParams.invalid_tool_calls = invalidToolCalls ?? [];
        } else {
          initParams.tool_calls = initParams.tool_calls ?? [];
          initParams.invalid_tool_calls = initParams.invalid_tool_calls ?? [];
        }
      } catch (e) {
        initParams.tool_calls = [];
        initParams.invalid_tool_calls = [];
      }
    }
    super(initParams);
    Object.defineProperty(this, "tool_calls", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "invalid_tool_calls", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "usage_metadata", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    if (typeof initParams !== "string") {
      this.tool_calls = initParams.tool_calls ?? this.tool_calls;
      this.invalid_tool_calls = initParams.invalid_tool_calls ?? this.invalid_tool_calls;
    }
    this.usage_metadata = initParams.usage_metadata;
  }
  static lc_name() {
    return "AIMessage";
  }
  _getType() {
    return "ai";
  }
};
var AIMessageChunk = class _AIMessageChunk extends BaseMessageChunk {
  constructor(fields) {
    let initParams;
    if (typeof fields === "string") {
      initParams = {
        content: fields,
        tool_calls: [],
        invalid_tool_calls: [],
        tool_call_chunks: []
      };
    } else if (fields.tool_call_chunks === void 0) {
      initParams = {
        ...fields,
        tool_calls: fields.tool_calls ?? [],
        invalid_tool_calls: [],
        tool_call_chunks: []
      };
    } else {
      const toolCalls = [];
      const invalidToolCalls = [];
      for (const toolCallChunk of fields.tool_call_chunks) {
        let parsedArgs = {};
        try {
          parsedArgs = parsePartialJson(toolCallChunk.args ?? "{}") ?? {};
          if (typeof parsedArgs !== "object" || Array.isArray(parsedArgs)) {
            throw new Error("Malformed tool call chunk args.");
          }
          toolCalls.push({
            name: toolCallChunk.name ?? "",
            args: parsedArgs,
            id: toolCallChunk.id
          });
        } catch (e) {
          invalidToolCalls.push({
            name: toolCallChunk.name,
            args: toolCallChunk.args,
            id: toolCallChunk.id,
            error: "Malformed args."
          });
        }
      }
      initParams = {
        ...fields,
        tool_calls: toolCalls,
        invalid_tool_calls: invalidToolCalls
      };
    }
    super(initParams);
    Object.defineProperty(this, "tool_calls", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "invalid_tool_calls", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "tool_call_chunks", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "usage_metadata", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.tool_call_chunks = initParams.tool_call_chunks ?? this.tool_call_chunks;
    this.tool_calls = initParams.tool_calls ?? this.tool_calls;
    this.invalid_tool_calls = initParams.invalid_tool_calls ?? this.invalid_tool_calls;
    this.usage_metadata = initParams.usage_metadata;
  }
  get lc_aliases() {
    return {
      ...super.lc_aliases,
      tool_calls: "tool_calls",
      invalid_tool_calls: "invalid_tool_calls",
      tool_call_chunks: "tool_call_chunks"
    };
  }
  static lc_name() {
    return "AIMessageChunk";
  }
  _getType() {
    return "ai";
  }
  concat(chunk) {
    const combinedFields = {
      content: mergeContent(this.content, chunk.content),
      additional_kwargs: _mergeDicts(this.additional_kwargs, chunk.additional_kwargs),
      response_metadata: _mergeDicts(this.response_metadata, chunk.response_metadata),
      tool_call_chunks: [],
      id: this.id ?? chunk.id
    };
    if (this.tool_call_chunks !== void 0 || chunk.tool_call_chunks !== void 0) {
      const rawToolCalls = _mergeLists(this.tool_call_chunks, chunk.tool_call_chunks);
      if (rawToolCalls !== void 0 && rawToolCalls.length > 0) {
        combinedFields.tool_call_chunks = rawToolCalls;
      }
    }
    if (this.usage_metadata !== void 0 || chunk.usage_metadata !== void 0) {
      const left = this.usage_metadata ?? {
        input_tokens: 0,
        output_tokens: 0,
        total_tokens: 0
      };
      const right = chunk.usage_metadata ?? {
        input_tokens: 0,
        output_tokens: 0,
        total_tokens: 0
      };
      const usage_metadata = {
        input_tokens: left.input_tokens + right.input_tokens,
        output_tokens: left.output_tokens + right.output_tokens,
        total_tokens: left.total_tokens + right.total_tokens
      };
      combinedFields.usage_metadata = usage_metadata;
    }
    return new _AIMessageChunk(combinedFields);
  }
};

// node_modules/@langchain/core/dist/messages/chat.js
var ChatMessage = class _ChatMessage extends BaseMessage {
  static lc_name() {
    return "ChatMessage";
  }
  static _chatMessageClass() {
    return _ChatMessage;
  }
  constructor(fields, role) {
    if (typeof fields === "string") {
      fields = { content: fields, role };
    }
    super(fields);
    Object.defineProperty(this, "role", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.role = fields.role;
  }
  _getType() {
    return "generic";
  }
  static isInstance(message) {
    return message._getType() === "generic";
  }
};

// node_modules/@langchain/core/dist/messages/human.js
var HumanMessage = class extends BaseMessage {
  static lc_name() {
    return "HumanMessage";
  }
  _getType() {
    return "human";
  }
};

// node_modules/@langchain/core/dist/messages/system.js
var SystemMessage = class extends BaseMessage {
  static lc_name() {
    return "SystemMessage";
  }
  _getType() {
    return "system";
  }
};

// node_modules/@langchain/core/dist/messages/utils.js
function coerceMessageLikeToMessage(messageLike) {
  if (typeof messageLike === "string") {
    return new HumanMessage(messageLike);
  } else if (isBaseMessage(messageLike)) {
    return messageLike;
  }
  const [type, content] = messageLike;
  if (type === "human" || type === "user") {
    return new HumanMessage({ content });
  } else if (type === "ai" || type === "assistant") {
    return new AIMessage({ content });
  } else if (type === "system") {
    return new SystemMessage({ content });
  } else {
    throw new Error(`Unable to coerce message from array: only human, AI, or system message coercion is currently supported.`);
  }
}
function getBufferString(messages, humanPrefix = "Human", aiPrefix = "AI") {
  const string_messages = [];
  for (const m of messages) {
    let role;
    if (m._getType() === "human") {
      role = humanPrefix;
    } else if (m._getType() === "ai") {
      role = aiPrefix;
    } else if (m._getType() === "system") {
      role = "System";
    } else if (m._getType() === "function") {
      role = "Function";
    } else if (m._getType() === "tool") {
      role = "Tool";
    } else if (m._getType() === "generic") {
      role = m.role;
    } else {
      throw new Error(`Got unsupported message type: ${m._getType()}`);
    }
    const nameStr = m.name ? `${m.name}, ` : "";
    string_messages.push(`${role}: ${nameStr}${m.content}`);
  }
  return string_messages.join("\n");
}

// node_modules/@langchain/core/dist/runnables/base.js
var import_p_retry3 = __toESM(require_p_retry(), 1);

// node_modules/uuid/dist/esm-node/rng.js
var import_crypto2 = __toESM(require("crypto"));
var rnds8Pool = new Uint8Array(256);
var poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    import_crypto2.default.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

// node_modules/uuid/dist/esm-node/regex.js
var regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

// node_modules/uuid/dist/esm-node/validate.js
function validate(uuid) {
  return typeof uuid === "string" && regex_default.test(uuid);
}
var validate_default = validate;

// node_modules/uuid/dist/esm-node/stringify.js
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

// node_modules/uuid/dist/esm-node/native.js
var import_crypto3 = __toESM(require("crypto"));
var native_default = {
  randomUUID: import_crypto3.default.randomUUID
};

// node_modules/uuid/dist/esm-node/v4.js
function v4(options, buf, offset) {
  if (native_default.randomUUID && !buf && !options) {
    return native_default.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default = v4;

// node_modules/langsmith/dist/singletons/traceable.js
var MockAsyncLocalStorage = class {
  getStore() {
    return void 0;
  }
  run(_, callback) {
    return callback();
  }
};
var AsyncLocalStorageProvider = class {
  constructor() {
    Object.defineProperty(this, "asyncLocalStorage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: new MockAsyncLocalStorage()
    });
    Object.defineProperty(this, "hasBeenInitialized", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
  }
  getInstance() {
    return this.asyncLocalStorage;
  }
  initializeGlobalInstance(instance) {
    if (!this.hasBeenInitialized) {
      this.hasBeenInitialized = true;
      this.asyncLocalStorage = instance;
    }
  }
};
var AsyncLocalStorageProviderSingleton = new AsyncLocalStorageProvider();
var getCurrentRunTree = () => {
  const runTree = AsyncLocalStorageProviderSingleton.getInstance().getStore();
  if (runTree === void 0) {
    throw new Error([
      "Could not get the current run tree.",
      "",
      "Please make sure you are calling this method within a traceable function or the tracing is enabled."
    ].join("\n"));
  }
  return runTree;
};
var ROOT = Symbol.for("langsmith:traceable:root");
function isTraceableFunction(x) {
  return typeof x === "function" && "langsmith:traceable" in x;
}

// node_modules/@langchain/core/dist/callbacks/base.js
var BaseCallbackHandlerMethodsClass = class {
};
var BaseCallbackHandler = class _BaseCallbackHandler extends BaseCallbackHandlerMethodsClass {
  get lc_namespace() {
    return ["langchain_core", "callbacks", this.name];
  }
  get lc_secrets() {
    return void 0;
  }
  get lc_attributes() {
    return void 0;
  }
  get lc_aliases() {
    return void 0;
  }
  /**
   * The name of the serializable. Override to provide an alias or
   * to preserve the serialized module name in minified environments.
   *
   * Implemented as a static method to support loading logic.
   */
  static lc_name() {
    return this.name;
  }
  /**
   * The final serialized identifier for the module.
   */
  get lc_id() {
    return [
      ...this.lc_namespace,
      get_lc_unique_name(this.constructor)
    ];
  }
  constructor(input) {
    super();
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "lc_kwargs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "ignoreLLM", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "ignoreChain", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "ignoreAgent", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "ignoreRetriever", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "raiseError", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "awaitHandlers", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: getEnvironmentVariable("LANGCHAIN_CALLBACKS_BACKGROUND") !== "true"
    });
    this.lc_kwargs = input || {};
    if (input) {
      this.ignoreLLM = input.ignoreLLM ?? this.ignoreLLM;
      this.ignoreChain = input.ignoreChain ?? this.ignoreChain;
      this.ignoreAgent = input.ignoreAgent ?? this.ignoreAgent;
      this.ignoreRetriever = input.ignoreRetriever ?? this.ignoreRetriever;
      this.raiseError = input.raiseError ?? this.raiseError;
      this.awaitHandlers = this.raiseError || (input._awaitHandler ?? this.awaitHandlers);
    }
  }
  copy() {
    return new this.constructor(this);
  }
  toJSON() {
    return Serializable.prototype.toJSON.call(this);
  }
  toJSONNotImplemented() {
    return Serializable.prototype.toJSONNotImplemented.call(this);
  }
  static fromMethods(methods) {
    class Handler extends _BaseCallbackHandler {
      constructor() {
        super();
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: v4_default()
        });
        Object.assign(this, methods);
      }
    }
    return new Handler();
  }
};

// node_modules/@langchain/core/dist/tracers/console.js
var import_ansi_styles = __toESM(require_ansi_styles(), 1);

// node_modules/@langchain/core/dist/tracers/base.js
function _coerceToDict(value, defaultKey) {
  return value && !Array.isArray(value) && typeof value === "object" ? value : { [defaultKey]: value };
}
function stripNonAlphanumeric(input) {
  return input.replace(/[-:.]/g, "");
}
function convertToDottedOrderFormat(epoch, runId, executionOrder) {
  const paddedOrder = executionOrder.toFixed(0).slice(0, 3).padStart(3, "0");
  return stripNonAlphanumeric(`${new Date(epoch).toISOString().slice(0, -1)}${paddedOrder}Z`) + runId;
}
var BaseTracer = class extends BaseCallbackHandler {
  constructor(_fields) {
    super(...arguments);
    Object.defineProperty(this, "runMap", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /* @__PURE__ */ new Map()
    });
  }
  copy() {
    return this;
  }
  stringifyError(error) {
    if (error instanceof Error) {
      return error.message + (error?.stack ? `

${error.stack}` : "");
    }
    if (typeof error === "string") {
      return error;
    }
    return `${error}`;
  }
  _addChildRun(parentRun, childRun) {
    parentRun.child_runs.push(childRun);
  }
  async _startTrace(run) {
    const currentDottedOrder = convertToDottedOrderFormat(run.start_time, run.id, run.execution_order);
    const storedRun = { ...run };
    if (storedRun.parent_run_id !== void 0) {
      const parentRun = this.runMap.get(storedRun.parent_run_id);
      if (parentRun) {
        this._addChildRun(parentRun, storedRun);
        parentRun.child_execution_order = Math.max(parentRun.child_execution_order, storedRun.child_execution_order);
        storedRun.trace_id = parentRun.trace_id;
        if (parentRun.dotted_order !== void 0) {
          storedRun.dotted_order = [
            parentRun.dotted_order,
            currentDottedOrder
          ].join(".");
        } else {
        }
      } else {
      }
    } else {
      storedRun.trace_id = storedRun.id;
      storedRun.dotted_order = currentDottedOrder;
    }
    this.runMap.set(storedRun.id, storedRun);
    await this.onRunCreate?.(storedRun);
  }
  async _endTrace(run) {
    const parentRun = run.parent_run_id !== void 0 && this.runMap.get(run.parent_run_id);
    if (parentRun) {
      parentRun.child_execution_order = Math.max(parentRun.child_execution_order, run.child_execution_order);
    } else {
      await this.persistRun(run);
    }
    this.runMap.delete(run.id);
    await this.onRunUpdate?.(run);
  }
  _getExecutionOrder(parentRunId) {
    const parentRun = parentRunId !== void 0 && this.runMap.get(parentRunId);
    if (!parentRun) {
      return 1;
    }
    return parentRun.child_execution_order + 1;
  }
  async handleLLMStart(llm, prompts, runId, parentRunId, extraParams, tags, metadata, name) {
    const execution_order = this._getExecutionOrder(parentRunId);
    const start_time = Date.now();
    const finalExtraParams = metadata ? { ...extraParams, metadata } : extraParams;
    const run = {
      id: runId,
      name: name ?? llm.id[llm.id.length - 1],
      parent_run_id: parentRunId,
      start_time,
      serialized: llm,
      events: [
        {
          name: "start",
          time: new Date(start_time).toISOString()
        }
      ],
      inputs: { prompts },
      execution_order,
      child_runs: [],
      child_execution_order: execution_order,
      run_type: "llm",
      extra: finalExtraParams ?? {},
      tags: tags || []
    };
    await this._startTrace(run);
    await this.onLLMStart?.(run);
    return run;
  }
  async handleChatModelStart(llm, messages, runId, parentRunId, extraParams, tags, metadata, name) {
    const execution_order = this._getExecutionOrder(parentRunId);
    const start_time = Date.now();
    const finalExtraParams = metadata ? { ...extraParams, metadata } : extraParams;
    const run = {
      id: runId,
      name: name ?? llm.id[llm.id.length - 1],
      parent_run_id: parentRunId,
      start_time,
      serialized: llm,
      events: [
        {
          name: "start",
          time: new Date(start_time).toISOString()
        }
      ],
      inputs: { messages },
      execution_order,
      child_runs: [],
      child_execution_order: execution_order,
      run_type: "llm",
      extra: finalExtraParams ?? {},
      tags: tags || []
    };
    await this._startTrace(run);
    await this.onLLMStart?.(run);
    return run;
  }
  async handleLLMEnd(output, runId) {
    const run = this.runMap.get(runId);
    if (!run || run?.run_type !== "llm") {
      throw new Error("No LLM run to end.");
    }
    run.end_time = Date.now();
    run.outputs = output;
    run.events.push({
      name: "end",
      time: new Date(run.end_time).toISOString()
    });
    await this.onLLMEnd?.(run);
    await this._endTrace(run);
    return run;
  }
  async handleLLMError(error, runId) {
    const run = this.runMap.get(runId);
    if (!run || run?.run_type !== "llm") {
      throw new Error("No LLM run to end.");
    }
    run.end_time = Date.now();
    run.error = this.stringifyError(error);
    run.events.push({
      name: "error",
      time: new Date(run.end_time).toISOString()
    });
    await this.onLLMError?.(run);
    await this._endTrace(run);
    return run;
  }
  async handleChainStart(chain, inputs, runId, parentRunId, tags, metadata, runType, name) {
    const execution_order = this._getExecutionOrder(parentRunId);
    const start_time = Date.now();
    const run = {
      id: runId,
      name: name ?? chain.id[chain.id.length - 1],
      parent_run_id: parentRunId,
      start_time,
      serialized: chain,
      events: [
        {
          name: "start",
          time: new Date(start_time).toISOString()
        }
      ],
      inputs,
      execution_order,
      child_execution_order: execution_order,
      run_type: runType ?? "chain",
      child_runs: [],
      extra: metadata ? { metadata } : {},
      tags: tags || []
    };
    await this._startTrace(run);
    await this.onChainStart?.(run);
    return run;
  }
  async handleChainEnd(outputs, runId, _parentRunId, _tags, kwargs) {
    const run = this.runMap.get(runId);
    if (!run) {
      throw new Error("No chain run to end.");
    }
    run.end_time = Date.now();
    run.outputs = _coerceToDict(outputs, "output");
    run.events.push({
      name: "end",
      time: new Date(run.end_time).toISOString()
    });
    if (kwargs?.inputs !== void 0) {
      run.inputs = _coerceToDict(kwargs.inputs, "input");
    }
    await this.onChainEnd?.(run);
    await this._endTrace(run);
    return run;
  }
  async handleChainError(error, runId, _parentRunId, _tags, kwargs) {
    const run = this.runMap.get(runId);
    if (!run) {
      throw new Error("No chain run to end.");
    }
    run.end_time = Date.now();
    run.error = this.stringifyError(error);
    run.events.push({
      name: "error",
      time: new Date(run.end_time).toISOString()
    });
    if (kwargs?.inputs !== void 0) {
      run.inputs = _coerceToDict(kwargs.inputs, "input");
    }
    await this.onChainError?.(run);
    await this._endTrace(run);
    return run;
  }
  async handleToolStart(tool, input, runId, parentRunId, tags, metadata, name) {
    const execution_order = this._getExecutionOrder(parentRunId);
    const start_time = Date.now();
    const run = {
      id: runId,
      name: name ?? tool.id[tool.id.length - 1],
      parent_run_id: parentRunId,
      start_time,
      serialized: tool,
      events: [
        {
          name: "start",
          time: new Date(start_time).toISOString()
        }
      ],
      inputs: { input },
      execution_order,
      child_execution_order: execution_order,
      run_type: "tool",
      child_runs: [],
      extra: metadata ? { metadata } : {},
      tags: tags || []
    };
    await this._startTrace(run);
    await this.onToolStart?.(run);
    return run;
  }
  async handleToolEnd(output, runId) {
    const run = this.runMap.get(runId);
    if (!run || run?.run_type !== "tool") {
      throw new Error("No tool run to end");
    }
    run.end_time = Date.now();
    run.outputs = { output };
    run.events.push({
      name: "end",
      time: new Date(run.end_time).toISOString()
    });
    await this.onToolEnd?.(run);
    await this._endTrace(run);
    return run;
  }
  async handleToolError(error, runId) {
    const run = this.runMap.get(runId);
    if (!run || run?.run_type !== "tool") {
      throw new Error("No tool run to end");
    }
    run.end_time = Date.now();
    run.error = this.stringifyError(error);
    run.events.push({
      name: "error",
      time: new Date(run.end_time).toISOString()
    });
    await this.onToolError?.(run);
    await this._endTrace(run);
    return run;
  }
  async handleAgentAction(action, runId) {
    const run = this.runMap.get(runId);
    if (!run || run?.run_type !== "chain") {
      return;
    }
    const agentRun = run;
    agentRun.actions = agentRun.actions || [];
    agentRun.actions.push(action);
    agentRun.events.push({
      name: "agent_action",
      time: (/* @__PURE__ */ new Date()).toISOString(),
      kwargs: { action }
    });
    await this.onAgentAction?.(run);
  }
  async handleAgentEnd(action, runId) {
    const run = this.runMap.get(runId);
    if (!run || run?.run_type !== "chain") {
      return;
    }
    run.events.push({
      name: "agent_end",
      time: (/* @__PURE__ */ new Date()).toISOString(),
      kwargs: { action }
    });
    await this.onAgentEnd?.(run);
  }
  async handleRetrieverStart(retriever, query, runId, parentRunId, tags, metadata, name) {
    const execution_order = this._getExecutionOrder(parentRunId);
    const start_time = Date.now();
    const run = {
      id: runId,
      name: name ?? retriever.id[retriever.id.length - 1],
      parent_run_id: parentRunId,
      start_time,
      serialized: retriever,
      events: [
        {
          name: "start",
          time: new Date(start_time).toISOString()
        }
      ],
      inputs: { query },
      execution_order,
      child_execution_order: execution_order,
      run_type: "retriever",
      child_runs: [],
      extra: metadata ? { metadata } : {},
      tags: tags || []
    };
    await this._startTrace(run);
    await this.onRetrieverStart?.(run);
    return run;
  }
  async handleRetrieverEnd(documents, runId) {
    const run = this.runMap.get(runId);
    if (!run || run?.run_type !== "retriever") {
      throw new Error("No retriever run to end");
    }
    run.end_time = Date.now();
    run.outputs = { documents };
    run.events.push({
      name: "end",
      time: new Date(run.end_time).toISOString()
    });
    await this.onRetrieverEnd?.(run);
    await this._endTrace(run);
    return run;
  }
  async handleRetrieverError(error, runId) {
    const run = this.runMap.get(runId);
    if (!run || run?.run_type !== "retriever") {
      throw new Error("No retriever run to end");
    }
    run.end_time = Date.now();
    run.error = this.stringifyError(error);
    run.events.push({
      name: "error",
      time: new Date(run.end_time).toISOString()
    });
    await this.onRetrieverError?.(run);
    await this._endTrace(run);
    return run;
  }
  async handleText(text, runId) {
    const run = this.runMap.get(runId);
    if (!run || run?.run_type !== "chain") {
      return;
    }
    run.events.push({
      name: "text",
      time: (/* @__PURE__ */ new Date()).toISOString(),
      kwargs: { text }
    });
    await this.onText?.(run);
  }
  async handleLLMNewToken(token, idx, runId, _parentRunId, _tags, fields) {
    const run = this.runMap.get(runId);
    if (!run || run?.run_type !== "llm") {
      throw new Error(`Invalid "runId" provided to "handleLLMNewToken" callback.`);
    }
    run.events.push({
      name: "new_token",
      time: (/* @__PURE__ */ new Date()).toISOString(),
      kwargs: { token, idx, chunk: fields?.chunk }
    });
    await this.onLLMNewToken?.(run, token, { chunk: fields?.chunk });
    return run;
  }
};

// node_modules/@langchain/core/dist/tracers/console.js
function wrap(style, text) {
  return `${style.open}${text}${style.close}`;
}
function tryJsonStringify(obj, fallback) {
  try {
    return JSON.stringify(obj, null, 2);
  } catch (err) {
    return fallback;
  }
}
function elapsed(run) {
  if (!run.end_time)
    return "";
  const elapsed2 = run.end_time - run.start_time;
  if (elapsed2 < 1e3) {
    return `${elapsed2}ms`;
  }
  return `${(elapsed2 / 1e3).toFixed(2)}s`;
}
var { color } = import_ansi_styles.default;
var ConsoleCallbackHandler = class extends BaseTracer {
  constructor() {
    super(...arguments);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "console_callback_handler"
    });
  }
  /**
   * Method used to persist the run. In this case, it simply returns a
   * resolved promise as there's no persistence logic.
   * @param _run The run to persist.
   * @returns A resolved promise.
   */
  persistRun(_run) {
    return Promise.resolve();
  }
  // utility methods
  /**
   * Method used to get all the parent runs of a given run.
   * @param run The run whose parents are to be retrieved.
   * @returns An array of parent runs.
   */
  getParents(run) {
    const parents = [];
    let currentRun = run;
    while (currentRun.parent_run_id) {
      const parent = this.runMap.get(currentRun.parent_run_id);
      if (parent) {
        parents.push(parent);
        currentRun = parent;
      } else {
        break;
      }
    }
    return parents;
  }
  /**
   * Method used to get a string representation of the run's lineage, which
   * is used in logging.
   * @param run The run whose lineage is to be retrieved.
   * @returns A string representation of the run's lineage.
   */
  getBreadcrumbs(run) {
    const parents = this.getParents(run).reverse();
    const string = [...parents, run].map((parent, i, arr) => {
      const name = `${parent.execution_order}:${parent.run_type}:${parent.name}`;
      return i === arr.length - 1 ? wrap(import_ansi_styles.default.bold, name) : name;
    }).join(" > ");
    return wrap(color.grey, string);
  }
  // logging methods
  /**
   * Method used to log the start of a chain run.
   * @param run The chain run that has started.
   * @returns void
   */
  onChainStart(run) {
    const crumbs = this.getBreadcrumbs(run);
    console.log(`${wrap(color.green, "[chain/start]")} [${crumbs}] Entering Chain run with input: ${tryJsonStringify(run.inputs, "[inputs]")}`);
  }
  /**
   * Method used to log the end of a chain run.
   * @param run The chain run that has ended.
   * @returns void
   */
  onChainEnd(run) {
    const crumbs = this.getBreadcrumbs(run);
    console.log(`${wrap(color.cyan, "[chain/end]")} [${crumbs}] [${elapsed(run)}] Exiting Chain run with output: ${tryJsonStringify(run.outputs, "[outputs]")}`);
  }
  /**
   * Method used to log any errors of a chain run.
   * @param run The chain run that has errored.
   * @returns void
   */
  onChainError(run) {
    const crumbs = this.getBreadcrumbs(run);
    console.log(`${wrap(color.red, "[chain/error]")} [${crumbs}] [${elapsed(run)}] Chain run errored with error: ${tryJsonStringify(run.error, "[error]")}`);
  }
  /**
   * Method used to log the start of an LLM run.
   * @param run The LLM run that has started.
   * @returns void
   */
  onLLMStart(run) {
    const crumbs = this.getBreadcrumbs(run);
    const inputs = "prompts" in run.inputs ? { prompts: run.inputs.prompts.map((p) => p.trim()) } : run.inputs;
    console.log(`${wrap(color.green, "[llm/start]")} [${crumbs}] Entering LLM run with input: ${tryJsonStringify(inputs, "[inputs]")}`);
  }
  /**
   * Method used to log the end of an LLM run.
   * @param run The LLM run that has ended.
   * @returns void
   */
  onLLMEnd(run) {
    const crumbs = this.getBreadcrumbs(run);
    console.log(`${wrap(color.cyan, "[llm/end]")} [${crumbs}] [${elapsed(run)}] Exiting LLM run with output: ${tryJsonStringify(run.outputs, "[response]")}`);
  }
  /**
   * Method used to log any errors of an LLM run.
   * @param run The LLM run that has errored.
   * @returns void
   */
  onLLMError(run) {
    const crumbs = this.getBreadcrumbs(run);
    console.log(`${wrap(color.red, "[llm/error]")} [${crumbs}] [${elapsed(run)}] LLM run errored with error: ${tryJsonStringify(run.error, "[error]")}`);
  }
  /**
   * Method used to log the start of a tool run.
   * @param run The tool run that has started.
   * @returns void
   */
  onToolStart(run) {
    const crumbs = this.getBreadcrumbs(run);
    console.log(`${wrap(color.green, "[tool/start]")} [${crumbs}] Entering Tool run with input: "${run.inputs.input?.trim()}"`);
  }
  /**
   * Method used to log the end of a tool run.
   * @param run The tool run that has ended.
   * @returns void
   */
  onToolEnd(run) {
    const crumbs = this.getBreadcrumbs(run);
    console.log(`${wrap(color.cyan, "[tool/end]")} [${crumbs}] [${elapsed(run)}] Exiting Tool run with output: "${run.outputs?.output?.trim()}"`);
  }
  /**
   * Method used to log any errors of a tool run.
   * @param run The tool run that has errored.
   * @returns void
   */
  onToolError(run) {
    const crumbs = this.getBreadcrumbs(run);
    console.log(`${wrap(color.red, "[tool/error]")} [${crumbs}] [${elapsed(run)}] Tool run errored with error: ${tryJsonStringify(run.error, "[error]")}`);
  }
  /**
   * Method used to log the start of a retriever run.
   * @param run The retriever run that has started.
   * @returns void
   */
  onRetrieverStart(run) {
    const crumbs = this.getBreadcrumbs(run);
    console.log(`${wrap(color.green, "[retriever/start]")} [${crumbs}] Entering Retriever run with input: ${tryJsonStringify(run.inputs, "[inputs]")}`);
  }
  /**
   * Method used to log the end of a retriever run.
   * @param run The retriever run that has ended.
   * @returns void
   */
  onRetrieverEnd(run) {
    const crumbs = this.getBreadcrumbs(run);
    console.log(`${wrap(color.cyan, "[retriever/end]")} [${crumbs}] [${elapsed(run)}] Exiting Retriever run with output: ${tryJsonStringify(run.outputs, "[outputs]")}`);
  }
  /**
   * Method used to log any errors of a retriever run.
   * @param run The retriever run that has errored.
   * @returns void
   */
  onRetrieverError(run) {
    const crumbs = this.getBreadcrumbs(run);
    console.log(`${wrap(color.red, "[retriever/error]")} [${crumbs}] [${elapsed(run)}] Retriever run errored with error: ${tryJsonStringify(run.error, "[error]")}`);
  }
  /**
   * Method used to log the action selected by the agent.
   * @param run The run in which the agent action occurred.
   * @returns void
   */
  onAgentAction(run) {
    const agentRun = run;
    const crumbs = this.getBreadcrumbs(run);
    console.log(`${wrap(color.blue, "[agent/action]")} [${crumbs}] Agent selected action: ${tryJsonStringify(agentRun.actions[agentRun.actions.length - 1], "[action]")}`);
  }
};

// node_modules/langsmith/dist/utils/async_caller.js
var import_p_retry = __toESM(require_p_retry(), 1);
var import_p_queue = __toESM(require_dist(), 1);
var STATUS_NO_RETRY = [
  400,
  // Bad Request
  401,
  // Unauthorized
  403,
  // Forbidden
  404,
  // Not Found
  405,
  // Method Not Allowed
  406,
  // Not Acceptable
  407,
  // Proxy Authentication Required
  408
  // Request Timeout
];
var STATUS_IGNORE = [
  409
  // Conflict
];
var AsyncCaller = class {
  constructor(params) {
    Object.defineProperty(this, "maxConcurrency", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "maxRetries", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "queue", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "onFailedResponseHook", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.maxConcurrency = params.maxConcurrency ?? Infinity;
    this.maxRetries = params.maxRetries ?? 6;
    if ("default" in import_p_queue.default) {
      this.queue = new import_p_queue.default.default({
        concurrency: this.maxConcurrency
      });
    } else {
      this.queue = new import_p_queue.default({ concurrency: this.maxConcurrency });
    }
    this.onFailedResponseHook = params?.onFailedResponseHook;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  call(callable, ...args) {
    const onFailedResponseHook = this.onFailedResponseHook;
    return this.queue.add(() => (0, import_p_retry.default)(() => callable(...args).catch((error) => {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(error);
      }
    }), {
      async onFailedAttempt(error) {
        if (error.message.startsWith("Cancel") || error.message.startsWith("TimeoutError") || error.message.startsWith("AbortError")) {
          throw error;
        }
        if (error?.code === "ECONNABORTED") {
          throw error;
        }
        const response = error?.response;
        const status = response?.status;
        if (status) {
          if (STATUS_NO_RETRY.includes(+status)) {
            throw error;
          } else if (STATUS_IGNORE.includes(+status)) {
            return;
          }
          if (onFailedResponseHook) {
            await onFailedResponseHook(response);
          }
        }
      },
      // If needed we can change some of the defaults here,
      // but they're quite sensible.
      retries: this.maxRetries,
      randomize: true
    }), { throwOnTimeout: true });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callWithOptions(options, callable, ...args) {
    if (options.signal) {
      return Promise.race([
        this.call(callable, ...args),
        new Promise((_, reject) => {
          options.signal?.addEventListener("abort", () => {
            reject(new Error("AbortError"));
          });
        })
      ]);
    }
    return this.call(callable, ...args);
  }
  fetch(...args) {
    return this.call(() => fetch(...args).then((res) => res.ok ? res : Promise.reject(res)));
  }
};

// node_modules/langsmith/dist/utils/messages.js
function isLangChainMessage(message) {
  return typeof message?._getType === "function";
}
function convertLangChainMessageToExample(message) {
  const converted = {
    type: message._getType(),
    data: { content: message.content }
  };
  if (message?.additional_kwargs && Object.keys(message.additional_kwargs).length > 0) {
    converted.data.additional_kwargs = { ...message.additional_kwargs };
  }
  return converted;
}

// node_modules/langsmith/dist/utils/env.js
var globalEnv;
var isBrowser2 = () => typeof window !== "undefined" && typeof window.document !== "undefined";
var isWebWorker2 = () => typeof globalThis === "object" && globalThis.constructor && globalThis.constructor.name === "DedicatedWorkerGlobalScope";
var isJsDom2 = () => typeof window !== "undefined" && window.name === "nodejs" || typeof navigator !== "undefined" && (navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom"));
var isDeno2 = () => typeof Deno !== "undefined";
var isNode2 = () => typeof process !== "undefined" && typeof process.versions !== "undefined" && typeof process.versions.node !== "undefined" && !isDeno2();
var getEnv2 = () => {
  if (globalEnv) {
    return globalEnv;
  }
  if (isBrowser2()) {
    globalEnv = "browser";
  } else if (isNode2()) {
    globalEnv = "node";
  } else if (isWebWorker2()) {
    globalEnv = "webworker";
  } else if (isJsDom2()) {
    globalEnv = "jsdom";
  } else if (isDeno2()) {
    globalEnv = "deno";
  } else {
    globalEnv = "other";
  }
  return globalEnv;
};
var runtimeEnvironment2;
async function getRuntimeEnvironment2() {
  if (runtimeEnvironment2 === void 0) {
    const env = getEnv2();
    const releaseEnv = getShas();
    runtimeEnvironment2 = {
      library: "langsmith",
      runtime: env,
      sdk: "langsmith-js",
      sdk_version: __version__,
      ...releaseEnv
    };
  }
  return runtimeEnvironment2;
}
function getLangChainEnvVarsMetadata() {
  const allEnvVars = getEnvironmentVariables() || {};
  const envVars = {};
  const excluded = [
    "LANGCHAIN_API_KEY",
    "LANGCHAIN_ENDPOINT",
    "LANGCHAIN_TRACING_V2",
    "LANGCHAIN_PROJECT",
    "LANGCHAIN_SESSION"
  ];
  for (const [key, value] of Object.entries(allEnvVars)) {
    if (key.startsWith("LANGCHAIN_") && typeof value === "string" && !excluded.includes(key) && !key.toLowerCase().includes("key") && !key.toLowerCase().includes("secret") && !key.toLowerCase().includes("token")) {
      if (key === "LANGCHAIN_REVISION_ID") {
        envVars["revision_id"] = value;
      } else {
        envVars[key] = value;
      }
    }
  }
  return envVars;
}
function getEnvironmentVariables() {
  try {
    if (typeof process !== "undefined" && process.env) {
      return Object.entries(process.env).reduce((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {});
    }
    return void 0;
  } catch (e) {
    return void 0;
  }
}
function getEnvironmentVariable2(name) {
  try {
    return typeof process !== "undefined" ? (
      // eslint-disable-next-line no-process-env
      process.env?.[name]
    ) : void 0;
  } catch (e) {
    return void 0;
  }
}
var cachedCommitSHAs;
function getShas() {
  if (cachedCommitSHAs !== void 0) {
    return cachedCommitSHAs;
  }
  const common_release_envs = [
    "VERCEL_GIT_COMMIT_SHA",
    "NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA",
    "COMMIT_REF",
    "RENDER_GIT_COMMIT",
    "CI_COMMIT_SHA",
    "CIRCLE_SHA1",
    "CF_PAGES_COMMIT_SHA",
    "REACT_APP_GIT_SHA",
    "SOURCE_VERSION",
    "GITHUB_SHA",
    "TRAVIS_COMMIT",
    "GIT_COMMIT",
    "BUILD_VCS_NUMBER",
    "bamboo_planRepository_revision",
    "Build.SourceVersion",
    "BITBUCKET_COMMIT",
    "DRONE_COMMIT_SHA",
    "SEMAPHORE_GIT_SHA",
    "BUILDKITE_COMMIT"
  ];
  const shas = {};
  for (const env of common_release_envs) {
    const envVar = getEnvironmentVariable2(env);
    if (envVar !== void 0) {
      shas[env] = envVar;
    }
  }
  cachedCommitSHAs = shas;
  return shas;
}

// node_modules/langsmith/dist/utils/_uuid.js
function assertUuid(str) {
  if (!validate_default(str)) {
    throw new Error(`Invalid UUID: ${str}`);
  }
}

// node_modules/langsmith/dist/utils/warn.js
var warnedMessages = {};
function warnOnce(message) {
  if (!warnedMessages[message]) {
    console.warn(message);
    warnedMessages[message] = true;
  }
}

// node_modules/langsmith/dist/client.js
async function mergeRuntimeEnvIntoRunCreates(runs) {
  const runtimeEnv = await getRuntimeEnvironment2();
  const envVars = getLangChainEnvVarsMetadata();
  return runs.map((run) => {
    const extra = run.extra ?? {};
    const metadata = extra.metadata;
    run.extra = {
      ...extra,
      runtime: {
        ...runtimeEnv,
        ...extra?.runtime
      },
      metadata: {
        ...envVars,
        ...envVars.revision_id || run.revision_id ? { revision_id: run.revision_id ?? envVars.revision_id } : {},
        ...metadata
      }
    };
    return run;
  });
}
var getTracingSamplingRate = () => {
  const samplingRateStr = getEnvironmentVariable2("LANGCHAIN_TRACING_SAMPLING_RATE");
  if (samplingRateStr === void 0) {
    return void 0;
  }
  const samplingRate = parseFloat(samplingRateStr);
  if (samplingRate < 0 || samplingRate > 1) {
    throw new Error(`LANGCHAIN_TRACING_SAMPLING_RATE must be between 0 and 1 if set. Got: ${samplingRate}`);
  }
  return samplingRate;
};
var isLocalhost = (url) => {
  const strippedUrl = url.replace("http://", "").replace("https://", "");
  const hostname = strippedUrl.split("/")[0].split(":")[0];
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
};
var raiseForStatus = async (response, operation) => {
  const body = await response.text();
  if (!response.ok) {
    throw new Error(`Failed to ${operation}: ${response.status} ${response.statusText} ${body}`);
  }
};
async function toArray(iterable) {
  const result = [];
  for await (const item of iterable) {
    result.push(item);
  }
  return result;
}
function trimQuotes(str) {
  if (str === void 0) {
    return void 0;
  }
  return str.trim().replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
}
var handle429 = async (response) => {
  if (response?.status === 429) {
    const retryAfter = parseInt(response.headers.get("retry-after") ?? "30", 10) * 1e3;
    if (retryAfter > 0) {
      await new Promise((resolve) => setTimeout(resolve, retryAfter));
      return true;
    }
  }
  return false;
};
var Queue = class {
  constructor() {
    Object.defineProperty(this, "items", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
  }
  get size() {
    return this.items.length;
  }
  push(item) {
    return new Promise((resolve) => {
      this.items.push([item, resolve]);
    });
  }
  pop(upToN) {
    if (upToN < 1) {
      throw new Error("Number of items to pop off may not be less than 1.");
    }
    const popped = [];
    while (popped.length < upToN && this.items.length) {
      const item = this.items.shift();
      if (item) {
        popped.push(item);
      } else {
        break;
      }
    }
    return [popped.map((it) => it[0]), () => popped.forEach((it) => it[1]())];
  }
};
var DEFAULT_BATCH_SIZE_LIMIT_BYTES = 20971520;
var Client = class _Client {
  constructor(config = {}) {
    Object.defineProperty(this, "apiKey", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "apiUrl", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "webUrl", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "caller", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "batchIngestCaller", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "timeout_ms", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_tenantId", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: null
    });
    Object.defineProperty(this, "hideInputs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "hideOutputs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "tracingSampleRate", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "sampledPostUuids", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /* @__PURE__ */ new Set()
    });
    Object.defineProperty(this, "autoBatchTracing", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "batchEndpointSupported", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "autoBatchQueue", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: new Queue()
    });
    Object.defineProperty(this, "pendingAutoBatchedRunLimit", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 100
    });
    Object.defineProperty(this, "autoBatchTimeout", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "autoBatchInitialDelayMs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 250
    });
    Object.defineProperty(this, "autoBatchAggregationDelayMs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 50
    });
    Object.defineProperty(this, "serverInfo", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "fetchOptions", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    const defaultConfig = _Client.getDefaultClientConfig();
    this.tracingSampleRate = getTracingSamplingRate();
    this.apiUrl = trimQuotes(config.apiUrl ?? defaultConfig.apiUrl) ?? "";
    this.apiKey = trimQuotes(config.apiKey ?? defaultConfig.apiKey);
    this.webUrl = trimQuotes(config.webUrl ?? defaultConfig.webUrl);
    this.timeout_ms = config.timeout_ms ?? 12e3;
    this.caller = new AsyncCaller(config.callerOptions ?? {});
    this.batchIngestCaller = new AsyncCaller({
      ...config.callerOptions ?? {},
      onFailedResponseHook: handle429
    });
    this.hideInputs = config.hideInputs ?? config.anonymizer ?? defaultConfig.hideInputs;
    this.hideOutputs = config.hideOutputs ?? config.anonymizer ?? defaultConfig.hideOutputs;
    this.autoBatchTracing = config.autoBatchTracing ?? this.autoBatchTracing;
    this.pendingAutoBatchedRunLimit = config.pendingAutoBatchedRunLimit ?? this.pendingAutoBatchedRunLimit;
    this.fetchOptions = config.fetchOptions || {};
  }
  static getDefaultClientConfig() {
    const apiKey = getEnvironmentVariable2("LANGCHAIN_API_KEY");
    const apiUrl = getEnvironmentVariable2("LANGCHAIN_ENDPOINT") ?? "https://api.smith.langchain.com";
    const hideInputs = getEnvironmentVariable2("LANGCHAIN_HIDE_INPUTS") === "true";
    const hideOutputs = getEnvironmentVariable2("LANGCHAIN_HIDE_OUTPUTS") === "true";
    return {
      apiUrl,
      apiKey,
      webUrl: void 0,
      hideInputs,
      hideOutputs
    };
  }
  getHostUrl() {
    if (this.webUrl) {
      return this.webUrl;
    } else if (isLocalhost(this.apiUrl)) {
      this.webUrl = "http://localhost:3000";
      return this.webUrl;
    } else if (this.apiUrl.includes("/api") && !this.apiUrl.split(".", 1)[0].endsWith("api")) {
      this.webUrl = this.apiUrl.replace("/api", "");
      return this.webUrl;
    } else if (this.apiUrl.split(".", 1)[0].includes("dev")) {
      this.webUrl = "https://dev.smith.langchain.com";
      return this.webUrl;
    } else {
      this.webUrl = "https://smith.langchain.com";
      return this.webUrl;
    }
  }
  get headers() {
    const headers = {
      "User-Agent": `langsmith-js/${__version__}`
    };
    if (this.apiKey) {
      headers["x-api-key"] = `${this.apiKey}`;
    }
    return headers;
  }
  processInputs(inputs) {
    if (this.hideInputs === false) {
      return inputs;
    }
    if (this.hideInputs === true) {
      return {};
    }
    if (typeof this.hideInputs === "function") {
      return this.hideInputs(inputs);
    }
    return inputs;
  }
  processOutputs(outputs) {
    if (this.hideOutputs === false) {
      return outputs;
    }
    if (this.hideOutputs === true) {
      return {};
    }
    if (typeof this.hideOutputs === "function") {
      return this.hideOutputs(outputs);
    }
    return outputs;
  }
  prepareRunCreateOrUpdateInputs(run) {
    const runParams = { ...run };
    if (runParams.inputs !== void 0) {
      runParams.inputs = this.processInputs(runParams.inputs);
    }
    if (runParams.outputs !== void 0) {
      runParams.outputs = this.processOutputs(runParams.outputs);
    }
    return runParams;
  }
  async _getResponse(path, queryParams) {
    const paramsString = queryParams?.toString() ?? "";
    const url = `${this.apiUrl}${path}?${paramsString}`;
    const response = await this.caller.call(fetch, url, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
    }
    return response;
  }
  async _get(path, queryParams) {
    const response = await this._getResponse(path, queryParams);
    return response.json();
  }
  async *_getPaginated(path, queryParams = new URLSearchParams()) {
    let offset = Number(queryParams.get("offset")) || 0;
    const limit = Number(queryParams.get("limit")) || 100;
    while (true) {
      queryParams.set("offset", String(offset));
      queryParams.set("limit", String(limit));
      const url = `${this.apiUrl}${path}?${queryParams}`;
      const response = await this.caller.call(fetch, url, {
        method: "GET",
        headers: this.headers,
        signal: AbortSignal.timeout(this.timeout_ms),
        ...this.fetchOptions
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
      }
      const items = await response.json();
      if (items.length === 0) {
        break;
      }
      yield items;
      if (items.length < limit) {
        break;
      }
      offset += items.length;
    }
  }
  async *_getCursorPaginatedList(path, body = null, requestMethod = "POST", dataKey = "runs") {
    const bodyParams = body ? { ...body } : {};
    while (true) {
      const response = await this.caller.call(fetch, `${this.apiUrl}${path}`, {
        method: requestMethod,
        headers: { ...this.headers, "Content-Type": "application/json" },
        signal: AbortSignal.timeout(this.timeout_ms),
        ...this.fetchOptions,
        body: JSON.stringify(bodyParams)
      });
      const responseBody = await response.json();
      if (!responseBody) {
        break;
      }
      if (!responseBody[dataKey]) {
        break;
      }
      yield responseBody[dataKey];
      const cursors = responseBody.cursors;
      if (!cursors) {
        break;
      }
      if (!cursors.next) {
        break;
      }
      bodyParams.cursor = cursors.next;
    }
  }
  _filterForSampling(runs, patch = false) {
    if (this.tracingSampleRate === void 0) {
      return runs;
    }
    if (patch) {
      const sampled = [];
      for (const run of runs) {
        if (this.sampledPostUuids.has(run.id)) {
          sampled.push(run);
          this.sampledPostUuids.delete(run.id);
        }
      }
      return sampled;
    } else {
      const sampled = [];
      for (const run of runs) {
        if (Math.random() < this.tracingSampleRate) {
          sampled.push(run);
          this.sampledPostUuids.add(run.id);
        }
      }
      return sampled;
    }
  }
  async drainAutoBatchQueue() {
    while (this.autoBatchQueue.size >= 0) {
      const [batch, done] = this.autoBatchQueue.pop(this.pendingAutoBatchedRunLimit);
      if (!batch.length) {
        done();
        return;
      }
      try {
        await this.batchIngestRuns({
          runCreates: batch.filter((item) => item.action === "create").map((item) => item.item),
          runUpdates: batch.filter((item) => item.action === "update").map((item) => item.item)
        });
      } finally {
        done();
      }
    }
  }
  async processRunOperation(item, immediatelyTriggerBatch) {
    const oldTimeout = this.autoBatchTimeout;
    clearTimeout(this.autoBatchTimeout);
    this.autoBatchTimeout = void 0;
    const itemPromise = this.autoBatchQueue.push(item);
    if (immediatelyTriggerBatch || this.autoBatchQueue.size > this.pendingAutoBatchedRunLimit) {
      await this.drainAutoBatchQueue();
    }
    if (this.autoBatchQueue.size > 0) {
      this.autoBatchTimeout = setTimeout(() => {
        this.autoBatchTimeout = void 0;
        void this.drainAutoBatchQueue().catch(console.error);
      }, oldTimeout ? this.autoBatchAggregationDelayMs : this.autoBatchInitialDelayMs);
    }
    return itemPromise;
  }
  async _getServerInfo() {
    const response = await fetch(`${this.apiUrl}/info`, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    if (!response.ok) {
      await response.text();
      throw new Error("Failed to retrieve server info.");
    }
    return response.json();
  }
  async batchEndpointIsSupported() {
    try {
      this.serverInfo = await this._getServerInfo();
    } catch (e) {
      return false;
    }
    return true;
  }
  async createRun(run) {
    if (!this._filterForSampling([run]).length) {
      return;
    }
    const headers = { ...this.headers, "Content-Type": "application/json" };
    const session_name = run.project_name;
    delete run.project_name;
    const runCreate = this.prepareRunCreateOrUpdateInputs({
      session_name,
      ...run,
      start_time: run.start_time ?? Date.now()
    });
    if (this.autoBatchTracing && runCreate.trace_id !== void 0 && runCreate.dotted_order !== void 0) {
      void this.processRunOperation({
        action: "create",
        item: runCreate
      }).catch(console.error);
      return;
    }
    const mergedRunCreateParams = await mergeRuntimeEnvIntoRunCreates([
      runCreate
    ]);
    const response = await this.caller.call(fetch, `${this.apiUrl}/runs`, {
      method: "POST",
      headers,
      body: JSON.stringify(mergedRunCreateParams[0]),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "create run");
  }
  /**
   * Batch ingest/upsert multiple runs in the Langsmith system.
   * @param runs
   */
  async batchIngestRuns({ runCreates, runUpdates }) {
    if (runCreates === void 0 && runUpdates === void 0) {
      return;
    }
    let preparedCreateParams = runCreates?.map((create) => this.prepareRunCreateOrUpdateInputs(create)) ?? [];
    let preparedUpdateParams = runUpdates?.map((update) => this.prepareRunCreateOrUpdateInputs(update)) ?? [];
    if (preparedCreateParams.length > 0 && preparedUpdateParams.length > 0) {
      const createById = preparedCreateParams.reduce((params, run) => {
        if (!run.id) {
          return params;
        }
        params[run.id] = run;
        return params;
      }, {});
      const standaloneUpdates = [];
      for (const updateParam of preparedUpdateParams) {
        if (updateParam.id !== void 0 && createById[updateParam.id]) {
          createById[updateParam.id] = {
            ...createById[updateParam.id],
            ...updateParam
          };
        } else {
          standaloneUpdates.push(updateParam);
        }
      }
      preparedCreateParams = Object.values(createById);
      preparedUpdateParams = standaloneUpdates;
    }
    const rawBatch = {
      post: this._filterForSampling(preparedCreateParams),
      patch: this._filterForSampling(preparedUpdateParams, true)
    };
    if (!rawBatch.post.length && !rawBatch.patch.length) {
      return;
    }
    preparedCreateParams = await mergeRuntimeEnvIntoRunCreates(preparedCreateParams);
    if (this.batchEndpointSupported === void 0) {
      this.batchEndpointSupported = await this.batchEndpointIsSupported();
    }
    if (!this.batchEndpointSupported) {
      this.autoBatchTracing = false;
      for (const preparedCreateParam of rawBatch.post) {
        await this.createRun(preparedCreateParam);
      }
      for (const preparedUpdateParam of rawBatch.patch) {
        if (preparedUpdateParam.id !== void 0) {
          await this.updateRun(preparedUpdateParam.id, preparedUpdateParam);
        }
      }
      return;
    }
    const sizeLimitBytes = this.serverInfo?.batch_ingest_config?.size_limit_bytes ?? DEFAULT_BATCH_SIZE_LIMIT_BYTES;
    const batchChunks = {
      post: [],
      patch: []
    };
    let currentBatchSizeBytes = 0;
    for (const k of ["post", "patch"]) {
      const key = k;
      const batchItems = rawBatch[key].reverse();
      let batchItem = batchItems.pop();
      while (batchItem !== void 0) {
        const stringifiedBatchItem = JSON.stringify(batchItem);
        if (currentBatchSizeBytes > 0 && currentBatchSizeBytes + stringifiedBatchItem.length > sizeLimitBytes) {
          await this._postBatchIngestRuns(JSON.stringify(batchChunks));
          currentBatchSizeBytes = 0;
          batchChunks.post = [];
          batchChunks.patch = [];
        }
        currentBatchSizeBytes += stringifiedBatchItem.length;
        batchChunks[key].push(batchItem);
        batchItem = batchItems.pop();
      }
    }
    if (batchChunks.post.length > 0 || batchChunks.patch.length > 0) {
      await this._postBatchIngestRuns(JSON.stringify(batchChunks));
    }
  }
  async _postBatchIngestRuns(body) {
    const headers = {
      ...this.headers,
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    const response = await this.batchIngestCaller.call(fetch, `${this.apiUrl}/runs/batch`, {
      method: "POST",
      headers,
      body,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "batch create run");
  }
  async updateRun(runId, run) {
    assertUuid(runId);
    if (run.inputs) {
      run.inputs = this.processInputs(run.inputs);
    }
    if (run.outputs) {
      run.outputs = this.processOutputs(run.outputs);
    }
    const data = { ...run, id: runId };
    if (!this._filterForSampling([data], true).length) {
      return;
    }
    if (this.autoBatchTracing && data.trace_id !== void 0 && data.dotted_order !== void 0) {
      if (run.end_time !== void 0 && data.parent_run_id === void 0) {
        await this.processRunOperation({ action: "update", item: data }, true);
        return;
      } else {
        void this.processRunOperation({ action: "update", item: data }).catch(console.error);
      }
      return;
    }
    const headers = { ...this.headers, "Content-Type": "application/json" };
    const response = await this.caller.call(fetch, `${this.apiUrl}/runs/${runId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(run),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "update run");
  }
  async readRun(runId, { loadChildRuns } = { loadChildRuns: false }) {
    assertUuid(runId);
    let run = await this._get(`/runs/${runId}`);
    if (loadChildRuns && run.child_run_ids) {
      run = await this._loadChildRuns(run);
    }
    return run;
  }
  async getRunUrl({ runId, run, projectOpts }) {
    if (run !== void 0) {
      let sessionId;
      if (run.session_id) {
        sessionId = run.session_id;
      } else if (projectOpts?.projectName) {
        sessionId = (await this.readProject({ projectName: projectOpts?.projectName })).id;
      } else if (projectOpts?.projectId) {
        sessionId = projectOpts?.projectId;
      } else {
        const project = await this.readProject({
          projectName: getEnvironmentVariable2("LANGCHAIN_PROJECT") || "default"
        });
        sessionId = project.id;
      }
      const tenantId = await this._getTenantId();
      return `${this.getHostUrl()}/o/${tenantId}/projects/p/${sessionId}/r/${run.id}?poll=true`;
    } else if (runId !== void 0) {
      const run_ = await this.readRun(runId);
      if (!run_.app_path) {
        throw new Error(`Run ${runId} has no app_path`);
      }
      const baseUrl = this.getHostUrl();
      return `${baseUrl}${run_.app_path}`;
    } else {
      throw new Error("Must provide either runId or run");
    }
  }
  async _loadChildRuns(run) {
    const childRuns = await toArray(this.listRuns({ id: run.child_run_ids }));
    const treemap = {};
    const runs = {};
    childRuns.sort((a, b) => (a?.dotted_order ?? "").localeCompare(b?.dotted_order ?? ""));
    for (const childRun of childRuns) {
      if (childRun.parent_run_id === null || childRun.parent_run_id === void 0) {
        throw new Error(`Child run ${childRun.id} has no parent`);
      }
      if (!(childRun.parent_run_id in treemap)) {
        treemap[childRun.parent_run_id] = [];
      }
      treemap[childRun.parent_run_id].push(childRun);
      runs[childRun.id] = childRun;
    }
    run.child_runs = treemap[run.id] || [];
    for (const runId in treemap) {
      if (runId !== run.id) {
        runs[runId].child_runs = treemap[runId];
      }
    }
    return run;
  }
  /**
   * List runs from the LangSmith server.
   * @param projectId - The ID of the project to filter by.
   * @param projectName - The name of the project to filter by.
   * @param parentRunId - The ID of the parent run to filter by.
   * @param traceId - The ID of the trace to filter by.
   * @param referenceExampleId - The ID of the reference example to filter by.
   * @param startTime - The start time to filter by.
   * @param isRoot - Indicates whether to only return root runs.
   * @param runType - The run type to filter by.
   * @param error - Indicates whether to filter by error runs.
   * @param id - The ID of the run to filter by.
   * @param query - The query string to filter by.
   * @param filter - The filter string to apply to the run spans.
   * @param traceFilter - The filter string to apply on the root run of the trace.
   * @param limit - The maximum number of runs to retrieve.
   * @returns {AsyncIterable<Run>} - The runs.
   *
   * @example
   * // List all runs in a project
   * const projectRuns = client.listRuns({ projectName: "<your_project>" });
   *
   * @example
   * // List LLM and Chat runs in the last 24 hours
   * const todaysLLMRuns = client.listRuns({
   *   projectName: "<your_project>",
   *   start_time: new Date(Date.now() - 24 * 60 * 60 * 1000),
   *   run_type: "llm",
   * });
   *
   * @example
   * // List traces in a project
   * const rootRuns = client.listRuns({
   *   projectName: "<your_project>",
   *   execution_order: 1,
   * });
   *
   * @example
   * // List runs without errors
   * const correctRuns = client.listRuns({
   *   projectName: "<your_project>",
   *   error: false,
   * });
   *
   * @example
   * // List runs by run ID
   * const runIds = [
   *   "a36092d2-4ad5-4fb4-9c0d-0dba9a2ed836",
   *   "9398e6be-964f-4aa4-8ae9-ad78cd4b7074",
   * ];
   * const selectedRuns = client.listRuns({ run_ids: runIds });
   *
   * @example
   * // List all "chain" type runs that took more than 10 seconds and had `total_tokens` greater than 5000
   * const chainRuns = client.listRuns({
   *   projectName: "<your_project>",
   *   filter: 'and(eq(run_type, "chain"), gt(latency, 10), gt(total_tokens, 5000))',
   * });
   *
   * @example
   * // List all runs called "extractor" whose root of the trace was assigned feedback "user_score" score of 1
   * const goodExtractorRuns = client.listRuns({
   *   projectName: "<your_project>",
   *   filter: 'eq(name, "extractor")',
   *   traceFilter: 'and(eq(feedback_key, "user_score"), eq(feedback_score, 1))',
   * });
   *
   * @example
   * // List all runs that started after a specific timestamp and either have "error" not equal to null or a "Correctness" feedback score equal to 0
   * const complexRuns = client.listRuns({
   *   projectName: "<your_project>",
   *   filter: 'and(gt(start_time, "2023-07-15T12:34:56Z"), or(neq(error, null), and(eq(feedback_key, "Correctness"), eq(feedback_score, 0.0))))',
   * });
   *
   * @example
   * // List all runs where `tags` include "experimental" or "beta" and `latency` is greater than 2 seconds
   * const taggedRuns = client.listRuns({
   *   projectName: "<your_project>",
   *   filter: 'and(or(has(tags, "experimental"), has(tags, "beta")), gt(latency, 2))',
   * });
   */
  async *listRuns(props) {
    const { projectId, projectName, parentRunId, traceId, referenceExampleId, startTime, executionOrder, isRoot, runType, error, id, query, filter, traceFilter, treeFilter, limit, select } = props;
    let projectIds = [];
    if (projectId) {
      projectIds = Array.isArray(projectId) ? projectId : [projectId];
    }
    if (projectName) {
      const projectNames = Array.isArray(projectName) ? projectName : [projectName];
      const projectIds_ = await Promise.all(projectNames.map((name) => this.readProject({ projectName: name }).then((project) => project.id)));
      projectIds.push(...projectIds_);
    }
    const default_select = [
      "app_path",
      "child_run_ids",
      "completion_cost",
      "completion_tokens",
      "dotted_order",
      "end_time",
      "error",
      "events",
      "extra",
      "feedback_stats",
      "first_token_time",
      "id",
      "inputs",
      "name",
      "outputs",
      "parent_run_id",
      "parent_run_ids",
      "prompt_cost",
      "prompt_tokens",
      "reference_example_id",
      "run_type",
      "session_id",
      "start_time",
      "status",
      "tags",
      "total_cost",
      "total_tokens",
      "trace_id"
    ];
    const body = {
      session: projectIds.length ? projectIds : null,
      run_type: runType,
      reference_example: referenceExampleId,
      query,
      filter,
      trace_filter: traceFilter,
      tree_filter: treeFilter,
      execution_order: executionOrder,
      parent_run: parentRunId,
      start_time: startTime ? startTime.toISOString() : null,
      error,
      id,
      limit,
      trace: traceId,
      select: select ? select : default_select,
      is_root: isRoot
    };
    let runsYielded = 0;
    for await (const runs of this._getCursorPaginatedList("/runs/query", body)) {
      if (limit) {
        if (runsYielded >= limit) {
          break;
        }
        if (runs.length + runsYielded > limit) {
          const newRuns = runs.slice(0, limit - runsYielded);
          yield* newRuns;
          break;
        }
        runsYielded += runs.length;
        yield* runs;
      } else {
        yield* runs;
      }
    }
  }
  async shareRun(runId, { shareId } = {}) {
    const data = {
      run_id: runId,
      share_token: shareId || v4_default()
    };
    assertUuid(runId);
    const response = await this.caller.call(fetch, `${this.apiUrl}/runs/${runId}/share`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    const result = await response.json();
    if (result === null || !("share_token" in result)) {
      throw new Error("Invalid response from server");
    }
    return `${this.getHostUrl()}/public/${result["share_token"]}/r`;
  }
  async unshareRun(runId) {
    assertUuid(runId);
    const response = await this.caller.call(fetch, `${this.apiUrl}/runs/${runId}/share`, {
      method: "DELETE",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "unshare run");
  }
  async readRunSharedLink(runId) {
    assertUuid(runId);
    const response = await this.caller.call(fetch, `${this.apiUrl}/runs/${runId}/share`, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    const result = await response.json();
    if (result === null || !("share_token" in result)) {
      return void 0;
    }
    return `${this.getHostUrl()}/public/${result["share_token"]}/r`;
  }
  async listSharedRuns(shareToken, { runIds } = {}) {
    const queryParams = new URLSearchParams({
      share_token: shareToken
    });
    if (runIds !== void 0) {
      for (const runId of runIds) {
        queryParams.append("id", runId);
      }
    }
    assertUuid(shareToken);
    const response = await this.caller.call(fetch, `${this.apiUrl}/public/${shareToken}/runs${queryParams}`, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    const runs = await response.json();
    return runs;
  }
  async readDatasetSharedSchema(datasetId, datasetName) {
    if (!datasetId && !datasetName) {
      throw new Error("Either datasetId or datasetName must be given");
    }
    if (!datasetId) {
      const dataset = await this.readDataset({ datasetName });
      datasetId = dataset.id;
    }
    assertUuid(datasetId);
    const response = await this.caller.call(fetch, `${this.apiUrl}/datasets/${datasetId}/share`, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    const shareSchema = await response.json();
    shareSchema.url = `${this.getHostUrl()}/public/${shareSchema.share_token}/d`;
    return shareSchema;
  }
  async shareDataset(datasetId, datasetName) {
    if (!datasetId && !datasetName) {
      throw new Error("Either datasetId or datasetName must be given");
    }
    if (!datasetId) {
      const dataset = await this.readDataset({ datasetName });
      datasetId = dataset.id;
    }
    const data = {
      dataset_id: datasetId
    };
    assertUuid(datasetId);
    const response = await this.caller.call(fetch, `${this.apiUrl}/datasets/${datasetId}/share`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    const shareSchema = await response.json();
    shareSchema.url = `${this.getHostUrl()}/public/${shareSchema.share_token}/d`;
    return shareSchema;
  }
  async unshareDataset(datasetId) {
    assertUuid(datasetId);
    const response = await this.caller.call(fetch, `${this.apiUrl}/datasets/${datasetId}/share`, {
      method: "DELETE",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "unshare dataset");
  }
  async readSharedDataset(shareToken) {
    assertUuid(shareToken);
    const response = await this.caller.call(fetch, `${this.apiUrl}/public/${shareToken}/datasets`, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    const dataset = await response.json();
    return dataset;
  }
  async createProject({ projectName, description = null, metadata = null, upsert = false, projectExtra = null, referenceDatasetId = null }) {
    const upsert_ = upsert ? `?upsert=true` : "";
    const endpoint = `${this.apiUrl}/sessions${upsert_}`;
    const extra = projectExtra || {};
    if (metadata) {
      extra["metadata"] = metadata;
    }
    const body = {
      name: projectName,
      extra,
      description
    };
    if (referenceDatasetId !== null) {
      body["reference_dataset_id"] = referenceDatasetId;
    }
    const response = await this.caller.call(fetch, endpoint, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(`Failed to create session ${projectName}: ${response.status} ${response.statusText}`);
    }
    return result;
  }
  async updateProject(projectId, { name = null, description = null, metadata = null, projectExtra = null, endTime = null }) {
    const endpoint = `${this.apiUrl}/sessions/${projectId}`;
    let extra = projectExtra;
    if (metadata) {
      extra = { ...extra || {}, metadata };
    }
    const body = {
      name,
      extra,
      description,
      end_time: endTime ? new Date(endTime).toISOString() : null
    };
    const response = await this.caller.call(fetch, endpoint, {
      method: "PATCH",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(`Failed to update project ${projectId}: ${response.status} ${response.statusText}`);
    }
    return result;
  }
  async hasProject({ projectId, projectName }) {
    let path = "/sessions";
    const params = new URLSearchParams();
    if (projectId !== void 0 && projectName !== void 0) {
      throw new Error("Must provide either projectName or projectId, not both");
    } else if (projectId !== void 0) {
      assertUuid(projectId);
      path += `/${projectId}`;
    } else if (projectName !== void 0) {
      params.append("name", projectName);
    } else {
      throw new Error("Must provide projectName or projectId");
    }
    const response = await this.caller.call(fetch, `${this.apiUrl}${path}?${params}`, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    try {
      const result = await response.json();
      if (!response.ok) {
        return false;
      }
      if (Array.isArray(result)) {
        return result.length > 0;
      }
      return true;
    } catch (e) {
      return false;
    }
  }
  async readProject({ projectId, projectName, includeStats }) {
    let path = "/sessions";
    const params = new URLSearchParams();
    if (projectId !== void 0 && projectName !== void 0) {
      throw new Error("Must provide either projectName or projectId, not both");
    } else if (projectId !== void 0) {
      assertUuid(projectId);
      path += `/${projectId}`;
    } else if (projectName !== void 0) {
      params.append("name", projectName);
    } else {
      throw new Error("Must provide projectName or projectId");
    }
    if (includeStats !== void 0) {
      params.append("include_stats", includeStats.toString());
    }
    const response = await this._get(path, params);
    let result;
    if (Array.isArray(response)) {
      if (response.length === 0) {
        throw new Error(`Project[id=${projectId}, name=${projectName}] not found`);
      }
      result = response[0];
    } else {
      result = response;
    }
    return result;
  }
  async getProjectUrl({ projectId, projectName }) {
    if (projectId === void 0 && projectName === void 0) {
      throw new Error("Must provide either projectName or projectId");
    }
    const project = await this.readProject({ projectId, projectName });
    const tenantId = await this._getTenantId();
    return `${this.getHostUrl()}/o/${tenantId}/projects/p/${project.id}`;
  }
  async getDatasetUrl({ datasetId, datasetName }) {
    if (datasetId === void 0 && datasetName === void 0) {
      throw new Error("Must provide either datasetName or datasetId");
    }
    const dataset = await this.readDataset({ datasetId, datasetName });
    const tenantId = await this._getTenantId();
    return `${this.getHostUrl()}/o/${tenantId}/datasets/${dataset.id}`;
  }
  async _getTenantId() {
    if (this._tenantId !== null) {
      return this._tenantId;
    }
    const queryParams = new URLSearchParams({ limit: "1" });
    for await (const projects of this._getPaginated("/sessions", queryParams)) {
      this._tenantId = projects[0].tenant_id;
      return projects[0].tenant_id;
    }
    throw new Error("No projects found to resolve tenant.");
  }
  async *listProjects({ projectIds, name, nameContains, referenceDatasetId, referenceDatasetName, referenceFree } = {}) {
    const params = new URLSearchParams();
    if (projectIds !== void 0) {
      for (const projectId of projectIds) {
        params.append("id", projectId);
      }
    }
    if (name !== void 0) {
      params.append("name", name);
    }
    if (nameContains !== void 0) {
      params.append("name_contains", nameContains);
    }
    if (referenceDatasetId !== void 0) {
      params.append("reference_dataset", referenceDatasetId);
    } else if (referenceDatasetName !== void 0) {
      const dataset = await this.readDataset({
        datasetName: referenceDatasetName
      });
      params.append("reference_dataset", dataset.id);
    }
    if (referenceFree !== void 0) {
      params.append("reference_free", referenceFree.toString());
    }
    for await (const projects of this._getPaginated("/sessions", params)) {
      yield* projects;
    }
  }
  async deleteProject({ projectId, projectName }) {
    let projectId_;
    if (projectId === void 0 && projectName === void 0) {
      throw new Error("Must provide projectName or projectId");
    } else if (projectId !== void 0 && projectName !== void 0) {
      throw new Error("Must provide either projectName or projectId, not both");
    } else if (projectId === void 0) {
      projectId_ = (await this.readProject({ projectName })).id;
    } else {
      projectId_ = projectId;
    }
    assertUuid(projectId_);
    const response = await this.caller.call(fetch, `${this.apiUrl}/sessions/${projectId_}`, {
      method: "DELETE",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, `delete session ${projectId_} (${projectName})`);
  }
  async uploadCsv({ csvFile, fileName, inputKeys, outputKeys, description, dataType, name }) {
    const url = `${this.apiUrl}/datasets/upload`;
    const formData = new FormData();
    formData.append("file", csvFile, fileName);
    inputKeys.forEach((key) => {
      formData.append("input_keys", key);
    });
    outputKeys.forEach((key) => {
      formData.append("output_keys", key);
    });
    if (description) {
      formData.append("description", description);
    }
    if (dataType) {
      formData.append("data_type", dataType);
    }
    if (name) {
      formData.append("name", name);
    }
    const response = await this.caller.call(fetch, url, {
      method: "POST",
      headers: this.headers,
      body: formData,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    if (!response.ok) {
      const result2 = await response.json();
      if (result2.detail && result2.detail.includes("already exists")) {
        throw new Error(`Dataset ${fileName} already exists`);
      }
      throw new Error(`Failed to upload CSV: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  }
  async createDataset(name, { description, dataType } = {}) {
    const body = {
      name,
      description
    };
    if (dataType) {
      body.data_type = dataType;
    }
    const response = await this.caller.call(fetch, `${this.apiUrl}/datasets`, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    if (!response.ok) {
      const result2 = await response.json();
      if (result2.detail && result2.detail.includes("already exists")) {
        throw new Error(`Dataset ${name} already exists`);
      }
      throw new Error(`Failed to create dataset ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  }
  async readDataset({ datasetId, datasetName }) {
    let path = "/datasets";
    const params = new URLSearchParams({ limit: "1" });
    if (datasetId !== void 0 && datasetName !== void 0) {
      throw new Error("Must provide either datasetName or datasetId, not both");
    } else if (datasetId !== void 0) {
      assertUuid(datasetId);
      path += `/${datasetId}`;
    } else if (datasetName !== void 0) {
      params.append("name", datasetName);
    } else {
      throw new Error("Must provide datasetName or datasetId");
    }
    const response = await this._get(path, params);
    let result;
    if (Array.isArray(response)) {
      if (response.length === 0) {
        throw new Error(`Dataset[id=${datasetId}, name=${datasetName}] not found`);
      }
      result = response[0];
    } else {
      result = response;
    }
    return result;
  }
  async hasDataset({ datasetId, datasetName }) {
    try {
      await this.readDataset({ datasetId, datasetName });
      return true;
    } catch (e) {
      if (
        // eslint-disable-next-line no-instanceof/no-instanceof
        e instanceof Error && e.message.toLocaleLowerCase().includes("not found")
      ) {
        return false;
      }
      throw e;
    }
  }
  async diffDatasetVersions({ datasetId, datasetName, fromVersion, toVersion }) {
    let datasetId_ = datasetId;
    if (datasetId_ === void 0 && datasetName === void 0) {
      throw new Error("Must provide either datasetName or datasetId");
    } else if (datasetId_ !== void 0 && datasetName !== void 0) {
      throw new Error("Must provide either datasetName or datasetId, not both");
    } else if (datasetId_ === void 0) {
      const dataset = await this.readDataset({ datasetName });
      datasetId_ = dataset.id;
    }
    const urlParams = new URLSearchParams({
      from_version: typeof fromVersion === "string" ? fromVersion : fromVersion.toISOString(),
      to_version: typeof toVersion === "string" ? toVersion : toVersion.toISOString()
    });
    const response = await this._get(`/datasets/${datasetId_}/versions/diff`, urlParams);
    return response;
  }
  async readDatasetOpenaiFinetuning({ datasetId, datasetName }) {
    const path = "/datasets";
    if (datasetId !== void 0) {
    } else if (datasetName !== void 0) {
      datasetId = (await this.readDataset({ datasetName })).id;
    } else {
      throw new Error("Must provide datasetName or datasetId");
    }
    const response = await this._getResponse(`${path}/${datasetId}/openai_ft`);
    const datasetText = await response.text();
    const dataset = datasetText.trim().split("\n").map((line) => JSON.parse(line));
    return dataset;
  }
  async *listDatasets({ limit = 100, offset = 0, datasetIds, datasetName, datasetNameContains } = {}) {
    const path = "/datasets";
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString()
    });
    if (datasetIds !== void 0) {
      for (const id_ of datasetIds) {
        params.append("id", id_);
      }
    }
    if (datasetName !== void 0) {
      params.append("name", datasetName);
    }
    if (datasetNameContains !== void 0) {
      params.append("name_contains", datasetNameContains);
    }
    for await (const datasets of this._getPaginated(path, params)) {
      yield* datasets;
    }
  }
  /**
   * Update a dataset
   * @param props The dataset details to update
   * @returns The updated dataset
   */
  async updateDataset(props) {
    const { datasetId, datasetName, ...update } = props;
    if (!datasetId && !datasetName) {
      throw new Error("Must provide either datasetName or datasetId");
    }
    const _datasetId = datasetId ?? (await this.readDataset({ datasetName })).id;
    assertUuid(_datasetId);
    const response = await this.caller.call(fetch, `${this.apiUrl}/datasets/${_datasetId}`, {
      method: "PATCH",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(update),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    if (!response.ok) {
      throw new Error(`Failed to update dataset ${_datasetId}: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  }
  async deleteDataset({ datasetId, datasetName }) {
    let path = "/datasets";
    let datasetId_ = datasetId;
    if (datasetId !== void 0 && datasetName !== void 0) {
      throw new Error("Must provide either datasetName or datasetId, not both");
    } else if (datasetName !== void 0) {
      const dataset = await this.readDataset({ datasetName });
      datasetId_ = dataset.id;
    }
    if (datasetId_ !== void 0) {
      assertUuid(datasetId_);
      path += `/${datasetId_}`;
    } else {
      throw new Error("Must provide datasetName or datasetId");
    }
    const response = await this.caller.call(fetch, this.apiUrl + path, {
      method: "DELETE",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    if (!response.ok) {
      throw new Error(`Failed to delete ${path}: ${response.status} ${response.statusText}`);
    }
    await response.json();
  }
  async createExample(inputs, outputs, { datasetId, datasetName, createdAt, exampleId, metadata, split }) {
    let datasetId_ = datasetId;
    if (datasetId_ === void 0 && datasetName === void 0) {
      throw new Error("Must provide either datasetName or datasetId");
    } else if (datasetId_ !== void 0 && datasetName !== void 0) {
      throw new Error("Must provide either datasetName or datasetId, not both");
    } else if (datasetId_ === void 0) {
      const dataset = await this.readDataset({ datasetName });
      datasetId_ = dataset.id;
    }
    const createdAt_ = createdAt || /* @__PURE__ */ new Date();
    const data = {
      dataset_id: datasetId_,
      inputs,
      outputs,
      created_at: createdAt_?.toISOString(),
      id: exampleId,
      metadata,
      split
    };
    const response = await this.caller.call(fetch, `${this.apiUrl}/examples`, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    if (!response.ok) {
      throw new Error(`Failed to create example: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  }
  async createExamples(props) {
    const { inputs, outputs, metadata, sourceRunIds, exampleIds, datasetId, datasetName } = props;
    let datasetId_ = datasetId;
    if (datasetId_ === void 0 && datasetName === void 0) {
      throw new Error("Must provide either datasetName or datasetId");
    } else if (datasetId_ !== void 0 && datasetName !== void 0) {
      throw new Error("Must provide either datasetName or datasetId, not both");
    } else if (datasetId_ === void 0) {
      const dataset = await this.readDataset({ datasetName });
      datasetId_ = dataset.id;
    }
    const formattedExamples = inputs.map((input, idx) => {
      return {
        dataset_id: datasetId_,
        inputs: input,
        outputs: outputs ? outputs[idx] : void 0,
        metadata: metadata ? metadata[idx] : void 0,
        split: props.splits ? props.splits[idx] : void 0,
        id: exampleIds ? exampleIds[idx] : void 0,
        source_run_id: sourceRunIds ? sourceRunIds[idx] : void 0
      };
    });
    const response = await this.caller.call(fetch, `${this.apiUrl}/examples/bulk`, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(formattedExamples),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    if (!response.ok) {
      throw new Error(`Failed to create examples: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  }
  async createLLMExample(input, generation, options) {
    return this.createExample({ input }, { output: generation }, options);
  }
  async createChatExample(input, generations, options) {
    const finalInput = input.map((message) => {
      if (isLangChainMessage(message)) {
        return convertLangChainMessageToExample(message);
      }
      return message;
    });
    const finalOutput = isLangChainMessage(generations) ? convertLangChainMessageToExample(generations) : generations;
    return this.createExample({ input: finalInput }, { output: finalOutput }, options);
  }
  async readExample(exampleId) {
    assertUuid(exampleId);
    const path = `/examples/${exampleId}`;
    return await this._get(path);
  }
  async *listExamples({ datasetId, datasetName, exampleIds, asOf, splits, inlineS3Urls, metadata } = {}) {
    let datasetId_;
    if (datasetId !== void 0 && datasetName !== void 0) {
      throw new Error("Must provide either datasetName or datasetId, not both");
    } else if (datasetId !== void 0) {
      datasetId_ = datasetId;
    } else if (datasetName !== void 0) {
      const dataset = await this.readDataset({ datasetName });
      datasetId_ = dataset.id;
    } else {
      throw new Error("Must provide a datasetName or datasetId");
    }
    const params = new URLSearchParams({ dataset: datasetId_ });
    const dataset_version = asOf ? typeof asOf === "string" ? asOf : asOf?.toISOString() : void 0;
    if (dataset_version) {
      params.append("as_of", dataset_version);
    }
    const inlineS3Urls_ = inlineS3Urls ?? true;
    params.append("inline_s3_urls", inlineS3Urls_.toString());
    if (exampleIds !== void 0) {
      for (const id_ of exampleIds) {
        params.append("id", id_);
      }
    }
    if (splits !== void 0) {
      for (const split of splits) {
        params.append("splits", split);
      }
    }
    if (metadata !== void 0) {
      const serializedMetadata = JSON.stringify(metadata);
      params.append("metadata", serializedMetadata);
    }
    for await (const examples of this._getPaginated("/examples", params)) {
      yield* examples;
    }
  }
  async deleteExample(exampleId) {
    assertUuid(exampleId);
    const path = `/examples/${exampleId}`;
    const response = await this.caller.call(fetch, this.apiUrl + path, {
      method: "DELETE",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    if (!response.ok) {
      throw new Error(`Failed to delete ${path}: ${response.status} ${response.statusText}`);
    }
    await response.json();
  }
  async updateExample(exampleId, update) {
    assertUuid(exampleId);
    const response = await this.caller.call(fetch, `${this.apiUrl}/examples/${exampleId}`, {
      method: "PATCH",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(update),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    if (!response.ok) {
      throw new Error(`Failed to update example ${exampleId}: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  }
  /**
   * @deprecated This method is deprecated and will be removed in future LangSmith versions, use `evaluate` from `langsmith/evaluation` instead.
   */
  async evaluateRun(run, evaluator, { sourceInfo, loadChildRuns, referenceExample } = { loadChildRuns: false }) {
    warnOnce("This method is deprecated and will be removed in future LangSmith versions, use `evaluate` from `langsmith/evaluation` instead.");
    let run_;
    if (typeof run === "string") {
      run_ = await this.readRun(run, { loadChildRuns });
    } else if (typeof run === "object" && "id" in run) {
      run_ = run;
    } else {
      throw new Error(`Invalid run type: ${typeof run}`);
    }
    if (run_.reference_example_id !== null && run_.reference_example_id !== void 0) {
      referenceExample = await this.readExample(run_.reference_example_id);
    }
    const feedbackResult = await evaluator.evaluateRun(run_, referenceExample);
    const [_, feedbacks] = await this._logEvaluationFeedback(feedbackResult, run_, sourceInfo);
    return feedbacks[0];
  }
  async createFeedback(runId, key, { score, value, correction, comment, sourceInfo, feedbackSourceType = "api", sourceRunId, feedbackId, feedbackConfig, projectId, comparativeExperimentId }) {
    if (!runId && !projectId) {
      throw new Error("One of runId or projectId must be provided");
    }
    if (runId && projectId) {
      throw new Error("Only one of runId or projectId can be provided");
    }
    const feedback_source = {
      type: feedbackSourceType ?? "api",
      metadata: sourceInfo ?? {}
    };
    if (sourceRunId !== void 0 && feedback_source?.metadata !== void 0 && !feedback_source.metadata["__run"]) {
      feedback_source.metadata["__run"] = { run_id: sourceRunId };
    }
    if (feedback_source?.metadata !== void 0 && feedback_source.metadata["__run"]?.run_id !== void 0) {
      assertUuid(feedback_source.metadata["__run"].run_id);
    }
    const feedback = {
      id: feedbackId ?? v4_default(),
      run_id: runId,
      key,
      score,
      value,
      correction,
      comment,
      feedback_source,
      comparative_experiment_id: comparativeExperimentId,
      feedbackConfig,
      session_id: projectId
    };
    const url = `${this.apiUrl}/feedback`;
    const response = await this.caller.call(fetch, url, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(feedback),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "create feedback");
    return feedback;
  }
  async updateFeedback(feedbackId, { score, value, correction, comment }) {
    const feedbackUpdate = {};
    if (score !== void 0 && score !== null) {
      feedbackUpdate["score"] = score;
    }
    if (value !== void 0 && value !== null) {
      feedbackUpdate["value"] = value;
    }
    if (correction !== void 0 && correction !== null) {
      feedbackUpdate["correction"] = correction;
    }
    if (comment !== void 0 && comment !== null) {
      feedbackUpdate["comment"] = comment;
    }
    assertUuid(feedbackId);
    const response = await this.caller.call(fetch, `${this.apiUrl}/feedback/${feedbackId}`, {
      method: "PATCH",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(feedbackUpdate),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await raiseForStatus(response, "update feedback");
  }
  async readFeedback(feedbackId) {
    assertUuid(feedbackId);
    const path = `/feedback/${feedbackId}`;
    const response = await this._get(path);
    return response;
  }
  async deleteFeedback(feedbackId) {
    assertUuid(feedbackId);
    const path = `/feedback/${feedbackId}`;
    const response = await this.caller.call(fetch, this.apiUrl + path, {
      method: "DELETE",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    if (!response.ok) {
      throw new Error(`Failed to delete ${path}: ${response.status} ${response.statusText}`);
    }
    await response.json();
  }
  async *listFeedback({ runIds, feedbackKeys, feedbackSourceTypes } = {}) {
    const queryParams = new URLSearchParams();
    if (runIds) {
      queryParams.append("run", runIds.join(","));
    }
    if (feedbackKeys) {
      for (const key of feedbackKeys) {
        queryParams.append("key", key);
      }
    }
    if (feedbackSourceTypes) {
      for (const type of feedbackSourceTypes) {
        queryParams.append("source", type);
      }
    }
    for await (const feedbacks of this._getPaginated("/feedback", queryParams)) {
      yield* feedbacks;
    }
  }
  /**
   * Creates a presigned feedback token and URL.
   *
   * The token can be used to authorize feedback metrics without
   * needing an API key. This is useful for giving browser-based
   * applications the ability to submit feedback without needing
   * to expose an API key.
   *
   * @param runId - The ID of the run.
   * @param feedbackKey - The feedback key.
   * @param options - Additional options for the token.
   * @param options.expiration - The expiration time for the token.
   *
   * @returns A promise that resolves to a FeedbackIngestToken.
   */
  async createPresignedFeedbackToken(runId, feedbackKey, { expiration, feedbackConfig } = {}) {
    const body = {
      run_id: runId,
      feedback_key: feedbackKey,
      feedback_config: feedbackConfig
    };
    if (expiration) {
      if (typeof expiration === "string") {
        body["expires_at"] = expiration;
      } else if (expiration?.hours || expiration?.minutes || expiration?.days) {
        body["expires_in"] = expiration;
      }
    } else {
      body["expires_in"] = {
        hours: 3
      };
    }
    const response = await this.caller.call(fetch, `${this.apiUrl}/feedback/tokens`, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    const result = await response.json();
    return result;
  }
  async createComparativeExperiment({ name, experimentIds, referenceDatasetId, createdAt, description, metadata, id }) {
    if (experimentIds.length === 0) {
      throw new Error("At least one experiment is required");
    }
    if (!referenceDatasetId) {
      referenceDatasetId = (await this.readProject({
        projectId: experimentIds[0]
      })).reference_dataset_id;
    }
    if (!referenceDatasetId == null) {
      throw new Error("A reference dataset is required");
    }
    const body = {
      id,
      name,
      experiment_ids: experimentIds,
      reference_dataset_id: referenceDatasetId,
      description,
      created_at: (createdAt ?? /* @__PURE__ */ new Date())?.toISOString(),
      extra: {}
    };
    if (metadata)
      body.extra["metadata"] = metadata;
    const response = await this.caller.call(fetch, `${this.apiUrl}/datasets/comparative`, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    return await response.json();
  }
  /**
   * Retrieves a list of presigned feedback tokens for a given run ID.
   * @param runId The ID of the run.
   * @returns An async iterable of FeedbackIngestToken objects.
   */
  async *listPresignedFeedbackTokens(runId) {
    assertUuid(runId);
    const params = new URLSearchParams({ run_id: runId });
    for await (const tokens of this._getPaginated("/feedback/tokens", params)) {
      yield* tokens;
    }
  }
  _selectEvalResults(results) {
    let results_;
    if ("results" in results) {
      results_ = results.results;
    } else {
      results_ = [results];
    }
    return results_;
  }
  async _logEvaluationFeedback(evaluatorResponse, run, sourceInfo) {
    const evalResults = this._selectEvalResults(evaluatorResponse);
    const feedbacks = [];
    for (const res of evalResults) {
      let sourceInfo_ = sourceInfo || {};
      if (res.evaluatorInfo) {
        sourceInfo_ = { ...res.evaluatorInfo, ...sourceInfo_ };
      }
      let runId_ = null;
      if (res.targetRunId) {
        runId_ = res.targetRunId;
      } else if (run) {
        runId_ = run.id;
      }
      feedbacks.push(await this.createFeedback(runId_, res.key, {
        score: res.score,
        value: res.value,
        comment: res.comment,
        correction: res.correction,
        sourceInfo: sourceInfo_,
        sourceRunId: res.sourceRunId,
        feedbackConfig: res.feedbackConfig,
        feedbackSourceType: "model"
      }));
    }
    return [evalResults, feedbacks];
  }
  async logEvaluationFeedback(evaluatorResponse, run, sourceInfo) {
    const [results] = await this._logEvaluationFeedback(evaluatorResponse, run, sourceInfo);
    return results;
  }
};

// node_modules/langsmith/dist/index.js
var __version__ = "0.1.34";

// node_modules/@langchain/core/dist/tracers/tracer_langchain.js
var LangChainTracer = class extends BaseTracer {
  constructor(fields = {}) {
    super(fields);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "langchain_tracer"
    });
    Object.defineProperty(this, "projectName", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "exampleId", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "client", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    const { exampleId, projectName, client } = fields;
    this.projectName = projectName ?? getEnvironmentVariable("LANGCHAIN_PROJECT") ?? getEnvironmentVariable("LANGCHAIN_SESSION");
    this.exampleId = exampleId;
    this.client = client ?? new Client({});
    const traceableTree = this.getTraceableRunTree();
    if (traceableTree) {
      let rootRun = traceableTree;
      const visited = /* @__PURE__ */ new Set();
      while (rootRun.parent_run) {
        if (visited.has(rootRun.id))
          break;
        visited.add(rootRun.id);
        if (!rootRun.parent_run)
          break;
        rootRun = rootRun.parent_run;
      }
      visited.clear();
      const queue2 = [rootRun];
      while (queue2.length > 0) {
        const current = queue2.shift();
        if (!current || visited.has(current.id))
          continue;
        visited.add(current.id);
        this.runMap.set(current.id, current);
        if (current.child_runs) {
          queue2.push(...current.child_runs);
        }
      }
      this.client = traceableTree.client ?? this.client;
      this.projectName = traceableTree.project_name ?? this.projectName;
      this.exampleId = traceableTree.reference_example_id ?? this.exampleId;
    }
  }
  async _convertToCreate(run, example_id = void 0) {
    return {
      ...run,
      extra: {
        ...run.extra,
        runtime: await getRuntimeEnvironment()
      },
      child_runs: void 0,
      session_name: this.projectName,
      reference_example_id: run.parent_run_id ? void 0 : example_id
    };
  }
  async persistRun(_run) {
  }
  async onRunCreate(run) {
    const persistedRun = await this._convertToCreate(run, this.exampleId);
    await this.client.createRun(persistedRun);
  }
  async onRunUpdate(run) {
    const runUpdate = {
      end_time: run.end_time,
      error: run.error,
      outputs: run.outputs,
      events: run.events,
      inputs: run.inputs,
      trace_id: run.trace_id,
      dotted_order: run.dotted_order,
      parent_run_id: run.parent_run_id
    };
    await this.client.updateRun(run.id, runUpdate);
  }
  getRun(id) {
    return this.runMap.get(id);
  }
  getTraceableRunTree() {
    try {
      return getCurrentRunTree();
    } catch {
      return void 0;
    }
  }
};

// node_modules/@langchain/core/dist/tracers/initialize.js
async function getTracingV2CallbackHandler() {
  return new LangChainTracer();
}

// node_modules/@langchain/core/dist/callbacks/promises.js
var import_p_queue2 = __toESM(require_dist(), 1);
var queue;
function createQueue() {
  const PQueue = "default" in import_p_queue2.default ? import_p_queue2.default.default : import_p_queue2.default;
  return new PQueue({
    autoStart: true,
    concurrency: 1
  });
}
async function consumeCallback(promiseFn, wait) {
  if (wait === true) {
    await promiseFn();
  } else {
    if (typeof queue === "undefined") {
      queue = createQueue();
    }
    void queue.add(promiseFn);
  }
}

// node_modules/@langchain/core/dist/callbacks/manager.js
if (/* @__PURE__ */ getEnvironmentVariable("LANGCHAIN_TRACING_V2") === "true" && /* @__PURE__ */ getEnvironmentVariable("LANGCHAIN_CALLBACKS_BACKGROUND") !== "true") {
  /* @__PURE__ */ console.warn([
    "[WARN]: You have enabled LangSmith tracing without backgrounding callbacks.",
    "[WARN]: If you are not using a serverless environment where you must wait for tracing calls to finish,",
    `[WARN]: we suggest setting "process.env.LANGCHAIN_CALLBACKS_BACKGROUND=true" to avoid additional latency.`
  ].join("\n"));
}
var BaseCallbackManager = class {
  setHandler(handler) {
    return this.setHandlers([handler]);
  }
};
var BaseRunManager = class {
  constructor(runId, handlers, inheritableHandlers, tags, inheritableTags, metadata, inheritableMetadata, _parentRunId) {
    Object.defineProperty(this, "runId", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: runId
    });
    Object.defineProperty(this, "handlers", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: handlers
    });
    Object.defineProperty(this, "inheritableHandlers", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: inheritableHandlers
    });
    Object.defineProperty(this, "tags", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: tags
    });
    Object.defineProperty(this, "inheritableTags", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: inheritableTags
    });
    Object.defineProperty(this, "metadata", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: metadata
    });
    Object.defineProperty(this, "inheritableMetadata", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: inheritableMetadata
    });
    Object.defineProperty(this, "_parentRunId", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _parentRunId
    });
  }
  async handleText(text) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      try {
        await handler.handleText?.(text, this.runId, this._parentRunId, this.tags);
      } catch (err) {
        console.error(`Error in handler ${handler.constructor.name}, handleText: ${err}`);
        if (handler.raiseError) {
          throw err;
        }
      }
    }, handler.awaitHandlers)));
  }
};
var CallbackManagerForRetrieverRun = class extends BaseRunManager {
  getChild(tag) {
    const manager = new CallbackManager(this.runId);
    manager.setHandlers(this.inheritableHandlers);
    manager.addTags(this.inheritableTags);
    manager.addMetadata(this.inheritableMetadata);
    if (tag) {
      manager.addTags([tag], false);
    }
    return manager;
  }
  async handleRetrieverEnd(documents) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      if (!handler.ignoreRetriever) {
        try {
          await handler.handleRetrieverEnd?.(documents, this.runId, this._parentRunId, this.tags);
        } catch (err) {
          console.error(`Error in handler ${handler.constructor.name}, handleRetriever`);
          if (handler.raiseError) {
            throw err;
          }
        }
      }
    }, handler.awaitHandlers)));
  }
  async handleRetrieverError(err) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      if (!handler.ignoreRetriever) {
        try {
          await handler.handleRetrieverError?.(err, this.runId, this._parentRunId, this.tags);
        } catch (error) {
          console.error(`Error in handler ${handler.constructor.name}, handleRetrieverError: ${error}`);
          if (handler.raiseError) {
            throw err;
          }
        }
      }
    }, handler.awaitHandlers)));
  }
};
var CallbackManagerForLLMRun = class extends BaseRunManager {
  async handleLLMNewToken(token, idx, _runId, _parentRunId, _tags, fields) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      if (!handler.ignoreLLM) {
        try {
          await handler.handleLLMNewToken?.(token, idx ?? { prompt: 0, completion: 0 }, this.runId, this._parentRunId, this.tags, fields);
        } catch (err) {
          console.error(`Error in handler ${handler.constructor.name}, handleLLMNewToken: ${err}`);
          if (handler.raiseError) {
            throw err;
          }
        }
      }
    }, handler.awaitHandlers)));
  }
  async handleLLMError(err) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      if (!handler.ignoreLLM) {
        try {
          await handler.handleLLMError?.(err, this.runId, this._parentRunId, this.tags);
        } catch (err2) {
          console.error(`Error in handler ${handler.constructor.name}, handleLLMError: ${err2}`);
          if (handler.raiseError) {
            throw err2;
          }
        }
      }
    }, handler.awaitHandlers)));
  }
  async handleLLMEnd(output) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      if (!handler.ignoreLLM) {
        try {
          await handler.handleLLMEnd?.(output, this.runId, this._parentRunId, this.tags);
        } catch (err) {
          console.error(`Error in handler ${handler.constructor.name}, handleLLMEnd: ${err}`);
          if (handler.raiseError) {
            throw err;
          }
        }
      }
    }, handler.awaitHandlers)));
  }
};
var CallbackManagerForChainRun = class extends BaseRunManager {
  getChild(tag) {
    const manager = new CallbackManager(this.runId);
    manager.setHandlers(this.inheritableHandlers);
    manager.addTags(this.inheritableTags);
    manager.addMetadata(this.inheritableMetadata);
    if (tag) {
      manager.addTags([tag], false);
    }
    return manager;
  }
  async handleChainError(err, _runId, _parentRunId, _tags, kwargs) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      if (!handler.ignoreChain) {
        try {
          await handler.handleChainError?.(err, this.runId, this._parentRunId, this.tags, kwargs);
        } catch (err2) {
          console.error(`Error in handler ${handler.constructor.name}, handleChainError: ${err2}`);
          if (handler.raiseError) {
            throw err2;
          }
        }
      }
    }, handler.awaitHandlers)));
  }
  async handleChainEnd(output, _runId, _parentRunId, _tags, kwargs) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      if (!handler.ignoreChain) {
        try {
          await handler.handleChainEnd?.(output, this.runId, this._parentRunId, this.tags, kwargs);
        } catch (err) {
          console.error(`Error in handler ${handler.constructor.name}, handleChainEnd: ${err}`);
          if (handler.raiseError) {
            throw err;
          }
        }
      }
    }, handler.awaitHandlers)));
  }
  async handleAgentAction(action) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      if (!handler.ignoreAgent) {
        try {
          await handler.handleAgentAction?.(action, this.runId, this._parentRunId, this.tags);
        } catch (err) {
          console.error(`Error in handler ${handler.constructor.name}, handleAgentAction: ${err}`);
          if (handler.raiseError) {
            throw err;
          }
        }
      }
    }, handler.awaitHandlers)));
  }
  async handleAgentEnd(action) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      if (!handler.ignoreAgent) {
        try {
          await handler.handleAgentEnd?.(action, this.runId, this._parentRunId, this.tags);
        } catch (err) {
          console.error(`Error in handler ${handler.constructor.name}, handleAgentEnd: ${err}`);
          if (handler.raiseError) {
            throw err;
          }
        }
      }
    }, handler.awaitHandlers)));
  }
};
var CallbackManagerForToolRun = class extends BaseRunManager {
  getChild(tag) {
    const manager = new CallbackManager(this.runId);
    manager.setHandlers(this.inheritableHandlers);
    manager.addTags(this.inheritableTags);
    manager.addMetadata(this.inheritableMetadata);
    if (tag) {
      manager.addTags([tag], false);
    }
    return manager;
  }
  async handleToolError(err) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      if (!handler.ignoreAgent) {
        try {
          await handler.handleToolError?.(err, this.runId, this._parentRunId, this.tags);
        } catch (err2) {
          console.error(`Error in handler ${handler.constructor.name}, handleToolError: ${err2}`);
          if (handler.raiseError) {
            throw err2;
          }
        }
      }
    }, handler.awaitHandlers)));
  }
  async handleToolEnd(output) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      if (!handler.ignoreAgent) {
        try {
          await handler.handleToolEnd?.(output, this.runId, this._parentRunId, this.tags);
        } catch (err) {
          console.error(`Error in handler ${handler.constructor.name}, handleToolEnd: ${err}`);
          if (handler.raiseError) {
            throw err;
          }
        }
      }
    }, handler.awaitHandlers)));
  }
};
var CallbackManager = class _CallbackManager extends BaseCallbackManager {
  constructor(parentRunId, options) {
    super();
    Object.defineProperty(this, "handlers", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "inheritableHandlers", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "tags", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "inheritableTags", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "metadata", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: {}
    });
    Object.defineProperty(this, "inheritableMetadata", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: {}
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "callback_manager"
    });
    Object.defineProperty(this, "_parentRunId", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.handlers = options?.handlers ?? this.handlers;
    this.inheritableHandlers = options?.inheritableHandlers ?? this.inheritableHandlers;
    this.tags = options?.tags ?? this.tags;
    this.inheritableTags = options?.inheritableTags ?? this.inheritableTags;
    this.metadata = options?.metadata ?? this.metadata;
    this.inheritableMetadata = options?.inheritableMetadata ?? this.inheritableMetadata;
    this._parentRunId = parentRunId;
  }
  /**
   * Gets the parent run ID, if any.
   *
   * @returns The parent run ID.
   */
  getParentRunId() {
    return this._parentRunId;
  }
  async handleLLMStart(llm, prompts, runId = void 0, _parentRunId = void 0, extraParams = void 0, _tags = void 0, _metadata = void 0, runName = void 0) {
    return Promise.all(prompts.map(async (prompt, idx) => {
      const runId_ = idx === 0 && runId ? runId : v4_default();
      await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
        if (!handler.ignoreLLM) {
          try {
            await handler.handleLLMStart?.(llm, [prompt], runId_, this._parentRunId, extraParams, this.tags, this.metadata, runName);
          } catch (err) {
            console.error(`Error in handler ${handler.constructor.name}, handleLLMStart: ${err}`);
            if (handler.raiseError) {
              throw err;
            }
          }
        }
      }, handler.awaitHandlers)));
      return new CallbackManagerForLLMRun(runId_, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
    }));
  }
  async handleChatModelStart(llm, messages, runId = void 0, _parentRunId = void 0, extraParams = void 0, _tags = void 0, _metadata = void 0, runName = void 0) {
    return Promise.all(messages.map(async (messageGroup, idx) => {
      const runId_ = idx === 0 && runId ? runId : v4_default();
      await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
        if (!handler.ignoreLLM) {
          try {
            if (handler.handleChatModelStart) {
              await handler.handleChatModelStart?.(llm, [messageGroup], runId_, this._parentRunId, extraParams, this.tags, this.metadata, runName);
            } else if (handler.handleLLMStart) {
              const messageString = getBufferString(messageGroup);
              await handler.handleLLMStart?.(llm, [messageString], runId_, this._parentRunId, extraParams, this.tags, this.metadata, runName);
            }
          } catch (err) {
            console.error(`Error in handler ${handler.constructor.name}, handleLLMStart: ${err}`);
            if (handler.raiseError) {
              throw err;
            }
          }
        }
      }, handler.awaitHandlers)));
      return new CallbackManagerForLLMRun(runId_, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
    }));
  }
  async handleChainStart(chain, inputs, runId = v4_default(), runType = void 0, _tags = void 0, _metadata = void 0, runName = void 0) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      if (!handler.ignoreChain) {
        try {
          await handler.handleChainStart?.(chain, inputs, runId, this._parentRunId, this.tags, this.metadata, runType, runName);
        } catch (err) {
          console.error(`Error in handler ${handler.constructor.name}, handleChainStart: ${err}`);
          if (handler.raiseError) {
            throw err;
          }
        }
      }
    }, handler.awaitHandlers)));
    return new CallbackManagerForChainRun(runId, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
  }
  async handleToolStart(tool, input, runId = v4_default(), _parentRunId = void 0, _tags = void 0, _metadata = void 0, runName = void 0) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      if (!handler.ignoreAgent) {
        try {
          await handler.handleToolStart?.(tool, input, runId, this._parentRunId, this.tags, this.metadata, runName);
        } catch (err) {
          console.error(`Error in handler ${handler.constructor.name}, handleToolStart: ${err}`);
          if (handler.raiseError) {
            throw err;
          }
        }
      }
    }, handler.awaitHandlers)));
    return new CallbackManagerForToolRun(runId, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
  }
  async handleRetrieverStart(retriever, query, runId = v4_default(), _parentRunId = void 0, _tags = void 0, _metadata = void 0, runName = void 0) {
    await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
      if (!handler.ignoreRetriever) {
        try {
          await handler.handleRetrieverStart?.(retriever, query, runId, this._parentRunId, this.tags, this.metadata, runName);
        } catch (err) {
          console.error(`Error in handler ${handler.constructor.name}, handleRetrieverStart: ${err}`);
          if (handler.raiseError) {
            throw err;
          }
        }
      }
    }, handler.awaitHandlers)));
    return new CallbackManagerForRetrieverRun(runId, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
  }
  addHandler(handler, inherit = true) {
    this.handlers.push(handler);
    if (inherit) {
      this.inheritableHandlers.push(handler);
    }
  }
  removeHandler(handler) {
    this.handlers = this.handlers.filter((_handler) => _handler !== handler);
    this.inheritableHandlers = this.inheritableHandlers.filter((_handler) => _handler !== handler);
  }
  setHandlers(handlers, inherit = true) {
    this.handlers = [];
    this.inheritableHandlers = [];
    for (const handler of handlers) {
      this.addHandler(handler, inherit);
    }
  }
  addTags(tags, inherit = true) {
    this.removeTags(tags);
    this.tags.push(...tags);
    if (inherit) {
      this.inheritableTags.push(...tags);
    }
  }
  removeTags(tags) {
    this.tags = this.tags.filter((tag) => !tags.includes(tag));
    this.inheritableTags = this.inheritableTags.filter((tag) => !tags.includes(tag));
  }
  addMetadata(metadata, inherit = true) {
    this.metadata = { ...this.metadata, ...metadata };
    if (inherit) {
      this.inheritableMetadata = { ...this.inheritableMetadata, ...metadata };
    }
  }
  removeMetadata(metadata) {
    for (const key of Object.keys(metadata)) {
      delete this.metadata[key];
      delete this.inheritableMetadata[key];
    }
  }
  copy(additionalHandlers = [], inherit = true) {
    const manager = new _CallbackManager(this._parentRunId);
    for (const handler of this.handlers) {
      const inheritable = this.inheritableHandlers.includes(handler);
      manager.addHandler(handler, inheritable);
    }
    for (const tag of this.tags) {
      const inheritable = this.inheritableTags.includes(tag);
      manager.addTags([tag], inheritable);
    }
    for (const key of Object.keys(this.metadata)) {
      const inheritable = Object.keys(this.inheritableMetadata).includes(key);
      manager.addMetadata({ [key]: this.metadata[key] }, inheritable);
    }
    for (const handler of additionalHandlers) {
      if (
        // Prevent multiple copies of console_callback_handler
        manager.handlers.filter((h) => h.name === "console_callback_handler").some((h) => h.name === handler.name)
      ) {
        continue;
      }
      manager.addHandler(handler, inherit);
    }
    return manager;
  }
  static fromHandlers(handlers) {
    class Handler extends BaseCallbackHandler {
      constructor() {
        super();
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: v4_default()
        });
        Object.assign(this, handlers);
      }
    }
    const manager = new this();
    manager.addHandler(new Handler());
    return manager;
  }
  static async configure(inheritableHandlers, localHandlers, inheritableTags, localTags, inheritableMetadata, localMetadata, options) {
    let callbackManager;
    if (inheritableHandlers || localHandlers) {
      if (Array.isArray(inheritableHandlers) || !inheritableHandlers) {
        callbackManager = new _CallbackManager();
        callbackManager.setHandlers(inheritableHandlers?.map(ensureHandler) ?? [], true);
      } else {
        callbackManager = inheritableHandlers;
      }
      callbackManager = callbackManager.copy(Array.isArray(localHandlers) ? localHandlers.map(ensureHandler) : localHandlers?.handlers, false);
    }
    const verboseEnabled = getEnvironmentVariable("LANGCHAIN_VERBOSE") === "true" || options?.verbose;
    const tracingV2Enabled = getEnvironmentVariable("LANGCHAIN_TRACING_V2") === "true" || getEnvironmentVariable("LANGSMITH_TRACING") === "true";
    const tracingEnabled = tracingV2Enabled || (getEnvironmentVariable("LANGCHAIN_TRACING") ?? false);
    if (verboseEnabled || tracingEnabled) {
      if (!callbackManager) {
        callbackManager = new _CallbackManager();
      }
      if (verboseEnabled && !callbackManager.handlers.some((handler) => handler.name === ConsoleCallbackHandler.prototype.name)) {
        const consoleHandler = new ConsoleCallbackHandler();
        callbackManager.addHandler(consoleHandler, true);
      }
      if (tracingEnabled && !callbackManager.handlers.some((handler) => handler.name === "langchain_tracer")) {
        if (tracingV2Enabled) {
          const tracerV2 = await getTracingV2CallbackHandler();
          callbackManager.addHandler(tracerV2, true);
          callbackManager._parentRunId = tracerV2.getTraceableRunTree()?.id ?? callbackManager._parentRunId;
        }
      }
    }
    if (inheritableTags || localTags) {
      if (callbackManager) {
        callbackManager.addTags(inheritableTags ?? []);
        callbackManager.addTags(localTags ?? [], false);
      }
    }
    if (inheritableMetadata || localMetadata) {
      if (callbackManager) {
        callbackManager.addMetadata(inheritableMetadata ?? {});
        callbackManager.addMetadata(localMetadata ?? {}, false);
      }
    }
    return callbackManager;
  }
};
function ensureHandler(handler) {
  if ("name" in handler) {
    return handler;
  }
  return BaseCallbackHandler.fromMethods(handler);
}

// node_modules/@langchain/core/dist/utils/fast-json-patch/src/core.js
var core_exports = {};
__export(core_exports, {
  JsonPatchError: () => JsonPatchError,
  _areEquals: () => _areEquals,
  applyOperation: () => applyOperation,
  applyPatch: () => applyPatch,
  applyReducer: () => applyReducer,
  deepClone: () => deepClone,
  getValueByPointer: () => getValueByPointer,
  validate: () => validate2,
  validator: () => validator
});

// node_modules/@langchain/core/dist/utils/fast-json-patch/src/helpers.js
var _hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwnProperty(obj, key) {
  return _hasOwnProperty.call(obj, key);
}
function _objectKeys(obj) {
  if (Array.isArray(obj)) {
    const keys2 = new Array(obj.length);
    for (let k = 0; k < keys2.length; k++) {
      keys2[k] = "" + k;
    }
    return keys2;
  }
  if (Object.keys) {
    return Object.keys(obj);
  }
  let keys = [];
  for (let i in obj) {
    if (hasOwnProperty(obj, i)) {
      keys.push(i);
    }
  }
  return keys;
}
function _deepClone(obj) {
  switch (typeof obj) {
    case "object":
      return JSON.parse(JSON.stringify(obj));
    case "undefined":
      return null;
    default:
      return obj;
  }
}
function isInteger(str) {
  let i = 0;
  const len = str.length;
  let charCode;
  while (i < len) {
    charCode = str.charCodeAt(i);
    if (charCode >= 48 && charCode <= 57) {
      i++;
      continue;
    }
    return false;
  }
  return true;
}
function escapePathComponent(path) {
  if (path.indexOf("/") === -1 && path.indexOf("~") === -1)
    return path;
  return path.replace(/~/g, "~0").replace(/\//g, "~1");
}
function unescapePathComponent(path) {
  return path.replace(/~1/g, "/").replace(/~0/g, "~");
}
function hasUndefined(obj) {
  if (obj === void 0) {
    return true;
  }
  if (obj) {
    if (Array.isArray(obj)) {
      for (let i2 = 0, len = obj.length; i2 < len; i2++) {
        if (hasUndefined(obj[i2])) {
          return true;
        }
      }
    } else if (typeof obj === "object") {
      const objKeys = _objectKeys(obj);
      const objKeysLength = objKeys.length;
      for (var i = 0; i < objKeysLength; i++) {
        if (hasUndefined(obj[objKeys[i]])) {
          return true;
        }
      }
    }
  }
  return false;
}
function patchErrorMessageFormatter(message, args) {
  const messageParts = [message];
  for (const key in args) {
    const value = typeof args[key] === "object" ? JSON.stringify(args[key], null, 2) : args[key];
    if (typeof value !== "undefined") {
      messageParts.push(`${key}: ${value}`);
    }
  }
  return messageParts.join("\n");
}
var PatchError = class extends Error {
  constructor(message, name, index, operation, tree) {
    super(patchErrorMessageFormatter(message, { name, index, operation, tree }));
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: name
    });
    Object.defineProperty(this, "index", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: index
    });
    Object.defineProperty(this, "operation", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: operation
    });
    Object.defineProperty(this, "tree", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: tree
    });
    Object.setPrototypeOf(this, new.target.prototype);
    this.message = patchErrorMessageFormatter(message, {
      name,
      index,
      operation,
      tree
    });
  }
};

// node_modules/@langchain/core/dist/utils/fast-json-patch/src/core.js
var JsonPatchError = PatchError;
var deepClone = _deepClone;
var objOps = {
  add: function(obj, key, document) {
    obj[key] = this.value;
    return { newDocument: document };
  },
  remove: function(obj, key, document) {
    var removed = obj[key];
    delete obj[key];
    return { newDocument: document, removed };
  },
  replace: function(obj, key, document) {
    var removed = obj[key];
    obj[key] = this.value;
    return { newDocument: document, removed };
  },
  move: function(obj, key, document) {
    let removed = getValueByPointer(document, this.path);
    if (removed) {
      removed = _deepClone(removed);
    }
    const originalValue = applyOperation(document, {
      op: "remove",
      path: this.from
    }).removed;
    applyOperation(document, {
      op: "add",
      path: this.path,
      value: originalValue
    });
    return { newDocument: document, removed };
  },
  copy: function(obj, key, document) {
    const valueToCopy = getValueByPointer(document, this.from);
    applyOperation(document, {
      op: "add",
      path: this.path,
      value: _deepClone(valueToCopy)
    });
    return { newDocument: document };
  },
  test: function(obj, key, document) {
    return { newDocument: document, test: _areEquals(obj[key], this.value) };
  },
  _get: function(obj, key, document) {
    this.value = obj[key];
    return { newDocument: document };
  }
};
var arrOps = {
  add: function(arr, i, document) {
    if (isInteger(i)) {
      arr.splice(i, 0, this.value);
    } else {
      arr[i] = this.value;
    }
    return { newDocument: document, index: i };
  },
  remove: function(arr, i, document) {
    var removedList = arr.splice(i, 1);
    return { newDocument: document, removed: removedList[0] };
  },
  replace: function(arr, i, document) {
    var removed = arr[i];
    arr[i] = this.value;
    return { newDocument: document, removed };
  },
  move: objOps.move,
  copy: objOps.copy,
  test: objOps.test,
  _get: objOps._get
};
function getValueByPointer(document, pointer) {
  if (pointer == "") {
    return document;
  }
  var getOriginalDestination = { op: "_get", path: pointer };
  applyOperation(document, getOriginalDestination);
  return getOriginalDestination.value;
}
function applyOperation(document, operation, validateOperation = false, mutateDocument = true, banPrototypeModifications = true, index = 0) {
  if (validateOperation) {
    if (typeof validateOperation == "function") {
      validateOperation(operation, 0, document, operation.path);
    } else {
      validator(operation, 0);
    }
  }
  if (operation.path === "") {
    let returnValue = { newDocument: document };
    if (operation.op === "add") {
      returnValue.newDocument = operation.value;
      return returnValue;
    } else if (operation.op === "replace") {
      returnValue.newDocument = operation.value;
      returnValue.removed = document;
      return returnValue;
    } else if (operation.op === "move" || operation.op === "copy") {
      returnValue.newDocument = getValueByPointer(document, operation.from);
      if (operation.op === "move") {
        returnValue.removed = document;
      }
      return returnValue;
    } else if (operation.op === "test") {
      returnValue.test = _areEquals(document, operation.value);
      if (returnValue.test === false) {
        throw new JsonPatchError("Test operation failed", "TEST_OPERATION_FAILED", index, operation, document);
      }
      returnValue.newDocument = document;
      return returnValue;
    } else if (operation.op === "remove") {
      returnValue.removed = document;
      returnValue.newDocument = null;
      return returnValue;
    } else if (operation.op === "_get") {
      operation.value = document;
      return returnValue;
    } else {
      if (validateOperation) {
        throw new JsonPatchError("Operation `op` property is not one of operations defined in RFC-6902", "OPERATION_OP_INVALID", index, operation, document);
      } else {
        return returnValue;
      }
    }
  } else {
    if (!mutateDocument) {
      document = _deepClone(document);
    }
    const path = operation.path || "";
    const keys = path.split("/");
    let obj = document;
    let t = 1;
    let len = keys.length;
    let existingPathFragment = void 0;
    let key;
    let validateFunction;
    if (typeof validateOperation == "function") {
      validateFunction = validateOperation;
    } else {
      validateFunction = validator;
    }
    while (true) {
      key = keys[t];
      if (key && key.indexOf("~") != -1) {
        key = unescapePathComponent(key);
      }
      if (banPrototypeModifications && (key == "__proto__" || key == "prototype" && t > 0 && keys[t - 1] == "constructor")) {
        throw new TypeError("JSON-Patch: modifying `__proto__` or `constructor/prototype` prop is banned for security reasons, if this was on purpose, please set `banPrototypeModifications` flag false and pass it to this function. More info in fast-json-patch README");
      }
      if (validateOperation) {
        if (existingPathFragment === void 0) {
          if (obj[key] === void 0) {
            existingPathFragment = keys.slice(0, t).join("/");
          } else if (t == len - 1) {
            existingPathFragment = operation.path;
          }
          if (existingPathFragment !== void 0) {
            validateFunction(operation, 0, document, existingPathFragment);
          }
        }
      }
      t++;
      if (Array.isArray(obj)) {
        if (key === "-") {
          key = obj.length;
        } else {
          if (validateOperation && !isInteger(key)) {
            throw new JsonPatchError("Expected an unsigned base-10 integer value, making the new referenced value the array element with the zero-based index", "OPERATION_PATH_ILLEGAL_ARRAY_INDEX", index, operation, document);
          } else if (isInteger(key)) {
            key = ~~key;
          }
        }
        if (t >= len) {
          if (validateOperation && operation.op === "add" && key > obj.length) {
            throw new JsonPatchError("The specified index MUST NOT be greater than the number of elements in the array", "OPERATION_VALUE_OUT_OF_BOUNDS", index, operation, document);
          }
          const returnValue = arrOps[operation.op].call(operation, obj, key, document);
          if (returnValue.test === false) {
            throw new JsonPatchError("Test operation failed", "TEST_OPERATION_FAILED", index, operation, document);
          }
          return returnValue;
        }
      } else {
        if (t >= len) {
          const returnValue = objOps[operation.op].call(operation, obj, key, document);
          if (returnValue.test === false) {
            throw new JsonPatchError("Test operation failed", "TEST_OPERATION_FAILED", index, operation, document);
          }
          return returnValue;
        }
      }
      obj = obj[key];
      if (validateOperation && t < len && (!obj || typeof obj !== "object")) {
        throw new JsonPatchError("Cannot perform operation at the desired path", "OPERATION_PATH_UNRESOLVABLE", index, operation, document);
      }
    }
  }
}
function applyPatch(document, patch, validateOperation, mutateDocument = true, banPrototypeModifications = true) {
  if (validateOperation) {
    if (!Array.isArray(patch)) {
      throw new JsonPatchError("Patch sequence must be an array", "SEQUENCE_NOT_AN_ARRAY");
    }
  }
  if (!mutateDocument) {
    document = _deepClone(document);
  }
  const results = new Array(patch.length);
  for (let i = 0, length = patch.length; i < length; i++) {
    results[i] = applyOperation(document, patch[i], validateOperation, true, banPrototypeModifications, i);
    document = results[i].newDocument;
  }
  results.newDocument = document;
  return results;
}
function applyReducer(document, operation, index) {
  const operationResult = applyOperation(document, operation);
  if (operationResult.test === false) {
    throw new JsonPatchError("Test operation failed", "TEST_OPERATION_FAILED", index, operation, document);
  }
  return operationResult.newDocument;
}
function validator(operation, index, document, existingPathFragment) {
  if (typeof operation !== "object" || operation === null || Array.isArray(operation)) {
    throw new JsonPatchError("Operation is not an object", "OPERATION_NOT_AN_OBJECT", index, operation, document);
  } else if (!objOps[operation.op]) {
    throw new JsonPatchError("Operation `op` property is not one of operations defined in RFC-6902", "OPERATION_OP_INVALID", index, operation, document);
  } else if (typeof operation.path !== "string") {
    throw new JsonPatchError("Operation `path` property is not a string", "OPERATION_PATH_INVALID", index, operation, document);
  } else if (operation.path.indexOf("/") !== 0 && operation.path.length > 0) {
    throw new JsonPatchError('Operation `path` property must start with "/"', "OPERATION_PATH_INVALID", index, operation, document);
  } else if ((operation.op === "move" || operation.op === "copy") && typeof operation.from !== "string") {
    throw new JsonPatchError("Operation `from` property is not present (applicable in `move` and `copy` operations)", "OPERATION_FROM_REQUIRED", index, operation, document);
  } else if ((operation.op === "add" || operation.op === "replace" || operation.op === "test") && operation.value === void 0) {
    throw new JsonPatchError("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)", "OPERATION_VALUE_REQUIRED", index, operation, document);
  } else if ((operation.op === "add" || operation.op === "replace" || operation.op === "test") && hasUndefined(operation.value)) {
    throw new JsonPatchError("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)", "OPERATION_VALUE_CANNOT_CONTAIN_UNDEFINED", index, operation, document);
  } else if (document) {
    if (operation.op == "add") {
      var pathLen = operation.path.split("/").length;
      var existingPathLen = existingPathFragment.split("/").length;
      if (pathLen !== existingPathLen + 1 && pathLen !== existingPathLen) {
        throw new JsonPatchError("Cannot perform an `add` operation at the desired path", "OPERATION_PATH_CANNOT_ADD", index, operation, document);
      }
    } else if (operation.op === "replace" || operation.op === "remove" || operation.op === "_get") {
      if (operation.path !== existingPathFragment) {
        throw new JsonPatchError("Cannot perform the operation at a path that does not exist", "OPERATION_PATH_UNRESOLVABLE", index, operation, document);
      }
    } else if (operation.op === "move" || operation.op === "copy") {
      var existingValue = {
        op: "_get",
        path: operation.from,
        value: void 0
      };
      var error = validate2([existingValue], document);
      if (error && error.name === "OPERATION_PATH_UNRESOLVABLE") {
        throw new JsonPatchError("Cannot perform the operation from a path that does not exist", "OPERATION_FROM_UNRESOLVABLE", index, operation, document);
      }
    }
  }
}
function validate2(sequence, document, externalValidator) {
  try {
    if (!Array.isArray(sequence)) {
      throw new JsonPatchError("Patch sequence must be an array", "SEQUENCE_NOT_AN_ARRAY");
    }
    if (document) {
      applyPatch(_deepClone(document), _deepClone(sequence), externalValidator || true);
    } else {
      externalValidator = externalValidator || validator;
      for (var i = 0; i < sequence.length; i++) {
        externalValidator(sequence[i], i, document, void 0);
      }
    }
  } catch (e) {
    if (e instanceof JsonPatchError) {
      return e;
    } else {
      throw e;
    }
  }
}
function _areEquals(a, b) {
  if (a === b)
    return true;
  if (a && b && typeof a == "object" && typeof b == "object") {
    var arrA = Array.isArray(a), arrB = Array.isArray(b), i, length, key;
    if (arrA && arrB) {
      length = a.length;
      if (length != b.length)
        return false;
      for (i = length; i-- !== 0; )
        if (!_areEquals(a[i], b[i]))
          return false;
      return true;
    }
    if (arrA != arrB)
      return false;
    var keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length)
      return false;
    for (i = length; i-- !== 0; )
      if (!b.hasOwnProperty(keys[i]))
        return false;
    for (i = length; i-- !== 0; ) {
      key = keys[i];
      if (!_areEquals(a[key], b[key]))
        return false;
    }
    return true;
  }
  return a !== a && b !== b;
}

// node_modules/@langchain/core/dist/utils/fast-json-patch/index.js
var fast_json_patch_default = {
  ...core_exports,
  // ...duplex,
  JsonPatchError: PatchError,
  deepClone: _deepClone,
  escapePathComponent,
  unescapePathComponent
};

// node_modules/@langchain/core/dist/singletons/index.js
var MockAsyncLocalStorage2 = class {
  getStore() {
    return void 0;
  }
  run(_store, callback) {
    return callback();
  }
};
var mockAsyncLocalStorage = new MockAsyncLocalStorage2();
var AsyncLocalStorageProvider2 = class {
  getInstance() {
    return globalThis.__lc_tracing_async_local_storage ?? mockAsyncLocalStorage;
  }
  initializeGlobalInstance(instance) {
    if (globalThis.__lc_tracing_async_local_storage === void 0) {
      globalThis.__lc_tracing_async_local_storage = instance;
    }
  }
};
var AsyncLocalStorageProviderSingleton2 = new AsyncLocalStorageProvider2();

// node_modules/@langchain/core/dist/utils/stream.js
var IterableReadableStream = class _IterableReadableStream extends ReadableStream {
  constructor() {
    super(...arguments);
    Object.defineProperty(this, "reader", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
  }
  ensureReader() {
    if (!this.reader) {
      this.reader = this.getReader();
    }
  }
  async next() {
    this.ensureReader();
    try {
      const result = await this.reader.read();
      if (result.done) {
        this.reader.releaseLock();
        return {
          done: true,
          value: void 0
        };
      } else {
        return {
          done: false,
          value: result.value
        };
      }
    } catch (e) {
      this.reader.releaseLock();
      throw e;
    }
  }
  async return() {
    this.ensureReader();
    if (this.locked) {
      const cancelPromise = this.reader.cancel();
      this.reader.releaseLock();
      await cancelPromise;
    }
    return { done: true, value: void 0 };
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async throw(e) {
    this.ensureReader();
    if (this.locked) {
      const cancelPromise = this.reader.cancel();
      this.reader.releaseLock();
      await cancelPromise;
    }
    throw e;
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  static fromReadableStream(stream) {
    const reader = stream.getReader();
    return new _IterableReadableStream({
      start(controller) {
        return pump();
        function pump() {
          return reader.read().then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }
            controller.enqueue(value);
            return pump();
          });
        }
      },
      cancel() {
        reader.releaseLock();
      }
    });
  }
  static fromAsyncGenerator(generator) {
    return new _IterableReadableStream({
      async pull(controller) {
        const { value, done } = await generator.next();
        if (done) {
          controller.close();
        }
        controller.enqueue(value);
      },
      async cancel(reason) {
        await generator.return(reason);
      }
    });
  }
};
function atee(iter, length = 2) {
  const buffers = Array.from({ length }, () => []);
  return buffers.map(async function* makeIter(buffer) {
    while (true) {
      if (buffer.length === 0) {
        const result = await iter.next();
        for (const buffer2 of buffers) {
          buffer2.push(result);
        }
      } else if (buffer[0].done) {
        return;
      } else {
        yield buffer.shift().value;
      }
    }
  });
}
function concat(first, second) {
  if (Array.isArray(first) && Array.isArray(second)) {
    return first.concat(second);
  } else if (typeof first === "string" && typeof second === "string") {
    return first + second;
  } else if (typeof first === "number" && typeof second === "number") {
    return first + second;
  } else if (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "concat" in first && // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof first.concat === "function"
  ) {
    return first.concat(second);
  } else if (typeof first === "object" && typeof second === "object") {
    const chunk = { ...first };
    for (const [key, value] of Object.entries(second)) {
      if (key in chunk && !Array.isArray(chunk[key])) {
        chunk[key] = concat(chunk[key], value);
      } else {
        chunk[key] = value;
      }
    }
    return chunk;
  } else {
    throw new Error(`Cannot concat ${typeof first} and ${typeof second}`);
  }
}
var AsyncGeneratorWithSetup = class {
  constructor(params) {
    Object.defineProperty(this, "generator", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "setup", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "config", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "firstResult", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "firstResultUsed", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    this.generator = params.generator;
    this.config = params.config;
    this.setup = new Promise((resolve, reject) => {
      const storage = AsyncLocalStorageProviderSingleton2.getInstance();
      void storage.run(params.config, async () => {
        this.firstResult = params.generator.next();
        if (params.startSetup) {
          this.firstResult.then(params.startSetup).then(resolve, reject);
        } else {
          this.firstResult.then((_result) => resolve(void 0), reject);
        }
      });
    });
  }
  async next(...args) {
    if (!this.firstResultUsed) {
      this.firstResultUsed = true;
      return this.firstResult;
    }
    const storage = AsyncLocalStorageProviderSingleton2.getInstance();
    return storage.run(this.config, async () => {
      return this.generator.next(...args);
    });
  }
  async return(value) {
    return this.generator.return(value);
  }
  async throw(e) {
    return this.generator.throw(e);
  }
  [Symbol.asyncIterator]() {
    return this;
  }
};
async function pipeGeneratorWithSetup(to, generator, startSetup, ...args) {
  const gen = new AsyncGeneratorWithSetup({ generator, startSetup });
  const setup = await gen.setup;
  return { output: to(gen, setup, ...args), setup };
}

// node_modules/@langchain/core/dist/tracers/log_stream.js
var RunLogPatch = class {
  constructor(fields) {
    Object.defineProperty(this, "ops", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.ops = fields.ops ?? [];
  }
  concat(other) {
    const ops = this.ops.concat(other.ops);
    const states = applyPatch({}, ops);
    return new RunLog({
      ops,
      state: states[states.length - 1].newDocument
    });
  }
};
var RunLog = class _RunLog extends RunLogPatch {
  constructor(fields) {
    super(fields);
    Object.defineProperty(this, "state", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.state = fields.state;
  }
  concat(other) {
    const ops = this.ops.concat(other.ops);
    const states = applyPatch(this.state, other.ops);
    return new _RunLog({ ops, state: states[states.length - 1].newDocument });
  }
  static fromRunLogPatch(patch) {
    const states = applyPatch({}, patch.ops);
    return new _RunLog({
      ops: patch.ops,
      state: states[states.length - 1].newDocument
    });
  }
};
var isLogStreamHandler = (handler) => handler.name === "log_stream_tracer";
async function _getStandardizedInputs(run, schemaFormat) {
  if (schemaFormat === "original") {
    throw new Error("Do not assign inputs with original schema drop the key for now. When inputs are added to streamLog they should be added with standardized schema for streaming events.");
  }
  const { inputs } = run;
  if (["retriever", "llm", "prompt"].includes(run.run_type)) {
    return inputs;
  }
  if (Object.keys(inputs).length === 1 && inputs?.input === "") {
    return void 0;
  }
  return inputs.input;
}
async function _getStandardizedOutputs(run, schemaFormat) {
  const { outputs } = run;
  if (schemaFormat === "original") {
    return outputs;
  }
  if (["retriever", "llm", "prompt"].includes(run.run_type)) {
    return outputs;
  }
  if (outputs !== void 0 && Object.keys(outputs).length === 1 && outputs?.output !== void 0) {
    return outputs.output;
  }
  return outputs;
}
function isChatGenerationChunk(x) {
  return x !== void 0 && x.message !== void 0;
}
var LogStreamCallbackHandler = class extends BaseTracer {
  constructor(fields) {
    super({ _awaitHandler: true, ...fields });
    Object.defineProperty(this, "autoClose", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "includeNames", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "includeTypes", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "includeTags", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "excludeNames", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "excludeTypes", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "excludeTags", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_schemaFormat", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "original"
    });
    Object.defineProperty(this, "rootId", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "keyMapByRunId", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: {}
    });
    Object.defineProperty(this, "counterMapByRunName", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: {}
    });
    Object.defineProperty(this, "transformStream", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "writer", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "receiveStream", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "log_stream_tracer"
    });
    this.autoClose = fields?.autoClose ?? true;
    this.includeNames = fields?.includeNames;
    this.includeTypes = fields?.includeTypes;
    this.includeTags = fields?.includeTags;
    this.excludeNames = fields?.excludeNames;
    this.excludeTypes = fields?.excludeTypes;
    this.excludeTags = fields?.excludeTags;
    this._schemaFormat = fields?._schemaFormat ?? this._schemaFormat;
    this.transformStream = new TransformStream();
    this.writer = this.transformStream.writable.getWriter();
    this.receiveStream = IterableReadableStream.fromReadableStream(this.transformStream.readable);
  }
  [Symbol.asyncIterator]() {
    return this.receiveStream;
  }
  async persistRun(_run) {
  }
  _includeRun(run) {
    if (run.id === this.rootId) {
      return false;
    }
    const runTags = run.tags ?? [];
    let include = this.includeNames === void 0 && this.includeTags === void 0 && this.includeTypes === void 0;
    if (this.includeNames !== void 0) {
      include = include || this.includeNames.includes(run.name);
    }
    if (this.includeTypes !== void 0) {
      include = include || this.includeTypes.includes(run.run_type);
    }
    if (this.includeTags !== void 0) {
      include = include || runTags.find((tag) => this.includeTags?.includes(tag)) !== void 0;
    }
    if (this.excludeNames !== void 0) {
      include = include && !this.excludeNames.includes(run.name);
    }
    if (this.excludeTypes !== void 0) {
      include = include && !this.excludeTypes.includes(run.run_type);
    }
    if (this.excludeTags !== void 0) {
      include = include && runTags.every((tag) => !this.excludeTags?.includes(tag));
    }
    return include;
  }
  async *tapOutputIterable(runId, output) {
    for await (const chunk of output) {
      if (runId !== this.rootId) {
        const key = this.keyMapByRunId[runId];
        if (key) {
          await this.writer.write(new RunLogPatch({
            ops: [
              {
                op: "add",
                path: `/logs/${key}/streamed_output/-`,
                value: chunk
              }
            ]
          }));
        }
      }
      yield chunk;
    }
  }
  async onRunCreate(run) {
    if (this.rootId === void 0) {
      this.rootId = run.id;
      await this.writer.write(new RunLogPatch({
        ops: [
          {
            op: "replace",
            path: "",
            value: {
              id: run.id,
              name: run.name,
              type: run.run_type,
              streamed_output: [],
              final_output: void 0,
              logs: {}
            }
          }
        ]
      }));
    }
    if (!this._includeRun(run)) {
      return;
    }
    if (this.counterMapByRunName[run.name] === void 0) {
      this.counterMapByRunName[run.name] = 0;
    }
    this.counterMapByRunName[run.name] += 1;
    const count = this.counterMapByRunName[run.name];
    this.keyMapByRunId[run.id] = count === 1 ? run.name : `${run.name}:${count}`;
    const logEntry = {
      id: run.id,
      name: run.name,
      type: run.run_type,
      tags: run.tags ?? [],
      metadata: run.extra?.metadata ?? {},
      start_time: new Date(run.start_time).toISOString(),
      streamed_output: [],
      streamed_output_str: [],
      final_output: void 0,
      end_time: void 0
    };
    if (this._schemaFormat === "streaming_events") {
      logEntry.inputs = await _getStandardizedInputs(run, this._schemaFormat);
    }
    await this.writer.write(new RunLogPatch({
      ops: [
        {
          op: "add",
          path: `/logs/${this.keyMapByRunId[run.id]}`,
          value: logEntry
        }
      ]
    }));
  }
  async onRunUpdate(run) {
    try {
      const runName = this.keyMapByRunId[run.id];
      if (runName === void 0) {
        return;
      }
      const ops = [];
      if (this._schemaFormat === "streaming_events") {
        ops.push({
          op: "replace",
          path: `/logs/${runName}/inputs`,
          value: await _getStandardizedInputs(run, this._schemaFormat)
        });
      }
      ops.push({
        op: "add",
        path: `/logs/${runName}/final_output`,
        value: await _getStandardizedOutputs(run, this._schemaFormat)
      });
      if (run.end_time !== void 0) {
        ops.push({
          op: "add",
          path: `/logs/${runName}/end_time`,
          value: new Date(run.end_time).toISOString()
        });
      }
      const patch = new RunLogPatch({ ops });
      await this.writer.write(patch);
    } finally {
      if (run.id === this.rootId) {
        const patch = new RunLogPatch({
          ops: [
            {
              op: "replace",
              path: "/final_output",
              value: await _getStandardizedOutputs(run, this._schemaFormat)
            }
          ]
        });
        await this.writer.write(patch);
        if (this.autoClose) {
          await this.writer.close();
        }
      }
    }
  }
  async onLLMNewToken(run, token, kwargs) {
    const runName = this.keyMapByRunId[run.id];
    if (runName === void 0) {
      return;
    }
    const isChatModel = run.inputs.messages !== void 0;
    let streamedOutputValue;
    if (isChatModel) {
      if (isChatGenerationChunk(kwargs?.chunk)) {
        streamedOutputValue = kwargs?.chunk;
      } else {
        streamedOutputValue = new AIMessageChunk(token);
      }
    } else {
      streamedOutputValue = token;
    }
    const patch = new RunLogPatch({
      ops: [
        {
          op: "add",
          path: `/logs/${runName}/streamed_output_str/-`,
          value: token
        },
        {
          op: "add",
          path: `/logs/${runName}/streamed_output/-`,
          value: streamedOutputValue
        }
      ]
    });
    await this.writer.write(patch);
  }
};

// node_modules/@langchain/core/dist/outputs.js
var RUN_KEY = "__run";
var GenerationChunk = class _GenerationChunk {
  constructor(fields) {
    Object.defineProperty(this, "text", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "generationInfo", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.text = fields.text;
    this.generationInfo = fields.generationInfo;
  }
  concat(chunk) {
    return new _GenerationChunk({
      text: this.text + chunk.text,
      generationInfo: {
        ...this.generationInfo,
        ...chunk.generationInfo
      }
    });
  }
};
var ChatGenerationChunk = class _ChatGenerationChunk extends GenerationChunk {
  constructor(fields) {
    super(fields);
    Object.defineProperty(this, "message", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.message = fields.message;
  }
  concat(chunk) {
    return new _ChatGenerationChunk({
      text: this.text + chunk.text,
      generationInfo: {
        ...this.generationInfo,
        ...chunk.generationInfo
      },
      message: this.message.concat(chunk.message)
    });
  }
};

// node_modules/@langchain/core/dist/tracers/event_stream.js
function assignName({ name, serialized }) {
  if (name !== void 0) {
    return name;
  }
  if (serialized?.name !== void 0) {
    return serialized.name;
  } else if (serialized?.id !== void 0 && Array.isArray(serialized?.id)) {
    return serialized.id[serialized.id.length - 1];
  }
  return "Unnamed";
}
var isStreamEventsHandler = (handler) => handler.name === "event_stream_tracer";
var EventStreamCallbackHandler = class extends BaseTracer {
  constructor(fields) {
    super({ _awaitHandler: true, ...fields });
    Object.defineProperty(this, "autoClose", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "includeNames", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "includeTypes", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "includeTags", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "excludeNames", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "excludeTypes", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "excludeTags", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "runInfoMap", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /* @__PURE__ */ new Map()
    });
    Object.defineProperty(this, "tappedPromises", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /* @__PURE__ */ new Map()
    });
    Object.defineProperty(this, "transformStream", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "writer", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "receiveStream", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "event_stream_tracer"
    });
    this.autoClose = fields?.autoClose ?? true;
    this.includeNames = fields?.includeNames;
    this.includeTypes = fields?.includeTypes;
    this.includeTags = fields?.includeTags;
    this.excludeNames = fields?.excludeNames;
    this.excludeTypes = fields?.excludeTypes;
    this.excludeTags = fields?.excludeTags;
    this.transformStream = new TransformStream();
    this.writer = this.transformStream.writable.getWriter();
    this.receiveStream = IterableReadableStream.fromReadableStream(this.transformStream.readable);
  }
  [Symbol.asyncIterator]() {
    return this.receiveStream;
  }
  async persistRun(_run) {
  }
  _includeRun(run) {
    const runTags = run.tags ?? [];
    let include = this.includeNames === void 0 && this.includeTags === void 0 && this.includeTypes === void 0;
    if (this.includeNames !== void 0) {
      include = include || this.includeNames.includes(run.name);
    }
    if (this.includeTypes !== void 0) {
      include = include || this.includeTypes.includes(run.runType);
    }
    if (this.includeTags !== void 0) {
      include = include || runTags.find((tag) => this.includeTags?.includes(tag)) !== void 0;
    }
    if (this.excludeNames !== void 0) {
      include = include && !this.excludeNames.includes(run.name);
    }
    if (this.excludeTypes !== void 0) {
      include = include && !this.excludeTypes.includes(run.runType);
    }
    if (this.excludeTags !== void 0) {
      include = include && runTags.every((tag) => !this.excludeTags?.includes(tag));
    }
    return include;
  }
  async *tapOutputIterable(runId, outputStream) {
    const firstChunk = await outputStream.next();
    if (firstChunk.done) {
      return;
    }
    const runInfo = this.runInfoMap.get(runId);
    if (runInfo === void 0) {
      yield firstChunk.value;
      return;
    }
    let tappedPromise = this.tappedPromises.get(runId);
    if (tappedPromise === void 0) {
      let tappedPromiseResolver;
      tappedPromise = new Promise((resolve) => {
        tappedPromiseResolver = resolve;
      });
      this.tappedPromises.set(runId, tappedPromise);
      try {
        const event = {
          event: `on_${runInfo.runType}_stream`,
          run_id: runId,
          name: runInfo.name,
          tags: runInfo.tags,
          metadata: runInfo.metadata,
          data: {}
        };
        await this.send({
          ...event,
          data: { chunk: firstChunk.value }
        }, runInfo);
        yield firstChunk.value;
        for await (const chunk of outputStream) {
          if (runInfo.runType !== "tool" && runInfo.runType !== "retriever") {
            await this.send({
              ...event,
              data: {
                chunk
              }
            }, runInfo);
          }
          yield chunk;
        }
      } finally {
        tappedPromiseResolver();
      }
    } else {
      yield firstChunk.value;
      for await (const chunk of outputStream) {
        yield chunk;
      }
    }
  }
  async send(payload, run) {
    if (this._includeRun(run)) {
      await this.writer.write(payload);
    }
  }
  async sendEndEvent(payload, run) {
    const tappedPromise = this.tappedPromises.get(payload.run_id);
    if (tappedPromise !== void 0) {
      void tappedPromise.then(() => {
        void this.send(payload, run);
      });
    } else {
      await this.send(payload, run);
    }
  }
  async onLLMStart(run) {
    const runName = assignName(run);
    const runType = run.inputs.messages !== void 0 ? "chat_model" : "llm";
    const runInfo = {
      tags: run.tags ?? [],
      metadata: run.extra?.metadata ?? {},
      name: runName,
      runType,
      inputs: run.inputs
    };
    this.runInfoMap.set(run.id, runInfo);
    const eventName = `on_${runType}_start`;
    await this.send({
      event: eventName,
      data: {
        input: run.inputs
      },
      name: runName,
      tags: run.tags ?? [],
      run_id: run.id,
      metadata: run.extra?.metadata ?? {}
    }, runInfo);
  }
  async onLLMNewToken(run, token, kwargs) {
    const runInfo = this.runInfoMap.get(run.id);
    let chunk;
    let eventName;
    if (runInfo === void 0) {
      throw new Error(`onLLMNewToken: Run ID ${run.id} not found in run map.`);
    }
    if (runInfo.runType === "chat_model") {
      eventName = "on_chat_model_stream";
      if (kwargs?.chunk === void 0) {
        chunk = new AIMessageChunk({ content: token });
      } else {
        chunk = kwargs.chunk.message;
      }
    } else if (runInfo.runType === "llm") {
      eventName = "on_llm_stream";
      if (kwargs?.chunk === void 0) {
        chunk = new GenerationChunk({ text: token });
      } else {
        chunk = kwargs.chunk;
      }
    } else {
      throw new Error(`Unexpected run type ${runInfo.runType}`);
    }
    await this.send({
      event: eventName,
      data: {
        chunk
      },
      run_id: run.id,
      name: runInfo.name,
      tags: runInfo.tags,
      metadata: runInfo.metadata
    }, runInfo);
  }
  async onLLMEnd(run) {
    const runInfo = this.runInfoMap.get(run.id);
    this.runInfoMap.delete(run.id);
    let eventName;
    if (runInfo === void 0) {
      throw new Error(`onLLMEnd: Run ID ${run.id} not found in run map.`);
    }
    const generations = run.outputs?.generations;
    let output;
    if (runInfo.runType === "chat_model") {
      for (const generation of generations ?? []) {
        if (output !== void 0) {
          break;
        }
        output = generation[0]?.message;
      }
      eventName = "on_chat_model_end";
    } else if (runInfo.runType === "llm") {
      output = {
        generations: generations?.map((generation) => {
          return generation.map((chunk) => {
            return {
              text: chunk.text,
              generationInfo: chunk.generationInfo
            };
          });
        }),
        llmOutput: run.outputs?.llmOutput ?? {}
      };
      eventName = "on_llm_end";
    } else {
      throw new Error(`onLLMEnd: Unexpected run type: ${runInfo.runType}`);
    }
    await this.sendEndEvent({
      event: eventName,
      data: {
        output,
        input: runInfo.inputs
      },
      run_id: run.id,
      name: runInfo.name,
      tags: runInfo.tags,
      metadata: runInfo.metadata
    }, runInfo);
  }
  async onChainStart(run) {
    const runName = assignName(run);
    const runType = run.run_type ?? "chain";
    const runInfo = {
      tags: run.tags ?? [],
      metadata: run.extra?.metadata ?? {},
      name: runName,
      runType: run.run_type
    };
    let eventData = {};
    if (run.inputs.input === "" && Object.keys(run.inputs).length === 1) {
      eventData = {};
      runInfo.inputs = {};
    } else if (run.inputs.input !== void 0) {
      eventData.input = run.inputs.input;
      runInfo.inputs = run.inputs.input;
    } else {
      eventData.input = run.inputs;
      runInfo.inputs = run.inputs;
    }
    this.runInfoMap.set(run.id, runInfo);
    await this.send({
      event: `on_${runType}_start`,
      data: eventData,
      name: runName,
      tags: run.tags ?? [],
      run_id: run.id,
      metadata: run.extra?.metadata ?? {}
    }, runInfo);
  }
  async onChainEnd(run) {
    const runInfo = this.runInfoMap.get(run.id);
    this.runInfoMap.delete(run.id);
    if (runInfo === void 0) {
      throw new Error(`onChainEnd: Run ID ${run.id} not found in run map.`);
    }
    const eventName = `on_${run.run_type}_end`;
    const inputs = run.inputs ?? runInfo.inputs ?? {};
    const outputs = run.outputs?.output ?? run.outputs;
    const data = {
      output: outputs,
      input: inputs
    };
    if (inputs.input && Object.keys(inputs).length === 1) {
      data.input = inputs.input;
      runInfo.inputs = inputs.input;
    }
    await this.sendEndEvent({
      event: eventName,
      data,
      run_id: run.id,
      name: runInfo.name,
      tags: runInfo.tags,
      metadata: runInfo.metadata ?? {}
    }, runInfo);
  }
  async onToolStart(run) {
    const runName = assignName(run);
    const runInfo = {
      tags: run.tags ?? [],
      metadata: run.extra?.metadata ?? {},
      name: runName,
      runType: "tool",
      inputs: run.inputs ?? {}
    };
    this.runInfoMap.set(run.id, runInfo);
    await this.send({
      event: "on_tool_start",
      data: {
        input: run.inputs ?? {}
      },
      name: runName,
      run_id: run.id,
      tags: run.tags ?? [],
      metadata: run.extra?.metadata ?? {}
    }, runInfo);
  }
  async onToolEnd(run) {
    const runInfo = this.runInfoMap.get(run.id);
    this.runInfoMap.delete(run.id);
    if (runInfo === void 0) {
      throw new Error(`onToolEnd: Run ID ${run.id} not found in run map.`);
    }
    if (runInfo.inputs === void 0) {
      throw new Error(`onToolEnd: Run ID ${run.id} is a tool call, and is expected to have traced inputs.`);
    }
    const output = run.outputs?.output === void 0 ? run.outputs : run.outputs.output;
    await this.sendEndEvent({
      event: "on_tool_end",
      data: {
        output,
        input: runInfo.inputs
      },
      run_id: run.id,
      name: runInfo.name,
      tags: runInfo.tags,
      metadata: runInfo.metadata
    }, runInfo);
  }
  async onRetrieverStart(run) {
    const runName = assignName(run);
    const runType = "retriever";
    const runInfo = {
      tags: run.tags ?? [],
      metadata: run.extra?.metadata ?? {},
      name: runName,
      runType,
      inputs: {
        query: run.inputs.query
      }
    };
    this.runInfoMap.set(run.id, runInfo);
    await this.send({
      event: "on_retriever_start",
      data: {
        input: {
          query: run.inputs.query
        }
      },
      name: runName,
      tags: run.tags ?? [],
      run_id: run.id,
      metadata: run.extra?.metadata ?? {}
    }, runInfo);
  }
  async onRetrieverEnd(run) {
    const runInfo = this.runInfoMap.get(run.id);
    this.runInfoMap.delete(run.id);
    if (runInfo === void 0) {
      throw new Error(`onRetrieverEnd: Run ID ${run.id} not found in run map.`);
    }
    await this.sendEndEvent({
      event: "on_retriever_end",
      data: {
        output: run.outputs?.documents ?? run.outputs,
        input: runInfo.inputs
      },
      run_id: run.id,
      name: runInfo.name,
      tags: runInfo.tags,
      metadata: runInfo.metadata
    }, runInfo);
  }
  async finish() {
    const pendingPromises = [...this.tappedPromises.values()];
    void Promise.all(pendingPromises).finally(() => {
      void this.writer.close();
    });
  }
};

// node_modules/@langchain/core/dist/runnables/config.js
var DEFAULT_RECURSION_LIMIT = 25;
async function getCallbackManagerForConfig(config) {
  return CallbackManager.configure(config?.callbacks, void 0, config?.tags, void 0, config?.metadata);
}
function mergeConfigs(...configs) {
  const copy = {};
  for (const options of configs.filter((c) => !!c)) {
    for (const key of Object.keys(options)) {
      if (key === "metadata") {
        copy[key] = { ...copy[key], ...options[key] };
      } else if (key === "tags") {
        const baseKeys = copy[key] ?? [];
        copy[key] = [...new Set(baseKeys.concat(options[key] ?? []))];
      } else if (key === "configurable") {
        copy[key] = { ...copy[key], ...options[key] };
      } else if (key === "callbacks") {
        const baseCallbacks = copy.callbacks;
        const providedCallbacks = options.callbacks;
        if (Array.isArray(providedCallbacks)) {
          if (!baseCallbacks) {
            copy.callbacks = providedCallbacks;
          } else if (Array.isArray(baseCallbacks)) {
            copy.callbacks = baseCallbacks.concat(providedCallbacks);
          } else {
            const manager = baseCallbacks.copy();
            for (const callback of providedCallbacks) {
              manager.addHandler(ensureHandler(callback), true);
            }
            copy.callbacks = manager;
          }
        } else if (providedCallbacks) {
          if (!baseCallbacks) {
            copy.callbacks = providedCallbacks;
          } else if (Array.isArray(baseCallbacks)) {
            const manager = providedCallbacks.copy();
            for (const callback of baseCallbacks) {
              manager.addHandler(ensureHandler(callback), true);
            }
            copy.callbacks = manager;
          } else {
            copy.callbacks = new CallbackManager(providedCallbacks._parentRunId, {
              handlers: baseCallbacks.handlers.concat(providedCallbacks.handlers),
              inheritableHandlers: baseCallbacks.inheritableHandlers.concat(providedCallbacks.inheritableHandlers),
              tags: Array.from(new Set(baseCallbacks.tags.concat(providedCallbacks.tags))),
              inheritableTags: Array.from(new Set(baseCallbacks.inheritableTags.concat(providedCallbacks.inheritableTags))),
              metadata: {
                ...baseCallbacks.metadata,
                ...providedCallbacks.metadata
              }
            });
          }
        }
      } else {
        const typedKey = key;
        copy[typedKey] = options[typedKey] ?? copy[typedKey];
      }
    }
  }
  return copy;
}
var PRIMITIVES = /* @__PURE__ */ new Set(["string", "number", "boolean"]);
function ensureConfig(config) {
  const loadedConfig = config ?? AsyncLocalStorageProviderSingleton2.getInstance().getStore();
  let empty = {
    tags: [],
    metadata: {},
    callbacks: void 0,
    recursionLimit: 25,
    runId: void 0
  };
  if (loadedConfig) {
    empty = { ...empty, ...loadedConfig };
  }
  if (loadedConfig?.configurable) {
    for (const key of Object.keys(loadedConfig.configurable)) {
      if (PRIMITIVES.has(typeof loadedConfig.configurable[key]) && !empty.metadata?.[key]) {
        if (!empty.metadata) {
          empty.metadata = {};
        }
        empty.metadata[key] = loadedConfig.configurable[key];
      }
    }
  }
  return empty;
}
function patchConfig(config = {}, { callbacks, maxConcurrency, recursionLimit, runName, configurable, runId } = {}) {
  const newConfig = ensureConfig(config);
  if (callbacks !== void 0) {
    delete newConfig.runName;
    newConfig.callbacks = callbacks;
  }
  if (recursionLimit !== void 0) {
    newConfig.recursionLimit = recursionLimit;
  }
  if (maxConcurrency !== void 0) {
    newConfig.maxConcurrency = maxConcurrency;
  }
  if (runName !== void 0) {
    newConfig.runName = runName;
  }
  if (configurable !== void 0) {
    newConfig.configurable = { ...newConfig.configurable, ...configurable };
  }
  if (runId !== void 0) {
    delete newConfig.runId;
  }
  return newConfig;
}

// node_modules/@langchain/core/dist/utils/async_caller.js
var import_p_retry2 = __toESM(require_p_retry(), 1);
var import_p_queue3 = __toESM(require_dist(), 1);
var STATUS_NO_RETRY2 = [
  400,
  401,
  402,
  403,
  404,
  405,
  406,
  407,
  409
  // Conflict
];
var defaultFailedAttemptHandler = (error) => {
  if (error.message.startsWith("Cancel") || error.message.startsWith("AbortError") || error.name === "AbortError") {
    throw error;
  }
  if (error?.code === "ECONNABORTED") {
    throw error;
  }
  const status = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?.response?.status ?? error?.status
  );
  if (status && STATUS_NO_RETRY2.includes(+status)) {
    throw error;
  }
  if (error?.error?.code === "insufficient_quota") {
    const err = new Error(error?.message);
    err.name = "InsufficientQuotaError";
    throw err;
  }
};
var AsyncCaller2 = class {
  constructor(params) {
    Object.defineProperty(this, "maxConcurrency", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "maxRetries", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "onFailedAttempt", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "queue", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.maxConcurrency = params.maxConcurrency ?? Infinity;
    this.maxRetries = params.maxRetries ?? 6;
    this.onFailedAttempt = params.onFailedAttempt ?? defaultFailedAttemptHandler;
    const PQueue = "default" in import_p_queue3.default ? import_p_queue3.default.default : import_p_queue3.default;
    this.queue = new PQueue({ concurrency: this.maxConcurrency });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  call(callable, ...args) {
    return this.queue.add(() => (0, import_p_retry2.default)(() => callable(...args).catch((error) => {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(error);
      }
    }), {
      onFailedAttempt: this.onFailedAttempt,
      retries: this.maxRetries,
      randomize: true
      // If needed we can change some of the defaults here,
      // but they're quite sensible.
    }), { throwOnTimeout: true });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callWithOptions(options, callable, ...args) {
    if (options.signal) {
      return Promise.race([
        this.call(callable, ...args),
        new Promise((_, reject) => {
          options.signal?.addEventListener("abort", () => {
            reject(new Error("AbortError"));
          });
        })
      ]);
    }
    return this.call(callable, ...args);
  }
  fetch(...args) {
    return this.call(() => fetch(...args).then((res) => res.ok ? res : Promise.reject(res)));
  }
};

// node_modules/@langchain/core/dist/tracers/root_listener.js
var RootListenersTracer = class extends BaseTracer {
  constructor({ config, onStart, onEnd, onError }) {
    super({ _awaitHandler: true });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "RootListenersTracer"
    });
    Object.defineProperty(this, "rootId", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "config", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "argOnStart", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "argOnEnd", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "argOnError", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.config = config;
    this.argOnStart = onStart;
    this.argOnEnd = onEnd;
    this.argOnError = onError;
  }
  /**
   * This is a legacy method only called once for an entire run tree
   * therefore not useful here
   * @param {Run} _ Not used
   */
  persistRun(_) {
    return Promise.resolve();
  }
  async onRunCreate(run) {
    if (this.rootId) {
      return;
    }
    this.rootId = run.id;
    if (this.argOnStart) {
      if (this.argOnStart.length === 1) {
        await this.argOnStart(run);
      } else if (this.argOnStart.length === 2) {
        await this.argOnStart(run, this.config);
      }
    }
  }
  async onRunUpdate(run) {
    if (run.id !== this.rootId) {
      return;
    }
    if (!run.error) {
      if (this.argOnEnd) {
        if (this.argOnEnd.length === 1) {
          await this.argOnEnd(run);
        } else if (this.argOnEnd.length === 2) {
          await this.argOnEnd(run, this.config);
        }
      }
    } else if (this.argOnError) {
      if (this.argOnError.length === 1) {
        await this.argOnError(run);
      } else if (this.argOnError.length === 2) {
        await this.argOnError(run, this.config);
      }
    }
  }
};

// node_modules/@langchain/core/dist/runnables/utils.js
function isRunnableInterface(thing) {
  return thing ? thing.lc_runnable : false;
}
var _RootEventFilter = class {
  constructor(fields) {
    Object.defineProperty(this, "includeNames", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "includeTypes", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "includeTags", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "excludeNames", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "excludeTypes", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "excludeTags", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.includeNames = fields.includeNames;
    this.includeTypes = fields.includeTypes;
    this.includeTags = fields.includeTags;
    this.excludeNames = fields.excludeNames;
    this.excludeTypes = fields.excludeTypes;
    this.excludeTags = fields.excludeTags;
  }
  includeEvent(event, rootType) {
    let include = this.includeNames === void 0 && this.includeTypes === void 0 && this.includeTags === void 0;
    const eventTags = event.tags ?? [];
    if (this.includeNames !== void 0) {
      include = include || this.includeNames.includes(event.name);
    }
    if (this.includeTypes !== void 0) {
      include = include || this.includeTypes.includes(rootType);
    }
    if (this.includeTags !== void 0) {
      include = include || eventTags.some((tag) => this.includeTags?.includes(tag));
    }
    if (this.excludeNames !== void 0) {
      include = include && !this.excludeNames.includes(event.name);
    }
    if (this.excludeTypes !== void 0) {
      include = include && !this.excludeTypes.includes(rootType);
    }
    if (this.excludeTags !== void 0) {
      include = include && eventTags.every((tag) => !this.excludeTags?.includes(tag));
    }
    return include;
  }
};

// node_modules/@langchain/core/dist/runnables/graph.js
function nodeDataJson(node) {
  if (isRunnableInterface(node.data)) {
    return {
      type: "runnable",
      data: {
        id: node.data.lc_id,
        name: node.data.getName()
      }
    };
  } else {
    return {
      type: "schema",
      data: { ...zodToJsonSchema(node.data.schema), title: node.data.name }
    };
  }
}
var Graph = class {
  constructor() {
    Object.defineProperty(this, "nodes", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: {}
    });
    Object.defineProperty(this, "edges", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
  }
  // Convert the graph to a JSON-serializable format.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toJSON() {
    const stableNodeIds = {};
    Object.values(this.nodes).forEach((node, i) => {
      stableNodeIds[node.id] = validate_default(node.id) ? i : node.id;
    });
    return {
      nodes: Object.values(this.nodes).map((node) => ({
        id: stableNodeIds[node.id],
        ...nodeDataJson(node)
      })),
      edges: this.edges.map((edge) => edge.data ? {
        source: stableNodeIds[edge.source],
        target: stableNodeIds[edge.target],
        data: edge.data
      } : {
        source: stableNodeIds[edge.source],
        target: stableNodeIds[edge.target]
      })
    };
  }
  addNode(data, id) {
    if (id !== void 0 && this.nodes[id] !== void 0) {
      throw new Error(`Node with id ${id} already exists`);
    }
    const nodeId = id || v4_default();
    const node = { id: nodeId, data };
    this.nodes[nodeId] = node;
    return node;
  }
  removeNode(node) {
    delete this.nodes[node.id];
    this.edges = this.edges.filter((edge) => edge.source !== node.id && edge.target !== node.id);
  }
  addEdge(source, target, data) {
    if (this.nodes[source.id] === void 0) {
      throw new Error(`Source node ${source.id} not in graph`);
    }
    if (this.nodes[target.id] === void 0) {
      throw new Error(`Target node ${target.id} not in graph`);
    }
    const edge = { source: source.id, target: target.id, data };
    this.edges.push(edge);
    return edge;
  }
  firstNode() {
    const targets = new Set(this.edges.map((edge) => edge.target));
    const found = [];
    Object.values(this.nodes).forEach((node) => {
      if (!targets.has(node.id)) {
        found.push(node);
      }
    });
    return found[0];
  }
  lastNode() {
    const sources = new Set(this.edges.map((edge) => edge.source));
    const found = [];
    Object.values(this.nodes).forEach((node) => {
      if (!sources.has(node.id)) {
        found.push(node);
      }
    });
    return found[0];
  }
  extend(graph) {
    Object.entries(graph.nodes).forEach(([key, value]) => {
      this.nodes[key] = value;
    });
    this.edges = [...this.edges, ...graph.edges];
  }
  trimFirstNode() {
    const firstNode = this.firstNode();
    if (firstNode) {
      const outgoingEdges = this.edges.filter((edge) => edge.source === firstNode.id);
      if (Object.keys(this.nodes).length === 1 || outgoingEdges.length === 1) {
        this.removeNode(firstNode);
      }
    }
  }
  trimLastNode() {
    const lastNode = this.lastNode();
    if (lastNode) {
      const incomingEdges = this.edges.filter((edge) => edge.target === lastNode.id);
      if (Object.keys(this.nodes).length === 1 || incomingEdges.length === 1) {
        this.removeNode(lastNode);
      }
    }
  }
};

// node_modules/@langchain/core/dist/runnables/wrappers.js
function convertToHttpEventStream(stream) {
  const encoder = new TextEncoder();
  const finalStream = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        controller.enqueue(encoder.encode(`event: data
data: ${JSON.stringify(chunk)}

`));
      }
      controller.enqueue(encoder.encode("event: end\n\n"));
      controller.close();
    }
  });
  return IterableReadableStream.fromReadableStream(finalStream);
}

// node_modules/@langchain/core/dist/runnables/iter.js
function isIterableIterator(thing) {
  return typeof thing === "object" && thing !== null && typeof thing[Symbol.iterator] === "function" && // avoid detecting array/set as iterator
  typeof thing.next === "function";
}
var isIterator = (x) => x != null && typeof x === "object" && "next" in x && typeof x.next === "function";
function isAsyncIterable(thing) {
  return typeof thing === "object" && thing !== null && typeof thing[Symbol.asyncIterator] === "function";
}
function* consumeIteratorInContext(context, iter) {
  const storage = AsyncLocalStorageProviderSingleton2.getInstance();
  while (true) {
    const { value, done } = storage.run(context, iter.next.bind(iter));
    if (done) {
      break;
    } else {
      yield value;
    }
  }
}
async function* consumeAsyncIterableInContext(context, iter) {
  const storage = AsyncLocalStorageProviderSingleton2.getInstance();
  const iterator = iter[Symbol.asyncIterator]();
  while (true) {
    const { value, done } = await storage.run(context, iterator.next.bind(iter));
    if (done) {
      break;
    } else {
      yield value;
    }
  }
}

// node_modules/@langchain/core/dist/runnables/base.js
function _coerceToDict2(value, defaultKey) {
  return value && !Array.isArray(value) && // eslint-disable-next-line no-instanceof/no-instanceof
  !(value instanceof Date) && typeof value === "object" ? value : { [defaultKey]: value };
}
var Runnable = class extends Serializable {
  constructor() {
    super(...arguments);
    Object.defineProperty(this, "lc_runnable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
  }
  getName(suffix) {
    const name = (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.name ?? this.constructor.lc_name() ?? this.constructor.name
    );
    return suffix ? `${name}${suffix}` : name;
  }
  /**
   * Bind arguments to a Runnable, returning a new Runnable.
   * @param kwargs
   * @returns A new RunnableBinding that, when invoked, will apply the bound args.
   */
  bind(kwargs) {
    return new RunnableBinding({ bound: this, kwargs, config: {} });
  }
  /**
   * Return a new Runnable that maps a list of inputs to a list of outputs,
   * by calling invoke() with each input.
   */
  map() {
    return new RunnableEach({ bound: this });
  }
  /**
   * Add retry logic to an existing runnable.
   * @param kwargs
   * @returns A new RunnableRetry that, when invoked, will retry according to the parameters.
   */
  withRetry(fields) {
    return new RunnableRetry({
      bound: this,
      kwargs: {},
      config: {},
      maxAttemptNumber: fields?.stopAfterAttempt,
      ...fields
    });
  }
  /**
   * Bind config to a Runnable, returning a new Runnable.
   * @param config New configuration parameters to attach to the new runnable.
   * @returns A new RunnableBinding with a config matching what's passed.
   */
  withConfig(config) {
    return new RunnableBinding({
      bound: this,
      config,
      kwargs: {}
    });
  }
  /**
   * Create a new runnable from the current one that will try invoking
   * other passed fallback runnables if the initial invocation fails.
   * @param fields.fallbacks Other runnables to call if the runnable errors.
   * @returns A new RunnableWithFallbacks.
   */
  withFallbacks(fields) {
    return new RunnableWithFallbacks({
      runnable: this,
      fallbacks: fields.fallbacks
    });
  }
  _getOptionsList(options, length = 0) {
    if (Array.isArray(options) && options.length !== length) {
      throw new Error(`Passed "options" must be an array with the same length as the inputs, but got ${options.length} options for ${length} inputs`);
    }
    if (Array.isArray(options)) {
      return options.map(ensureConfig);
    }
    if (length > 1 && !Array.isArray(options) && options.runId) {
      console.warn("Provided runId will be used only for the first element of the batch.");
      const subsequent = Object.fromEntries(Object.entries(options).filter(([key]) => key !== "runId"));
      return Array.from({ length }, (_, i) => ensureConfig(i === 0 ? options : subsequent));
    }
    return Array.from({ length }, () => ensureConfig(options));
  }
  async batch(inputs, options, batchOptions) {
    const configList = this._getOptionsList(options ?? {}, inputs.length);
    const maxConcurrency = configList[0]?.maxConcurrency ?? batchOptions?.maxConcurrency;
    const caller2 = new AsyncCaller2({
      maxConcurrency,
      onFailedAttempt: (e) => {
        throw e;
      }
    });
    const batchCalls = inputs.map((input, i) => caller2.call(async () => {
      try {
        const result = await this.invoke(input, configList[i]);
        return result;
      } catch (e) {
        if (batchOptions?.returnExceptions) {
          return e;
        }
        throw e;
      }
    }));
    return Promise.all(batchCalls);
  }
  /**
   * Default streaming implementation.
   * Subclasses should override this method if they support streaming output.
   * @param input
   * @param options
   */
  async *_streamIterator(input, options) {
    yield this.invoke(input, options);
  }
  /**
   * Stream output in chunks.
   * @param input
   * @param options
   * @returns A readable stream that is also an iterable.
   */
  async stream(input, options) {
    const config = ensureConfig(options);
    const wrappedGenerator = new AsyncGeneratorWithSetup({
      generator: this._streamIterator(input, config),
      config
    });
    await wrappedGenerator.setup;
    return IterableReadableStream.fromAsyncGenerator(wrappedGenerator);
  }
  _separateRunnableConfigFromCallOptions(options) {
    let runnableConfig;
    if (options === void 0) {
      runnableConfig = ensureConfig(options);
    } else {
      runnableConfig = ensureConfig({
        callbacks: options.callbacks,
        tags: options.tags,
        metadata: options.metadata,
        runName: options.runName,
        configurable: options.configurable,
        recursionLimit: options.recursionLimit,
        maxConcurrency: options.maxConcurrency,
        runId: options.runId
      });
    }
    const callOptions = { ...options };
    delete callOptions.callbacks;
    delete callOptions.tags;
    delete callOptions.metadata;
    delete callOptions.runName;
    delete callOptions.configurable;
    delete callOptions.recursionLimit;
    delete callOptions.maxConcurrency;
    delete callOptions.runId;
    return [runnableConfig, callOptions];
  }
  async _callWithConfig(func, input, options) {
    const config = ensureConfig(options);
    const callbackManager_ = await getCallbackManagerForConfig(config);
    const runManager = await callbackManager_?.handleChainStart(this.toJSON(), _coerceToDict2(input, "input"), config.runId, config?.runType, void 0, void 0, config?.runName ?? this.getName());
    delete config.runId;
    let output;
    try {
      output = await func.call(this, input, config, runManager);
    } catch (e) {
      await runManager?.handleChainError(e);
      throw e;
    }
    await runManager?.handleChainEnd(_coerceToDict2(output, "output"));
    return output;
  }
  /**
   * Internal method that handles batching and configuration for a runnable
   * It takes a function, input values, and optional configuration, and
   * returns a promise that resolves to the output values.
   * @param func The function to be executed for each input value.
   * @param input The input values to be processed.
   * @param config Optional configuration for the function execution.
   * @returns A promise that resolves to the output values.
   */
  async _batchWithConfig(func, inputs, options, batchOptions) {
    const optionsList = this._getOptionsList(options ?? {}, inputs.length);
    const callbackManagers = await Promise.all(optionsList.map(getCallbackManagerForConfig));
    const runManagers = await Promise.all(callbackManagers.map(async (callbackManager, i) => {
      const handleStartRes = await callbackManager?.handleChainStart(this.toJSON(), _coerceToDict2(inputs[i], "input"), optionsList[i].runId, optionsList[i].runType, void 0, void 0, optionsList[i].runName ?? this.getName());
      delete optionsList[i].runId;
      return handleStartRes;
    }));
    let outputs;
    try {
      outputs = await func.call(this, inputs, optionsList, runManagers, batchOptions);
    } catch (e) {
      await Promise.all(runManagers.map((runManager) => runManager?.handleChainError(e)));
      throw e;
    }
    await Promise.all(runManagers.map((runManager) => runManager?.handleChainEnd(_coerceToDict2(outputs, "output"))));
    return outputs;
  }
  /**
   * Helper method to transform an Iterator of Input values into an Iterator of
   * Output values, with callbacks.
   * Use this to implement `stream()` or `transform()` in Runnable subclasses.
   */
  async *_transformStreamWithConfig(inputGenerator, transformer, options) {
    let finalInput;
    let finalInputSupported = true;
    let finalOutput;
    let finalOutputSupported = true;
    const config = ensureConfig(options);
    const callbackManager_ = await getCallbackManagerForConfig(config);
    async function* wrapInputForTracing() {
      for await (const chunk of inputGenerator) {
        if (finalInputSupported) {
          if (finalInput === void 0) {
            finalInput = chunk;
          } else {
            try {
              finalInput = concat(finalInput, chunk);
            } catch {
              finalInput = void 0;
              finalInputSupported = false;
            }
          }
        }
        yield chunk;
      }
    }
    let runManager;
    try {
      const pipe = await pipeGeneratorWithSetup(transformer.bind(this), wrapInputForTracing(), async () => callbackManager_?.handleChainStart(this.toJSON(), { input: "" }, config.runId, config.runType, void 0, void 0, config.runName ?? this.getName()), config);
      delete config.runId;
      runManager = pipe.setup;
      const streamEventsHandler = runManager?.handlers.find(isStreamEventsHandler);
      let iterator = pipe.output;
      if (streamEventsHandler !== void 0 && runManager !== void 0) {
        iterator = streamEventsHandler.tapOutputIterable(runManager.runId, iterator);
      }
      const streamLogHandler = runManager?.handlers.find(isLogStreamHandler);
      if (streamLogHandler !== void 0 && runManager !== void 0) {
        iterator = streamLogHandler.tapOutputIterable(runManager.runId, iterator);
      }
      for await (const chunk of iterator) {
        yield chunk;
        if (finalOutputSupported) {
          if (finalOutput === void 0) {
            finalOutput = chunk;
          } else {
            try {
              finalOutput = concat(finalOutput, chunk);
            } catch {
              finalOutput = void 0;
              finalOutputSupported = false;
            }
          }
        }
      }
    } catch (e) {
      await runManager?.handleChainError(e, void 0, void 0, void 0, {
        inputs: _coerceToDict2(finalInput, "input")
      });
      throw e;
    }
    await runManager?.handleChainEnd(finalOutput ?? {}, void 0, void 0, void 0, { inputs: _coerceToDict2(finalInput, "input") });
  }
  getGraph(_) {
    const graph = new Graph();
    const inputNode = graph.addNode({
      name: `${this.getName()}Input`,
      schema: z.any()
    });
    const runnableNode = graph.addNode(this);
    const outputNode = graph.addNode({
      name: `${this.getName()}Output`,
      schema: z.any()
    });
    graph.addEdge(inputNode, runnableNode);
    graph.addEdge(runnableNode, outputNode);
    return graph;
  }
  /**
   * Create a new runnable sequence that runs each individual runnable in series,
   * piping the output of one runnable into another runnable or runnable-like.
   * @param coerceable A runnable, function, or object whose values are functions or runnables.
   * @returns A new runnable sequence.
   */
  pipe(coerceable) {
    return new RunnableSequence({
      first: this,
      last: _coerceToRunnable(coerceable)
    });
  }
  /**
   * Pick keys from the dict output of this runnable. Returns a new runnable.
   */
  pick(keys) {
    return this.pipe(new RunnablePick(keys));
  }
  /**
   * Assigns new fields to the dict output of this runnable. Returns a new runnable.
   */
  assign(mapping) {
    return this.pipe(
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      new RunnableAssign(
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        new RunnableMap({ steps: mapping })
      )
    );
  }
  /**
   * Default implementation of transform, which buffers input and then calls stream.
   * Subclasses should override this method if they can start producing output while
   * input is still being generated.
   * @param generator
   * @param options
   */
  async *transform(generator, options) {
    let finalChunk;
    for await (const chunk of generator) {
      if (finalChunk === void 0) {
        finalChunk = chunk;
      } else {
        finalChunk = concat(finalChunk, chunk);
      }
    }
    yield* this._streamIterator(finalChunk, ensureConfig(options));
  }
  /**
   * Stream all output from a runnable, as reported to the callback system.
   * This includes all inner runs of LLMs, Retrievers, Tools, etc.
   * Output is streamed as Log objects, which include a list of
   * jsonpatch ops that describe how the state of the run has changed in each
   * step, and the final state of the run.
   * The jsonpatch ops can be applied in order to construct state.
   * @param input
   * @param options
   * @param streamOptions
   */
  async *streamLog(input, options, streamOptions) {
    const logStreamCallbackHandler = new LogStreamCallbackHandler({
      ...streamOptions,
      autoClose: false,
      _schemaFormat: "original"
    });
    const config = ensureConfig(options);
    yield* this._streamLog(input, logStreamCallbackHandler, config);
  }
  async *_streamLog(input, logStreamCallbackHandler, config) {
    const { callbacks } = config;
    if (callbacks === void 0) {
      config.callbacks = [logStreamCallbackHandler];
    } else if (Array.isArray(callbacks)) {
      config.callbacks = callbacks.concat([logStreamCallbackHandler]);
    } else {
      const copiedCallbacks = callbacks.copy();
      copiedCallbacks.inheritableHandlers.push(logStreamCallbackHandler);
      config.callbacks = copiedCallbacks;
    }
    const runnableStreamPromise = this.stream(input, config);
    async function consumeRunnableStream() {
      try {
        const runnableStream = await runnableStreamPromise;
        for await (const chunk of runnableStream) {
          const patch = new RunLogPatch({
            ops: [
              {
                op: "add",
                path: "/streamed_output/-",
                value: chunk
              }
            ]
          });
          await logStreamCallbackHandler.writer.write(patch);
        }
      } finally {
        await logStreamCallbackHandler.writer.close();
      }
    }
    const runnableStreamConsumePromise = consumeRunnableStream();
    try {
      for await (const log of logStreamCallbackHandler) {
        yield log;
      }
    } finally {
      await runnableStreamConsumePromise;
    }
  }
  streamEvents(input, options, streamOptions) {
    let stream;
    if (options.version === "v1") {
      stream = this._streamEventsV1(input, options, streamOptions);
    } else if (options.version === "v2") {
      stream = this._streamEventsV2(input, options, streamOptions);
    } else {
      throw new Error(`Only versions "v1" and "v2" of the schema are currently supported.`);
    }
    if (options.encoding === "text/event-stream") {
      return convertToHttpEventStream(stream);
    } else {
      return IterableReadableStream.fromAsyncGenerator(stream);
    }
  }
  async *_streamEventsV2(input, options, streamOptions) {
    const eventStreamer = new EventStreamCallbackHandler({
      ...streamOptions,
      autoClose: false
    });
    const config = ensureConfig(options);
    const runId = config.runId ?? v4_default();
    config.runId = runId;
    const callbacks = config.callbacks;
    if (callbacks === void 0) {
      config.callbacks = [eventStreamer];
    } else if (Array.isArray(callbacks)) {
      config.callbacks = callbacks.concat(eventStreamer);
    } else {
      const copiedCallbacks = callbacks.copy();
      copiedCallbacks.inheritableHandlers.push(eventStreamer);
      config.callbacks = copiedCallbacks;
    }
    const outerThis = this;
    async function consumeRunnableStream() {
      try {
        const runnableStream = await outerThis.stream(input, config);
        const tappedStream = eventStreamer.tapOutputIterable(runId, runnableStream);
        for await (const _ of tappedStream) {
        }
      } finally {
        await eventStreamer.finish();
      }
    }
    const runnableStreamConsumePromise = consumeRunnableStream();
    let firstEventSent = false;
    let firstEventRunId;
    try {
      for await (const event of eventStreamer) {
        if (!firstEventSent) {
          event.data.input = input;
          firstEventSent = true;
          firstEventRunId = event.run_id;
          yield event;
          continue;
        }
        if (event.run_id === firstEventRunId && event.event.endsWith("_end")) {
          if (event.data?.input) {
            delete event.data.input;
          }
        }
        yield event;
      }
    } finally {
      await runnableStreamConsumePromise;
    }
  }
  async *_streamEventsV1(input, options, streamOptions) {
    let runLog;
    let hasEncounteredStartEvent = false;
    const config = ensureConfig(options);
    const rootTags = config.tags ?? [];
    const rootMetadata = config.metadata ?? {};
    const rootName = config.runName ?? this.getName();
    const logStreamCallbackHandler = new LogStreamCallbackHandler({
      ...streamOptions,
      autoClose: false,
      _schemaFormat: "streaming_events"
    });
    const rootEventFilter = new _RootEventFilter({
      ...streamOptions
    });
    const logStream = this._streamLog(input, logStreamCallbackHandler, config);
    for await (const log of logStream) {
      if (!runLog) {
        runLog = RunLog.fromRunLogPatch(log);
      } else {
        runLog = runLog.concat(log);
      }
      if (runLog.state === void 0) {
        throw new Error(`Internal error: "streamEvents" state is missing. Please open a bug report.`);
      }
      if (!hasEncounteredStartEvent) {
        hasEncounteredStartEvent = true;
        const state3 = { ...runLog.state };
        const event = {
          run_id: state3.id,
          event: `on_${state3.type}_start`,
          name: rootName,
          tags: rootTags,
          metadata: rootMetadata,
          data: {
            input
          }
        };
        if (rootEventFilter.includeEvent(event, state3.type)) {
          yield event;
        }
      }
      const paths = log.ops.filter((op) => op.path.startsWith("/logs/")).map((op) => op.path.split("/")[2]);
      const dedupedPaths = [...new Set(paths)];
      for (const path of dedupedPaths) {
        let eventType;
        let data = {};
        const logEntry = runLog.state.logs[path];
        if (logEntry.end_time === void 0) {
          if (logEntry.streamed_output.length > 0) {
            eventType = "stream";
          } else {
            eventType = "start";
          }
        } else {
          eventType = "end";
        }
        if (eventType === "start") {
          if (logEntry.inputs !== void 0) {
            data.input = logEntry.inputs;
          }
        } else if (eventType === "end") {
          if (logEntry.inputs !== void 0) {
            data.input = logEntry.inputs;
          }
          data.output = logEntry.final_output;
        } else if (eventType === "stream") {
          const chunkCount = logEntry.streamed_output.length;
          if (chunkCount !== 1) {
            throw new Error(`Expected exactly one chunk of streamed output, got ${chunkCount} instead. Encountered in: "${logEntry.name}"`);
          }
          data = { chunk: logEntry.streamed_output[0] };
          logEntry.streamed_output = [];
        }
        yield {
          event: `on_${logEntry.type}_${eventType}`,
          name: logEntry.name,
          run_id: logEntry.id,
          tags: logEntry.tags,
          metadata: logEntry.metadata,
          data
        };
      }
      const { state: state2 } = runLog;
      if (state2.streamed_output.length > 0) {
        const chunkCount = state2.streamed_output.length;
        if (chunkCount !== 1) {
          throw new Error(`Expected exactly one chunk of streamed output, got ${chunkCount} instead. Encountered in: "${state2.name}"`);
        }
        const data = { chunk: state2.streamed_output[0] };
        state2.streamed_output = [];
        const event = {
          event: `on_${state2.type}_stream`,
          run_id: state2.id,
          tags: rootTags,
          metadata: rootMetadata,
          name: rootName,
          data
        };
        if (rootEventFilter.includeEvent(event, state2.type)) {
          yield event;
        }
      }
    }
    const state = runLog?.state;
    if (state !== void 0) {
      const event = {
        event: `on_${state.type}_end`,
        name: rootName,
        run_id: state.id,
        tags: rootTags,
        metadata: rootMetadata,
        data: {
          output: state.final_output
        }
      };
      if (rootEventFilter.includeEvent(event, state.type))
        yield event;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isRunnable(thing) {
    return isRunnableInterface(thing);
  }
  /**
   * Bind lifecycle listeners to a Runnable, returning a new Runnable.
   * The Run object contains information about the run, including its id,
   * type, input, output, error, startTime, endTime, and any tags or metadata
   * added to the run.
   *
   * @param {Object} params - The object containing the callback functions.
   * @param {(run: Run) => void} params.onStart - Called before the runnable starts running, with the Run object.
   * @param {(run: Run) => void} params.onEnd - Called after the runnable finishes running, with the Run object.
   * @param {(run: Run) => void} params.onError - Called if the runnable throws an error, with the Run object.
   */
  withListeners({ onStart, onEnd, onError }) {
    return new RunnableBinding({
      bound: this,
      config: {},
      configFactories: [
        (config) => ({
          callbacks: [
            new RootListenersTracer({
              config,
              onStart,
              onEnd,
              onError
            })
          ]
        })
      ]
    });
  }
};
var RunnableBinding = class _RunnableBinding extends Runnable {
  static lc_name() {
    return "RunnableBinding";
  }
  constructor(fields) {
    super(fields);
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "runnables"]
    });
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "bound", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "config", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "kwargs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "configFactories", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.bound = fields.bound;
    this.kwargs = fields.kwargs;
    this.config = fields.config;
    this.configFactories = fields.configFactories;
  }
  getName(suffix) {
    return this.bound.getName(suffix);
  }
  async _mergeConfig(...options) {
    const config = mergeConfigs(this.config, ...options);
    return mergeConfigs(config, ...this.configFactories ? await Promise.all(this.configFactories.map(async (configFactory) => await configFactory(config))) : []);
  }
  bind(kwargs) {
    return new this.constructor({
      bound: this.bound,
      kwargs: { ...this.kwargs, ...kwargs },
      config: this.config
    });
  }
  withConfig(config) {
    return new this.constructor({
      bound: this.bound,
      kwargs: this.kwargs,
      config: { ...this.config, ...config }
    });
  }
  withRetry(fields) {
    return new this.constructor({
      bound: this.bound.withRetry(fields),
      kwargs: this.kwargs,
      config: this.config
    });
  }
  async invoke(input, options) {
    return this.bound.invoke(input, await this._mergeConfig(ensureConfig(options), this.kwargs));
  }
  async batch(inputs, options, batchOptions) {
    const mergedOptions = Array.isArray(options) ? await Promise.all(options.map(async (individualOption) => this._mergeConfig(ensureConfig(individualOption), this.kwargs))) : await this._mergeConfig(ensureConfig(options), this.kwargs);
    return this.bound.batch(inputs, mergedOptions, batchOptions);
  }
  async *_streamIterator(input, options) {
    yield* this.bound._streamIterator(input, await this._mergeConfig(ensureConfig(options), this.kwargs));
  }
  async stream(input, options) {
    return this.bound.stream(input, await this._mergeConfig(ensureConfig(options), this.kwargs));
  }
  async *transform(generator, options) {
    yield* this.bound.transform(generator, await this._mergeConfig(ensureConfig(options), this.kwargs));
  }
  streamEvents(input, options, streamOptions) {
    const outerThis = this;
    const generator = async function* () {
      yield* outerThis.bound.streamEvents(input, {
        ...await outerThis._mergeConfig(ensureConfig(options), outerThis.kwargs),
        version: options.version
      }, streamOptions);
    };
    return IterableReadableStream.fromAsyncGenerator(generator());
  }
  static isRunnableBinding(thing) {
    return thing.bound && Runnable.isRunnable(thing.bound);
  }
  /**
   * Bind lifecycle listeners to a Runnable, returning a new Runnable.
   * The Run object contains information about the run, including its id,
   * type, input, output, error, startTime, endTime, and any tags or metadata
   * added to the run.
   *
   * @param {Object} params - The object containing the callback functions.
   * @param {(run: Run) => void} params.onStart - Called before the runnable starts running, with the Run object.
   * @param {(run: Run) => void} params.onEnd - Called after the runnable finishes running, with the Run object.
   * @param {(run: Run) => void} params.onError - Called if the runnable throws an error, with the Run object.
   */
  withListeners({ onStart, onEnd, onError }) {
    return new _RunnableBinding({
      bound: this.bound,
      kwargs: this.kwargs,
      config: this.config,
      configFactories: [
        (config) => ({
          callbacks: [
            new RootListenersTracer({
              config,
              onStart,
              onEnd,
              onError
            })
          ]
        })
      ]
    });
  }
};
var RunnableEach = class _RunnableEach extends Runnable {
  static lc_name() {
    return "RunnableEach";
  }
  constructor(fields) {
    super(fields);
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "runnables"]
    });
    Object.defineProperty(this, "bound", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.bound = fields.bound;
  }
  /**
   * Binds the runnable with the specified arguments.
   * @param kwargs The arguments to bind the runnable with.
   * @returns A new instance of the `RunnableEach` class that is bound with the specified arguments.
   */
  bind(kwargs) {
    return new _RunnableEach({
      bound: this.bound.bind(kwargs)
    });
  }
  /**
   * Invokes the runnable with the specified input and configuration.
   * @param input The input to invoke the runnable with.
   * @param config The configuration to invoke the runnable with.
   * @returns A promise that resolves to the output of the runnable.
   */
  async invoke(inputs, config) {
    return this._callWithConfig(this._invoke, inputs, config);
  }
  /**
   * A helper method that is used to invoke the runnable with the specified input and configuration.
   * @param input The input to invoke the runnable with.
   * @param config The configuration to invoke the runnable with.
   * @returns A promise that resolves to the output of the runnable.
   */
  async _invoke(inputs, config, runManager) {
    return this.bound.batch(inputs, patchConfig(config, { callbacks: runManager?.getChild() }));
  }
  /**
   * Bind lifecycle listeners to a Runnable, returning a new Runnable.
   * The Run object contains information about the run, including its id,
   * type, input, output, error, startTime, endTime, and any tags or metadata
   * added to the run.
   *
   * @param {Object} params - The object containing the callback functions.
   * @param {(run: Run) => void} params.onStart - Called before the runnable starts running, with the Run object.
   * @param {(run: Run) => void} params.onEnd - Called after the runnable finishes running, with the Run object.
   * @param {(run: Run) => void} params.onError - Called if the runnable throws an error, with the Run object.
   */
  withListeners({ onStart, onEnd, onError }) {
    return new _RunnableEach({
      bound: this.bound.withListeners({ onStart, onEnd, onError })
    });
  }
};
var RunnableRetry = class extends RunnableBinding {
  static lc_name() {
    return "RunnableRetry";
  }
  constructor(fields) {
    super(fields);
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "runnables"]
    });
    Object.defineProperty(this, "maxAttemptNumber", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 3
    });
    Object.defineProperty(this, "onFailedAttempt", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: () => {
      }
    });
    this.maxAttemptNumber = fields.maxAttemptNumber ?? this.maxAttemptNumber;
    this.onFailedAttempt = fields.onFailedAttempt ?? this.onFailedAttempt;
  }
  _patchConfigForRetry(attempt, config, runManager) {
    const tag = attempt > 1 ? `retry:attempt:${attempt}` : void 0;
    return patchConfig(config, { callbacks: runManager?.getChild(tag) });
  }
  async _invoke(input, config, runManager) {
    return (0, import_p_retry3.default)((attemptNumber) => super.invoke(input, this._patchConfigForRetry(attemptNumber, config, runManager)), {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onFailedAttempt: (error) => this.onFailedAttempt(error, input),
      retries: Math.max(this.maxAttemptNumber - 1, 0),
      randomize: true
    });
  }
  /**
   * Method that invokes the runnable with the specified input, run manager,
   * and config. It handles the retry logic by catching any errors and
   * recursively invoking itself with the updated config for the next retry
   * attempt.
   * @param input The input for the runnable.
   * @param runManager The run manager for the runnable.
   * @param config The config for the runnable.
   * @returns A promise that resolves to the output of the runnable.
   */
  async invoke(input, config) {
    return this._callWithConfig(this._invoke, input, config);
  }
  async _batch(inputs, configs, runManagers, batchOptions) {
    const resultsMap = {};
    try {
      await (0, import_p_retry3.default)(async (attemptNumber) => {
        const remainingIndexes = inputs.map((_, i) => i).filter((i) => resultsMap[i.toString()] === void 0 || // eslint-disable-next-line no-instanceof/no-instanceof
        resultsMap[i.toString()] instanceof Error);
        const remainingInputs = remainingIndexes.map((i) => inputs[i]);
        const patchedConfigs = remainingIndexes.map((i) => this._patchConfigForRetry(attemptNumber, configs?.[i], runManagers?.[i]));
        const results = await super.batch(remainingInputs, patchedConfigs, {
          ...batchOptions,
          returnExceptions: true
        });
        let firstException;
        for (let i = 0; i < results.length; i += 1) {
          const result = results[i];
          const resultMapIndex = remainingIndexes[i];
          if (result instanceof Error) {
            if (firstException === void 0) {
              firstException = result;
              firstException.input = remainingInputs[i];
            }
          }
          resultsMap[resultMapIndex.toString()] = result;
        }
        if (firstException) {
          throw firstException;
        }
        return results;
      }, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onFailedAttempt: (error) => this.onFailedAttempt(error, error.input),
        retries: Math.max(this.maxAttemptNumber - 1, 0),
        randomize: true
      });
    } catch (e) {
      if (batchOptions?.returnExceptions !== true) {
        throw e;
      }
    }
    return Object.keys(resultsMap).sort((a, b) => parseInt(a, 10) - parseInt(b, 10)).map((key) => resultsMap[parseInt(key, 10)]);
  }
  async batch(inputs, options, batchOptions) {
    return this._batchWithConfig(this._batch.bind(this), inputs, options, batchOptions);
  }
};
var RunnableSequence = class _RunnableSequence extends Runnable {
  static lc_name() {
    return "RunnableSequence";
  }
  constructor(fields) {
    super(fields);
    Object.defineProperty(this, "first", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "middle", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "last", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "runnables"]
    });
    this.first = fields.first;
    this.middle = fields.middle ?? this.middle;
    this.last = fields.last;
    this.name = fields.name;
  }
  get steps() {
    return [this.first, ...this.middle, this.last];
  }
  async invoke(input, options) {
    const config = ensureConfig(options);
    const callbackManager_ = await getCallbackManagerForConfig(config);
    const runManager = await callbackManager_?.handleChainStart(this.toJSON(), _coerceToDict2(input, "input"), config.runId, void 0, void 0, void 0, config?.runName);
    delete config.runId;
    let nextStepInput = input;
    let finalOutput;
    try {
      const initialSteps = [this.first, ...this.middle];
      for (let i = 0; i < initialSteps.length; i += 1) {
        const step = initialSteps[i];
        nextStepInput = await step.invoke(nextStepInput, patchConfig(config, {
          callbacks: runManager?.getChild(`seq:step:${i + 1}`)
        }));
      }
      finalOutput = await this.last.invoke(nextStepInput, patchConfig(config, {
        callbacks: runManager?.getChild(`seq:step:${this.steps.length}`)
      }));
    } catch (e) {
      await runManager?.handleChainError(e);
      throw e;
    }
    await runManager?.handleChainEnd(_coerceToDict2(finalOutput, "output"));
    return finalOutput;
  }
  async batch(inputs, options, batchOptions) {
    const configList = this._getOptionsList(options ?? {}, inputs.length);
    const callbackManagers = await Promise.all(configList.map(getCallbackManagerForConfig));
    const runManagers = await Promise.all(callbackManagers.map(async (callbackManager, i) => {
      const handleStartRes = await callbackManager?.handleChainStart(this.toJSON(), _coerceToDict2(inputs[i], "input"), configList[i].runId, void 0, void 0, void 0, configList[i].runName);
      delete configList[i].runId;
      return handleStartRes;
    }));
    let nextStepInputs = inputs;
    try {
      for (let i = 0; i < this.steps.length; i += 1) {
        const step = this.steps[i];
        nextStepInputs = await step.batch(nextStepInputs, runManagers.map((runManager, j) => {
          const childRunManager = runManager?.getChild(`seq:step:${i + 1}`);
          return patchConfig(configList[j], { callbacks: childRunManager });
        }), batchOptions);
      }
    } catch (e) {
      await Promise.all(runManagers.map((runManager) => runManager?.handleChainError(e)));
      throw e;
    }
    await Promise.all(runManagers.map((runManager) => runManager?.handleChainEnd(_coerceToDict2(nextStepInputs, "output"))));
    return nextStepInputs;
  }
  async *_streamIterator(input, options) {
    const callbackManager_ = await getCallbackManagerForConfig(options);
    const { runId, ...otherOptions } = options ?? {};
    const runManager = await callbackManager_?.handleChainStart(this.toJSON(), _coerceToDict2(input, "input"), runId, void 0, void 0, void 0, otherOptions?.runName);
    const steps = [this.first, ...this.middle, this.last];
    let concatSupported = true;
    let finalOutput;
    async function* inputGenerator() {
      yield input;
    }
    try {
      let finalGenerator = steps[0].transform(inputGenerator(), patchConfig(otherOptions, {
        callbacks: runManager?.getChild(`seq:step:1`)
      }));
      for (let i = 1; i < steps.length; i += 1) {
        const step = steps[i];
        finalGenerator = await step.transform(finalGenerator, patchConfig(otherOptions, {
          callbacks: runManager?.getChild(`seq:step:${i + 1}`)
        }));
      }
      for await (const chunk of finalGenerator) {
        yield chunk;
        if (concatSupported) {
          if (finalOutput === void 0) {
            finalOutput = chunk;
          } else {
            try {
              finalOutput = concat(finalOutput, chunk);
            } catch (e) {
              finalOutput = void 0;
              concatSupported = false;
            }
          }
        }
      }
    } catch (e) {
      await runManager?.handleChainError(e);
      throw e;
    }
    await runManager?.handleChainEnd(_coerceToDict2(finalOutput, "output"));
  }
  getGraph(config) {
    const graph = new Graph();
    let currentLastNode = null;
    this.steps.forEach((step, index) => {
      const stepGraph = step.getGraph(config);
      if (index !== 0) {
        stepGraph.trimFirstNode();
      }
      if (index !== this.steps.length - 1) {
        stepGraph.trimLastNode();
      }
      graph.extend(stepGraph);
      const stepFirstNode = stepGraph.firstNode();
      if (!stepFirstNode) {
        throw new Error(`Runnable ${step} has no first node`);
      }
      if (currentLastNode) {
        graph.addEdge(currentLastNode, stepFirstNode);
      }
      currentLastNode = stepGraph.lastNode();
    });
    return graph;
  }
  pipe(coerceable) {
    if (_RunnableSequence.isRunnableSequence(coerceable)) {
      return new _RunnableSequence({
        first: this.first,
        middle: this.middle.concat([
          this.last,
          coerceable.first,
          ...coerceable.middle
        ]),
        last: coerceable.last,
        name: this.name ?? coerceable.name
      });
    } else {
      return new _RunnableSequence({
        first: this.first,
        middle: [...this.middle, this.last],
        last: _coerceToRunnable(coerceable),
        name: this.name
      });
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isRunnableSequence(thing) {
    return Array.isArray(thing.middle) && Runnable.isRunnable(thing);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static from([first, ...runnables], name) {
    return new _RunnableSequence({
      first: _coerceToRunnable(first),
      middle: runnables.slice(0, -1).map(_coerceToRunnable),
      last: _coerceToRunnable(runnables[runnables.length - 1]),
      name
    });
  }
};
var RunnableMap = class _RunnableMap extends Runnable {
  static lc_name() {
    return "RunnableMap";
  }
  getStepsKeys() {
    return Object.keys(this.steps);
  }
  constructor(fields) {
    super(fields);
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "runnables"]
    });
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "steps", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.steps = {};
    for (const [key, value] of Object.entries(fields.steps)) {
      this.steps[key] = _coerceToRunnable(value);
    }
  }
  static from(steps) {
    return new _RunnableMap({ steps });
  }
  async invoke(input, options) {
    const config = ensureConfig(options);
    const callbackManager_ = await getCallbackManagerForConfig(config);
    const runManager = await callbackManager_?.handleChainStart(this.toJSON(), {
      input
    }, config.runId, void 0, void 0, void 0, config?.runName);
    delete config.runId;
    const output = {};
    try {
      await Promise.all(Object.entries(this.steps).map(async ([key, runnable]) => {
        output[key] = await runnable.invoke(input, patchConfig(config, {
          callbacks: runManager?.getChild(`map:key:${key}`)
        }));
      }));
    } catch (e) {
      await runManager?.handleChainError(e);
      throw e;
    }
    await runManager?.handleChainEnd(output);
    return output;
  }
  async *_transform(generator, runManager, options) {
    const steps = { ...this.steps };
    const inputCopies = atee(generator, Object.keys(steps).length);
    const tasks = new Map(Object.entries(steps).map(([key, runnable], i) => {
      const gen = runnable.transform(inputCopies[i], patchConfig(options, {
        callbacks: runManager?.getChild(`map:key:${key}`)
      }));
      return [key, gen.next().then((result) => ({ key, gen, result }))];
    }));
    while (tasks.size) {
      const { key, result, gen } = await Promise.race(tasks.values());
      tasks.delete(key);
      if (!result.done) {
        yield { [key]: result.value };
        tasks.set(key, gen.next().then((result2) => ({ key, gen, result: result2 })));
      }
    }
  }
  transform(generator, options) {
    return this._transformStreamWithConfig(generator, this._transform.bind(this), options);
  }
  async stream(input, options) {
    async function* generator() {
      yield input;
    }
    const config = ensureConfig(options);
    const wrappedGenerator = new AsyncGeneratorWithSetup({
      generator: this.transform(generator(), config),
      config
    });
    await wrappedGenerator.setup;
    return IterableReadableStream.fromAsyncGenerator(wrappedGenerator);
  }
};
var RunnableTraceable = class _RunnableTraceable extends Runnable {
  constructor(fields) {
    super(fields);
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "runnables"]
    });
    Object.defineProperty(this, "func", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    if (!isTraceableFunction(fields.func)) {
      throw new Error("RunnableTraceable requires a function that is wrapped in traceable higher-order function");
    }
    this.func = fields.func;
  }
  async invoke(input, options) {
    const [config] = this._getOptionsList(options ?? {}, 1);
    const callbacks = await getCallbackManagerForConfig(config);
    return await this.func(patchConfig(config, { callbacks }), input);
  }
  async *_streamIterator(input, options) {
    const result = await this.invoke(input, options);
    if (isAsyncIterable(result)) {
      for await (const item of result) {
        yield item;
      }
      return;
    }
    if (isIterator(result)) {
      while (true) {
        const state = result.next();
        if (state.done)
          break;
        yield state.value;
      }
      return;
    }
    yield result;
  }
  static from(func) {
    return new _RunnableTraceable({ func });
  }
};
function assertNonTraceableFunction(func) {
  if (isTraceableFunction(func)) {
    throw new Error("RunnableLambda requires a function that is not wrapped in traceable higher-order function. This shouldn't happen.");
  }
}
var RunnableLambda = class _RunnableLambda extends Runnable {
  static lc_name() {
    return "RunnableLambda";
  }
  constructor(fields) {
    if (isTraceableFunction(fields.func)) {
      return RunnableTraceable.from(fields.func);
    }
    super(fields);
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "runnables"]
    });
    Object.defineProperty(this, "func", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    assertNonTraceableFunction(fields.func);
    this.func = fields.func;
  }
  static from(func) {
    return new _RunnableLambda({
      func
    });
  }
  async _invoke(input, config, runManager) {
    return new Promise((resolve, reject) => {
      const childConfig = patchConfig(config, {
        callbacks: runManager?.getChild(),
        recursionLimit: (config?.recursionLimit ?? DEFAULT_RECURSION_LIMIT) - 1
      });
      void AsyncLocalStorageProviderSingleton2.getInstance().run(childConfig, async () => {
        try {
          let output = await this.func(input, {
            ...childConfig,
            config: childConfig
          });
          if (output && Runnable.isRunnable(output)) {
            if (config?.recursionLimit === 0) {
              throw new Error("Recursion limit reached.");
            }
            output = await output.invoke(input, {
              ...childConfig,
              recursionLimit: (childConfig.recursionLimit ?? DEFAULT_RECURSION_LIMIT) - 1
            });
          } else if (isAsyncIterable(output)) {
            let finalOutput;
            for await (const chunk of consumeAsyncIterableInContext(childConfig, output)) {
              if (finalOutput === void 0) {
                finalOutput = chunk;
              } else {
                try {
                  finalOutput = concat(finalOutput, chunk);
                } catch (e) {
                  finalOutput = chunk;
                }
              }
            }
            output = finalOutput;
          } else if (isIterableIterator(output)) {
            let finalOutput;
            for (const chunk of consumeIteratorInContext(childConfig, output)) {
              if (finalOutput === void 0) {
                finalOutput = chunk;
              } else {
                try {
                  finalOutput = concat(finalOutput, chunk);
                } catch (e) {
                  finalOutput = chunk;
                }
              }
            }
            output = finalOutput;
          }
          resolve(output);
        } catch (e) {
          reject(e);
        }
      });
    });
  }
  async invoke(input, options) {
    return this._callWithConfig(this._invoke, input, options);
  }
  async *_transform(generator, runManager, config) {
    let finalChunk;
    for await (const chunk of generator) {
      if (finalChunk === void 0) {
        finalChunk = chunk;
      } else {
        try {
          finalChunk = concat(finalChunk, chunk);
        } catch (e) {
          finalChunk = chunk;
        }
      }
    }
    const output = await new Promise((resolve, reject) => {
      void AsyncLocalStorageProviderSingleton2.getInstance().run(config, async () => {
        try {
          const res = await this.func(finalChunk, {
            ...config,
            config
          });
          resolve(res);
        } catch (e) {
          reject(e);
        }
      });
    });
    if (output && Runnable.isRunnable(output)) {
      if (config?.recursionLimit === 0) {
        throw new Error("Recursion limit reached.");
      }
      const stream = await output.stream(finalChunk, patchConfig(config, {
        callbacks: runManager?.getChild(),
        recursionLimit: (config?.recursionLimit ?? DEFAULT_RECURSION_LIMIT) - 1
      }));
      for await (const chunk of stream) {
        yield chunk;
      }
    } else if (isAsyncIterable(output)) {
      for await (const chunk of consumeAsyncIterableInContext(config, output)) {
        yield chunk;
      }
    } else if (isIterableIterator(output)) {
      for (const chunk of consumeIteratorInContext(config, output)) {
        yield chunk;
      }
    } else {
      yield output;
    }
  }
  transform(generator, options) {
    return this._transformStreamWithConfig(generator, this._transform.bind(this), options);
  }
  async stream(input, options) {
    async function* generator() {
      yield input;
    }
    const config = ensureConfig(options);
    const wrappedGenerator = new AsyncGeneratorWithSetup({
      generator: this.transform(generator(), config),
      config
    });
    await wrappedGenerator.setup;
    return IterableReadableStream.fromAsyncGenerator(wrappedGenerator);
  }
};
var RunnableWithFallbacks = class extends Runnable {
  static lc_name() {
    return "RunnableWithFallbacks";
  }
  constructor(fields) {
    super(fields);
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "runnables"]
    });
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "runnable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "fallbacks", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.runnable = fields.runnable;
    this.fallbacks = fields.fallbacks;
  }
  *runnables() {
    yield this.runnable;
    for (const fallback of this.fallbacks) {
      yield fallback;
    }
  }
  async invoke(input, options) {
    const callbackManager_ = await CallbackManager.configure(options?.callbacks, void 0, options?.tags, void 0, options?.metadata);
    const { runId, ...otherOptions } = options ?? {};
    const runManager = await callbackManager_?.handleChainStart(this.toJSON(), _coerceToDict2(input, "input"), runId, void 0, void 0, void 0, otherOptions?.runName);
    let firstError;
    for (const runnable of this.runnables()) {
      try {
        const output = await runnable.invoke(input, patchConfig(otherOptions, { callbacks: runManager?.getChild() }));
        await runManager?.handleChainEnd(_coerceToDict2(output, "output"));
        return output;
      } catch (e) {
        if (firstError === void 0) {
          firstError = e;
        }
      }
    }
    if (firstError === void 0) {
      throw new Error("No error stored at end of fallback.");
    }
    await runManager?.handleChainError(firstError);
    throw firstError;
  }
  async batch(inputs, options, batchOptions) {
    if (batchOptions?.returnExceptions) {
      throw new Error("Not implemented.");
    }
    const configList = this._getOptionsList(options ?? {}, inputs.length);
    const callbackManagers = await Promise.all(configList.map((config) => CallbackManager.configure(config?.callbacks, void 0, config?.tags, void 0, config?.metadata)));
    const runManagers = await Promise.all(callbackManagers.map(async (callbackManager, i) => {
      const handleStartRes = await callbackManager?.handleChainStart(this.toJSON(), _coerceToDict2(inputs[i], "input"), configList[i].runId, void 0, void 0, void 0, configList[i].runName);
      delete configList[i].runId;
      return handleStartRes;
    }));
    let firstError;
    for (const runnable of this.runnables()) {
      try {
        const outputs = await runnable.batch(inputs, runManagers.map((runManager, j) => patchConfig(configList[j], {
          callbacks: runManager?.getChild()
        })), batchOptions);
        await Promise.all(runManagers.map((runManager, i) => runManager?.handleChainEnd(_coerceToDict2(outputs[i], "output"))));
        return outputs;
      } catch (e) {
        if (firstError === void 0) {
          firstError = e;
        }
      }
    }
    if (!firstError) {
      throw new Error("No error stored at end of fallbacks.");
    }
    await Promise.all(runManagers.map((runManager) => runManager?.handleChainError(firstError)));
    throw firstError;
  }
};
function _coerceToRunnable(coerceable) {
  if (typeof coerceable === "function") {
    return new RunnableLambda({ func: coerceable });
  } else if (Runnable.isRunnable(coerceable)) {
    return coerceable;
  } else if (!Array.isArray(coerceable) && typeof coerceable === "object") {
    const runnables = {};
    for (const [key, value] of Object.entries(coerceable)) {
      runnables[key] = _coerceToRunnable(value);
    }
    return new RunnableMap({
      steps: runnables
    });
  } else {
    throw new Error(`Expected a Runnable, function or object.
Instead got an unsupported type.`);
  }
}
var RunnableAssign = class extends Runnable {
  static lc_name() {
    return "RunnableAssign";
  }
  constructor(fields) {
    if (fields instanceof RunnableMap) {
      fields = { mapper: fields };
    }
    super(fields);
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "runnables"]
    });
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "mapper", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.mapper = fields.mapper;
  }
  async invoke(input, options) {
    const mapperResult = await this.mapper.invoke(input, options);
    return {
      ...input,
      ...mapperResult
    };
  }
  async *_transform(generator, runManager, options) {
    const mapperKeys = this.mapper.getStepsKeys();
    const [forPassthrough, forMapper] = atee(generator);
    const mapperOutput = this.mapper.transform(forMapper, patchConfig(options, { callbacks: runManager?.getChild() }));
    const firstMapperChunkPromise = mapperOutput.next();
    for await (const chunk of forPassthrough) {
      if (typeof chunk !== "object" || Array.isArray(chunk)) {
        throw new Error(`RunnableAssign can only be used with objects as input, got ${typeof chunk}`);
      }
      const filtered = Object.fromEntries(Object.entries(chunk).filter(([key]) => !mapperKeys.includes(key)));
      if (Object.keys(filtered).length > 0) {
        yield filtered;
      }
    }
    yield (await firstMapperChunkPromise).value;
    for await (const chunk of mapperOutput) {
      yield chunk;
    }
  }
  transform(generator, options) {
    return this._transformStreamWithConfig(generator, this._transform.bind(this), options);
  }
  async stream(input, options) {
    async function* generator() {
      yield input;
    }
    const config = ensureConfig(options);
    const wrappedGenerator = new AsyncGeneratorWithSetup({
      generator: this.transform(generator(), config),
      config
    });
    await wrappedGenerator.setup;
    return IterableReadableStream.fromAsyncGenerator(wrappedGenerator);
  }
};
var RunnablePick = class extends Runnable {
  static lc_name() {
    return "RunnablePick";
  }
  constructor(fields) {
    if (typeof fields === "string" || Array.isArray(fields)) {
      fields = { keys: fields };
    }
    super(fields);
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "runnables"]
    });
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "keys", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.keys = fields.keys;
  }
  async _pick(input) {
    if (typeof this.keys === "string") {
      return input[this.keys];
    } else {
      const picked = this.keys.map((key) => [key, input[key]]).filter((v) => v[1] !== void 0);
      return picked.length === 0 ? void 0 : Object.fromEntries(picked);
    }
  }
  async invoke(input, options) {
    return this._callWithConfig(this._pick.bind(this), input, options);
  }
  async *_transform(generator) {
    for await (const chunk of generator) {
      const picked = await this._pick(chunk);
      if (picked !== void 0) {
        yield picked;
      }
    }
  }
  transform(generator, options) {
    return this._transformStreamWithConfig(generator, this._transform.bind(this), options);
  }
  async stream(input, options) {
    async function* generator() {
      yield input;
    }
    const config = ensureConfig(options);
    const wrappedGenerator = new AsyncGeneratorWithSetup({
      generator: this.transform(generator(), config),
      config
    });
    await wrappedGenerator.setup;
    return IterableReadableStream.fromAsyncGenerator(wrappedGenerator);
  }
};

// node_modules/@langchain/core/dist/utils/js-sha1/hash.js
var root = typeof window === "object" ? window : {};
var HEX_CHARS = "0123456789abcdef".split("");
var EXTRA = [-2147483648, 8388608, 32768, 128];
var SHIFT = [24, 16, 8, 0];
var blocks = [];
function Sha1(sharedMemory) {
  if (sharedMemory) {
    blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
    this.blocks = blocks;
  } else {
    this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }
  this.h0 = 1732584193;
  this.h1 = 4023233417;
  this.h2 = 2562383102;
  this.h3 = 271733878;
  this.h4 = 3285377520;
  this.block = this.start = this.bytes = this.hBytes = 0;
  this.finalized = this.hashed = false;
  this.first = true;
}
Sha1.prototype.update = function(message) {
  if (this.finalized) {
    return;
  }
  var notString = typeof message !== "string";
  if (notString && message.constructor === root.ArrayBuffer) {
    message = new Uint8Array(message);
  }
  var code, index = 0, i, length = message.length || 0, blocks2 = this.blocks;
  while (index < length) {
    if (this.hashed) {
      this.hashed = false;
      blocks2[0] = this.block;
      blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
    }
    if (notString) {
      for (i = this.start; index < length && i < 64; ++index) {
        blocks2[i >> 2] |= message[index] << SHIFT[i++ & 3];
      }
    } else {
      for (i = this.start; index < length && i < 64; ++index) {
        code = message.charCodeAt(index);
        if (code < 128) {
          blocks2[i >> 2] |= code << SHIFT[i++ & 3];
        } else if (code < 2048) {
          blocks2[i >> 2] |= (192 | code >> 6) << SHIFT[i++ & 3];
          blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
        } else if (code < 55296 || code >= 57344) {
          blocks2[i >> 2] |= (224 | code >> 12) << SHIFT[i++ & 3];
          blocks2[i >> 2] |= (128 | code >> 6 & 63) << SHIFT[i++ & 3];
          blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
        } else {
          code = 65536 + ((code & 1023) << 10 | message.charCodeAt(++index) & 1023);
          blocks2[i >> 2] |= (240 | code >> 18) << SHIFT[i++ & 3];
          blocks2[i >> 2] |= (128 | code >> 12 & 63) << SHIFT[i++ & 3];
          blocks2[i >> 2] |= (128 | code >> 6 & 63) << SHIFT[i++ & 3];
          blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
        }
      }
    }
    this.lastByteIndex = i;
    this.bytes += i - this.start;
    if (i >= 64) {
      this.block = blocks2[16];
      this.start = i - 64;
      this.hash();
      this.hashed = true;
    } else {
      this.start = i;
    }
  }
  if (this.bytes > 4294967295) {
    this.hBytes += this.bytes / 4294967296 << 0;
    this.bytes = this.bytes % 4294967296;
  }
  return this;
};
Sha1.prototype.finalize = function() {
  if (this.finalized) {
    return;
  }
  this.finalized = true;
  var blocks2 = this.blocks, i = this.lastByteIndex;
  blocks2[16] = this.block;
  blocks2[i >> 2] |= EXTRA[i & 3];
  this.block = blocks2[16];
  if (i >= 56) {
    if (!this.hashed) {
      this.hash();
    }
    blocks2[0] = this.block;
    blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
  }
  blocks2[14] = this.hBytes << 3 | this.bytes >>> 29;
  blocks2[15] = this.bytes << 3;
  this.hash();
};
Sha1.prototype.hash = function() {
  var a = this.h0, b = this.h1, c = this.h2, d = this.h3, e = this.h4;
  var f, j, t, blocks2 = this.blocks;
  for (j = 16; j < 80; ++j) {
    t = blocks2[j - 3] ^ blocks2[j - 8] ^ blocks2[j - 14] ^ blocks2[j - 16];
    blocks2[j] = t << 1 | t >>> 31;
  }
  for (j = 0; j < 20; j += 5) {
    f = b & c | ~b & d;
    t = a << 5 | a >>> 27;
    e = t + f + e + 1518500249 + blocks2[j] << 0;
    b = b << 30 | b >>> 2;
    f = a & b | ~a & c;
    t = e << 5 | e >>> 27;
    d = t + f + d + 1518500249 + blocks2[j + 1] << 0;
    a = a << 30 | a >>> 2;
    f = e & a | ~e & b;
    t = d << 5 | d >>> 27;
    c = t + f + c + 1518500249 + blocks2[j + 2] << 0;
    e = e << 30 | e >>> 2;
    f = d & e | ~d & a;
    t = c << 5 | c >>> 27;
    b = t + f + b + 1518500249 + blocks2[j + 3] << 0;
    d = d << 30 | d >>> 2;
    f = c & d | ~c & e;
    t = b << 5 | b >>> 27;
    a = t + f + a + 1518500249 + blocks2[j + 4] << 0;
    c = c << 30 | c >>> 2;
  }
  for (; j < 40; j += 5) {
    f = b ^ c ^ d;
    t = a << 5 | a >>> 27;
    e = t + f + e + 1859775393 + blocks2[j] << 0;
    b = b << 30 | b >>> 2;
    f = a ^ b ^ c;
    t = e << 5 | e >>> 27;
    d = t + f + d + 1859775393 + blocks2[j + 1] << 0;
    a = a << 30 | a >>> 2;
    f = e ^ a ^ b;
    t = d << 5 | d >>> 27;
    c = t + f + c + 1859775393 + blocks2[j + 2] << 0;
    e = e << 30 | e >>> 2;
    f = d ^ e ^ a;
    t = c << 5 | c >>> 27;
    b = t + f + b + 1859775393 + blocks2[j + 3] << 0;
    d = d << 30 | d >>> 2;
    f = c ^ d ^ e;
    t = b << 5 | b >>> 27;
    a = t + f + a + 1859775393 + blocks2[j + 4] << 0;
    c = c << 30 | c >>> 2;
  }
  for (; j < 60; j += 5) {
    f = b & c | b & d | c & d;
    t = a << 5 | a >>> 27;
    e = t + f + e - 1894007588 + blocks2[j] << 0;
    b = b << 30 | b >>> 2;
    f = a & b | a & c | b & c;
    t = e << 5 | e >>> 27;
    d = t + f + d - 1894007588 + blocks2[j + 1] << 0;
    a = a << 30 | a >>> 2;
    f = e & a | e & b | a & b;
    t = d << 5 | d >>> 27;
    c = t + f + c - 1894007588 + blocks2[j + 2] << 0;
    e = e << 30 | e >>> 2;
    f = d & e | d & a | e & a;
    t = c << 5 | c >>> 27;
    b = t + f + b - 1894007588 + blocks2[j + 3] << 0;
    d = d << 30 | d >>> 2;
    f = c & d | c & e | d & e;
    t = b << 5 | b >>> 27;
    a = t + f + a - 1894007588 + blocks2[j + 4] << 0;
    c = c << 30 | c >>> 2;
  }
  for (; j < 80; j += 5) {
    f = b ^ c ^ d;
    t = a << 5 | a >>> 27;
    e = t + f + e - 899497514 + blocks2[j] << 0;
    b = b << 30 | b >>> 2;
    f = a ^ b ^ c;
    t = e << 5 | e >>> 27;
    d = t + f + d - 899497514 + blocks2[j + 1] << 0;
    a = a << 30 | a >>> 2;
    f = e ^ a ^ b;
    t = d << 5 | d >>> 27;
    c = t + f + c - 899497514 + blocks2[j + 2] << 0;
    e = e << 30 | e >>> 2;
    f = d ^ e ^ a;
    t = c << 5 | c >>> 27;
    b = t + f + b - 899497514 + blocks2[j + 3] << 0;
    d = d << 30 | d >>> 2;
    f = c ^ d ^ e;
    t = b << 5 | b >>> 27;
    a = t + f + a - 899497514 + blocks2[j + 4] << 0;
    c = c << 30 | c >>> 2;
  }
  this.h0 = this.h0 + a << 0;
  this.h1 = this.h1 + b << 0;
  this.h2 = this.h2 + c << 0;
  this.h3 = this.h3 + d << 0;
  this.h4 = this.h4 + e << 0;
};
Sha1.prototype.hex = function() {
  this.finalize();
  var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4;
  return HEX_CHARS[h0 >> 28 & 15] + HEX_CHARS[h0 >> 24 & 15] + HEX_CHARS[h0 >> 20 & 15] + HEX_CHARS[h0 >> 16 & 15] + HEX_CHARS[h0 >> 12 & 15] + HEX_CHARS[h0 >> 8 & 15] + HEX_CHARS[h0 >> 4 & 15] + HEX_CHARS[h0 & 15] + HEX_CHARS[h1 >> 28 & 15] + HEX_CHARS[h1 >> 24 & 15] + HEX_CHARS[h1 >> 20 & 15] + HEX_CHARS[h1 >> 16 & 15] + HEX_CHARS[h1 >> 12 & 15] + HEX_CHARS[h1 >> 8 & 15] + HEX_CHARS[h1 >> 4 & 15] + HEX_CHARS[h1 & 15] + HEX_CHARS[h2 >> 28 & 15] + HEX_CHARS[h2 >> 24 & 15] + HEX_CHARS[h2 >> 20 & 15] + HEX_CHARS[h2 >> 16 & 15] + HEX_CHARS[h2 >> 12 & 15] + HEX_CHARS[h2 >> 8 & 15] + HEX_CHARS[h2 >> 4 & 15] + HEX_CHARS[h2 & 15] + HEX_CHARS[h3 >> 28 & 15] + HEX_CHARS[h3 >> 24 & 15] + HEX_CHARS[h3 >> 20 & 15] + HEX_CHARS[h3 >> 16 & 15] + HEX_CHARS[h3 >> 12 & 15] + HEX_CHARS[h3 >> 8 & 15] + HEX_CHARS[h3 >> 4 & 15] + HEX_CHARS[h3 & 15] + HEX_CHARS[h4 >> 28 & 15] + HEX_CHARS[h4 >> 24 & 15] + HEX_CHARS[h4 >> 20 & 15] + HEX_CHARS[h4 >> 16 & 15] + HEX_CHARS[h4 >> 12 & 15] + HEX_CHARS[h4 >> 8 & 15] + HEX_CHARS[h4 >> 4 & 15] + HEX_CHARS[h4 & 15];
};
Sha1.prototype.toString = Sha1.prototype.hex;
Sha1.prototype.digest = function() {
  this.finalize();
  var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4;
  return [
    h0 >> 24 & 255,
    h0 >> 16 & 255,
    h0 >> 8 & 255,
    h0 & 255,
    h1 >> 24 & 255,
    h1 >> 16 & 255,
    h1 >> 8 & 255,
    h1 & 255,
    h2 >> 24 & 255,
    h2 >> 16 & 255,
    h2 >> 8 & 255,
    h2 & 255,
    h3 >> 24 & 255,
    h3 >> 16 & 255,
    h3 >> 8 & 255,
    h3 & 255,
    h4 >> 24 & 255,
    h4 >> 16 & 255,
    h4 >> 8 & 255,
    h4 & 255
  ];
};
Sha1.prototype.array = Sha1.prototype.digest;
Sha1.prototype.arrayBuffer = function() {
  this.finalize();
  var buffer = new ArrayBuffer(20);
  var dataView = new DataView(buffer);
  dataView.setUint32(0, this.h0);
  dataView.setUint32(4, this.h1);
  dataView.setUint32(8, this.h2);
  dataView.setUint32(12, this.h3);
  dataView.setUint32(16, this.h4);
  return buffer;
};
var insecureHash = (message) => {
  return new Sha1(true).update(message)["hex"]();
};

// node_modules/@langchain/core/dist/caches.js
var getCacheKey = (...strings) => insecureHash(strings.join("_"));
var BaseCache = class {
};
var GLOBAL_MAP = /* @__PURE__ */ new Map();
var InMemoryCache = class _InMemoryCache extends BaseCache {
  constructor(map) {
    super();
    Object.defineProperty(this, "cache", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.cache = map ?? /* @__PURE__ */ new Map();
  }
  /**
   * Retrieves data from the cache using a prompt and an LLM key. If the
   * data is not found, it returns null.
   * @param prompt The prompt used to find the data.
   * @param llmKey The LLM key used to find the data.
   * @returns The data corresponding to the prompt and LLM key, or null if not found.
   */
  lookup(prompt, llmKey) {
    return Promise.resolve(this.cache.get(getCacheKey(prompt, llmKey)) ?? null);
  }
  /**
   * Updates the cache with new data using a prompt and an LLM key.
   * @param prompt The prompt used to store the data.
   * @param llmKey The LLM key used to store the data.
   * @param value The data to be stored.
   */
  async update(prompt, llmKey, value) {
    this.cache.set(getCacheKey(prompt, llmKey), value);
  }
  /**
   * Returns a global instance of InMemoryCache using a predefined global
   * map as the initial cache.
   * @returns A global instance of InMemoryCache.
   */
  static global() {
    return new _InMemoryCache(GLOBAL_MAP);
  }
};

// node_modules/@langchain/core/dist/prompt_values.js
var BasePromptValue = class extends Serializable {
};
var StringPromptValue = class extends BasePromptValue {
  static lc_name() {
    return "StringPromptValue";
  }
  constructor(value) {
    super({ value });
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "prompt_values"]
    });
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "value", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.value = value;
  }
  toString() {
    return this.value;
  }
  toChatMessages() {
    return [new HumanMessage(this.value)];
  }
};
var ChatPromptValue = class extends BasePromptValue {
  static lc_name() {
    return "ChatPromptValue";
  }
  constructor(fields) {
    if (Array.isArray(fields)) {
      fields = { messages: fields };
    }
    super(fields);
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "prompt_values"]
    });
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "messages", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.messages = fields.messages;
  }
  toString() {
    return getBufferString(this.messages);
  }
  toChatMessages() {
    return this.messages;
  }
};

// node_modules/js-tiktoken/dist/chunk-PEBACC3C.js
var import_base64_js = __toESM(require_base64_js(), 1);
var __defProp2 = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function bytePairMerge(piece, ranks) {
  let parts = Array.from(
    { length: piece.length },
    (_, i) => ({ start: i, end: i + 1 })
  );
  while (parts.length > 1) {
    let minRank = null;
    for (let i = 0; i < parts.length - 1; i++) {
      const slice = piece.slice(parts[i].start, parts[i + 1].end);
      const rank = ranks.get(slice.join(","));
      if (rank == null)
        continue;
      if (minRank == null || rank < minRank[0]) {
        minRank = [rank, i];
      }
    }
    if (minRank != null) {
      const i = minRank[1];
      parts[i] = { start: parts[i].start, end: parts[i + 1].end };
      parts.splice(i + 1, 1);
    } else {
      break;
    }
  }
  return parts;
}
function bytePairEncode(piece, ranks) {
  if (piece.length === 1)
    return [ranks.get(piece.join(","))];
  return bytePairMerge(piece, ranks).map((p) => ranks.get(piece.slice(p.start, p.end).join(","))).filter((x) => x != null);
}
function escapeRegex(str) {
  return str.replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
}
var _Tiktoken = class {
  /** @internal */
  specialTokens;
  /** @internal */
  inverseSpecialTokens;
  /** @internal */
  patStr;
  /** @internal */
  textEncoder = new TextEncoder();
  /** @internal */
  textDecoder = new TextDecoder("utf-8");
  /** @internal */
  rankMap = /* @__PURE__ */ new Map();
  /** @internal */
  textMap = /* @__PURE__ */ new Map();
  constructor(ranks, extendedSpecialTokens) {
    this.patStr = ranks.pat_str;
    const uncompressed = ranks.bpe_ranks.split("\n").filter(Boolean).reduce((memo, x) => {
      const [_, offsetStr, ...tokens] = x.split(" ");
      const offset = Number.parseInt(offsetStr, 10);
      tokens.forEach((token, i) => memo[token] = offset + i);
      return memo;
    }, {});
    for (const [token, rank] of Object.entries(uncompressed)) {
      const bytes = import_base64_js.default.toByteArray(token);
      this.rankMap.set(bytes.join(","), rank);
      this.textMap.set(rank, bytes);
    }
    this.specialTokens = { ...ranks.special_tokens, ...extendedSpecialTokens };
    this.inverseSpecialTokens = Object.entries(this.specialTokens).reduce((memo, [text, rank]) => {
      memo[rank] = this.textEncoder.encode(text);
      return memo;
    }, {});
  }
  encode(text, allowedSpecial = [], disallowedSpecial = "all") {
    const regexes = new RegExp(this.patStr, "ug");
    const specialRegex = _Tiktoken.specialTokenRegex(
      Object.keys(this.specialTokens)
    );
    const ret = [];
    const allowedSpecialSet = new Set(
      allowedSpecial === "all" ? Object.keys(this.specialTokens) : allowedSpecial
    );
    const disallowedSpecialSet = new Set(
      disallowedSpecial === "all" ? Object.keys(this.specialTokens).filter(
        (x) => !allowedSpecialSet.has(x)
      ) : disallowedSpecial
    );
    if (disallowedSpecialSet.size > 0) {
      const disallowedSpecialRegex = _Tiktoken.specialTokenRegex([
        ...disallowedSpecialSet
      ]);
      const specialMatch = text.match(disallowedSpecialRegex);
      if (specialMatch != null) {
        throw new Error(
          `The text contains a special token that is not allowed: ${specialMatch[0]}`
        );
      }
    }
    let start = 0;
    while (true) {
      let nextSpecial = null;
      let startFind = start;
      while (true) {
        specialRegex.lastIndex = startFind;
        nextSpecial = specialRegex.exec(text);
        if (nextSpecial == null || allowedSpecialSet.has(nextSpecial[0]))
          break;
        startFind = nextSpecial.index + 1;
      }
      const end = nextSpecial?.index ?? text.length;
      for (const match of text.substring(start, end).matchAll(regexes)) {
        const piece = this.textEncoder.encode(match[0]);
        const token2 = this.rankMap.get(piece.join(","));
        if (token2 != null) {
          ret.push(token2);
          continue;
        }
        ret.push(...bytePairEncode(piece, this.rankMap));
      }
      if (nextSpecial == null)
        break;
      let token = this.specialTokens[nextSpecial[0]];
      ret.push(token);
      start = nextSpecial.index + nextSpecial[0].length;
    }
    return ret;
  }
  decode(tokens) {
    const res = [];
    let length = 0;
    for (let i2 = 0; i2 < tokens.length; ++i2) {
      const token = tokens[i2];
      const bytes = this.textMap.get(token) ?? this.inverseSpecialTokens[token];
      if (bytes != null) {
        res.push(bytes);
        length += bytes.length;
      }
    }
    const mergedArray = new Uint8Array(length);
    let i = 0;
    for (const bytes of res) {
      mergedArray.set(bytes, i);
      i += bytes.length;
    }
    return this.textDecoder.decode(mergedArray);
  }
};
var Tiktoken = _Tiktoken;
__publicField(Tiktoken, "specialTokenRegex", (tokens) => {
  return new RegExp(tokens.map((i) => escapeRegex(i)).join("|"), "g");
});
function getEncodingNameForModel(model) {
  switch (model) {
    case "gpt2": {
      return "gpt2";
    }
    case "code-cushman-001":
    case "code-cushman-002":
    case "code-davinci-001":
    case "code-davinci-002":
    case "cushman-codex":
    case "davinci-codex":
    case "davinci-002":
    case "text-davinci-002":
    case "text-davinci-003": {
      return "p50k_base";
    }
    case "code-davinci-edit-001":
    case "text-davinci-edit-001": {
      return "p50k_edit";
    }
    case "ada":
    case "babbage":
    case "babbage-002":
    case "code-search-ada-code-001":
    case "code-search-babbage-code-001":
    case "curie":
    case "davinci":
    case "text-ada-001":
    case "text-babbage-001":
    case "text-curie-001":
    case "text-davinci-001":
    case "text-search-ada-doc-001":
    case "text-search-babbage-doc-001":
    case "text-search-curie-doc-001":
    case "text-search-davinci-doc-001":
    case "text-similarity-ada-001":
    case "text-similarity-babbage-001":
    case "text-similarity-curie-001":
    case "text-similarity-davinci-001": {
      return "r50k_base";
    }
    case "gpt-3.5-turbo-instruct-0914":
    case "gpt-3.5-turbo-instruct":
    case "gpt-3.5-turbo-16k-0613":
    case "gpt-3.5-turbo-16k":
    case "gpt-3.5-turbo-0613":
    case "gpt-3.5-turbo-0301":
    case "gpt-3.5-turbo":
    case "gpt-4-32k-0613":
    case "gpt-4-32k-0314":
    case "gpt-4-32k":
    case "gpt-4-0613":
    case "gpt-4-0314":
    case "gpt-4":
    case "gpt-3.5-turbo-1106":
    case "gpt-35-turbo":
    case "gpt-4-1106-preview":
    case "gpt-4-vision-preview":
    case "gpt-3.5-turbo-0125":
    case "gpt-4-turbo":
    case "gpt-4-turbo-2024-04-09":
    case "gpt-4-turbo-preview":
    case "gpt-4-0125-preview":
    case "text-embedding-ada-002": {
      return "cl100k_base";
    }
    case "gpt-4o":
    case "gpt-4o-2024-05-13": {
      return "o200k_base";
    }
    default:
      throw new Error("Unknown model");
  }
}

// node_modules/@langchain/core/dist/utils/tiktoken.js
var cache = {};
var caller = /* @__PURE__ */ new AsyncCaller2({});
async function getEncoding(encoding) {
  if (!(encoding in cache)) {
    cache[encoding] = caller.fetch(`https://tiktoken.pages.dev/js/${encoding}.json`).then((res) => res.json()).then((data) => new Tiktoken(data)).catch((e) => {
      delete cache[encoding];
      throw e;
    });
  }
  return await cache[encoding];
}
async function encodingForModel(model) {
  return getEncoding(getEncodingNameForModel(model));
}

// node_modules/@langchain/core/dist/language_models/base.js
var getModelNameForTiktoken = (modelName) => {
  if (modelName.startsWith("gpt-3.5-turbo-16k")) {
    return "gpt-3.5-turbo-16k";
  }
  if (modelName.startsWith("gpt-3.5-turbo-")) {
    return "gpt-3.5-turbo";
  }
  if (modelName.startsWith("gpt-4-32k")) {
    return "gpt-4-32k";
  }
  if (modelName.startsWith("gpt-4-")) {
    return "gpt-4";
  }
  if (modelName.startsWith("gpt-4o")) {
    return "gpt-4o";
  }
  return modelName;
};
function isOpenAITool(tool) {
  if (typeof tool !== "object" || !tool)
    return false;
  if ("type" in tool && tool.type === "function" && "function" in tool && typeof tool.function === "object" && tool.function && "name" in tool.function && "parameters" in tool.function) {
    return true;
  }
  return false;
}
var getVerbosity = () => false;
var BaseLangChain = class extends Runnable {
  get lc_attributes() {
    return {
      callbacks: void 0,
      verbose: void 0
    };
  }
  constructor(params) {
    super(params);
    Object.defineProperty(this, "verbose", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "callbacks", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "tags", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "metadata", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.verbose = params.verbose ?? getVerbosity();
    this.callbacks = params.callbacks;
    this.tags = params.tags ?? [];
    this.metadata = params.metadata ?? {};
  }
};
var BaseLanguageModel = class extends BaseLangChain {
  /**
   * Keys that the language model accepts as call options.
   */
  get callKeys() {
    return ["stop", "timeout", "signal", "tags", "metadata", "callbacks"];
  }
  constructor({ callbacks, callbackManager, ...params }) {
    super({
      callbacks: callbacks ?? callbackManager,
      ...params
    });
    Object.defineProperty(this, "caller", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "cache", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_encoding", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    if (typeof params.cache === "object") {
      this.cache = params.cache;
    } else if (params.cache) {
      this.cache = InMemoryCache.global();
    } else {
      this.cache = void 0;
    }
    this.caller = new AsyncCaller2(params ?? {});
  }
  async getNumTokens(content) {
    if (typeof content !== "string") {
      return 0;
    }
    let numTokens = Math.ceil(content.length / 4);
    if (!this._encoding) {
      try {
        this._encoding = await encodingForModel("modelName" in this ? getModelNameForTiktoken(this.modelName) : "gpt2");
      } catch (error) {
        console.warn("Failed to calculate number of tokens, falling back to approximate count", error);
      }
    }
    if (this._encoding) {
      try {
        numTokens = this._encoding.encode(content).length;
      } catch (error) {
        console.warn("Failed to calculate number of tokens, falling back to approximate count", error);
      }
    }
    return numTokens;
  }
  static _convertInputToPromptValue(input) {
    if (typeof input === "string") {
      return new StringPromptValue(input);
    } else if (Array.isArray(input)) {
      return new ChatPromptValue(input.map(coerceMessageLikeToMessage));
    } else {
      return input;
    }
  }
  /**
   * Get the identifying parameters of the LLM.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _identifyingParams() {
    return {};
  }
  /**
   * Create a unique cache key for a specific call to a specific language model.
   * @param callOptions Call options for the model
   * @returns A unique cache key.
   */
  _getSerializedCacheKeyParametersForCall({ config, ...callOptions }) {
    const params = {
      ...this._identifyingParams(),
      ...callOptions,
      _type: this._llmType(),
      _model: this._modelType()
    };
    const filteredEntries = Object.entries(params).filter(([_, value]) => value !== void 0);
    const serializedEntries = filteredEntries.map(([key, value]) => `${key}:${JSON.stringify(value)}`).sort().join(",");
    return serializedEntries;
  }
  /**
   * @deprecated
   * Return a json-like object representing this LLM.
   */
  serialize() {
    return {
      ...this._identifyingParams(),
      _type: this._llmType(),
      _model: this._modelType()
    };
  }
  /**
   * @deprecated
   * Load an LLM from a json-like object describing it.
   */
  static async deserialize(_data) {
    throw new Error("Use .toJSON() instead");
  }
};

// node_modules/@langchain/core/dist/runnables/passthrough.js
var RunnablePassthrough = class extends Runnable {
  static lc_name() {
    return "RunnablePassthrough";
  }
  constructor(fields) {
    super(fields);
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "runnables"]
    });
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "func", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    if (fields) {
      this.func = fields.func;
    }
  }
  async invoke(input, options) {
    const config = ensureConfig(options);
    if (this.func) {
      await this.func(input, config);
    }
    return this._callWithConfig((input2) => Promise.resolve(input2), input, config);
  }
  async *transform(generator, options) {
    const config = ensureConfig(options);
    let finalOutput;
    let finalOutputSupported = true;
    for await (const chunk of this._transformStreamWithConfig(generator, (input) => input, config)) {
      yield chunk;
      if (finalOutputSupported) {
        if (finalOutput === void 0) {
          finalOutput = chunk;
        } else {
          try {
            finalOutput = concat(finalOutput, chunk);
          } catch {
            finalOutput = void 0;
            finalOutputSupported = false;
          }
        }
      }
    }
    if (this.func && finalOutput !== void 0) {
      await this.func(finalOutput, config);
    }
  }
  /**
   * A runnable that assigns key-value pairs to the input.
   *
   * The example below shows how you could use it with an inline function.
   *
   * @example
   * ```typescript
   * const prompt =
   *   PromptTemplate.fromTemplate(`Write a SQL query to answer the question using the following schema: {schema}
   * Question: {question}
   * SQL Query:`);
   *
   * // The `RunnablePassthrough.assign()` is used here to passthrough the input from the `.invoke()`
   * // call (in this example it's the question), along with any inputs passed to the `.assign()` method.
   * // In this case, we're passing the schema.
   * const sqlQueryGeneratorChain = RunnableSequence.from([
   *   RunnablePassthrough.assign({
   *     schema: async () => db.getTableInfo(),
   *   }),
   *   prompt,
   *   new ChatOpenAI({}).bind({ stop: ["\nSQLResult:"] }),
   *   new StringOutputParser(),
   * ]);
   * const result = await sqlQueryGeneratorChain.invoke({
   *   question: "How many employees are there?",
   * });
   * ```
   */
  static assign(mapping) {
    return new RunnableAssign(new RunnableMap({ steps: mapping }));
  }
};

// node_modules/@langchain/core/dist/utils/types/is_zod_schema.js
function isZodSchema(input) {
  return typeof input?.parse === "function";
}

// node_modules/@langchain/core/dist/language_models/chat_models.js
var BaseChatModel = class _BaseChatModel extends BaseLanguageModel {
  constructor(fields) {
    super(fields);
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain", "chat_models", this._llmType()]
    });
  }
  _separateRunnableConfigFromCallOptions(options) {
    const [runnableConfig, callOptions] = super._separateRunnableConfigFromCallOptions(options);
    if (callOptions?.timeout && !callOptions.signal) {
      callOptions.signal = AbortSignal.timeout(callOptions.timeout);
    }
    return [runnableConfig, callOptions];
  }
  /**
   * Invokes the chat model with a single input.
   * @param input The input for the language model.
   * @param options The call options.
   * @returns A Promise that resolves to a BaseMessageChunk.
   */
  async invoke(input, options) {
    const promptValue = _BaseChatModel._convertInputToPromptValue(input);
    const result = await this.generatePrompt([promptValue], options, options?.callbacks);
    const chatGeneration = result.generations[0][0];
    return chatGeneration.message;
  }
  // eslint-disable-next-line require-yield
  async *_streamResponseChunks(_messages, _options, _runManager) {
    throw new Error("Not implemented.");
  }
  async *_streamIterator(input, options) {
    if (this._streamResponseChunks === _BaseChatModel.prototype._streamResponseChunks) {
      yield this.invoke(input, options);
    } else {
      const prompt = _BaseChatModel._convertInputToPromptValue(input);
      const messages = prompt.toChatMessages();
      const [runnableConfig, callOptions] = this._separateRunnableConfigFromCallOptions(options);
      const inheritableMetadata = {
        ...runnableConfig.metadata,
        ...this.getLsParams(callOptions)
      };
      const callbackManager_ = await CallbackManager.configure(runnableConfig.callbacks, this.callbacks, runnableConfig.tags, this.tags, inheritableMetadata, this.metadata, { verbose: this.verbose });
      const extra = {
        options: callOptions,
        invocation_params: this?.invocationParams(callOptions),
        batch_size: 1
      };
      const runManagers = await callbackManager_?.handleChatModelStart(this.toJSON(), [messages], runnableConfig.runId, void 0, extra, void 0, void 0, runnableConfig.runName);
      let generationChunk;
      try {
        for await (const chunk of this._streamResponseChunks(messages, callOptions, runManagers?.[0])) {
          chunk.message.response_metadata = {
            ...chunk.generationInfo,
            ...chunk.message.response_metadata
          };
          yield chunk.message;
          if (!generationChunk) {
            generationChunk = chunk;
          } else {
            generationChunk = generationChunk.concat(chunk);
          }
        }
      } catch (err) {
        await Promise.all((runManagers ?? []).map((runManager) => runManager?.handleLLMError(err)));
        throw err;
      }
      await Promise.all((runManagers ?? []).map((runManager) => runManager?.handleLLMEnd({
        // TODO: Remove cast after figuring out inheritance
        generations: [[generationChunk]]
      })));
    }
  }
  getLsParams(options) {
    return {
      ls_model_type: "chat",
      ls_stop: options.stop
    };
  }
  /** @ignore */
  async _generateUncached(messages, parsedOptions, handledOptions) {
    const baseMessages = messages.map((messageList) => messageList.map(coerceMessageLikeToMessage));
    const inheritableMetadata = {
      ...handledOptions.metadata,
      ...this.getLsParams(parsedOptions)
    };
    const callbackManager_ = await CallbackManager.configure(handledOptions.callbacks, this.callbacks, handledOptions.tags, this.tags, inheritableMetadata, this.metadata, { verbose: this.verbose });
    const extra = {
      options: parsedOptions,
      invocation_params: this?.invocationParams(parsedOptions),
      batch_size: 1
    };
    const runManagers = await callbackManager_?.handleChatModelStart(this.toJSON(), baseMessages, handledOptions.runId, void 0, extra, void 0, void 0, handledOptions.runName);
    const generations = [];
    const llmOutputs = [];
    const hasStreamingHandler = !!runManagers?.[0].handlers.find((handler) => {
      return isStreamEventsHandler(handler) || isLogStreamHandler(handler);
    });
    if (hasStreamingHandler && baseMessages.length === 1 && this._streamResponseChunks !== _BaseChatModel.prototype._streamResponseChunks) {
      try {
        const stream = await this._streamResponseChunks(baseMessages[0], parsedOptions, runManagers?.[0]);
        let aggregated;
        for await (const chunk of stream) {
          if (aggregated === void 0) {
            aggregated = chunk;
          } else {
            aggregated = concat(aggregated, chunk);
          }
        }
        if (aggregated === void 0) {
          throw new Error("Received empty response from chat model call.");
        }
        generations.push([aggregated]);
        await runManagers?.[0].handleLLMEnd({
          generations,
          llmOutput: {}
        });
      } catch (e) {
        await runManagers?.[0].handleLLMError(e);
        throw e;
      }
    } else {
      const results = await Promise.allSettled(baseMessages.map((messageList, i) => this._generate(messageList, { ...parsedOptions, promptIndex: i }, runManagers?.[i])));
      await Promise.all(results.map(async (pResult, i) => {
        if (pResult.status === "fulfilled") {
          const result = pResult.value;
          for (const generation of result.generations) {
            generation.message.response_metadata = {
              ...generation.generationInfo,
              ...generation.message.response_metadata
            };
          }
          if (result.generations.length === 1) {
            result.generations[0].message.response_metadata = {
              ...result.llmOutput,
              ...result.generations[0].message.response_metadata
            };
          }
          generations[i] = result.generations;
          llmOutputs[i] = result.llmOutput;
          return runManagers?.[i]?.handleLLMEnd({
            generations: [result.generations],
            llmOutput: result.llmOutput
          });
        } else {
          await runManagers?.[i]?.handleLLMError(pResult.reason);
          return Promise.reject(pResult.reason);
        }
      }));
    }
    const output = {
      generations,
      llmOutput: llmOutputs.length ? this._combineLLMOutput?.(...llmOutputs) : void 0
    };
    Object.defineProperty(output, RUN_KEY, {
      value: runManagers ? { runIds: runManagers?.map((manager) => manager.runId) } : void 0,
      configurable: true
    });
    return output;
  }
  async _generateCached({ messages, cache: cache2, llmStringKey, parsedOptions, handledOptions }) {
    const baseMessages = messages.map((messageList) => messageList.map(coerceMessageLikeToMessage));
    const inheritableMetadata = {
      ...handledOptions.metadata,
      ...this.getLsParams(parsedOptions)
    };
    const callbackManager_ = await CallbackManager.configure(handledOptions.callbacks, this.callbacks, handledOptions.tags, this.tags, inheritableMetadata, this.metadata, { verbose: this.verbose });
    const extra = {
      options: parsedOptions,
      invocation_params: this?.invocationParams(parsedOptions),
      batch_size: 1,
      cached: true
    };
    const runManagers = await callbackManager_?.handleChatModelStart(this.toJSON(), baseMessages, handledOptions.runId, void 0, extra, void 0, void 0, handledOptions.runName);
    const missingPromptIndices = [];
    const results = await Promise.allSettled(baseMessages.map(async (baseMessage, index) => {
      const prompt = _BaseChatModel._convertInputToPromptValue(baseMessage).toString();
      const result = await cache2.lookup(prompt, llmStringKey);
      if (result == null) {
        missingPromptIndices.push(index);
      }
      return result;
    }));
    const cachedResults = results.map((result, index) => ({ result, runManager: runManagers?.[index] })).filter(({ result }) => result.status === "fulfilled" && result.value != null || result.status === "rejected");
    const generations = [];
    await Promise.all(cachedResults.map(async ({ result: promiseResult, runManager }, i) => {
      if (promiseResult.status === "fulfilled") {
        const result = promiseResult.value;
        generations[i] = result;
        if (result.length) {
          await runManager?.handleLLMNewToken(result[0].text);
        }
        return runManager?.handleLLMEnd({
          generations: [result]
        });
      } else {
        await runManager?.handleLLMError(promiseResult.reason);
        return Promise.reject(promiseResult.reason);
      }
    }));
    const output = {
      generations,
      missingPromptIndices
    };
    Object.defineProperty(output, RUN_KEY, {
      value: runManagers ? { runIds: runManagers?.map((manager) => manager.runId) } : void 0,
      configurable: true
    });
    return output;
  }
  /**
   * Generates chat based on the input messages.
   * @param messages An array of arrays of BaseMessage instances.
   * @param options The call options or an array of stop sequences.
   * @param callbacks The callbacks for the language model.
   * @returns A Promise that resolves to an LLMResult.
   */
  async generate(messages, options, callbacks) {
    let parsedOptions;
    if (Array.isArray(options)) {
      parsedOptions = { stop: options };
    } else {
      parsedOptions = options;
    }
    const baseMessages = messages.map((messageList) => messageList.map(coerceMessageLikeToMessage));
    const [runnableConfig, callOptions] = this._separateRunnableConfigFromCallOptions(parsedOptions);
    runnableConfig.callbacks = runnableConfig.callbacks ?? callbacks;
    if (!this.cache) {
      return this._generateUncached(baseMessages, callOptions, runnableConfig);
    }
    const { cache: cache2 } = this;
    const llmStringKey = this._getSerializedCacheKeyParametersForCall(callOptions);
    const { generations, missingPromptIndices } = await this._generateCached({
      messages: baseMessages,
      cache: cache2,
      llmStringKey,
      parsedOptions: callOptions,
      handledOptions: runnableConfig
    });
    let llmOutput = {};
    if (missingPromptIndices.length > 0) {
      const results = await this._generateUncached(missingPromptIndices.map((i) => baseMessages[i]), callOptions, runnableConfig);
      await Promise.all(results.generations.map(async (generation, index) => {
        const promptIndex = missingPromptIndices[index];
        generations[promptIndex] = generation;
        const prompt = _BaseChatModel._convertInputToPromptValue(baseMessages[promptIndex]).toString();
        return cache2.update(prompt, llmStringKey, generation);
      }));
      llmOutput = results.llmOutput ?? {};
    }
    return { generations, llmOutput };
  }
  /**
   * Get the parameters used to invoke the model
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  invocationParams(_options) {
    return {};
  }
  _modelType() {
    return "base_chat_model";
  }
  /**
   * @deprecated
   * Return a json-like object representing this LLM.
   */
  serialize() {
    return {
      ...this.invocationParams(),
      _type: this._llmType(),
      _model: this._modelType()
    };
  }
  /**
   * Generates a prompt based on the input prompt values.
   * @param promptValues An array of BasePromptValue instances.
   * @param options The call options or an array of stop sequences.
   * @param callbacks The callbacks for the language model.
   * @returns A Promise that resolves to an LLMResult.
   */
  async generatePrompt(promptValues, options, callbacks) {
    const promptMessages = promptValues.map((promptValue) => promptValue.toChatMessages());
    return this.generate(promptMessages, options, callbacks);
  }
  /**
   * @deprecated Use .invoke() instead. Will be removed in 0.2.0.
   *
   * Makes a single call to the chat model.
   * @param messages An array of BaseMessage instances.
   * @param options The call options or an array of stop sequences.
   * @param callbacks The callbacks for the language model.
   * @returns A Promise that resolves to a BaseMessage.
   */
  async call(messages, options, callbacks) {
    const result = await this.generate([messages.map(coerceMessageLikeToMessage)], options, callbacks);
    const generations = result.generations;
    return generations[0][0].message;
  }
  /**
   * @deprecated Use .invoke() instead. Will be removed in 0.2.0.
   *
   * Makes a single call to the chat model with a prompt value.
   * @param promptValue The value of the prompt.
   * @param options The call options or an array of stop sequences.
   * @param callbacks The callbacks for the language model.
   * @returns A Promise that resolves to a BaseMessage.
   */
  async callPrompt(promptValue, options, callbacks) {
    const promptMessages = promptValue.toChatMessages();
    return this.call(promptMessages, options, callbacks);
  }
  /**
   * @deprecated Use .invoke() instead. Will be removed in 0.2.0.
   *
   * Predicts the next message based on the input messages.
   * @param messages An array of BaseMessage instances.
   * @param options The call options or an array of stop sequences.
   * @param callbacks The callbacks for the language model.
   * @returns A Promise that resolves to a BaseMessage.
   */
  async predictMessages(messages, options, callbacks) {
    return this.call(messages, options, callbacks);
  }
  /**
   * @deprecated Use .invoke() instead. Will be removed in 0.2.0.
   *
   * Predicts the next message based on a text input.
   * @param text The text input.
   * @param options The call options or an array of stop sequences.
   * @param callbacks The callbacks for the language model.
   * @returns A Promise that resolves to a string.
   */
  async predict(text, options, callbacks) {
    const message = new HumanMessage(text);
    const result = await this.call([message], options, callbacks);
    if (typeof result.content !== "string") {
      throw new Error("Cannot use predict when output is not a string.");
    }
    return result.content;
  }
  withStructuredOutput(outputSchema, config) {
    if (typeof this.bindTools !== "function") {
      throw new Error(`Chat model must implement ".bindTools()" to use withStructuredOutput.`);
    }
    const schema = outputSchema;
    const name = config?.name;
    const description = schema.description ?? "A function available to call.";
    const method = config?.method;
    const includeRaw = config?.includeRaw;
    if (method === "jsonMode") {
      throw new Error(`Base withStructuredOutput implementation only supports "functionCalling" as a method.`);
    }
    let functionName = name ?? "extract";
    let tools;
    if (isZodSchema(schema)) {
      tools = [
        {
          type: "function",
          function: {
            name: functionName,
            description,
            parameters: zodToJsonSchema(schema)
          }
        }
      ];
    } else {
      if ("name" in schema) {
        functionName = schema.name;
      }
      tools = [
        {
          type: "function",
          function: {
            name: functionName,
            description,
            parameters: schema
          }
        }
      ];
    }
    const llm = this.bindTools(tools);
    const outputParser = RunnableLambda.from((input) => {
      if (!input.tool_calls || input.tool_calls.length === 0) {
        throw new Error("No tool calls found in the response.");
      }
      const toolCall = input.tool_calls.find((tc) => tc.name === functionName);
      if (!toolCall) {
        throw new Error(`No tool call found with name ${functionName}.`);
      }
      return toolCall.args;
    });
    if (!includeRaw) {
      return llm.pipe(outputParser).withConfig({
        runName: "StructuredOutput"
      });
    }
    const parserAssign = RunnablePassthrough.assign({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parsed: (input, config2) => outputParser.invoke(input.raw, config2)
    });
    const parserNone = RunnablePassthrough.assign({
      parsed: () => null
    });
    const parsedWithFallback = parserAssign.withFallbacks({
      fallbacks: [parserNone]
    });
    return RunnableSequence.from([
      {
        raw: llm
      },
      parsedWithFallback
    ]).withConfig({
      runName: "StructuredOutputRunnable"
    });
  }
};

// node_modules/@langchain/google-genai/dist/utils/zod_to_genai_parameters.js
function removeAdditionalProperties(obj) {
  if (typeof obj === "object" && obj !== null) {
    const newObj = { ...obj };
    if ("additionalProperties" in newObj && typeof newObj.additionalProperties === "boolean") {
      delete newObj.additionalProperties;
    }
    for (const key in newObj) {
      if (key in newObj) {
        if (Array.isArray(newObj[key])) {
          newObj[key] = newObj[key].map(removeAdditionalProperties);
        } else if (typeof newObj[key] === "object" && newObj[key] !== null) {
          newObj[key] = removeAdditionalProperties(newObj[key]);
        }
      }
    }
    return newObj;
  }
  return obj;
}
function zodToGenerativeAIParameters(zodObj) {
  const jsonSchema = removeAdditionalProperties(zodToJsonSchema(zodObj));
  const { $schema, ...rest } = jsonSchema;
  return rest;
}
function jsonSchemaToGeminiParameters(schema) {
  const jsonSchema = removeAdditionalProperties(schema);
  const { $schema, ...rest } = jsonSchema;
  return rest;
}

// node_modules/@langchain/core/dist/utils/function_calling.js
function isStructuredTool(tool) {
  return tool !== void 0 && Array.isArray(tool.lc_namespace);
}

// node_modules/@langchain/google-genai/dist/utils/common.js
function getMessageAuthor(message) {
  const type = message._getType();
  if (ChatMessage.isInstance(message)) {
    return message.role;
  }
  if (type === "tool") {
    return type;
  }
  return message.name ?? type;
}
function convertAuthorToRole(author) {
  switch (author) {
    case "ai":
    case "model":
      return "model";
    case "system":
    case "human":
      return "user";
    case "tool":
    case "function":
      return "function";
    default:
      throw new Error(`Unknown / unsupported author: ${author}`);
  }
}
function messageContentMedia(content) {
  if ("mimeType" in content && "data" in content) {
    return {
      inlineData: {
        mimeType: content.mimeType,
        data: content.data
      }
    };
  }
  throw new Error("Invalid media content");
}
function convertMessageContentToParts(message, isMultimodalModel) {
  if (typeof message.content === "string" && message.content !== "") {
    return [{ text: message.content }];
  }
  let functionCalls = [];
  let functionResponses = [];
  let messageParts = [];
  if ("tool_calls" in message && Array.isArray(message.tool_calls) && message.tool_calls.length > 0) {
    functionCalls = message.tool_calls.map((tc) => ({
      functionCall: {
        name: tc.name,
        args: tc.args
      }
    }));
  } else if (message._getType() === "tool" && message.name && message.content) {
    functionResponses = [
      {
        functionResponse: {
          name: message.name,
          response: message.content
        }
      }
    ];
  } else if (Array.isArray(message.content)) {
    messageParts = message.content.map((c) => {
      if (c.type === "text") {
        return {
          text: c.text
        };
      }
      if (c.type === "image_url") {
        if (!isMultimodalModel) {
          throw new Error(`This model does not support images`);
        }
        let source;
        if (typeof c.image_url === "string") {
          source = c.image_url;
        } else if (typeof c.image_url === "object" && "url" in c.image_url) {
          source = c.image_url.url;
        } else {
          throw new Error("Please provide image as base64 encoded data URL");
        }
        const [dm, data] = source.split(",");
        if (!dm.startsWith("data:")) {
          throw new Error("Please provide image as base64 encoded data URL");
        }
        const [mimeType, encoding] = dm.replace(/^data:/, "").split(";");
        if (encoding !== "base64") {
          throw new Error("Please provide image as base64 encoded data URL");
        }
        return {
          inlineData: {
            data,
            mimeType
          }
        };
      } else if (c.type === "media") {
        return messageContentMedia(c);
      } else if (c.type === "tool_use") {
        return {
          functionCall: {
            name: c.name,
            args: c.input
          }
        };
      }
      throw new Error(`Unknown content type ${c.type}`);
    });
  }
  return [...messageParts, ...functionCalls, ...functionResponses];
}
function convertBaseMessagesToContent(messages, isMultimodalModel) {
  return messages.reduce((acc, message, index) => {
    if (!isBaseMessage(message)) {
      throw new Error("Unsupported message input");
    }
    const author = getMessageAuthor(message);
    if (author === "system" && index !== 0) {
      throw new Error("System message should be the first one");
    }
    const role = convertAuthorToRole(author);
    const prevContent = acc.content[acc.content.length];
    if (!acc.mergeWithPreviousContent && prevContent && prevContent.role === role) {
      throw new Error("Google Generative AI requires alternate messages between authors");
    }
    const parts = convertMessageContentToParts(message, isMultimodalModel);
    if (acc.mergeWithPreviousContent) {
      const prevContent2 = acc.content[acc.content.length - 1];
      if (!prevContent2) {
        throw new Error("There was a problem parsing your system message. Please try a prompt without one.");
      }
      prevContent2.parts.push(...parts);
      return {
        mergeWithPreviousContent: false,
        content: acc.content
      };
    }
    let actualRole = role;
    if (actualRole === "function") {
      actualRole = "user";
    }
    const content = {
      role: actualRole,
      parts
    };
    return {
      mergeWithPreviousContent: author === "system",
      content: [...acc.content, content]
    };
  }, { content: [], mergeWithPreviousContent: false }).content;
}
function mapGenerateContentResultToChatResult(response, extra) {
  if (!response.candidates || response.candidates.length === 0 || !response.candidates[0]) {
    return {
      generations: [],
      llmOutput: {
        filters: response.promptFeedback
      }
    };
  }
  const functionCalls = response.functionCalls();
  const [candidate] = response.candidates;
  const { content, ...generationInfo } = candidate;
  const text = content?.parts[0]?.text ?? "";
  const generation = {
    text,
    message: new AIMessage({
      content: text,
      tool_calls: functionCalls,
      additional_kwargs: {
        ...generationInfo
      },
      usage_metadata: extra?.usageMetadata
    }),
    generationInfo
  };
  return {
    generations: [generation]
  };
}
function convertResponseContentToChatGenerationChunk(response, extra) {
  if (!response.candidates || response.candidates.length === 0) {
    return null;
  }
  const functionCalls = response.functionCalls();
  const [candidate] = response.candidates;
  const { content, ...generationInfo } = candidate;
  const text = content?.parts[0]?.text ?? "";
  const toolCallChunks = [];
  if (functionCalls) {
    toolCallChunks.push(...functionCalls.map((fc) => ({
      ...fc,
      args: JSON.stringify(fc.args),
      index: extra.index
    })));
  }
  return new ChatGenerationChunk({
    text,
    message: new AIMessageChunk({
      content: text,
      name: !content ? void 0 : content.role,
      tool_call_chunks: toolCallChunks,
      // Each chunk can have unique "generationInfo", and merging strategy is unclear,
      // so leave blank for now.
      additional_kwargs: {},
      usage_metadata: extra.usageMetadata
    }),
    generationInfo
  });
}
function convertToGenerativeAITools(structuredTools) {
  if (structuredTools.every((tool) => "functionDeclarations" in tool && Array.isArray(tool.functionDeclarations))) {
    return structuredTools;
  }
  return [
    {
      functionDeclarations: structuredTools.map((structuredTool) => {
        if (isStructuredTool(structuredTool)) {
          const jsonSchema = zodToGenerativeAIParameters(structuredTool.schema);
          return {
            name: structuredTool.name,
            description: structuredTool.description,
            parameters: jsonSchema
          };
        }
        if (isOpenAITool(structuredTool)) {
          return {
            name: structuredTool.function.name,
            description: structuredTool.function.description ?? `A function available to call.`,
            parameters: jsonSchemaToGeminiParameters(structuredTool.function.parameters)
          };
        }
        return structuredTool;
      })
    }
  ];
}

// node_modules/@langchain/core/dist/output_parsers/base.js
var BaseLLMOutputParser = class extends Runnable {
  /**
   * Parses the result of an LLM call with a given prompt. By default, it
   * simply calls `parseResult`.
   * @param generations The generations from an LLM call.
   * @param _prompt The prompt used in the LLM call.
   * @param callbacks Optional callbacks.
   * @returns A promise of the parsed output.
   */
  parseResultWithPrompt(generations, _prompt, callbacks) {
    return this.parseResult(generations, callbacks);
  }
  _baseMessageToString(message) {
    return typeof message.content === "string" ? message.content : this._baseMessageContentToString(message.content);
  }
  _baseMessageContentToString(content) {
    return JSON.stringify(content);
  }
  /**
   * Calls the parser with a given input and optional configuration options.
   * If the input is a string, it creates a generation with the input as
   * text and calls `parseResult`. If the input is a `BaseMessage`, it
   * creates a generation with the input as a message and the content of the
   * input as text, and then calls `parseResult`.
   * @param input The input to the parser, which can be a string or a `BaseMessage`.
   * @param options Optional configuration options.
   * @returns A promise of the parsed output.
   */
  async invoke(input, options) {
    if (typeof input === "string") {
      return this._callWithConfig(async (input2, options2) => this.parseResult([{ text: input2 }], options2?.callbacks), input, { ...options, runType: "parser" });
    } else {
      return this._callWithConfig(async (input2, options2) => this.parseResult([
        {
          message: input2,
          text: this._baseMessageToString(input2)
        }
      ], options2?.callbacks), input, { ...options, runType: "parser" });
    }
  }
};
var OutputParserException = class extends Error {
  constructor(message, llmOutput, observation, sendToLLM = false) {
    super(message);
    Object.defineProperty(this, "llmOutput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "observation", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "sendToLLM", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.llmOutput = llmOutput;
    this.observation = observation;
    this.sendToLLM = sendToLLM;
    if (sendToLLM) {
      if (observation === void 0 || llmOutput === void 0) {
        throw new Error("Arguments 'observation' & 'llmOutput' are required if 'sendToLlm' is true");
      }
    }
  }
};

// node_modules/@langchain/core/dist/utils/@cfworker/json-schema/src/dereference.js
var initialBaseURI = (
  // @ts-ignore
  typeof self !== "undefined" && self.location && self.location.origin !== "null" ? (
    //@ts-ignore
    /* @__PURE__ */ new URL(self.location.origin + self.location.pathname + location.search)
  ) : /* @__PURE__ */ new URL("https://github.com/cfworker")
);

// node_modules/@langchain/core/dist/utils/@cfworker/json-schema/src/format.js
var DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
var DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var TIME = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
var HOSTNAME = /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i;
var URIREF = /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
var URITEMPLATE = /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i;
var URL_ = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)(?:\.(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu;
var UUID = /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
var JSON_POINTER = /^(?:\/(?:[^~/]|~0|~1)*)*$/;
var JSON_POINTER_URI_FRAGMENT = /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i;
var RELATIVE_JSON_POINTER = /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/;
var FASTDATE = /^\d\d\d\d-[0-1]\d-[0-3]\d$/;
var FASTTIME = /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i;
var FASTDATETIME = /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i;
var FASTURIREFERENCE = /^(?:(?:[a-z][a-z0-9+-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i;
var EMAIL = (input) => {
  if (input[0] === '"')
    return false;
  const [name, host, ...rest] = input.split("@");
  if (!name || !host || rest.length !== 0 || name.length > 64 || host.length > 253)
    return false;
  if (name[0] === "." || name.endsWith(".") || name.includes(".."))
    return false;
  if (!/^[a-z0-9.-]+$/i.test(host) || !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(name))
    return false;
  return host.split(".").every((part) => /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/i.test(part));
};
var IPV4 = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
var IPV6 = /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i;
var DURATION = (input) => input.length > 1 && input.length < 80 && (/^P\d+([.,]\d+)?W$/.test(input) || /^P[\dYMDTHS]*(\d[.,]\d+)?[YMDHS]$/.test(input) && /^P([.,\d]+Y)?([.,\d]+M)?([.,\d]+D)?(T([.,\d]+H)?([.,\d]+M)?([.,\d]+S)?)?$/.test(input));
function bind(r) {
  return r.test.bind(r);
}
var fullFormat = {
  date,
  time: /* @__PURE__ */ time.bind(void 0, false),
  "date-time": date_time,
  duration: DURATION,
  uri,
  "uri-reference": /* @__PURE__ */ bind(URIREF),
  "uri-template": /* @__PURE__ */ bind(URITEMPLATE),
  url: /* @__PURE__ */ bind(URL_),
  email: EMAIL,
  hostname: /* @__PURE__ */ bind(HOSTNAME),
  ipv4: /* @__PURE__ */ bind(IPV4),
  ipv6: /* @__PURE__ */ bind(IPV6),
  regex,
  uuid: /* @__PURE__ */ bind(UUID),
  "json-pointer": /* @__PURE__ */ bind(JSON_POINTER),
  "json-pointer-uri-fragment": /* @__PURE__ */ bind(JSON_POINTER_URI_FRAGMENT),
  "relative-json-pointer": /* @__PURE__ */ bind(RELATIVE_JSON_POINTER)
};
var fastFormat = {
  ...fullFormat,
  date: /* @__PURE__ */ bind(FASTDATE),
  time: /* @__PURE__ */ bind(FASTTIME),
  "date-time": /* @__PURE__ */ bind(FASTDATETIME),
  "uri-reference": /* @__PURE__ */ bind(FASTURIREFERENCE)
};
function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
function date(str) {
  const matches = str.match(DATE);
  if (!matches)
    return false;
  const year = +matches[1];
  const month = +matches[2];
  const day = +matches[3];
  return month >= 1 && month <= 12 && day >= 1 && day <= (month == 2 && isLeapYear(year) ? 29 : DAYS[month]);
}
function time(full, str) {
  const matches = str.match(TIME);
  if (!matches)
    return false;
  const hour = +matches[1];
  const minute = +matches[2];
  const second = +matches[3];
  const timeZone = !!matches[5];
  return (hour <= 23 && minute <= 59 && second <= 59 || hour == 23 && minute == 59 && second == 60) && (!full || timeZone);
}
var DATE_TIME_SEPARATOR = /t|\s/i;
function date_time(str) {
  const dateTime = str.split(DATE_TIME_SEPARATOR);
  return dateTime.length == 2 && date(dateTime[0]) && time(true, dateTime[1]);
}
var NOT_URI_FRAGMENT = /\/|:/;
var URI_PATTERN = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
function uri(str) {
  return NOT_URI_FRAGMENT.test(str) && URI_PATTERN.test(str);
}
var Z_ANCHOR = /[^\\]\\Z/;
function regex(str) {
  if (Z_ANCHOR.test(str))
    return false;
  try {
    new RegExp(str);
    return true;
  } catch (e) {
    return false;
  }
}

// node_modules/@langchain/google-genai/dist/output_parsers.js
var GoogleGenerativeAIToolsOutputParser = class extends BaseLLMOutputParser {
  static lc_name() {
    return "GoogleGenerativeAIToolsOutputParser";
  }
  constructor(params) {
    super(params);
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain", "google_genai", "output_parsers"]
    });
    Object.defineProperty(this, "returnId", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "keyName", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "returnSingle", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "zodSchema", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.keyName = params.keyName;
    this.returnSingle = params.returnSingle ?? this.returnSingle;
    this.zodSchema = params.zodSchema;
  }
  async _validateResult(result) {
    if (this.zodSchema === void 0) {
      return result;
    }
    const zodParsedResult = await this.zodSchema.safeParseAsync(result);
    if (zodParsedResult.success) {
      return zodParsedResult.data;
    } else {
      throw new OutputParserException(`Failed to parse. Text: "${JSON.stringify(result, null, 2)}". Error: ${JSON.stringify(zodParsedResult.error.errors)}`, JSON.stringify(result, null, 2));
    }
  }
  async parseResult(generations) {
    const tools = generations.flatMap((generation) => {
      const { message } = generation;
      if (!("tool_calls" in message) || !Array.isArray(message.tool_calls)) {
        return [];
      }
      return message.tool_calls;
    });
    if (tools[0] === void 0) {
      throw new Error("No parseable tool calls provided to GoogleGenerativeAIToolsOutputParser.");
    }
    const [tool] = tools;
    const validatedResult = await this._validateResult(tool.args);
    return validatedResult;
  }
};

// node_modules/@langchain/google-genai/dist/chat_models.js
var ChatGoogleGenerativeAI = class extends BaseChatModel {
  static lc_name() {
    return "ChatGoogleGenerativeAI";
  }
  get lc_secrets() {
    return {
      apiKey: "GOOGLE_API_KEY"
    };
  }
  get _isMultimodalModel() {
    return this.model.includes("vision") || this.model.startsWith("gemini-1.5");
  }
  constructor(fields) {
    super(fields ?? {});
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "modelName", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "gemini-pro"
    });
    Object.defineProperty(this, "model", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "gemini-pro"
    });
    Object.defineProperty(this, "temperature", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "maxOutputTokens", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "topP", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "topK", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "stopSequences", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "safetySettings", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "apiKey", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "streaming", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "streamUsage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "client", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.modelName = fields?.model?.replace(/^models\//, "") ?? fields?.modelName?.replace(/^models\//, "") ?? this.model;
    this.model = this.modelName;
    this.maxOutputTokens = fields?.maxOutputTokens ?? this.maxOutputTokens;
    if (this.maxOutputTokens && this.maxOutputTokens < 0) {
      throw new Error("`maxOutputTokens` must be a positive integer");
    }
    this.temperature = fields?.temperature ?? this.temperature;
    if (this.temperature && (this.temperature < 0 || this.temperature > 1)) {
      throw new Error("`temperature` must be in the range of [0.0,1.0]");
    }
    this.topP = fields?.topP ?? this.topP;
    if (this.topP && this.topP < 0) {
      throw new Error("`topP` must be a positive integer");
    }
    if (this.topP && this.topP > 1) {
      throw new Error("`topP` must be below 1.");
    }
    this.topK = fields?.topK ?? this.topK;
    if (this.topK && this.topK < 0) {
      throw new Error("`topK` must be a positive integer");
    }
    this.stopSequences = fields?.stopSequences ?? this.stopSequences;
    this.apiKey = fields?.apiKey ?? getEnvironmentVariable("GOOGLE_API_KEY");
    if (!this.apiKey) {
      throw new Error("Please set an API key for Google GenerativeAI in the environment variable GOOGLE_API_KEY or in the `apiKey` field of the ChatGoogleGenerativeAI constructor");
    }
    this.safetySettings = fields?.safetySettings ?? this.safetySettings;
    if (this.safetySettings && this.safetySettings.length > 0) {
      const safetySettingsSet = new Set(this.safetySettings.map((s) => s.category));
      if (safetySettingsSet.size !== this.safetySettings.length) {
        throw new Error("The categories in `safetySettings` array must be unique");
      }
    }
    this.streaming = fields?.streaming ?? this.streaming;
    this.client = new GoogleGenerativeAI(this.apiKey).getGenerativeModel({
      model: this.model,
      safetySettings: this.safetySettings,
      generationConfig: {
        candidateCount: 1,
        stopSequences: this.stopSequences,
        maxOutputTokens: this.maxOutputTokens,
        temperature: this.temperature,
        topP: this.topP,
        topK: this.topK
      }
    }, {
      apiVersion: fields?.apiVersion,
      baseUrl: fields?.baseUrl
    });
    this.streamUsage = fields?.streamUsage ?? this.streamUsage;
  }
  getLsParams(options) {
    return {
      ls_provider: "google_genai",
      ls_model_name: this.model,
      ls_model_type: "chat",
      ls_temperature: this.client.generationConfig.temperature,
      ls_max_tokens: this.client.generationConfig.maxOutputTokens,
      ls_stop: options.stop
    };
  }
  _combineLLMOutput() {
    return [];
  }
  _llmType() {
    return "googlegenerativeai";
  }
  bindTools(tools, kwargs) {
    return this.bind({ tools: convertToGenerativeAITools(tools), ...kwargs });
  }
  invocationParams(options) {
    const tools = options?.tools;
    if (Array.isArray(tools) && !tools.some(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (t) => !("lc_namespace" in t)
    )) {
      return {
        tools: convertToGenerativeAITools(options?.tools)
      };
    }
    return {
      tools: options?.tools
    };
  }
  async _generate(messages, options, runManager) {
    const prompt = convertBaseMessagesToContent(messages, this._isMultimodalModel);
    const parameters = this.invocationParams(options);
    if (this.streaming) {
      const tokenUsage = {};
      const stream = this._streamResponseChunks(messages, options, runManager);
      const finalChunks = {};
      for await (const chunk of stream) {
        const index = chunk.generationInfo?.completion ?? 0;
        if (finalChunks[index] === void 0) {
          finalChunks[index] = chunk;
        } else {
          finalChunks[index] = finalChunks[index].concat(chunk);
        }
      }
      const generations = Object.entries(finalChunks).sort(([aKey], [bKey]) => parseInt(aKey, 10) - parseInt(bKey, 10)).map(([_, value]) => value);
      return { generations, llmOutput: { estimatedTokenUsage: tokenUsage } };
    }
    const res = await this.completionWithRetry({
      ...parameters,
      contents: prompt
    });
    let usageMetadata;
    if ("usageMetadata" in res.response) {
      const genAIUsageMetadata = res.response.usageMetadata;
      usageMetadata = {
        input_tokens: genAIUsageMetadata.promptTokenCount ?? 0,
        output_tokens: genAIUsageMetadata.candidatesTokenCount ?? 0,
        total_tokens: genAIUsageMetadata.totalTokenCount ?? 0
      };
    }
    const generationResult = mapGenerateContentResultToChatResult(res.response, {
      usageMetadata
    });
    await runManager?.handleLLMNewToken(generationResult.generations[0].text ?? "");
    return generationResult;
  }
  async *_streamResponseChunks(messages, options, runManager) {
    const prompt = convertBaseMessagesToContent(messages, this._isMultimodalModel);
    const parameters = this.invocationParams(options);
    const request = {
      ...parameters,
      contents: prompt
    };
    const stream = await this.caller.callWithOptions({ signal: options?.signal }, async () => {
      const { stream: stream2 } = await this.client.generateContentStream(request);
      return stream2;
    });
    let usageMetadata;
    let index = 0;
    for await (const response of stream) {
      if ("usageMetadata" in response && this.streamUsage !== false && options.streamUsage !== false) {
        const genAIUsageMetadata = response.usageMetadata;
        if (!usageMetadata) {
          usageMetadata = {
            input_tokens: genAIUsageMetadata.promptTokenCount,
            output_tokens: genAIUsageMetadata.candidatesTokenCount,
            total_tokens: genAIUsageMetadata.totalTokenCount
          };
        } else {
          const outputTokenDiff = genAIUsageMetadata.candidatesTokenCount - usageMetadata.output_tokens;
          usageMetadata = {
            input_tokens: 0,
            output_tokens: outputTokenDiff,
            total_tokens: outputTokenDiff
          };
        }
      }
      const chunk = convertResponseContentToChatGenerationChunk(response, {
        usageMetadata,
        index
      });
      index += 1;
      if (!chunk) {
        continue;
      }
      yield chunk;
      await runManager?.handleLLMNewToken(chunk.text ?? "");
    }
  }
  async completionWithRetry(request, options) {
    return this.caller.callWithOptions({ signal: options?.signal }, async () => {
      try {
        return this.client.generateContent(request);
      } catch (e) {
        if (e.message?.includes("400 Bad Request")) {
          e.status = 400;
        }
        throw e;
      }
    });
  }
  withStructuredOutput(outputSchema, config) {
    const schema = outputSchema;
    const name = config?.name;
    const method = config?.method;
    const includeRaw = config?.includeRaw;
    if (method === "jsonMode") {
      throw new Error(`ChatGoogleGenerativeAI only supports "functionCalling" as a method.`);
    }
    let functionName = name ?? "extract";
    let outputParser;
    let tools;
    if (isZodSchema(schema)) {
      const jsonSchema = zodToGenerativeAIParameters(schema);
      tools = [
        {
          functionDeclarations: [
            {
              name: functionName,
              description: jsonSchema.description ?? "A function available to call.",
              parameters: jsonSchema
            }
          ]
        }
      ];
      outputParser = new GoogleGenerativeAIToolsOutputParser({
        returnSingle: true,
        keyName: functionName,
        zodSchema: schema
      });
    } else {
      let geminiFunctionDefinition;
      if (typeof schema.name === "string" && typeof schema.parameters === "object" && schema.parameters != null) {
        geminiFunctionDefinition = schema;
        functionName = schema.name;
      } else {
        geminiFunctionDefinition = {
          name: functionName,
          description: schema.description ?? "",
          parameters: schema
        };
      }
      tools = [
        {
          functionDeclarations: [geminiFunctionDefinition]
        }
      ];
      outputParser = new GoogleGenerativeAIToolsOutputParser({
        returnSingle: true,
        keyName: functionName
      });
    }
    const llm = this.bind({
      tools
    });
    if (!includeRaw) {
      return llm.pipe(outputParser).withConfig({
        runName: "ChatGoogleGenerativeAIStructuredOutput"
      });
    }
    const parserAssign = RunnablePassthrough.assign({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parsed: (input, config2) => outputParser.invoke(input.raw, config2)
    });
    const parserNone = RunnablePassthrough.assign({
      parsed: () => null
    });
    const parsedWithFallback = parserAssign.withFallbacks({
      fallbacks: [parserNone]
    });
    return RunnableSequence.from([
      {
        raw: llm
      },
      parsedWithFallback
    ]).withConfig({
      runName: "StructuredOutputRunnable"
    });
  }
};

// node_modules/@langchain/core/dist/embeddings.js
var Embeddings = class {
  constructor(params) {
    Object.defineProperty(this, "caller", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.caller = new AsyncCaller2(params ?? {});
  }
};

// node_modules/@langchain/community/dist/utils/tencent_hunyuan/index.js
var import_node_crypto = require("node:crypto");

// node_modules/@langchain/community/dist/utils/tencent_hunyuan/common.js
var service = "hunyuan";
var signedHeaders = `content-type;host`;
var getDate = (timestamp) => {
  const date2 = new Date(timestamp * 1e3);
  const year = date2.getUTCFullYear();
  const month = `0${(date2.getUTCMonth() + 1).toString()}`.slice(-2);
  const day = `0${date2.getUTCDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
};

// node_modules/@langchain/community/dist/utils/tencent_hunyuan/index.js
var sha256 = (data) => (0, import_node_crypto.createHash)("sha256").update(data).digest("hex");
var hmacSha256 = (data, key) => (0, import_node_crypto.createHmac)("sha256", key).update(data).digest();
var hmacSha256Hex = (data, key) => (0, import_node_crypto.createHmac)("sha256", key).update(data).digest("hex");
var sign = (host, payload, timestamp, secretId, secretKey, headers) => {
  const contentType = headers["Content-Type"];
  const payloadHash = sha256(JSON.stringify(payload));
  const canonicalRequest = `POST
/

content-type:${contentType}
host:${host}

${signedHeaders}
${payloadHash}`;
  const date2 = getDate(timestamp);
  const signature = hmacSha256Hex(`TC3-HMAC-SHA256
${timestamp}
${date2}/${service}/tc3_request
${sha256(canonicalRequest)}`, hmacSha256("tc3_request", hmacSha256(service, hmacSha256(date2, `TC3${secretKey}`))));
  return `TC3-HMAC-SHA256 Credential=${secretId}/${date2}/${service}/tc3_request, SignedHeaders=${signedHeaders}, Signature=${signature}`;
};

// node_modules/@langchain/community/dist/chat_models/tencent_hunyuan/base.js
function messageToRole(message) {
  const type = message._getType();
  switch (type) {
    case "ai":
      return "assistant";
    case "human":
      return "user";
    case "system":
      return "system";
    case "function":
      throw new Error("Function messages not supported");
    case "generic": {
      if (!ChatMessage.isInstance(message)) {
        throw new Error("Invalid generic chat message");
      }
      if (["system", "assistant", "user"].includes(message.role)) {
        return message.role;
      }
      throw new Error(`Unknown message role: ${message.role}`);
    }
    default:
      throw new Error(`Unknown message type: ${type}`);
  }
}
var ChatTencentHunyuan = class extends BaseChatModel {
  static lc_name() {
    return "ChatTencentHunyuan";
  }
  get callKeys() {
    return ["stop", "signal", "options"];
  }
  get lc_secrets() {
    return {
      tencentSecretId: "TENCENT_SECRET_ID",
      tencentSecretKey: "TENCENT_SECRET_KEY"
    };
  }
  get lc_aliases() {
    return void 0;
  }
  constructor(fields) {
    super(fields ?? {});
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "tencentSecretId", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "tencentSecretKey", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "streaming", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "host", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "hunyuan.tencentcloudapi.com"
    });
    Object.defineProperty(this, "model", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "hunyuan-pro"
    });
    Object.defineProperty(this, "temperature", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "topP", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "sign", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.tencentSecretId = fields?.tencentSecretId ?? getEnvironmentVariable("TENCENT_SECRET_ID");
    if (!this.tencentSecretId) {
      throw new Error("Tencent SecretID not found");
    }
    this.tencentSecretKey = fields?.tencentSecretKey ?? getEnvironmentVariable("TENCENT_SECRET_KEY");
    if (!this.tencentSecretKey) {
      throw new Error("Tencent SecretKey not found");
    }
    this.host = fields?.host ?? this.host;
    this.topP = fields?.topP ?? this.topP;
    this.model = fields?.model ?? this.model;
    this.streaming = fields?.streaming ?? this.streaming;
    this.temperature = fields?.temperature ?? this.temperature;
    if (!fields?.sign) {
      throw new Error("Sign method undefined");
    }
    this.sign = fields?.sign;
  }
  /**
   * Get the parameters used to invoke the model
   */
  invocationParams() {
    return {
      TopP: this.topP,
      Model: this.model,
      Stream: this.streaming,
      Temperature: this.temperature
    };
  }
  /**
   * Get the HTTP headers used to invoke the model
   */
  invocationHeaders(request, timestamp) {
    const headers = {
      "Content-Type": "application/json",
      "X-TC-Action": "ChatCompletions",
      "X-TC-Version": "2023-09-01",
      "X-TC-Timestamp": timestamp.toString(),
      Authorization: ""
    };
    headers.Authorization = this.sign(this.host, request, timestamp, this.tencentSecretId ?? "", this.tencentSecretKey ?? "", headers);
    return headers;
  }
  async *_streamResponseChunks(messages, options, runManager) {
    const stream = await this.caller.call(async () => this.createStream({
      ...this.invocationParams(),
      Messages: messages.map((message) => ({
        Role: messageToRole(message),
        Content: message.content
      }))
    }, options?.signal));
    for await (const chunk of stream) {
      if (chunk.ErrorMsg?.Message) {
        throw new Error(`[${chunk.Id}] ${chunk.ErrorMsg?.Message}`);
      }
      const { Choices: [{ Delta: { Content }, FinishReason: FinishReason2 }] } = chunk;
      yield new ChatGenerationChunk({
        text: Content,
        message: new AIMessageChunk({ content: Content }),
        generationInfo: FinishReason2 ? {
          usage: chunk.Usage,
          request_id: chunk.Id,
          finish_reason: FinishReason2
        } : void 0
      });
      await runManager?.handleLLMNewToken(Content);
    }
  }
  async *createStream(request, signal) {
    const timestamp = Math.trunc(Date.now() / 1e3);
    const headers = this.invocationHeaders(request, timestamp);
    const response = await fetch(`https://${this.host}`, {
      headers,
      method: "POST",
      body: JSON.stringify(request),
      signal
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Hunyuan call failed with status code ${response.status}: ${text}`);
    }
    if (!response.headers.get("content-type")?.startsWith("text/event-stream")) {
      const text = await response.text();
      try {
        const data = JSON.parse(text);
        if (data?.Response?.Error?.Message) {
          throw new Error(`[${data?.Response?.RequestId}] ${data?.Response?.Error?.Message}`);
        }
      } catch (e) {
        throw new Error(`Could not begin Hunyuan stream, received a non-JSON parseable response: ${text}.`);
      }
    }
    if (!response.body) {
      throw new Error(`Could not begin Hunyuan stream, received empty body response.`);
    }
    const decoder = new TextDecoder("utf-8");
    const stream = IterableReadableStream.fromReadableStream(response.body);
    let extra = "";
    for await (const chunk of stream) {
      const decoded = extra + decoder.decode(chunk);
      const lines = decoded.split("\n");
      extra = lines.pop() || "";
      for (const line of lines) {
        if (!line.startsWith("data:")) {
          continue;
        }
        try {
          yield JSON.parse(line.slice("data:".length).trim());
        } catch (e) {
          console.warn(`Received a non-JSON parseable chunk: ${line}`);
        }
      }
    }
  }
  /** @ignore */
  async _generate(messages, options, runManager) {
    const params = this.invocationParams();
    if (params.Stream) {
      let usage = {};
      const stream = this._streamResponseChunks(messages, options ?? {}, runManager);
      const generations = [];
      for await (const chunk of stream) {
        const text2 = chunk.text ?? "";
        generations.push({
          text: text2,
          message: new AIMessage(text2)
        });
        usage = chunk.generationInfo?.usage;
      }
      return {
        generations,
        llmOutput: {
          tokenUsage: {
            totalTokens: usage.TotalTokens,
            promptTokens: usage.PromptTokens,
            completionTokens: usage.CompletionTokens
          }
        }
      };
    }
    const data = await this.completionWithRetry({
      ...params,
      Messages: messages.map((message) => ({
        Role: messageToRole(message),
        Content: message.content
      }))
    }, options?.signal).then((data2) => {
      const response = data2?.Response;
      if (response?.Error?.Message) {
        throw new Error(`[${response.RequestId}] ${response.Error.Message}`);
      }
      return response;
    });
    const text = data.Choices[0]?.Message?.Content ?? "";
    const { TotalTokens = 0, PromptTokens = 0, CompletionTokens = 0 } = data.Usage;
    return {
      generations: [
        {
          text,
          message: new AIMessage(text)
        }
      ],
      llmOutput: {
        tokenUsage: {
          totalTokens: TotalTokens,
          promptTokens: PromptTokens,
          completionTokens: CompletionTokens
        }
      }
    };
  }
  /** @ignore */
  async completionWithRetry(request, signal) {
    return this.caller.call(async () => {
      const timestamp = Math.trunc(Date.now() / 1e3);
      const headers = this.invocationHeaders(request, timestamp);
      const response = await fetch(`https://${this.host}`, {
        headers,
        method: "POST",
        body: JSON.stringify(request),
        signal
      });
      return response.json();
    });
  }
  _llmType() {
    return "tencenthunyuan";
  }
  /** @ignore */
  _combineLLMOutput() {
    return [];
  }
};

// node_modules/@langchain/community/dist/chat_models/tencent_hunyuan/index.js
var ChatTencentHunyuan2 = class extends ChatTencentHunyuan {
  constructor(fields) {
    super({ ...fields, sign });
  }
};

// src/routes/chat.ts
var chat = new Hono2();
chat.get("/google", async (ctx) => {
  const message = ctx.req.query("message") || "Hello";
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-pro",
    maxOutputTokens: 2048
  });
  const res = await model.invoke([["human", message]]);
  return ctx.text(res.content);
});
chat.get("/hunyuan", async (ctx) => {
  const message = ctx.req.query("message") || "\u4F60\u597D\u554A";
  const hunyuanPro = new ChatTencentHunyuan2({
    streaming: false,
    temperature: 1
  });
  const messages = [new HumanMessage(message)];
  let res = await hunyuanPro.invoke(messages);
  return ctx.text(res.content);
});
var chat_default = chat;

// node_modules/@langchain/community/dist/embeddings/ollama.js
var OllamaEmbeddings = class extends Embeddings {
  constructor(params) {
    super({ maxConcurrency: 1, ...params });
    Object.defineProperty(this, "model", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "llama2"
    });
    Object.defineProperty(this, "baseUrl", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "http://localhost:11434"
    });
    Object.defineProperty(this, "headers", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "keepAlive", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "5m"
    });
    Object.defineProperty(this, "requestOptions", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    if (params?.model) {
      this.model = params.model;
    }
    if (params?.baseUrl) {
      this.baseUrl = params.baseUrl;
    }
    if (params?.headers) {
      this.headers = params.headers;
    }
    if (params?.keepAlive) {
      this.keepAlive = params.keepAlive;
    }
    if (params?.requestOptions) {
      this.requestOptions = this._convertOptions(params.requestOptions);
    }
  }
  /** convert camelCased Ollama request options like "useMMap" to
   * the snake_cased equivalent which the ollama API actually uses.
   * Used only for consistency with the llms/Ollama and chatModels/Ollama classes
   */
  _convertOptions(requestOptions) {
    const snakeCasedOptions = {};
    const mapping = {
      embeddingOnly: "embedding_only",
      f16KV: "f16_kv",
      frequencyPenalty: "frequency_penalty",
      keepAlive: "keep_alive",
      logitsAll: "logits_all",
      lowVram: "low_vram",
      mainGpu: "main_gpu",
      mirostat: "mirostat",
      mirostatEta: "mirostat_eta",
      mirostatTau: "mirostat_tau",
      numBatch: "num_batch",
      numCtx: "num_ctx",
      numGpu: "num_gpu",
      numGqa: "num_gqa",
      numKeep: "num_keep",
      numPredict: "num_predict",
      numThread: "num_thread",
      penalizeNewline: "penalize_newline",
      presencePenalty: "presence_penalty",
      repeatLastN: "repeat_last_n",
      repeatPenalty: "repeat_penalty",
      ropeFrequencyBase: "rope_frequency_base",
      ropeFrequencyScale: "rope_frequency_scale",
      temperature: "temperature",
      stop: "stop",
      tfsZ: "tfs_z",
      topK: "top_k",
      topP: "top_p",
      typicalP: "typical_p",
      useMLock: "use_mlock",
      useMMap: "use_mmap",
      vocabOnly: "vocab_only"
    };
    for (const [key, value] of Object.entries(requestOptions)) {
      const snakeCasedOption = mapping[key];
      if (snakeCasedOption) {
        snakeCasedOptions[snakeCasedOption] = value;
      }
    }
    return snakeCasedOptions;
  }
  async _request(prompt) {
    const { model, baseUrl, keepAlive, requestOptions } = this;
    let formattedBaseUrl = baseUrl;
    if (formattedBaseUrl.startsWith("http://localhost:")) {
      formattedBaseUrl = formattedBaseUrl.replace("http://localhost:", "http://127.0.0.1:");
    }
    const response = await fetch(`${formattedBaseUrl}/api/embeddings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.headers
      },
      body: JSON.stringify({
        prompt,
        model,
        keep_alive: keepAlive,
        options: requestOptions
      })
    });
    if (!response.ok) {
      throw new Error(`Request to Ollama server failed: ${response.status} ${response.statusText}`);
    }
    const json = await response.json();
    return json.embedding;
  }
  async _embed(texts) {
    const embeddings2 = await Promise.all(texts.map((text) => this.caller.call(() => this._request(text))));
    return embeddings2;
  }
  async embedDocuments(documents) {
    return this._embed(documents);
  }
  async embedQuery(document) {
    return (await this.embedDocuments([document]))[0];
  }
};

// src/routes/ollama.ts
var ollama = new Hono2();
var embeddings = new OllamaEmbeddings({
  model: "nomic-embed-text",
  // default value
  baseUrl: "http://localhost:11434"
  // default value
});
ollama.get("/embedding", async (ctx) => {
  const documents = ["Hello World!", "Bye Bye"];
  const documentEmbeddings = await embeddings.embedDocuments(documents);
  return ctx.text(documentEmbeddings.toString());
});
var ollama_default = ollama;

// src/routes/index.ts
var routes = { chat: chat_default, ollama: ollama_default };
var routes_default = routes;

// src/app.ts
var app = new Hono2();
app.route("/chat", routes_default.chat);
app.route("/ollama", routes_default.ollama);
app.get("/", (c) => {
  return c.text("Hello Hono!");
});
var app_default = app;

// src/index.ts
var port = 3e3;
console.log(`Server is running on port ${port}`);
serve({
  fetch: app_default.fetch,
  port
});
/*! Bundled license information:

@google/generative-ai/dist/index.mjs:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@google/generative-ai/dist/index.mjs:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@langchain/core/dist/utils/fast-json-patch/src/helpers.js:
  (*!
   * https://github.com/Starcounter-Jack/JSON-Patch
   * (c) 2017-2022 Joachim Wester
   * MIT licensed
   *)

@langchain/core/dist/utils/fast-json-patch/src/duplex.js:
  (*!
   * https://github.com/Starcounter-Jack/JSON-Patch
   * (c) 2013-2021 Joachim Wester
   * MIT license
   *)

@langchain/core/dist/utils/js-sha1/hash.js:
  (*
   * [js-sha1]{@link https://github.com/emn178/js-sha1}
   *
   * @version 0.6.0
   * @author Chen, Yi-Cyuan [emn178@gmail.com]
   * @copyright Chen, Yi-Cyuan 2014-2017
   * @license MIT
   *)
*/
//# sourceMappingURL=index.js.map
