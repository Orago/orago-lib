export const a0 = (text) => text == undefined || /[^a-z0-9]/i.test(text);
export const isA0 = (text) => !(text == undefined || /[^a-z0-9]/i.test(text));
export function isAlphanumeric(text) {
    if (text == null) {
        return false;
    }
    return /^[a-z0-9]+$/i.test(text);
}
export const caps = (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
export const toTitleCase = (str) => str.replace(/\w\S*/g, caps);
const genCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const genCharLength = genCharacters.length;
export function genString(length) {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += genCharacters.charAt(Math.floor(Math.random() * genCharLength));
    }
    return result;
}
export function joinPaths(parts) {
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
