const { name } = require('../package.json')

const library = (name.indexOf('@ali') >= 0
  ? name.split('@ali/')[1] : name)
  .split('-')
  .map((item, i) => {
    if (i === 0) {
      return item
    }
    const [first, ...rest] = item
    return first.toUpperCase() + rest.join('')
  }).join('');

module.exports = {
  library
};
