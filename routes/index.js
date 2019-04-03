const offer = require('../components/offers/route');
const user = require('../components/user/route');

module.exports = (...arguments) => {
  offer(...arguments);
  user(...arguments);
};
