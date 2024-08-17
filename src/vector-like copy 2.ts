class VecLike<layout extends any[] = []> {
	static toString(args: any[]): string {
		return `(${args.join(', ')})`;
	}

	clean<T extends layout>(args: T): layout { return args };
	valid(args: layout): boolean { return true; }
}

class VectorNumber<T extends number[] = []> extends VecLike<T> {
	protected static size = 0;

	private static getSize() {
		// @ts-ignore
		return this.size;
	}

	private static forceNumber(n: number) {
		return isNaN(n) ? 0 : Number(n);
	};

	static valid(args: [number, number]): boolean {
		return args.length == 2;
	}

	static clean(args: [number, number]): T {
		return args.map(VectorNumber.forceNumber) as T;
	};
}

class V2 extends VectorNumber {
	static size = 5;

	k() {
		return this;
	}
}

// class VectorTwo extends VecLike<[number, number]> {
// 	static forceNumber(n: number) {
// 		return isNaN(n) ? 0 : Number(n);
// 	}

// 	valid(args: [number, number]) {
// 		return typeof args?.[0] == 'number' && typeof args?.[1] == 'number';
// 	}

// 	clean(args: [number, number]): [number, number] {
// 		return [
// 			VectorTwo.forceNumber(args[0]),
// 			VectorTwo.forceNumber(args[1])
// 		];
// 	};
// }

// class VectorTwoI extends VecLike<[number, number]> {
// 	clean(args: [number, number]): [number, number] {
// 		const clean = super.clean(args);

// 		return [
// 			clean[0] | 0,
// 			clean[1] | 0
// 		];
// 	};
// }

console.log(V2.k())

// console.log(
// 	VectorTwo.toString(new VectorTwo(5, 3))
// )

class VecLMap<Vec extends VecLike> {
	map: Map<string, Vec> = new Map();
}
