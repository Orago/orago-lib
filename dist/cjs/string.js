"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinPaths = exports.genString = exports.toTitleCase = exports.caps = exports.isAlphanumeric = exports.isA0 = exports.a0 = void 0;
const a0 = (text) => text == undefined || /[^a-z0-9]/i.test(text);
exports.a0 = a0;
const isA0 = (text) => !(text == undefined || /[^a-z0-9]/i.test(text));
exports.isA0 = isA0;
function isAlphanumeric(text) {
    if (text == null) {
        return false;
    }
    return /^[a-z0-9]+$/i.test(text);
}
exports.isAlphanumeric = isAlphanumeric;
const caps = (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
exports.caps = caps;
const toTitleCase = (str) => str.replace(/\w\S*/g, exports.caps);
exports.toTitleCase = toTitleCase;
const genCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const genCharLength = genCharacters.length;
function genString(length) {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += genCharacters.charAt(Math.floor(Math.random() * genCharLength));
    }
    return result;
}
exports.genString = genString;
function joinPaths(parts) {
    const mapped = parts
        .map((part, i) => i === 0 ? part.replace(/\/+$/, "") : part.replace(/^\/+|\/+$/g, ""))
        .join("/");
    const segments = [];
    for (const part of mapped.split("/")) {
        if (part === "..")
            segments.pop();
        else if (part !== ".")
            segments.push(part);
    }
    return segments.join("/");
}
exports.joinPaths = joinPaths;
