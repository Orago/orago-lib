import { flipRotate } from "./functions.js";
import { PointUtils, RectUtils } from "./math2d.js";
import type { Line, Point, Rectangle, Size } from "./types.js";
export { clamp, difference, flipRotate, getRadialDistance, random } from "./functions.js";
export * from "./types.js";
export declare class Geometry {
    static readonly Conversions: {
        readonly vecToPoint: ([x, y]: import("./types.js").VecPoint) => Point;
        readonly vecToSize: ([width, height]: import("./types.js").VecSize) => Size;
        readonly vecToLine: ([x1, y1, x2, y2]: import("./types.js").VecLine) => Line;
        readonly vecToRectangle: ([width, height]: import("./types.js").VecSize) => Size;
        readonly vecToCircle: ([x, y, radius]: import("./types.js").VecCircle) => import("./types.js").Circle;
        readonly pointToVec: ({ x, y }: Point) => import("./types.js").VecPoint;
        readonly sizeToVec: ({ width, height }: Size) => import("./types.js").VecSize;
        readonly lineToVec: ({ x1, y1, x2, y2 }: Line) => import("./types.js").VecLine;
        readonly rectangleToVec: ({ x, y, width, height }: Rectangle) => import("./types.js").VecRectangle;
        readonly circleToVec: ({ x, y, radius }: import("./types.js").Circle) => import("./types.js").VecCircle;
        readonly sizeToRectangle: (size: Size) => Rectangle;
        readonly circleToRectangle: ({ x, y, radius }: import("./types.js").Circle) => Rectangle;
        readonly rectangleToCircle: ({ x, y, width, height }: Rectangle) => import("./types.js").Circle;
    };
    static readonly Point: typeof PointUtils;
    static readonly Rect: typeof RectUtils;
    static readonly flipRotate: typeof flipRotate;
    static readonly clamp: (value: number, min?: number, max?: number) => number;
    Point: Point;
    Size: Size;
    Rectangle: Rectangle;
    Line: Line;
}
