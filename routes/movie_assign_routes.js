// routes/movie_assign_Routes.js
const express = require('express');
const router = express.Router();

const movieAssignController = require('../controllers/movie_assign_controller');
const authenticate = require('../middleware/auth_middleware')

// Define routes
router.post('/movie_assign_create', movieAssignController.createMovieAssign);
router.post('/movie_assign_list', authenticate, movieAssignController.getMovieAssigns);
router.post('/movie_assign_edit', authenticate, movieAssignController.editMovieAssign);
router.post('/movie_assign_update/:id', movieAssignController.updateMovieAssign);
router.post('/movie_assign_delete/:id', authenticate, movieAssignController.deleteMovieAssign);

router.post('/dashboard_stats', movieAssignController.getDashboardStats);


//front user only
router.post('/front_movie_assign_list', movieAssignController.getMovieAssigns);
router.post('/front_movie_details', movieAssignController.getMovieDetails);
router.post('/book_seats', movieAssignController.bookSeats);
router.post('/my_bookings', movieAssignController.getMyBookings);

module.exports = router;
