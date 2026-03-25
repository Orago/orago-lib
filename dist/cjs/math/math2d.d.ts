import type { Point, Size, Rectangle, Line, VecPoint, VecSize, VecRectangle, VecLine, VecCircle, Circle } from "./types.js";
export declare const GeometryConversions: {
    readonly vecToPoint: ([x, y]: VecPoint) => Point;
    readonly vecToSize: ([width, height]: VecSize) => Size;
    readonly vecToLine: ([x1, y1, x2, y2]: VecLine) => Line;
    readonly vecToRectangle: ([width, height]: VecSize) => Size;
    readonly vecToCircle: ([x, y, radius]: VecCircle) => Circle;
    readonly pointToVec: ({ x, y }: Point) => VecPoint;
    readonly sizeToVec: ({ width, height }: Size) => VecSize;
    readonly lineToVec: ({ x1, y1, x2, y2 }: Line) => VecLine;
    readonly rectangleToVec: ({ x, y, width, height }: Rectangle) => VecRectangle;
    readonly circleToVec: ({ x, y, radius }: Circle) => VecCircle;
    readonly sizeToRectangle: (size: Size) => Rectangle;
    readonly circleToRectangle: ({ x, y, radius }: Circle) => Rectangle;
    readonly rectangleToCircle: ({ x, y, width, height }: Rectangle) => Circle;
};
export declare class PointUtils {
    static distance(a: Point, b: Point): number;
    static add(a: Point, b: Point): Point;
}
export declare class RectUtils {
    static intersects(a: Rectangle, b: Rectangle): boolean;
    static contains(rect: Rectangle, point: Point): boolean;
    static getCenter(rect: Rectangle | Size): Point;
    static centerAt(rect: Size, point: Point): Rectangle;
    static centerInside(container: Rectangle, inner: Size): Rectangle;
    static scaleToFitRatio(container: Size, child: Size): number;
    static scaleToFit(container: Size, child: Size): Size;
}
