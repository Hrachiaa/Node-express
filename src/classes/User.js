const users = require('../data/users');

class User {
    constructor(id) {
        this.id = id;
        this.created_at = new Date();
        this.allQuestions = [];
        // users.push(this);
    }
}

module.exports = User;
