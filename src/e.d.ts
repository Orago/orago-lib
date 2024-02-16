/**
 * Defines the function type of the publish function.
 *
 * Extracts the keys from `E` as valid event types, and the matching
 * property as the payload.
 */
export declare type PubTypeFn<E> = <Key extends string & keyof E>(event: Key, ...message: Parameters<E[Key]>) => this;

/**
 * Defines the function type for the subscribe function.
 *
 * Extracts the keys from `E` as valid event types, and the matching
 * property as the payload to the callback function.
 */
export declare type SubTypeFn<E> = <Key extends string & keyof E>(event: string, fn: (message: E[Key] | this['all'][Key]) => void) => this;

export type MessageFn<E> = <Key extends string & keyof E>(message: E[Key]) => void;