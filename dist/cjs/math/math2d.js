"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RectUtils = exports.PointUtils = exports.vec_offsets = exports.GeometryConversions = void 0;
exports.GeometryConversions = {
    vecToPoint: ([x, y]) => ({ x, y }),
    vecToSize: ([width, height]) => ({ width, height }),
    vecToLine: ([x1, y1, x2, y2]) => ({ x1, y1, x2, y2 }),
    vecToRectangle: ([x, y, width, height]) => ({
        x,
        y,
        width,
        height,
    }),
    vecToCircle: ([x, y, radius]) => ({ x, y, radius }),
    pointToVec: ({ x, y }) => [x, y],
    sizeToVec: ({ width, height }) => [width, height],
    lineToVec: ({ x1, y1, x2, y2 }) => [x1, y1, x2, y2],
    rectangleToVec: ({ x, y, width, height }) => [
        x,
        y,
        width,
        height,
    ],
    circleToVec: ({ x, y, radius }) => [x, y, radius],
    sizeToRectangle: (size) => ({
        x: 0,
        y: 0,
        width: size.width,
        height: size.height,
    }),
    circleToRectangle: ({ x, y, radius }) => ({
        x: x - radius,
        y: y - radius,
        width: radius * 2,
        height: radius * 2,
    }),
    rectangleToCircle: ({ x, y, width, height }) => ({
        x: x + width / 2,
        y: y + height / 2,
        radius: Math.min(width, height) / 2,
    }),
};
exports.vec_offsets = {
    point: { x: 0, y: 1 },
    size: { width: 0, height: 1 },
    rectangle: { x: 0, y: 1, width: 2, height: 3 },
    line: { x1: 0, y1: 1, x2: 2, y2: 3 },
    circle: { x: 0, y: 1, radius: 2 },
};
class PointUtils {
    static distance(a, b) {
        return Math.hypot(a.x - b.x, a.y - b.y);
    }
    static add(a, b) {
        return { x: a.x + b.x, y: a.y + b.y };
    }
}
exports.PointUtils = PointUtils;
class RectUtils {
    static intersects(a, b) {
        return (a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y);
    }
    static contains(rect, point) {
        return (point.x >= rect.x &&
            point.x <= rect.x + rect.width &&
            point.y >= rect.y &&
            point.y <= rect.y + rect.height);
    }
    static getCenter(rect) {
        return {
            x: ("x" in rect ? rect.x : 0) + rect.width / 2,
            y: ("y" in rect ? rect.y : 0) + rect.height / 2,
        };
    }
    static centerAt(rect, point) {
        return {
            x: point.x - rect.width / 2,
            y: point.y - rect.height / 2,
            width: rect.width,
            height: rect.height,
        };
    }
    static centerInside(container, inner) {
        return {
            x: container.x + (container.width - inner.width) / 2,
            y: container.y + (container.height - inner.height) / 2,
            width: inner.width,
            height: inner.height,
        };
    }
    static scaleToFitRatio(container, child) {
        const container_ratio = container.width / container.height;
        const rect_ratio = child.width / child.height;
        if (rect_ratio > container_ratio) {
            return container.width / child.width;
        }
        else {
            return container.height / child.height;
        }
    }
    static scaleToFit(container, child) {
        const scale_factor = RectUtils.scaleToFitRatio(container, child);
        return {
            width: child.width * scale_factor,
            height: child.height * scale_factor,
        };
    }
}
exports.RectUtils = RectUtils;
