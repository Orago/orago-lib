
/** a0 checks if string is anything a-z and 0-9 */
export const a0 = (text: string): boolean =>
  text == undefined || /[^a-z0-9]/i.test(text);

/**
 * Checks if string includes <html> </tags>
 * @deprecated
 */
export const htmlCheck = (text: string): boolean =>
  /<\s*[^>]*>/g.test(text);

/**
 * Makes the first letter uppercase
 */
export const caps = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);

export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

export function genString(length: number): string {
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