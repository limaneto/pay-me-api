const debt = require('../components/debts/route');
const user = require('../components/user/route');

module.exports = (...args) => {
  debt(...args);
  user(...args);
};
