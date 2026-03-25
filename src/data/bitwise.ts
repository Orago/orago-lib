export class BitOp {
	static hasFlag(value: number, flag: number): boolean {
		return (value & flag) === flag;
	}

	static addFlag(value: number, flag: number): number {
		return value | flag;
	}

	static removeFlag(value: number, flag: number): number {
		return value & ~flag;
	}

	static toggleFlag(value: number, flag: number): number {
		return value ^ flag;
	}
}

export class WiseBit<E extends Record<string, number>> {
	static dict<const A extends string[]>(array: A): Record<A[number], number> {
		const R: Record<A[number], number> = {} as any;
		array.forEach((key: A[number], i) => (R[key] = 1 << i));
		return R;
	}
	value: number = 0;

	constructor(private dict: E) {}

	hasFlags(...names: (keyof E)[]): boolean {
		const bits = names.reduce((_, name) => _ | this.dict[name], 0);
		return (this.value & bits) === bits;
	}

	addFlags(...names: (keyof E)[]): this {
		this.value = names.reduce(
			(bits, name) => bits | this.dict[name],
			this.value
		);
		return this;
	}

	removeFlags(...names: (keyof E)[]): this {
		this.value = names.reduce(
			(bits, name) => bits & ~this.dict[name],
			this.value
		);
		return this;
	}

	toggleFlags(...names: (keyof E)[]): this {
		this.value = names.reduce(
			(bits, name) => bits ^ this.dict[name],
			this.value
		);
		return this;
	}

	clear(): this {
		this.value = 0;
		return this;
	}
}
