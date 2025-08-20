const questions = require('../data/questions.js');
const users = require('../data/users.js');

class Question {
    constructor(userId, text, id) {
        this.id = id;
        this.userId = userId;
        this.text = text;
        this.isCorrect = false;
        // questions.push(this);
        // users[userId].allQuestions.push(questions[questions.length - 1]);
    }
}

module.exports = Question;
