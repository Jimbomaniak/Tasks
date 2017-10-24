const db = require('./db');
const ObjectID = require('mongodb').ObjectID


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
  return db.getDb().collection('users').findOne({ _id: ObjectID(id)});
};

let deleteUser = id => {
	return db.getDb().collection('users').deleteOne({ _id: ObjectID(id)}, (err) => {
		if (err) {
			throw err;
		}
	});
};



module.exports = {getAllUsers, addUser, findUser, deleteUser}
