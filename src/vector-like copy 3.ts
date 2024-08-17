class VecLike<layout extends any[] = []> {
	static toString(args: any[]): string {
		return `(${args.join(', ')})`;
	}

	static clean(args: any[]): any[] { return args };
	static valid(args: any[]): boolean { return true; }
}

class Vector2 extends VecLike<[number, number]> {
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
