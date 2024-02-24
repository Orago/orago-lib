
/**
 * a0 checks if string is anything a-z and 0-9
 * @param {string} text String to check
 * @returns {boolean}
 */
export const a0 = text =>
  text == undefined || /[^a-z0-9]/i.test(text);

/**
 * Checks if string includes <html> </tags>
 * @param {string} text String to check
 * @returns {boolean}
 * @deprecated
 */
export const htmlCheck = text =>
  /<\s*[^>]*>/g.test(text);

/**
 * Makes the first letter uppercase
 * @param {string} text String to change casing
 * @returns {string}
 */
export const caps = text =>
  text.charAt(0).toUpperCase() + text.slice(1);


/**
 * @param {string} str 
 * @returns {string}
 */
export function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

/**
 * 
 * @param {number} length 
 * @returns {string}
 */
export function genString(length) {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charLength = characters.length;

  for (let i = 0; i < length; i++){
    result += characters.charAt(
      Math.floor(
        Math.random() * charLength
      )
    );
  }

  return result;
}