const db = require('../db.js');
const { all } = require('../routes/userRoutes.js');

class QuestionController {
    async createQuestion(req, res) {
        if (!req.body.text) {
            return res.status(404).json({
                status: 'Invalid require',
            });
        }
        const { text } = req.body;
        const userId = req.params.id;
        const isCorrect = false;
        const user = await db.query('SELECT * FROM users where id = $1', [
            userId,
        ]);
        if (user.rows.length === 0) {
            return res.status(404).json({
                id: userId,
                status: 'User not found',
            });
        }
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
        if (allQuestions.rows.length === 0) {
            return res.status(404).json({
                id: userId,
                status: `User doesn't have questions`,
            });
        }
        res.json(allQuestions.rows);
    }
    async updateQuestion(req, res) {
        const userId = req.params.id;
        const qId = req.params.qId;
        const is = req.query.is === 'true';
        const check = await db.query(
            'SELECT * FROM questions where id = $1 AND userid = $2',
            [qId, userId]
        );
        if (check.rows.length === 0) {
            return res.status(404).json({
                id: qId,
                status: `Question not found or not owned by user ${userId}`,
            });
        }
        const question = await db.query(
            'UPDATE questions set iscorrect = $1 where id = $2 RETURNING *',
            [is, qId]
        );
        res.json(question.rows[0]);
    }
    async deleteQuestion(req, res) {
        const userId = req.params.id;
        const qId = req.params.qId;
        const question = await db.query(
            'SELECT * FROM questions where id = $1 AND userid = $2',
            [qId, userId]
        );
        if (question.rows.length === 0) {
            return res.status(404).json({
                id: qId,
                status: `Question not found or not owned by user ${userId}`,
            });
        }
        await db.query('DELETE FROM questions where id = $1 AND userid = $2', [
            qId,
            userId,
        ]);
        res.json({
            id: qId,
            status: `Question was deleted`,
        });
    }
    async randomQuestion(req, res) {
        const id = req.params.id;
        const allQuestions = await db.query(
            'SELECT * FROM questions where userid = $1',
            [id]
        );
        if (allQuestions.rows.length === 0) {
            return res.status(404).json({
                id: id,
                status: `User doesn't have questions`,
            });
        }
        const question = await db.query(
            'SELECT * FROM questions where userid = $1 ORDER BY RANDOM() LIMIT 1',
            [id]
        );
        res.json(question.rows[0]);
    }
}

module.exports = new QuestionController();
