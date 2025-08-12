// services/movieAssignService.js
const MovieAssign = require('../models/movie_assign_model');
const MovieBooking = require('../models/movie_booking_model');;
const mongoose = require('mongoose');
const authService = require('../services/auth_service');
const User = require("../models/user_model");
const Movie = require("../models/movie_model");



const createMovieAssign = async (movieAssignData) => {
  try {
    const { movieId, screenId, showTime } = movieAssignData;

    const movieAssign = new MovieAssign({
      movie_id: movieId,
      seat_screen_id: screenId,
      show_time: showTime
    });

    await movieAssign.save();
    return { success: true, data: movieAssign, message: "Movie assigned successfully" };
  } catch (err) {
    throw new Error("Error creating movie assignment: " + err.message);
  }
};

const getMovieAssigns = async () => {
  try {
    return await MovieAssign.aggregate([
      {
        $lookup: {
          from: "movies",               // Movie collection name
          localField: "movie_id",       // field in MovieAssign
          foreignField: "_id",          // field in Movie collection
          as: "movie"
        }
      },
      { $unwind: "$movie" }, // convert movie array to single object

      {
        $lookup: {
          from: "screens",              // Screen collection name
          localField: "seat_screen_id", // field in MovieAssign
          foreignField: "_id",          // field in Screen collection
          as: "screen"
        }
      },
      { $unwind: "$screen" }, // convert screen array to single object

      {
         $project: {
          _id: 1,
          title: "$movie.title",            // flatten movie title
          image: "$movie.image",            // flatten movie image
          screen_name: "$screen.screen_name", // flatten screen name
          show_time: 1,
          createdAt: 1
        }
        // $project: {
        //   _id: 1,
        //   show_time: 1,
        //   createdAt: 1,
        //   "movie._id": 1,
        //   "movie.title": 1,
        //   "screen._id": 1,
        //   "screen.screen_name": 1,
        // }
      }
    ]);
  } catch (err) {
    throw new Error("Error fetching movie assignments: " + err.message);
  }
};




const editMovieAssign = async (id) => {
  try {
    const movieAssign = await MovieAssign.findOne({ _id: id });
    return { success: true, movieAssign, message: "Movie assignment successfully listed" };
  } catch (err) {
    throw new Error('Error listing movie assignment: ' + err.message);
  }
};

const updateMovieAssign = async (id, movieAssignData) => {
  try {

    const updatedMovieAssign = await MovieAssign.findByIdAndUpdate(
      id,
      movieAssignData,
      { new: true }
    );
    return { success: true, updatedMovieAssign, message: "Movie assignment successfully updated" };
  } catch (err) {
    throw new Error('Error updating movie assignment: ' + err.message);
  }
};

const deleteMovieAssign = async (id) => {
  try {
    const deletedMovieAssign = await MovieAssign.findByIdAndDelete(id);
    return deletedMovieAssign;
  } catch (err) {
    throw new Error('Error deleting movie assignment: ' + err.message);
  }
};


const getMovieDetails = async (movieId) => {

  try {
    // Step 1: Aggregate movie, screen and seat data
    const result = await MovieAssign.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(movieId) }
      },
      {
        $lookup: {
          from: "movies",
          localField: "movie_id",
          foreignField: "_id",
          as: "movie"
        }
      },
      { $unwind: "$movie" },
      {
        $lookup: {
          from: "screens",
          localField: "seat_screen_id",
          foreignField: "_id",
          as: "screen"
        }
      },
      { $unwind: "$screen" },
      {
        $project: {
          _id: 1,
          show_time: 1,
          movie: { _id: "$movie._id", title: "$movie.title" },
          screen: {
            _id: "$screen._id",
            screen_name: "$screen.screen_name",
            seat_number: "$screen.seat_number"
          }
        }
      }
    ]);

    if (!result.length) {
      return res.status(404).json({ error: "Movie assignment not found" });
    }

    const movieData = result[0];

    // Step 2: Fetch booked seats separately
    const bookings = await MovieBooking.find({ movie_assign_id: movieId });
    const bookedSeatIds = new Set();

    bookings.forEach(booking => {
      booking.seat_number.forEach(seat => {
        bookedSeatIds.add(seat.id); // use 'id' field from seat
      });
    });

    // Step 3: Add isBooked to each seat in each section
    const markSeats = (seats) =>
      seats.map(seat => ({
        ...seat,
        isBooked: bookedSeatIds.has(seat.id)
      }));

    const seat_number = {
      left: markSeats(movieData.screen.seat_number.left),
      center: markSeats(movieData.screen.seat_number.center),
      right: markSeats(movieData.screen.seat_number.right)
    };

    // Step 4: Return final result
    return ({
      _id: movieData._id,
      show_time: movieData.show_time,
      movie: movieData.movie,
      screen: {
        _id: movieData.screen._id,
        screen_name: movieData.screen.screen_name,
        seat_number
      }
    });

  } catch (err) {
    console.error("Error in getMovieDetails:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};




const bookSeats = async (movieAssignData) => {
  try {
    
  const { movieId, seats, token } = movieAssignData;

    // You must verify token and extract user ID securely
    const decoded = authService.validateAccessToken(token);
    const userId = decoded.userId;

    const booking = new MovieBooking({
      movie_assign_id: movieId,
      seat_number: seats,
      user_id: userId,
    });

    await booking.save();
    return { success: true, message: "Movie assigned successfully" };
  } catch (err) {
    throw new Error("Error creating movie assignment: " + err.message);
  }
};


const getMyBookings = async (token) => {
  try {

     const decoded = authService.validateAccessToken(token);
    const userId = decoded.userId;

    return await MovieBooking.aggregate([
      {
        $match: { user_id: new mongoose.Types.ObjectId(userId) } // Only current user's bookings
      },
      {
        $lookup: {
          from: "movieassigns",
          localField: "movie_assign_id",
          foreignField: "_id",
          as: "assign"
        }
      },
      { $unwind: "$assign" },

      // Join with movie
      {
        $lookup: {
          from: "movies",
          localField: "assign.movie_id",
          foreignField: "_id",
          as: "movie"
        }
      },
      { $unwind: "$movie" },

      // Join with screen
      {
        $lookup: {
          from: "screens",
          localField: "assign.seat_screen_id",
          foreignField: "_id",
          as: "screen"
        }
      },
      { $unwind: "$screen" },

      {
        $project: {
          _id: 1,
          createdAt: 1,
          show_time: "$assign.show_time",
          seats: "$seat_number",
          movie: {
            _id: "$movie._id",
            title: "$movie.title",
            image: "$movie.image"
          },
          screen: {
            _id: "$screen._id",
            screen_name: "$screen.screen_name"
          }
        }
      }
    ]);
  } catch (err) {
    throw new Error("Error fetching user bookings: " + err.message);
  }
};

const getDashboardStats = async () => {
  try {
    const usersCount = await User.countDocuments();
    const moviesCount = await Movie.countDocuments();

    // Count distinct users who have booked movies
    const bookedUsersCountAgg = await MovieBooking.aggregate([
      { $group: { _id: "$user_id" } },
      { $count: "uniqueUsers" }
    ]);
    const bookedUsersCount = bookedUsersCountAgg[0]?.uniqueUsers || 0;

   return ({
      usersCount,
      moviesCount,
      bookedUsersCount,
    });
  } catch (err) {
    throw new Error("Error creating movie assignment: " + err.message);
  }
};


module.exports = { createMovieAssign, getMovieAssigns, editMovieAssign, updateMovieAssign, deleteMovieAssign , getMovieDetails, bookSeats, getMyBookings, getDashboardStats};
