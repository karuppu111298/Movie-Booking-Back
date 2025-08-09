const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post_controller');




router.post('/postlist', PostController.getPosts);


module.exports = router;

