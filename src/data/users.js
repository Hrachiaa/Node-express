const questions = require('./questions');

const users = [
    {
        id: 0,
        created_at: 'some date',
        allQuestions: [questions[0]],
    },
    {
        id: 1,
        created_at: 'some date',
        allQuestions: [],
    },
];

module.exports = users;
