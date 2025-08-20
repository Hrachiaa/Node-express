const users = require('../data/users.js');
const User = require('./User.js');

function newUser() {
    const id = users.length;
    users.push(new User(id));
    return users[users.length - 1];
}

// newUser();
// newUser();
// newUser();

// console.log(users);

module.exports = newUser;
