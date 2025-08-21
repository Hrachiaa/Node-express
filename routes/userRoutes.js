const express = require('express');
const UserController = require('../controller/UserController');
const router = express.Router();

router.post('/users', UserController.createUser);
router.get('/users', UserController.getUsers);
router.get('/users/:id', UserController.getOneUser);
router.delete('/users/:id', UserController.deleteUser);

module.exports = router;
