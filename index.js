const express = require('express');
const newUser = require('./src/classes/newUser.js');
const newQuestion = require('./src/classes/newQuestion.js');
const randomQuestion = require('./src/classes/randomQuestion.js');
const users = require('./src/data/users.js');
const questions = require('./src/data/questions.js');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/users', (req, res) => {
    res.json(newUser());
});

app.get('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    res.json(users[userId]);
});

app.route('/users/:userId/questions')
    .post((req, res) => {
        const userId = req.params.userId;
        const text = req.body.text;
        res.json(newQuestion(userId, text));
    })
    .get((req, res) => {
        const userId = req.params.userId;
        res.json(users[userId].allQuestions);
    });

app.get('/users/:userId/questions/random', (req, res) => {
    const userId = req.params.userId;
    res.json(randomQuestion(userId));
});

app.route('/users/:userId/questions/:questionId')
    .patch((req, res) => {
        const questionId = req.params.questionId;
        const boolean = req.body.isCorrect;
        questions[questionId].isCorrect = boolean;
        res.json(questions[questionId]);
    })

    .delete((req, res) => {
        const userId = req.params.userId;
        const questionId = req.params.questionId;
        const array = users[userId].allQuestions;
        for (let i = array.length - 1; i >= 0; i--) {
            if (array[i] === questions[questionId]) {
                array.splice(i, 1);
                res.json({
                    id: questionId,
                    status: 'deleted',
                });
                return;
            }
        }
        res.send(`User ${userId} doesn't have question ${questionId}`);
    });

app.listen(PORT, () => console.log(`Server is working on PORT ${PORT}`));
