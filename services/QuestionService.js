const QuestionRepo = require('../repositories/QuestionRepo');
const UserRepo = require('../repositories/UserRepo');
const ApiError = require('../middlewares/ApiError');

class QuestionService {
    static async create(userId, text) {
        const user = await UserRepo.findById(userId);
        if (!user) {
            throw ApiError.notFound(`User ${userId} not found`);
        }
        return QuestionRepo.insert(userId, text);
    }
    static async list(userId) {
        const user = await UserRepo.findById(userId);
        if (!user) {
            throw ApiError.notFound(`User ${userId} not found`);
        }
        const items = await QuestionRepo.findAll(userId);
        if (items.length === 0) {
            throw ApiError.notFound(`No questions for user ${userId}`);
        }
        return items;
    }
    static async updateIsCorrect(userId, qId, isCorrect) {
        const owned = await QuestionRepo.findOneOwned(userId, qId);
        if (!owned) {
            throw ApiError.notFound(
                `Question ${qId} not found or not owned by user ${userId}`
            );
        }
        const updated = await QuestionRepo.updateIsCorrect(isCorrect, qId);
        return updated;
    }
    static async deleteById(userId, qId) {
        const owned = await QuestionRepo.findOneOwned(userId, qId);
        if (!owned) {
            throw ApiError.notFound(
                `Question ${qId} not found or not owned by user ${userId}`
            );
        }
        await QuestionRepo.deleteQuestion(userId, qId);
        return {
            id: qId,
            status: `Question was deleted`,
        };
    }
    static async randomById(userId) {
        const items = await QuestionRepo.findAll(userId);
        if (items.length === 0) {
            throw ApiError.notFound(
                `User ${userId} has no question or doesn't exist`
            );
        }
        const random = await QuestionRepo.randomQuestion(userId);
        return random;
    }
}

module.exports = QuestionService;
