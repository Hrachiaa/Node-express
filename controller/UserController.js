const svc = require('../services/UserService');

class UserController {
    async createUser(req, res, next) {
        try {
            res.json(await svc.create());
        } catch (error) {
            next(error);
        }
    }
    async getUsers(req, res, next) {
        try {
            res.json(await svc.list());
        } catch (error) {
            next(error);
        }
    }
    async getOneUser(req, res, next) {
        try {
            res.json(await svc.get(req.params.id));
        } catch (error) {
            next(error);
        }
    }
    async deleteUser(req, res, next) {
        try {
            res.json(await svc.remove(req.params.id));
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
