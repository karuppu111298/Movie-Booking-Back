// routes/screenRoutes.js
const express = require('express');
const router = express.Router();

const screenController = require('../controllers/screen_controller');
const authenticate = require('../middleware/auth_middleware')
const upload = require('../middleware/upload'); // Import the multer upload middleware

// Define routes
router.post('/screen_create',upload.single('screenImage'), screenController.createScreen);
router.post('/screen_list', authenticate, screenController.getScreens);
router.post('/screen_edit', authenticate, screenController.editScreen);
router.post('/screen_update/:id', screenController.updateScreen);
router.post('/screen_delete/:id', authenticate, screenController.deleteScreen);

module.exports = router;
