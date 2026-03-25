export class ToType {
	private static safeJsonParse(input: string): object {
		try {
			return JSON.parse(input);
		} catch (E) {
			return {};
		}
	}
	// static null() {
	// 	return null;
	// }

	static boolean($: any, defaults?: boolean) {
		return typeof $ === "boolean" ? $ : defaults === true;
	}

	static number($: any, defaults: number = 0): number {
		$ = Number($);
		return isNaN($) ? defaults : $;
	}

	static int($: any, defaults: number = 0) {
		return Math.trunc(ToType.number($, defaults));
	}

	static string($: any, defaults: string = ""): string {
		if (typeof $ === "string" || typeof $ === "number") {
			return $ + "";
		} else if (typeof $ === "object") {
			try {
				return JSON.stringify($);
			} catch (e) {}
		}

		return defaults + "";
	}

	static object($: any): object {
		if (typeof $ == "string") {
			return ToType.object(ToType.safeJsonParse($));
		} else if (typeof $ != "object" || $ == null || Array.isArray($)) {
			return new Object();
		}

		return $;
	}

	static array($: any): any[] {
		if (typeof $ == "string") {
			return ToType.array(ToType.safeJsonParse($));
		} else if (Array.isArray($) != true) {
			return [];
		}

		return $;
	}
}
