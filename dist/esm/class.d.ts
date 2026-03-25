type OverloadedCallable<T> = T extends (...args: any[]) => any ? T : T extends {
    (...args: any[]): any;
} ? T : never;
type CallableInstance<TClass extends new (...args: any[]) => any> = InstanceType<TClass> extends {
    call: infer F;
} ? OverloadedCallable<F> & InstanceType<TClass> : never;
export declare function makeCallableClass<TClass extends new (...args: any[]) => any>(Class: TClass, ...args: ConstructorParameters<TClass>): CallableInstance<TClass>;
export declare function trapValue<OBJ extends any, P extends keyof OBJ>(obj: OBJ, property: P, callback: () => OBJ[P]): void;
export {};
