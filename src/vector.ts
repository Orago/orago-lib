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

export class Vector2 {
	static equals(a: Point, b: Point): boolean {
		return (
			a.x === b.x &&
			a.y === b.y
		);
	}

	x: number;
	y: number;

	constructor(x: number = 0, y: number = 0) {
		this.x = x;
		this.y = y;
	}

	get valid() {
		return typeof this.x === 'number' && typeof this.y === 'number';
	}

	copy() {
		return new Vector2(
			this.x,
			this.y
		);
	}


	move(x: number | Vector2, y?: number): Vector2 {
		let input = x;

		if (input instanceof Vector2) {
			this.x += input.x;
			this.y += input.y;
		}
		else if (typeof x === 'number' && typeof y === 'number') {
			this.x += x;
			this.y += y;
		}

		return this;
	}
}

export class Vector3 {
	static equals(a: Vector3, b: Vector3): boolean {
		return (
			a instanceof Vector2 &&
			b instanceof Vector2 &&
			a.x === b.x &&
			a.y === b.y &&
			a.z === b.z
		);
	}

	x: number;
	y: number;
	z: number;

	constructor(x: number = 0, y: number = 0, z = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	get valid() {
		return typeof this.x === 'number' && typeof this.y === 'number' && typeof this.z === 'number';
	}

	copy() {
		return new Vector3(
			this.x,
			this.y,
			this.z
		);
	}

	move(x: number | Point, y?: number, z?: number): Point {
		let input = x;

		if (input instanceof Vector3) {
			this.x += input.x;
			this.y += input.y;
			this.z += input.z;
		}
		else if (
			typeof x === 'number' &&
			typeof y === 'number' &&
			typeof z === 'number'
		) {
			this.x += x;
			this.y += y;
			this.z += z;
		}

		return this;
	}
}

export class Vector2Map<value> extends VectorMap<Position2D, value> { }
export class Vector3Map<value> extends VectorMap<Position3D, value> { }