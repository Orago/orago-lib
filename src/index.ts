export { makeCallableClass, trapValue } from "./class.js";
export { PromiseQueue, QueueRef, QueueChain } from "./queue.js";
export {
	default as Emitter,
	Signal,
	DebouncedSignal,
	State,
} from "./emitter.js";
export { default as Status } from "./status.js";

export { Geometry, Point, Size, Rectangle, Line } from "./math.js";
export * as OraMath from "./math.js";

export * as Vector from "./vector.js";
export * as Cooldown from "./cooldown.js";
export * as OraString from "./string.js";
export * as OraColor from "./colors.js";

// deprecated
export * as MathUtil from "./math.js";
export * as StringUtil from "./string.js";
export * as ColorUtil from "./colors.js";
export * as Schema from "./schema.js";

export class OraLib {}
