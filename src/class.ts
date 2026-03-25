type OverloadedCallable<T> = T extends (...args: any[]) => any
	? T
	: T extends { (...args: any[]): any }
	? T
	: never;

type CallableInstance<TClass extends new (...args: any[]) => any> =
	InstanceType<TClass> extends { call: infer F }
		? OverloadedCallable<F> & InstanceType<TClass>
		: never;

export function makeCallableClass<TClass extends new (...args: any[]) => any>(
	Class: TClass,
	...args: ConstructorParameters<TClass>
): CallableInstance<TClass> {
	const instance = new Class(...args);

	const callable = ((...fnArgs: any[]) => {
		return instance.call(...fnArgs);
	}) as CallableInstance<TClass>;

	Object.setPrototypeOf(callable, Class.prototype);
	Object.assign(callable, instance);

	return callable;
}

export function trapValue<OBJ extends any, P extends keyof OBJ>(
	obj: OBJ,
	property: P,
	callback: () => OBJ[P]
) {
	Object.defineProperty(obj, property, {
		configurable: true,
		get() {
			const value = callback();

			Object.defineProperty(obj, property, {
				value,
				writable: false,
				configurable: false,
				enumerable: true,
			});

			return value;
		},
	});
}
