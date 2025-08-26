const db = require('../db/pool.js');

class UserRepo {
    static async insert() {
        const { rows } = await db.query(
            'INSERT INTO users DEFAULT VALUES RETURNING *'
        );
        return rows[0];
    }
    static async findAll() {
        const { rows } = await db.query('SELECT * FROM users');
        return rows;
    }
    static async findById(id) {
        const { rows } = await db.query('SELECT * FROM users where id = $1', [
            id,
        ]);
        return rows[0] ?? null;
    }
    static async cascadeDelete(id) {
        await db.query('DELETE FROM questions where user_id = $1', [id]);
        await db.query('DELETE FROM users where id = $1', [id]);
    }
}
module.exports = UserRepo;
