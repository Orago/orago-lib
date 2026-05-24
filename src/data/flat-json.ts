type PathIn = string | string[];
export class FlatJson {
	static Util = class Util {
		static normalizeKey(key: string) {
			if (key.startsWith("[") && key.endsWith("]")) {
				key = key.slice(1, key.length - 1);
			}
			return key;
		}

		static normalizePath(path: string | string[]): string[] {
			if (Array.isArray(path)) {
				return path;
			} else {
				return path.split(".");
			}
		}

		static generateBlank(key: string): [key: string, blank: any] {
			const surrounds = (key: string, start: string, end: string) =>
				key.startsWith(start) && key.endsWith(end);

			if (surrounds(key, "{", "}")) {
				key = key.slice(1, key.length - 1);
				return [key, new Map()];
			} else if (surrounds(key, "(", ")")) {
				key = key.slice(1, key.length - 1);
				return [key, new Set()];
			} else if (surrounds(key, "[", "]")) {
				key = key.slice(1, key.length - 1);
				return [key, []];
			} else {
				return [key, {}];
			}
		}

		static arrayDelete(arr: any[], start: number, end: number = start) {
			arr.splice(start, end + 1 - start);
			return arr;
		}

		static arrayWithout(arr: any[], start: number, end: number = start) {
			([] as string[]).concat(
				arr.slice(0, start),
				arr.slice(end + 1, arr.length)
			);
		}
	};
	
	static flatten(input: any) {
		const flattened: any = {};
		const flat_name = (path: string[], label: string) =>
			[...path, label].join(".");

		const consume_entries = (path: string[], entries: [any, any][]) => {
			for (const [key, value] of entries) {
				if (typeof value == "object") {
					if (Array.isArray(value)) {
						nextobj(value, [...path, `[${key}]`]);
					} else if (value instanceof Map) {
						nextobj(value, [...path, `{${key}}`]);
					} else if (value instanceof Set) {
						nextobj(value, [...path, `(${key})`]);
					} else {
						if (Object.keys(value).length == 0) {
							flattened[flat_name(path, key + "")] = value;
						} else {
							nextobj(value, [...path, key]);
						}
					}
				} else {
					flattened[flat_name(path, key + "")] = value;
				}
			}
		};

		const nextobj = (obj: any, path_in: string[] = []) => {
			const path = [...path_in];
			if (Array.isArray(obj)) {
				consume_entries(path, Object.entries(obj));
			} else if (obj instanceof Map) {
				consume_entries(path, Array.from(obj.entries()));
			} else if (obj instanceof Set) {
				consume_entries(path, Array.from(obj.entries()));
			} else if (typeof obj == "object") {
				consume_entries(path, Object.entries(obj));
			}
		};

		nextobj(input);

		return flattened;
	}

	static with(
		obj: any,
		path_in: PathIn,

		generate: boolean,
		callback: (object: any, key: any) => void
	): any | undefined {
		const path = FlatJson.Util.normalizePath(path_in);

		for (let i = 0; i < path.length; i++) {
			const is_last = i == path.length - 1;
			let key = path[i];

			if (is_last && obj != undefined && key != undefined) {
				return callback(obj, key);
			}

			if (generate) {
				const gen = FlatJson.Util.generateBlank(key);
				key = gen[0];
				obj[key] ??= gen[1];
			}
			obj = obj?.[key];
		}
	}

	static get(obj: any, path_in: PathIn): any | undefined {
		return FlatJson.with(obj, path_in, false, (obj, key) => {
			if (obj instanceof Set) {
				return obj.has(key) ? key : undefined;
			} else if (obj instanceof Map) {
				return obj.get(key);
			} else {
				return obj[key];
			}
		});
	}

	static delete(obj: any, path_in: PathIn): void {
		const path = FlatJson.Util.normalizePath(path_in);
		FlatJson.with(obj, path_in, true, (obj, key) => {
			if (obj instanceof Set) {
				obj.delete(key);
			} else if (obj instanceof Map) {
				obj.delete(key);
			} else if (Array.isArray(obj)) {
				FlatJson.Util.arrayDelete(obj, Number(key));
			} else {
				delete obj[key];
			}
		});
	}

	static set(obj: any, path_in: PathIn, value: any): void {
		const path = FlatJson.Util.normalizePath(path_in);
		FlatJson.with(obj, path_in, true, (obj, key) => {
			if (obj instanceof Set) {
				obj.add(value);
			} else if (obj instanceof Map) {
				obj.set(key, value);
			} else {
				obj[key] = value;
			}
		});
	}

	static unflatten(input: any) {
		const unflattened: any = {};
		for (const [path_key, value] of Object.entries(input)) {
			const path = path_key.split(".");
			FlatJson.set(unflattened, path, value);
		}
		return unflattened;
	}
}

export class JsonUtil {
	static trimEmpty(obj: any): any {
		const flattened = FlatJson.flatten(obj);
		const entries = Object.entries(flattened).sort((a, b) => {
			return b[0].split(".").length - a[0].split(".").length;
		});
		let found: number = 0;

		for (const [path, value] of entries) {
			if (
				value == undefined ||
				(typeof value == "object" && Object.keys(value).length == 0)
			) {
				found++;
				FlatJson.delete(obj, path);
			}
		}

		if (found > 0) {
			JsonUtil.trimEmpty(obj);
		}
	}
}
