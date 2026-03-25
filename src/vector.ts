import { Point } from "./math/types.js";
export { Point } from "./math/types.js";

namespace Helpers {
	class VecLike {
		static readonly type: any[];
		static toString(args: any[]): string {
			return `(${this.clean(args).join(",")})`;
		}

		static clean(args: any[]): any[] {
			return args;
		}
		static valid(args: any[]): boolean {
			return true;
		}
	}

	export class VectorNumber extends VecLike {
		static readonly type: number[];
		static readonly size: number = 0;

		static clean(args: number[]) {
			return new Array(this.size).fill(0).map((v, i) => args?.[i] ?? v);
		}

		static valid(args: number[]): boolean {
			return (
				args.length == this.size &&
				args.every((n) => typeof n === "number")
			);
		}
	}

	export class VectorNumberInt extends VectorNumber {
		static readonly type: number[];
		static readonly size: number = 0;

		static clean(args: number[]) {
			return super.clean(args).map((n) => n | 0);
		}

		static valid(args: number[]): boolean {
			return super.valid(args) && args.every((n) => n == (n | 0));
		}
	}
}

export class Vector2 extends Helpers.VectorNumber {
	static readonly type: [number, number];
	static readonly size = 2;

	static clean(args: (typeof Vector2)["type"]) {
		return super.clean(args) as (typeof Vector2)["type"];
	}

	static valid(args: (typeof Vector2)["type"]): boolean {
		return super.valid(args);
	}

	static fromObject(point: Point) {
		return this.clean([point.x, point.y]);
	}

	static toObject(args: (typeof Vector2)["type"]): Point {
		return { x: args[0], y: args[0] };
	}
}

export class Vector2i extends Helpers.VectorNumberInt {
	static readonly type: [number, number];
	static readonly size = 2;

	static clean(args: (typeof Vector2i)["type"]) {
		return super.clean(args) as (typeof Vector2i)["type"];
	}

	static valid(args: (typeof Vector2i)["type"]): boolean {
		return super.valid(args);
	}

	static fromObject(point: Point) {
		return this.clean([point.x, point.y]);
	}

	static toObject(args: (typeof Vector2i)["type"]): Point {
		this.type;
		return { x: args[0] | 0, y: args[1] | 0 };
	}
}

export class Vector3 extends Helpers.VectorNumber {
	static readonly type: [number, number, number];
	static readonly size = 3;

	static clean(args: (typeof Vector3)["type"]) {
		return super.clean(args) as (typeof Vector3)["type"];
	}

	static valid(args: (typeof Vector3)["type"]): boolean {
		return super.valid(args);
	}

	static fromObject(point: Position3D): (typeof Vector3)["type"] {
		return this.clean([point.x, point.y, point.z]);
	}

	static toObject(args: (typeof Vector3)["type"]): Position3D {
		return { x: args[0], y: args[1], z: args[2] };
	}
}

export class Vector3i extends Helpers.VectorNumberInt {
	static readonly type: [number, number, number];
	static readonly size = 3;

	static clean(args: (typeof Vector3i)["type"]) {
		return super.clean(args) as (typeof Vector3i)["type"];
	}

	static valid(args: (typeof Vector3i)["type"]): boolean {
		return super.valid(args);
	}

	static toObject(args: (typeof Vector3i)["type"]): Position3D {
		return { x: args[0] | 0, y: args[1] | 0, z: args[2] | 0 };
	}
}

/**
 * @deprecated
 */
export type Position2D = Point;
export type Position3D = { x: number; y: number; z: number };

export class VectorMap<T extends typeof Helpers.VectorNumber, valueType = any> {
	map: Map<string, [T["type"], value: valueType]> = new Map();

	constructor(private reference: T) {
		this.reference = reference;
	}

	set(vector: T["type"], value: valueType) {
		this.map.set(this.reference.toString(vector), [
			this.reference.clean(vector),
			value,
		]);
	}

	get(vector: T["type"]): valueType | undefined {
		return this.map.get(this.reference.toString(vector))?.[1];
	}

	has(vector: T["type"]): boolean {
		return this.map.has(this.reference.toString(vector));
	}

	delete(vector: T["type"]): boolean {
		return this.map.delete(this.reference.toString(vector));
	}

	clear() {
		this.map.clear();
	}

	keys() {
		return Array.from(this.map.values()).map(([vector]) => vector);
	}

	values() {
		return Array.from(this.map.values()).map(([vector, value]) => value);
	}

	entries(): [T["type"], valueType][] {
		return Array.from(this.map.values());
	}

	get size() {
		return this.map.size;
	}
}

interface VectorTypeDict {
	1: [x: number];
	2: [x: number, y: number];
	3: [x: number, y: number, z: number];
}

export class VectorUtil<const N extends keyof VectorTypeDict, T> {
	static parseVector(input: string): number[] {
		const regex = /^\(\s*-?\d+(\s*,\s*-?\d+)*\s*\)$/;

		if (!regex.test(input)) {
			return [];
		}

		return input
			.slice(1, -1)
			.split(",")
			.map((part) => Number(part.trim()));
	}
	constructor(private length: N) {
		this.length = length;
	}

	clean(vector: number[]) {
		const size = this.length;

		return (
			vector
				// convert to number
				.map((n) => (isNaN(n) ? 0 : n))
				// fill missing
				.concat(new Array(Math.max(size - vector.length, 0)).fill(0))
				// trim
				.slice(0, size) as VectorTypeDict[N]
		);
	}

	toString(vector: number[]): string {
		return `(${this.clean(vector).join(",")})`;
	}

	fromString(value: string): VectorTypeDict[N] {
		return this.clean(VectorUtil.parseVector(value));
	}

	isValid(vector: unknown): vector is VectorTypeDict[N] {
		if (!Array.isArray(vector) || vector.length !== this.length) {
			return false;
		}

		return vector.every((v) => typeof v === "number");
	}
}

type VVec<
	N extends keyof VectorTypeDict,
	Strict extends boolean
> = Strict extends true ? VectorTypeDict[N] : number[];

export class DimensionalMap<
	const N extends keyof VectorTypeDict,
	T,
	Strict extends boolean = true
> {
	static new<T, Strict extends boolean = true>() {
		const size = <N extends keyof VectorTypeDict>(size: N) =>
			new DimensionalMap<N, T, Strict>(size);
		return {
			size,
		};
	}

	map: Map<string, T> = new Map();
	vector: VectorUtil<N, T>;

	constructor(private vector_size: N) {
		this.vector_size = vector_size;
		this.vector = new VectorUtil(this.vector_size);
	}

	set(vector: VVec<N, Strict>, value: T) {
		this.map.set(this.vector.toString(vector), value);
	}

	get(vector: VVec<N, Strict>): T | undefined {
		return this.map.get(this.vector.toString(vector));
	}

	has(vector: VVec<N, Strict>): boolean {
		return this.map.has(this.vector.toString(vector));
	}

	delete(vector: VVec<N, Strict>): boolean {
		return this.map.delete(this.vector.toString(vector));
	}

	clear() {
		this.map.clear();
	}
	
	values() {
		return this.map.values();
	}

	*keys(): MapIterator<VectorTypeDict[N]> {
		for (const key of this.map.keys()) {
			yield this.vector.fromString(key);
		}

		// Array.from(this.map.keys()).map((key) => this.vector.fromString(key));
	}

	*entries(): MapIterator<[VectorTypeDict[N], T]> {
		for (const [key, value] of this.map.entries()) {
			yield [this.vector.fromString(key), value];
		}

		// return Array.from(this.map.entries()).map(([key, value]) => {
		// 	return [this.vector.fromString(key), value];
		// });
	}

	get size() {
		return this.map.size;
	}
}
