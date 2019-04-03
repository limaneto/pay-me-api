const debt = require('../components/debts/route');
const user = require('../components/user/route');

module.exports = (...arguments) => {
  debt(...arguments);
  user(...arguments);
};
