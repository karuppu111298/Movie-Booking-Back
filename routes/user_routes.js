// routes/userRoutes.js
const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');
const authenticate = require('../middleware/auth_middleware')

// Define routes
router.post('/user_create', userController.createUser);
router.post('/users_list',authenticate, userController.getUsers);
router.post('/user_edit', userController.editUser);
router.post('/user_update/:id', userController.updateUser);
router.post('/user_delete/:id', userController.deleteUser);

module.exports = router;
