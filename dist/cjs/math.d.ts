import { flipRotate } from "./math/functions.js";
import { PointUtils, RectUtils } from "./math/math2d.js";
import type { Line, Point, Rectangle, Size } from "./math/types.js";
export { clamp, difference, flipRotate, getRadialDistance, random, } from "./math/functions.js";
export * from "./math/types.js";
export declare class Geometry {
    static readonly Conversions: {
        readonly vecToPoint: ([x, y]: import("./math/types.js").VecPoint) => Point;
        readonly vecToSize: ([width, height]: import("./math/types.js").VecSize) => Size;
        readonly vecToLine: ([x1, y1, x2, y2]: import("./math/types.js").VecLine) => Line;
        readonly vecToRectangle: ([x, y, width, height]: import("./math/types.js").VecRectangle) => Rectangle;
        readonly vecToCircle: ([x, y, radius]: import("./math/types.js").VecCircle) => import("./math/types.js").Circle;
        readonly pointToVec: ({ x, y }: Point) => import("./math/types.js").VecPoint;
        readonly sizeToVec: ({ width, height }: Size) => import("./math/types.js").VecSize;
        readonly lineToVec: ({ x1, y1, x2, y2 }: Line) => import("./math/types.js").VecLine;
        readonly rectangleToVec: ({ x, y, width, height }: Rectangle) => import("./math/types.js").VecRectangle;
        readonly circleToVec: ({ x, y, radius }: import("./math/types.js").Circle) => import("./math/types.js").VecCircle;
        readonly sizeToRectangle: (size: Size) => Rectangle;
        readonly circleToRectangle: ({ x, y, radius }: import("./math/types.js").Circle) => Rectangle;
        readonly rectangleToCircle: ({ x, y, width, height }: Rectangle) => import("./math/types.js").Circle;
    };
    static readonly Point: typeof PointUtils;
    static readonly Rect: typeof RectUtils;
    static VecOffset: {
        readonly point: {
            readonly x: 0;
            readonly y: 1;
        };
        readonly size: {
            readonly width: 0;
            readonly height: 1;
        };
        readonly rectangle: {
            readonly x: 0;
            readonly y: 1;
            readonly width: 2;
            readonly height: 3;
        };
        readonly line: {
            readonly x1: 0;
            readonly y1: 1;
            readonly x2: 2;
            readonly y2: 3;
        };
        readonly circle: {
            readonly x: 0;
            readonly y: 1;
            readonly radius: 2;
        };
    };
    static readonly flipRotate: typeof flipRotate;
    static readonly clamp: (value: number, min?: number, max?: number) => number;
    Point: Point;
    Size: Size;
    Rectangle: Rectangle;
    Line: Line;
}
