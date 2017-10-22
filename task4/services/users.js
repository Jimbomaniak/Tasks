const users = [{
	id: 1,
	name: 'Nikolas',
	email: 'nikolas@gmail.com'
},{
	id: 2,
	name: 'Eduard',
	email: 'eduard@gmail.com'
},{
	id: 3,
	name: 'Bohdan',
	email: 'bohdan@gmail.com'
},{
	id: 4,
	name: 'Dima',
	email: 'dima@gmail.com'
}];


let findUser = id => users.find(user => user.id === id);
let getUsersById = ids => {
	let usersNames = [];
	for (let id of ids) {
		let user = findUser(id);
		usersNames.push(user.name);
	}
	return usersNames;
}


module.exports = {users, findUser, getUsersById}
