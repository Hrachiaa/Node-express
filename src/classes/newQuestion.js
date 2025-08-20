// const newUser = require('./newUser.js');
const Question = require('./Question.js');
const questions = require('../data/questions.js');
const users = require('../data/users.js');

function newQuestion(userId, text) {
    const id = questions.length;
    questions.push(new Question(userId, text, id));
    users[userId].allQuestions.push(questions[questions.length - 1]);
    return questions[questions.length - 1];
}

// newQuestion(2, 'жопа');
// newQuestion(2, 'жопа1');
// newQuestion(2, 'жопа2');
// newQuestion(2, 'жопа');

// console.log(questions);
// console.log(users[2]);

module.exports = newQuestion;
