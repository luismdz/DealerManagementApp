const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users-controller');
const checkAuth = require('../middlewares/check-auth');

router.post('/login', UserController.login);
router.get('/', UserController.getUsers);
router.get('/:id', checkAuth, UserController.getById);
router.put('/:id', checkAuth, UserController.updateUser);
router.post('/', checkAuth, UserController.createUser);
router.delete('/:id', checkAuth, UserController.deleteUser);

module.exports = router;
