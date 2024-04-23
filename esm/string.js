export const a0 = (text) => text == undefined || /[^a-z0-9]/i.test(text);
export const htmlCheck = (text) => /<\s*[^>]*>/g.test(text);
export const caps = (text) => text.charAt(0).toUpperCase() + text.slice(1);
export function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
export function genString(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
}
