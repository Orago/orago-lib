"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OraLib = exports.ColorUtil = exports.StringUtil = exports.MathUtil = exports.OraColor = exports.OraString = exports.Cooldown = exports.Vector = exports.OraMath = exports.Geometry = exports.Status = exports.State = exports.DebouncedSignal = exports.Signal = exports.Emitter = exports.PromiseQueue = exports.trapValue = exports.makeCallableClass = void 0;
var class_js_1 = require("./class.js");
Object.defineProperty(exports, "makeCallableClass", { enumerable: true, get: function () { return class_js_1.makeCallableClass; } });
Object.defineProperty(exports, "trapValue", { enumerable: true, get: function () { return class_js_1.trapValue; } });
var queue_js_1 = require("./queue.js");
Object.defineProperty(exports, "PromiseQueue", { enumerable: true, get: function () { return queue_js_1.PromiseQueue; } });
var emitter_js_1 = require("./emitter.js");
Object.defineProperty(exports, "Emitter", { enumerable: true, get: function () { return emitter_js_1.default; } });
Object.defineProperty(exports, "Signal", { enumerable: true, get: function () { return emitter_js_1.Signal; } });
Object.defineProperty(exports, "DebouncedSignal", { enumerable: true, get: function () { return emitter_js_1.DebouncedSignal; } });
Object.defineProperty(exports, "State", { enumerable: true, get: function () { return emitter_js_1.State; } });
var status_js_1 = require("./status.js");
Object.defineProperty(exports, "Status", { enumerable: true, get: function () { return status_js_1.default; } });
var index_js_1 = require("./math/index.js");
Object.defineProperty(exports, "Geometry", { enumerable: true, get: function () { return index_js_1.Geometry; } });
exports.OraMath = require("./math/index.js");
exports.Vector = require("./vector.js");
exports.Cooldown = require("./cooldown.js");
exports.OraString = require("./string.js");
exports.OraColor = require("./colors.js");
exports.MathUtil = require("./math/index.js");
exports.StringUtil = require("./string.js");
exports.ColorUtil = require("./colors.js");
class OraLib {
}
exports.OraLib = OraLib;
