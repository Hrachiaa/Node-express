const db = require('../db.js');

class UserController {
    async createUser(req, res) {
        const created_at = new Date();
        const newUser = await db.query(
            'INSERT INTO users (created_at) values ($1) RETURNING *',
            [created_at]
        );
        res.json(newUser.rows[0]);
    }
    async getUsers(req, res) {
        const allUsers = await db.query('SELECT * FROM users');
        res.json(allUsers.rows);
    }
    async getOneUser(req, res) {
        const id = req.params.id;
        const user = await db.query('SELECT * FROM users where id = $1', [id]);
        res.json(user.rows[0]);
    }
    async deleteUser(req, res) {
        const id = req.params.id;
        await db.query('DELETE FROM questions where userid = $1', [id]);
        await db.query('DELETE FROM users where id = $1', [id]);
        res.json(`User with id ${id} was deleted`);
    }
}

module.exports = new UserController();
