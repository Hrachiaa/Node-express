const users = require('../data/users.js');
const randomInt = require('../utils/mathUtils.js');

function randomQuestion(userId) {
    return users[userId].allQuestions[
        randomInt(users[userId].allQuestions.length)
    ];
}

module.exports = randomQuestion;
