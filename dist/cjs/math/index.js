"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Geometry = exports.random = exports.getRadialDistance = exports.flipRotate = exports.difference = exports.clamp = void 0;
const functions_js_1 = require("./functions.js");
const math2d_js_1 = require("./math2d.js");
var functions_js_2 = require("./functions.js");
Object.defineProperty(exports, "clamp", { enumerable: true, get: function () { return functions_js_2.clamp; } });
Object.defineProperty(exports, "difference", { enumerable: true, get: function () { return functions_js_2.difference; } });
Object.defineProperty(exports, "flipRotate", { enumerable: true, get: function () { return functions_js_2.flipRotate; } });
Object.defineProperty(exports, "getRadialDistance", { enumerable: true, get: function () { return functions_js_2.getRadialDistance; } });
Object.defineProperty(exports, "random", { enumerable: true, get: function () { return functions_js_2.random; } });
__exportStar(require("./types.js"), exports);
class Geometry {
    static Conversions = math2d_js_1.GeometryConversions;
    static Point = math2d_js_1.PointUtils;
    static Rect = math2d_js_1.RectUtils;
    static flipRotate = functions_js_1.flipRotate;
    static clamp = functions_js_1.clamp;
}
exports.Geometry = Geometry;
