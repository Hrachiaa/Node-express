const db = require('../db.js');

class QuestionController {
    async createQuestion(req, res) {
        const { text } = req.body;
        const userId = req.params.id;
        const isCorrect = false;
        const answer = await db.query(
            'INSERT INTO questions (userid, iscorrect, text) values ($1, $2, $3) RETURNING *',
            [userId, isCorrect, text]
        );
        res.json(answer.rows[0]);
    }
    async getQuestionsByUser(req, res) {
        const userId = req.params.id;
        const allQuestions = await db.query(
            'SELECT * FROM questions where userid = $1',
            [userId]
        );
        res.json(allQuestions.rows);
    }
    async updateQuestion(req, res) {
        const qId = req.params.qId;
        const is = req.query.is === 'true';
        const question = await db.query(
            'UPDATE questions set iscorrect = $1 where id = $2 RETURNING *',
            [is, qId]
        );
        res.json(question.rows[0]);
    }
    async deleteQuestion(req, res) {
        const qId = req.params.qId;
        await db.query('DELETE FROM questions where id = $1', [qId]);
        res.json(`Question with id ${qId} was deleted`);
    }
    async randomQuestion(req, res) {
        const id = req.params.id;
        const question = await db.query(
            'SELECT * FROM questions where userid = $1 ORDER BY RANDOM() LIMIT 1',
            [id]
        );
        res.json(question.rows[0]);
    }
}

module.exports = new QuestionController();
