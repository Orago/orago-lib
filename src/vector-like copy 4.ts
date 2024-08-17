class VecLike {
	static toString(args: any[]): string {
		return `(${args.join(', ')})`;
	}

	static clean(args: any[]): any[] { return args };
	static valid(args: any[]): boolean { return true; }
}

class VectorNumber extends VecLike {
	static readonly size = 0;

	static override clean(args: number[]) {
		return (
			new Array(this.size)
				.fill(0)
				.map((v, i) => args?.[i] ?? v)
		) as [number, number];
	}

	static valid(args: number[]): boolean {
		return args.length == this.size && args.every(n => typeof n === 'number');
	}
}

class Vector2 extends VecLike {
	static readonly size = 2;

	private static forceNumber(n: number) {
		return isNaN(n) ? 0 : Number(n);
	};

	static override clean(args: [number, number]) {
		return (
			new Array(this.size)
				.fill(0)
				.map((v, i) => args?.[i] ?? v)
		) as [number, number];
	}

	static valid(args: [number, number]): boolean {
		return args.length == this.size && args.every(n => typeof n === 'number');
	}
}

class Vector2i extends Vector2 {
	static override clean(args: [number, number]) {
		return (
			new Array(this.size)
				.fill(0)
				.map((v, i) => (args?.[i] | 0) ?? v)
		) as [number, number];
	}

	static valid(args: [number, number]): boolean {
		return super.valid(args) && args.every(n => n === (n | 0));
	}
}

console.log(
	'Testing', Vector2i.clean(5.324, 5)
)