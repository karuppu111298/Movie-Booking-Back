// routes/movieRoutes.js
const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movie_controller');
const authenticate = require('../middleware/auth_middleware')
const upload = require('../middleware/upload'); // Import the multer upload middleware

// Define routes
router.post('/movie_create',upload.single('movieImage'), movieController.createMovie);
router.post('/movies_list', authenticate, movieController.getMovies);
router.post('/movie_edit', authenticate, movieController.editMovie);
router.post('/movie_update/:id', movieController.updateMovie);
router.post('/movie_delete/:id', authenticate, movieController.deleteMovie);

module.exports = router;
