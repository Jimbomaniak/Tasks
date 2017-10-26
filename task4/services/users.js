const db = require('./db');
const ObjectID = require('mongodb').ObjectID

let ToObjectID = (id) => {
	try {
		return ObjectID(id)
	} catch(err) {
		throw new Error('id must be in hex format!')
	}
}

let getAllUsers = () => db.getDb().collection('users').find().toArray();

let addUser = user => {
	db.getDb().collection('users').insert(user, (err) => {
		if (err) {
			throw err;
		}
		console.log('User added');
	})
};

let findUser = id => {
	id = ToObjectID(id);
  return db.getDb().collection('users').findOne({ _id: id})
};

let deleteUser = id => {
	return db.getDb().collection('users').deleteOne({ _id: ToObjectID(id)}, (err) => {
		if (err) {
			throw err;
		}
	})
};

let getTalkedWith = (id) => {
    return db.getDb().collection('messages').find({'senderId': id}).toArray()
		.then((msgs) => {
        let receivers = msgs.map((msg) => ToObjectID(msg.receiverId));
        return db.getDb().collection('users').find(
            { _id: {$in: receivers}}).toArray()
    })
};



module.exports = {getAllUsers, addUser, findUser, deleteUser, getTalkedWith}
