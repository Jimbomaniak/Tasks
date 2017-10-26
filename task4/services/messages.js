const db = require('./db');
const ObjectID = require('mongodb').ObjectID

let ToObjectID = (id) => {
	try {
		return ObjectID(id)
	} catch(err) {
		throw new Error('id must be in hex format!')
	}
}

let getAllMsg = () => db.getDb().collection('messages').find().toArray();

let saveMsg = (msg) => db.getDb().collection('messages').insert(msg, (err) => {
  if (err) {
    throw err;
  }
  console.log('message saved')
})

let findMsg = (id) => {
  return db.getDb().collection('messages').findOne({ _id: ToObjectID(id)});
};

let updateMsg = (id, newMsg) => {
  return db.getDb().collection('messages').update({_id: ToObjectID(id)}, {message: newMsg});
};

let deleteMsg = (id) => {
  return db.getDb().collection('messages').deleteOne({_id: ToObjectID(id)});
}


module.exports = {
                  getAllMsg,
                  saveMsg,
                  findMsg,
                  updateMsg,
                  deleteMsg,
                }
