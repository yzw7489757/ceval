function generateBig(){
  var str = [];
  for(let i = 65; i < 91; i++){
      str.push(String.fromCharCode(i));
  }
  return str;
}

/** @desc 大写字母 */
export const uppperCaseLetters = generateBig();

/** @desc 小写字母 */
export const lowerCaseLetters = uppperCaseLetters.map(s => s.toLowerCase());