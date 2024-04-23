"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genString = exports.toTitleCase = exports.caps = exports.htmlCheck = exports.a0 = void 0;
const a0 = (text) => text == undefined || /[^a-z0-9]/i.test(text);
exports.a0 = a0;
const htmlCheck = (text) => /<\s*[^>]*>/g.test(text);
exports.htmlCheck = htmlCheck;
const caps = (text) => text.charAt(0).toUpperCase() + text.slice(1);
exports.caps = caps;
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
exports.toTitleCase = toTitleCase;
function genString(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
}
exports.genString = genString;
