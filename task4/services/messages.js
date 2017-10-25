const db = require('./db');
const ObjectID = require('mongodb').ObjectID

let getAllMsg = () => db.getDb().collection('messages').find().toArray();

let saveMsg = (msg) => db.getDb().collection('messages').insert(msg, (err) => {
  if (err) {
    throw err;
  }
  console.log('message saved')
})

let findMsg = (id) => {
  return db.getDb().collection('messages').findOne({ _id: ObjectID(id)});
};

let updateMsg = (id, newMsg) => {
  return db.getDb().collection('messages').update({_id: ObjectID(id)}, {message: newMsg});
};

let deleteMsg = (id) => {
  return db.getDb().collection('messages').deleteOne({_id: ObjectID(id)});
}


module.exports = {
                  getAllMsg,
                  saveMsg,
                  findMsg,
                  updateMsg,
                  deleteMsg,
                }
