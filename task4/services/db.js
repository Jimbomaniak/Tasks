const client = require('mongodb');
const myDb = 'mongodb://jimboman:admin@ds231315.mlab.com:31315/chat_api'
let db = null;

client.connect(myDb, function(err, database) {
  if (err) {
    throw err;
  }
  console.log('database loaded');
  db = database;
  });

let getDb = () => {
  return db
};

module.exports = {getDb};
