const express = require('express');
const QuestionController = require('../controller/QuestionController');
const router = express.Router();

router.post('/users/:id/questions', QuestionController.createQuestion);
router.get('/users/:id/questions', QuestionController.getQuestionsByUser);
router.delete('/users/:id/questions/:qId', QuestionController.deleteQuestion);
router.get('/users/:id/questions/random', QuestionController.randomQuestion);
router.patch('/users/:id/questions/:qId', QuestionController.updateQuestion);

module.exports = router;
