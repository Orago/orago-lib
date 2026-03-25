class Cooldown {
    duration;
    last = 0;
    constructor(duration) {
        this.duration = duration;
        this.duration = duration;
    }
    ready() {
        return this.last + this.duration < performance.now();
    }
    do() {
        if (this.ready() != true) {
            return false;
        }
        this.last = performance.now();
        return true;
    }
    remaining() {
        return Math.max(this.duration - (performance.now() - this.last), 0);
    }
}
class RateLimiter {
    timestamps = [];
    max_calls;
    interval;
    constructor(max_calls, interval_in_ms) {
        this.max_calls = max_calls;
        this.interval = interval_in_ms;
    }
    tick() {
        const now = Date.now();
        this.timestamps = this.timestamps.filter((timestamp) => now - timestamp < this.interval);
    }
    ready() {
        this.tick();
        return this.timestamps.length < this.max_calls;
    }
    recordCall() {
        this.timestamps.push(Date.now());
    }
    do() {
        if (this.ready()) {
            this.recordCall();
            return true;
        }
        else {
            return false;
        }
    }
    remaining() {
        const now = Date.now();
        this.tick();
        const calls = this.timestamps.sort((a, b) => a - b);
        if (calls.length < this.max_calls) {
            return 0;
        }
        const oldest_call = calls[0];
        return Math.max(0, this.interval - (now - oldest_call));
    }
}
class SignedRateLimiter {
    call_timestamps = [];
    max_calls;
    interval;
    constructor(max_calls, interval_in_ms) {
        this.max_calls = max_calls;
        this.interval = interval_in_ms;
    }
    clear() {
        this.call_timestamps = [];
    }
    tick() {
        const now = Date.now();
        this.call_timestamps = this.call_timestamps.filter(([_, timestamp]) => now - timestamp < this.interval);
    }
    clearID(id) {
        this.call_timestamps = this.call_timestamps.filter(([oid]) => id != oid);
        this.tick();
    }
    ready(id) {
        this.tick();
        return (this.call_timestamps.filter(([oid]) => id == oid).length <
            this.max_calls);
    }
    recordCall(id) {
        this.call_timestamps.push([id, Date.now()]);
    }
    do(id) {
        if (this.ready(id)) {
            this.recordCall(id);
            return true;
        }
        else {
            return false;
        }
    }
    remaining(id) {
        const now = Date.now();
        this.tick();
        const calls = this.call_timestamps
            .filter(([oid]) => oid === id)
            .map(([_, timestamp]) => timestamp)
            .sort((a, b) => a - b);
        if (calls.length < this.max_calls) {
            return 0;
        }
        const oldest_call = calls[0];
        return Math.max(0, this.interval - (now - oldest_call));
    }
}
class WarmVariable {
    callback;
    cooldown;
    cached;
    constructor(time, callback) {
        this.callback = callback;
        this.cooldown = new Cooldown(time);
        this.callback = callback;
    }
    async force() {
        return (this.cached = await this.callback());
    }
    async get() {
        if (this.cooldown.do() || this.cached == undefined) {
            return this.force();
        }
        else {
            return this.cached;
        }
    }
}
export { Cooldown, RateLimiter, SignedRateLimiter, WarmVariable };
