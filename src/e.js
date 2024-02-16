/// <reference path="./e.d.ts" />

/**
 * Creates a new PubSub instance, the `E` type parameter should be a
 * type enumerating all the available events and their payloads.
 *
 * @example
 * type Events = {
 *  warn: { message: string },
 *  error: { message: string }
 * }
 *
 * const pubSub = PubSub<Events>()
 * pubSub.publish('warn', { message: "Something bad happened!" })
 */
export function PubSub() {
    // const handlers: { [key: string]: (MessageFn<E>)[] } = {}
    // the internal implementation of handlers callback message types does not matter, we can pass 'any' without concern
    const handlers = {};
    return {
        publish: (event, msg) => {
            handlers[event].forEach(h => h(msg));
        },
        subscribe: (event, callback) => {
            var _a;
            const list = (_a = handlers[event]) !== null && _a !== void 0 ? _a : [];
            list.push(callback);
            handlers[event] = list;
        },
        unsubscribe: (event, callback) => {
            var _a;
            let list = (_a = handlers[event]) !== null && _a !== void 0 ? _a : [];
            list = list.filter(h => h !== callback);
            handlers[event] = list;
        }
    };
}
const pubSub = PubSub();
pubSub.publish('DeletedPerson', { personId: '1', reason: 'meow' });
// TS should error because "reason" doesn't exist on Key=CreatedPerson
pubSub.publish("CreatedPerson", { id: '1', name: 'cory', reason: '' });
// TS should error because "reason" doesn't exist on Key=CreatedPerson
pubSub.subscribe("CreatedPerson", (message) => {
    console.log(message.name, message.reason);
});