const db = require('../db/pool.js');

class QuestionRepo {
    static async insert(userId, text) {
        const { rows } = await db.query(
            'INSERT INTO questions (user_id, text) values ($1, $2) RETURNING *',
            [userId, text]
        );
        return rows[0];
    }
    static async findAll(userId) {
        const { rows } = await db.query(
            'SELECT * FROM questions WHERE user_id = $1',
            [userId]
        );
        return rows;
    }
    static async findOneOwned(userId, qId) {
        const { rows } = await db.query(
            'SELECT * FROM questions WHERE id = $1 AND user_id = $2',
            [qId, userId]
        );
        return rows[0] ?? null;
    }
    static async updateIsCorrect(isCorrect, qId) {
        const { rows } = await db.query(
            'UPDATE questions set is_correct = $1 where id = $2 RETURNING *',
            [isCorrect, qId]
        );
        return rows[0];
    }
    static async deleteQuestion(userId, qId) {
        await db.query('DELETE FROM questions where id = $1 AND user_id = $2', [
            qId,
            userId,
        ]);
    }
    static async randomQuestion(id) {
        const { rows } = await db.query(
            'SELECT * FROM questions where user_id = $1 ORDER BY RANDOM() LIMIT 1',
            [id]
        );
        return rows[0];
    }
}

module.exports = QuestionRepo;
