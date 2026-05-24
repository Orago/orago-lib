import { clamp, flipRotate } from "./math/functions.js";
import { GeometryConversions, PointUtils, RectUtils, vec_offsets, } from "./math/math2d.js";
export { clamp, difference, flipRotate, getRadialDistance, random, } from "./math/functions.js";
export * from "./math/types.js";
export class Geometry {
    static Conversions = GeometryConversions;
    static Point = PointUtils;
    static Rect = RectUtils;
    static VecOffset = vec_offsets;
    static flipRotate = flipRotate;
    static clamp = clamp;
}
