const offer = require('../components/offers/route');
const user = require('../components/user/route');
const company = require('../components/company/route');

module.exports = (...arguments) => {
  offer(...arguments);
  user(...arguments);
  company(...arguments);
};
