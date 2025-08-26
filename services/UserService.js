const UserRepo = require('../repositories/UserRepo');
const ApiError = require('../middlewares/ApiError');

class UserService {
    static async create() {
        return UserRepo.insert();
    }
    static async list() {
        return UserRepo.findAll();
    }
    static async get(id) {
        const user = await UserRepo.findById(id);
        if (!user) {
            throw ApiError.notFound(`User ${id} not found`);
        }
        return user;
    }
    static async remove(id) {
        const isUser = await UserService.get(id);
        if (!isUser) {
            throw ApiError.notFound(`User ${id} not found`);
        }
        await UserRepo.cascadeDelete(id);
        return { id, status: 'User deleted' };
    }
}

module.exports = UserService;
