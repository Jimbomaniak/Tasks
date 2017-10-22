const users = require('./users');
const msg = require('./messages');

module.exports = (app) => {
    app.use('/users', users);
    app.use('/messages', msg);
};
