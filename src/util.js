/**
 * insert n spaces
 * @param {number} n 
 */
function insertSpaces (n) {
  let str = ''
  for(let i = 0; i < n; i++) {
    str += ' '
  }
  return str
}

module.exports = {
  insertSpaces
}