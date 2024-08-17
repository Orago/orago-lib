class VecLike {
	static readonly type: any[];
	static toString(args: any[]): string {
		return `(${args.join(', ')})`;
	}

	static clean(args: any[]): any[] { return args };
	static valid(args: any[]): boolean { return true; }
}

class VectorNumber extends VecLike {
	static readonly type: number[];
	static readonly size: number = 0;

	static override clean(args: number[]) {
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

class VectorNumberInt extends VectorNumber {
	static readonly type: number[];
	static readonly size: number = 0;

	static override clean(args: number[]) {
		return super.clean(args).map(n => n | 0);
	}

	static valid(args: number[]): boolean {
		return super.valid(args) && args.every(n => n == (n | 0));
	}
}

export class Vector2 extends VectorNumber {
	static readonly type: [number, number];
	static readonly size = 2;

	static fromObject(point: Point) {
		return this.clean([point.x, point.y]);
	}

	static toObject(args: typeof this['type']): Point {
		return { x: args[0], y: args[0] };
	}
}

export class Vector2i extends VectorNumberInt {
	static readonly type: [number, number];
	static readonly size = 2;

	static toObject(args: typeof this['type']): Point {
		this.type
		return { x: args[0] | 0, y: args[1] | 0 };
	}
}

export class Vector3 extends VectorNumber {
	static readonly type: [number, number, number];
	static readonly size = 3;

	// clean

	static fromObject(point: Position3D): typeof this['type'] {
		return this.clean([point.x, point.y, point.z]);
	}

	static toObject(args: typeof this['type']): Position3D {
		return { x: args[0], y: args[1], z: args[2] };
	}
}

export class Vector3i extends VectorNumberInt {
	static readonly type: [number, number, number];
	static readonly size = 3;

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

interface StringablePos {
	x: number;
	y: number;
	z?: number;
}

function stringPos(pos: StringablePos) {
	if (typeof pos?.z === 'number')
		return `(${pos.x}, ${pos.y}, ${pos.z})`;

	return `(${pos.x}, ${pos.y})`;
}

class VectorMap<vector extends Point | Position3D, valueType = any> {
	map: Map<string, [vector, value: valueType]> = new Map();

	set(vector: vector, value: any) {
		this.map.set(stringPos(vector), [vector, value]);
	}

	get(vector: vector): valueType | undefined {
		return this.map.get(stringPos(vector))?.[1];
	}

	has(vector: vector): boolean {
		return this.map.has(stringPos(vector));
	}

	delete(vector: vector): boolean {
		return this.map.delete(stringPos(vector));
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

	entries(): [vector, valueType][] {
		return Array.from(this.map.values());
	}

	get size() {
		return this.map.size;
	}
}