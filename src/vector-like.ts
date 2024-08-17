namespace Helpers {
	class VecLike {
		static readonly type: any[];
		static toString(args: any[]): string {
			return `(${this.clean(args).join(',')})`;
		}

		static clean(args: any[]): any[] { return args; };
		static valid(args: any[]): boolean { return true; }
	}

	export class VectorNumber extends VecLike {
		static readonly type: number[];
		static readonly size: number = 0;

		static clean(args: number[]) {
			return (
				new Array(this.size)
					.fill(0)
					.map((v, i) => args?.[i] ?? v)
			);
		}

		static valid(args: number[]): boolean {
			return args.length == this.size && args.every(n => typeof n === 'number');
		}
	}

	export class VectorNumberInt extends VectorNumber {
		static readonly type: number[];
		static readonly size: number = 0;

		static clean(args: number[]) {
			return super.clean(args).map(n => n | 0);
		}

		static valid(args: number[]): boolean {
			return super.valid(args) && args.every(n => n == (n | 0));
		}
	}
}

export class Vector2 extends Helpers.VectorNumber {
	static readonly type: [number, number];
	static readonly size = 2;

	static clean(args: typeof this['type']) {
		return super.clean(args) as typeof this['type'];
	}

	static valid(args: typeof this['type']): boolean {
		return super.valid(args);
	}

	static fromObject(point: Point) {
		return this.clean([point.x, point.y]);
	}

	static toObject(args: typeof this['type']): Point {
		return { x: args[0], y: args[0] };
	}
}

export class Vector2i extends Helpers.VectorNumberInt {
	static readonly type: [number, number];
	static readonly size = 2;

	static clean(args: typeof this['type']) {
		return super.clean(args) as typeof this['type'];
	}

	static valid(args: typeof this['type']): boolean {
		return super.valid(args);
	}

	static fromObject(point: Point) {
		return this.clean([point.x, point.y]);
	}

	static toObject(args: typeof this['type']): Point {
		this.type
		return { x: args[0] | 0, y: args[1] | 0 };
	}
}

export class Vector3 extends Helpers.VectorNumber {
	static readonly type: [number, number, number];
	static readonly size = 3;

	static clean(args: typeof this['type']) {
		return super.clean(args) as typeof this['type'];
	}

	static valid(args: typeof this['type']): boolean {
		return super.valid(args);
	}

	static fromObject(point: Position3D): typeof this['type'] {
		return this.clean([point.x, point.y, point.z]);
	}

	static toObject(args: typeof this['type']): Position3D {
		return { x: args[0], y: args[1], z: args[2] };
	}
}

export class Vector3i extends Helpers.VectorNumberInt {
	static readonly type: [number, number, number];
	static readonly size = 3;

	static clean(args: typeof this['type']) {
		return super.clean(args) as typeof this['type'];
	}

	static valid(args: typeof this['type']): boolean {
		return super.valid(args);
	}

	static toObject(args: typeof this['type']): Position3D {
		return { x: args[0] | 0, y: args[1] | 0, z: args[2] | 0 };
	}
}


export type Point = { x: number; y: number; };
/**
 * @deprecated
 */
export type Position2D = Point;
export type Position3D = { x: number; y: number; z: number; };


export class VectorMap<T extends typeof Helpers.VectorNumber, valueType = any> {
	map: Map<string, [T['type'], value: valueType]> = new Map();

	constructor(private reference: T) {
		this.reference = reference;
	}

	set(vector: T['type'], value: valueType) {
		this.map.set(this.reference.toString(vector), [this.reference.clean(vector), value]);
	}

	get(vector: T['type']): valueType | undefined {
		return this.map.get(this.reference.toString(vector))?.[1];
	}

	has(vector: T['type']): boolean {
		return this.map.has(this.reference.toString(vector));
	}

	delete(vector: T['type']): boolean {
		return this.map.delete(this.reference.toString(vector));
	}

	clear() {
		this.map.clear();
	}

	keys() {
		return Array.from(this.map.values()).map(([vector]) => vector);
	}

	values() {
		return Array.from(this.map.values())
			.map(([vector, value]) => value);
	}

	entries(): [T['type'], valueType][] {
		return Array.from(this.map.values());
	}

	get size() {
		return this.map.size;
	}
}