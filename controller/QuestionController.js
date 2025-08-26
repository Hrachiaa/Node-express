const QuestionService = require('../services/QuestionService.js');
class QuestionController {
    async createQuestion(req, res, next) {
        if (!req.body.text) {
            throw new Error('text is required');
        }
        try {
            res.json(
                await QuestionService.create(req.params.id, req.body.text)
            );
        } catch (error) {
            next(error);
        }
    }
    async getQuestionsByUser(req, res, next) {
        try {
            res.json(await QuestionService.list(req.params.id));
        } catch (error) {
            next(error);
        }
    }
    async updateQuestion(req, res, next) {
        try {
            res.json(
                await QuestionService.updateIsCorrect(
                    req.params.id,
                    req.params.qId,
                    req.query.is === 'true'
                )
            );
        } catch (error) {
            next(error);
        }
    }
    async deleteQuestion(req, res, next) {
        try {
            res.json(
                await QuestionService.deleteById(req.params.id, req.params.qId)
            );
        } catch (error) {
            next(error);
        }
    }
    async randomQuestion(req, res, next) {
        try {
            res.json(await QuestionService.randomById(req.params.id));
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new QuestionController();
