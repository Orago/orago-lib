import { clamp, flipRotate } from "./math/functions.js";
import {
	GeometryConversions,
	PointUtils,
	RectUtils,
	vec_offsets,
} from "./math/math2d.js";
import type { Line, Point, Rectangle, Size } from "./math/types.js";
export {
	clamp,
	difference,
	flipRotate,
	getRadialDistance,
	random,
} from "./math/functions.js";
export * from "./math/types.js";

export class Geometry {
	//* Conversions
	static readonly Conversions = GeometryConversions;

	//* Utility classes
	static readonly Point = PointUtils;
	static readonly Rect = RectUtils;

	static VecOffset = vec_offsets;

	//* Methods
	static readonly flipRotate = flipRotate;
	static readonly clamp = clamp;

	//* Types
	declare Point: Point;
	declare Size: Size;
	declare Rectangle: Rectangle;
	declare Line: Line;
}
