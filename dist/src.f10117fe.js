// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/os-browserify/browser.js":[function(require,module,exports) {
exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

exports.homedir = function () {
	return '/'
};

},{}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"node_modules/uniqid/index.js":[function(require,module,exports) {
var process = require("process");
/* 
(The MIT License)
Copyright (c) 2014-2019 Halász Ádám <mail@adamhalasz.com>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

//  Unique Hexatridecimal ID Generator
// ================================================

//  Dependencies
// ================================================
var pid = process && process.pid ? process.pid.toString(36) : '' ;
var address = '';
if(typeof __webpack_require__ !== 'function'){
    var mac = '', networkInterfaces = require('os').networkInterfaces();
    for(let interface_key in networkInterfaces){
        const networkInterface = networkInterfaces[interface_key];
        const length = networkInterface.length;
        for(var i = 0; i < length; i++){
            if(networkInterface[i].mac && networkInterface[i].mac != '00:00:00:00:00:00'){
                mac = networkInterface[i].mac; break;
            }
        }
    }
    address = mac ? parseInt(mac.replace(/\:|\D+/gi, '')).toString(36) : '' ;
} 

//  Exports
// ================================================
module.exports = module.exports.default = function(prefix, suffix){ return (prefix ? prefix : '') + address + pid + now().toString(36) + (suffix ? suffix : ''); }
module.exports.process = function(prefix, suffix){ return (prefix ? prefix : '') + pid + now().toString(36) + (suffix ? suffix : ''); }
module.exports.time    = function(prefix, suffix){ return (prefix ? prefix : '') + now().toString(36) + (suffix ? suffix : ''); }

//  Helpers
// ================================================
function now(){
    var time = Date.now();
    var last = now.last || time;
    return now.last = time > last ? time : last + 1;
}

},{"os":"../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/os-browserify/browser.js","process":"../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/process/browser.js"}],"src/model.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Expense = exports.Income = exports.services = void 0;

var uniqid_1 = __importDefault(require("uniqid"));

var data = {
  inc: [],
  exp: [],
  budget: 0,
  percentage: 0,
  totalInc: 0,
  totalExp: 0
};
exports.services = {
  addIncome: function addIncome(income) {
    data.inc.push(income);
  },
  addExpense: function addExpense(expense) {
    data.exp.push(expense);
  },
  updateGlobalIncome: function updateGlobalIncome(income, type) {
    // *- If we add income increase income count,
    // *- if we delete income decrease income count.
    type === "+" ? data.totalInc += income : data.totalInc -= income;
    return data.totalInc;
  },
  updateGlobalExpense: function updateGlobalExpense(expense, type) {
    // *- If we add expense increase expense count,
    // *- if we delete expense decrease expense count.
    type === "+" ? data.totalExp += expense : data.totalExp -= expense;
    return data.totalExp;
  },
  addGlobalExpensePercent: function addGlobalExpensePercent() {
    if (data.totalInc === 0) data.percentage = 0;else {
      data.percentage = Math.round(data.totalExp / data.totalInc * 100);
    }
    return data.percentage;
  },
  updateExpensePercent: function updateExpensePercent() {
    var percentages = [];

    if (data.totalInc === 0) {
      data.exp.forEach(function (exp) {
        exp.percentage = 0;
      });
      data.exp.forEach(function (exp) {
        percentages.push(exp.percentage);
      });
    } else {
      data.exp.forEach(function (exp) {
        exp.percentage = Math.round(exp.value / data.totalInc * 100);
      });
      data.exp.forEach(function (exp) {
        percentages.push(exp.percentage);
      });
    }

    return percentages;
  },
  addBudget: function addBudget(budget, type) {
    type === "+" ? data.budget += budget : data.budget -= budget;
    return data.budget;
  },
  deleteIncome: function deleteIncome(id) {
    data.inc.splice(data.inc.findIndex(function (inc) {
      return inc.id === id;
    }), 1);
  },
  deleteExpense: function deleteExpense(id) {
    data.exp.splice(data.exp.findIndex(function (exp) {
      return exp.id === id;
    }), 1);
  },
  getValue: function getValue(id, type) {
    var value;

    if (type === "+") {
      data.inc.forEach(function (inc) {
        if (inc.id === id) value = inc.value;
      });
    } else {
      data.exp.forEach(function (exp) {
        if (exp.id === id) value = exp.value;
      });
    }

    return value;
  }
};

var Income =
/** @class */
function () {
  function Income(description, value) {
    this.id = uniqid_1.default();
    this.description = description;
    this.value = value;
  }

  return Income;
}();

exports.Income = Income;

var Expense =
/** @class */
function () {
  function Expense(description, value) {
    this.id = uniqid_1.default();
    this.description = description;
    this.value = value;
    this.percentage = Math.round(this.value / data.totalInc * 100);
  }

  return Expense;
}();

exports.Expense = Expense;
},{"uniqid":"node_modules/uniqid/index.js"}],"src/view.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteElement = exports.updateExpensePercent = exports.renderGlobalExpensePercent = exports.renderGlobalExpense = exports.renderGlobalIncome = exports.renderBudget = exports.renderExpense = exports.renderIncome = exports.DOMElements = void 0;
exports.DOMElements = {
  addBtn: document.querySelector(".add__btn"),
  expense: document.querySelector(".expense"),
  income: document.querySelector(".income"),
  budgetDescription: document.querySelector(".budget-description"),
  inputValue: document.querySelector(".input__value"),
  inputSelect: document.querySelector(".input__select"),
  inputDescription: document.querySelector(".input__description"),
  totalBudget: document.querySelector(".budget__monthly-value"),
  totalIncome: document.querySelector(".budget__total-value--income"),
  totalExpense: document.querySelector(".budget__total-value--expense"),
  totalPercentage: document.querySelector(".budget__total-percentage")
};

exports.renderIncome = function (description, value, id) {
  var income = "\n     <div class=\"budget-description__list clear-fix\" id=" + id + ">\n        <p class=\"budget-description__type\">" + description + "</p>\n        <button class=\"btn-delete btn-delete--inc\">\n        <ion-icon name=\"close-circle-outline\" class=\"btn-delete__icon btn-delete__icon--inc\"></ion-icon>\n        </button>\n         <p class=\"budget-description__value\">" + value + "</p>\n     </div>";
  exports.DOMElements.income.insertAdjacentHTML("beforeend", income);
};

exports.renderExpense = function (description, value, percentage, id) {
  var expense = "\n    <div class=\"budget-description__list clear-fix\" id=" + id + ">\n        <p class=\"budget-description__type\">" + description + "</p>\n        <button class=\"btn-delete btn-delete--exp\">\n        <ion-icon name=\"close-circle-outline\" class=\"btn-delete__icon btn-delete__icon--exp\"></ion-icon>\n        </button>\n        <p class=\"budget-description__value\">" + value + "</p>\n        <p class=\"budget__description-percentage\">" + percentage + "%</p>\n    </div>";
  exports.DOMElements.expense.insertAdjacentHTML("beforeend", expense);
};

exports.renderBudget = function (budget) {
  exports.DOMElements.totalBudget.textContent = "" + budget.toString();
};

exports.renderGlobalIncome = function (income) {
  exports.DOMElements.totalIncome.textContent = "" + income.toString();
};

exports.renderGlobalExpense = function (expense) {
  exports.DOMElements.totalExpense.textContent = "" + expense.toString();
};

exports.renderGlobalExpensePercent = function (percent) {
  // DOMElements.totalPercentage.textContent = `${percent.toString()}%`;
  exports.DOMElements.totalPercentage.textContent = "" + (percent > 0 ? percent.toString() + "%" : "---");
};

exports.updateExpensePercent = function (percents) {
  var expensePercent = document.querySelectorAll(".budget__description-percentage"); //*- Loop over every expense percentage and update it.

  Array.from(expensePercent).forEach(function (percent, index) {
    percent.textContent = "" + (percents[index] > 0 ? percents[index].toString() + "%" : "---");
  });
};

exports.deleteElement = function (id) {
  var el = document.getElementById(id);
  el.parentElement.removeChild(el);
};
},{}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var model_1 = require("./model");

var view = __importStar(require("./view"));

var setupEventListeners = function setupEventListeners() {
  view.DOMElements.addBtn.addEventListener("click", function () {
    return validateInput();
  });
  view.DOMElements.inputSelect.addEventListener("click", function () {
    return focusSelected();
  });
  view.DOMElements.budgetDescription.addEventListener("click", function (event) {
    if (event.target.closest(".btn-delete")) deleteController(event);
  });
};

var validateInput = function validateInput() {
  var description = view.DOMElements.inputDescription.value;
  var value = parseInt(view.DOMElements.inputValue.value);
  if (description !== "" && value !== NaN && value > 0) addController(description, value);
};

var addController = function addController(description, value) {
  clearFields();
  var selectedType = view.DOMElements.inputSelect.value;

  if (selectedType === "+") {
    createIncome(description, value);
    handleGlobalIncome(value); //*- Any time we add new income update Percentages of expenses.

    updatePercentages();
  } else {
    createExpense(description, value);
    handleGlobalExpense(value);
  } // *- Update global budget.


  updateBudget(value, selectedType);
};

var deleteController = function deleteController(event) {
  var className = event.target.closest(".btn-delete").className.split(" ")[1];
  var id = event.target.closest(".btn-delete").parentElement.id;
  className === "btn-delete--inc" ? deleteIncome(id) : deleteExpense(id);
};

var updateBudget = function updateBudget(value, type) {
  //*- Update global budget.
  var budget = model_1.services.addBudget(value, type); //*- Render global budget on the UI.

  view.renderBudget(budget);
};

var updatePercentages = function updatePercentages() {
  //*- Update global expense percentage.
  var globalExpPercent = model_1.services.addGlobalExpensePercent(); //*- Update global expense percentage on the UI.

  view.renderGlobalExpensePercent(globalExpPercent); //*- Update Percentages for every expense.

  view.updateExpensePercent(model_1.services.updateExpensePercent());
};

var createIncome = function createIncome(description, value) {
  var income = new model_1.Income(description, value); //*- Add income in dataStructure.

  model_1.services.addIncome(income); //*- Render Income on UI.

  view.renderIncome(income.description, income.value, income.id);
};

var createExpense = function createExpense(description, value) {
  var expense = new model_1.Expense(description, value); //*- Add expense in dataStructure.

  model_1.services.addExpense(expense); //*- Render expense on UI.

  view.renderExpense(expense.description, expense.value, expense.percentage, expense.id);
};

var handleGlobalIncome = function handleGlobalIncome(value) {
  //*- Update global income.
  var globalIncome = model_1.services.updateGlobalIncome(value, "+"); //*- Render global income on the UI.

  view.renderGlobalIncome(globalIncome);
};

var handleGlobalExpense = function handleGlobalExpense(value) {
  //*- Update global expense.
  var globalExpense = model_1.services.updateGlobalExpense(value, "+"); //*- Update global expense percentage.

  var globalExpPercent = model_1.services.addGlobalExpensePercent(); //*- Render global expense on the UI.

  view.renderGlobalExpense(globalExpense); //*- Render global expense percentage on the UI.

  view.renderGlobalExpensePercent(globalExpPercent);
};

var deleteIncome = function deleteIncome(id) {
  // *- Get value to update it when we delete income.
  var value = model_1.services.getValue(id, "+"); //*- Delete income from dataStructure.

  model_1.services.deleteIncome(id); //*- Delete income from UI.

  view.deleteElement(id); //*- Update global income.

  view.renderGlobalIncome(model_1.services.updateGlobalIncome(value, "-")); //*- Update global and expense percentage.

  updatePercentages(); //*- Update global budget.

  updateBudget(value, "-");
};

var deleteExpense = function deleteExpense(id) {
  // *- Get value to update it when we delete expense.
  var value = model_1.services.getValue(id, "-"); //*- Delete income from dataStructure.

  model_1.services.deleteExpense(id); //*- Delete income from UI.

  view.deleteElement(id); //*- Update global expense.

  view.renderGlobalExpense(model_1.services.updateGlobalExpense(value, "-")); //*- Update global and expense percentage.

  updatePercentages(); //*- Update global budget.

  updateBudget(value, "+");
};

var clearFields = function clearFields() {
  view.DOMElements.inputDescription.value = "";
  view.DOMElements.inputValue.value = "";
};

var focusSelected = function focusSelected() {
  var selectedType = view.DOMElements.inputSelect.value;
  var focusedElement = [view.DOMElements.inputDescription, view.DOMElements.inputValue, view.DOMElements.inputSelect];

  if (selectedType === "+") {
    focusedElement.forEach(function (element) {
      element.classList.remove("select__exp");
      element.classList.add("select__inc");
    });
  } else {
    focusedElement.forEach(function (element) {
      element.classList.remove("select__inc");
      element.classList.add("select__exp");
    });
  }
};

setupEventListeners();
},{"./model":"src/model.ts","./view":"src/view.ts"}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57554" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map