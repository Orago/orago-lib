import type {
	Point,
	Size,
	Rectangle,
	Line,
	VecPoint,
	VecSize,
	VecRectangle,
	VecLine,
	VecCircle,
	Circle,
} from "./types.js";

export const GeometryConversions = {
	//* Vec -> Object
	vecToPoint: ([x, y]: VecPoint): Point => ({ x, y }),
	vecToSize: ([width, height]: VecSize): Size => ({ width, height }),
	vecToLine: ([x1, y1, x2, y2]: VecLine): Line => ({ x1, y1, x2, y2 }),
	vecToRectangle: ([width, height]: VecSize): Size => ({ width, height }),
	vecToCircle: ([x, y, radius]: VecCircle): Circle => ({ x, y, radius }),
	//* Object -> Vec
	pointToVec: ({ x, y }: Point): VecPoint => [x, y],
	sizeToVec: ({ width, height }: Size): VecSize => [width, height],
	lineToVec: ({ x1, y1, x2, y2 }: Line): VecLine => [x1, y1, x2, y2],
	rectangleToVec: ({ x, y, width, height }: Rectangle): VecRectangle => [
		x,
		y,
		width,
		height,
	],
	circleToVec: ({ x, y, radius }: Circle): VecCircle => [x, y, radius],

	//* Other
	sizeToRectangle: (size: Size): Rectangle => ({
		x: 0,
		y: 0,
		width: size.width,
		height: size.height,
	}),

	circleToRectangle: ({ x, y, radius }: Circle): Rectangle => ({
		x: x - radius,
		y: y - radius,
		width: radius * 2,
		height: radius * 2,
	}),
	/**
	 * Warning, this keeps the circle within the rectangle
	 * and loses information of the rectangle
	 */
	rectangleToCircle: ({ x, y, width, height }: Rectangle): Circle => ({
		x: x + width / 2,
		y: y + height / 2,
		radius: Math.min(width, height) / 2,
	}),
} as const;

export class PointUtils {
	static distance(a: Point, b: Point): number {
		return Math.hypot(a.x - b.x, a.y - b.y);
	}

	static add(a: Point, b: Point): Point {
		return { x: a.x + b.x, y: a.y + b.y };
	}
}

export class RectUtils {
	static intersects(a: Rectangle, b: Rectangle): boolean {
		return (
			a.x < b.x + b.width &&
			a.x + a.width > b.x &&
			a.y < b.y + b.height &&
			a.y + a.height > b.y
		);
	}

	static contains(rect: Rectangle, point: Point): boolean {
		return (
			point.x >= rect.x &&
			point.x <= rect.x + rect.width &&
			point.y >= rect.y &&
			point.y <= rect.y + rect.height
		);
	}

	static getCenter(rect: Rectangle | Size): Point {
		return {
			x: ("x" in rect ? rect.x : 0) + rect.width / 2,
			y: ("y" in rect ? rect.y : 0) + rect.height / 2,
		};
	}

	static centerAt(rect: Size, point: Point): Rectangle {
		return {
			x: point.x - rect.width / 2,
			y: point.y - rect.height / 2,
			width: rect.width,
			height: rect.height,
		};
	}

	static centerInside(container: Rectangle, inner: Size): Rectangle {
		return {
			x: container.x + (container.width - inner.width) / 2,
			y: container.y + (container.height - inner.height) / 2,
			width: inner.width,
			height: inner.height,
		};
	}

	static scaleToFitRatio(container: Size, child: Size): number {
		const container_ratio = container.width / container.height;
		const rect_ratio = child.width / child.height;

		if (rect_ratio > container_ratio) {
			return container.width / child.width;
		} else {
			return container.height / child.height;
		}
	}

	static scaleToFit(container: Size, child: Size): Size {
		const scale_factor = RectUtils.scaleToFitRatio(container, child);
		return {
			width: child.width * scale_factor,
			height: child.height * scale_factor,
		};
	}
}
