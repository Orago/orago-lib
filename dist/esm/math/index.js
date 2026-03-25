import { clamp, flipRotate } from "./functions.js";
import { GeometryConversions, PointUtils, RectUtils } from "./math2d.js";
export { clamp, difference, flipRotate, getRadialDistance, random } from "./functions.js";
export * from "./types.js";
export class Geometry {
    static Conversions = GeometryConversions;
    static Point = PointUtils;
    static Rect = RectUtils;
    static flipRotate = flipRotate;
    static clamp = clamp;
}
