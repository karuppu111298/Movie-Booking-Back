// services/movieService.js
const Movie = require('../models/movie_model');
const multer = require('multer');
const path = require('path');

const createMovie = async (req) => {
  try {
    // Extract title from the request body
    const { movieName } = req.body;

    // Prepare the movie data object
    const movieData = { title: movieName };

    // If an image file was uploaded, add the filename to the movieData object
    if (req.file) {
      movieData.image = req.file.filename;
    }

    // Save the new movie to the database
    const newMovie = new Movie(movieData);
    await newMovie.save();

   return { success:true, movie: newMovie, message:"Movie Successfully Created" };
  } catch (error) {
    return { success: false, message: 'Error saving movie: ' + error.message };
  }
};




const getMovies = async () => {
  try {
    return await Movie.find();
  } catch (err) {
    throw new Error('Error fetching movies: ' + err.message);
  }
};



const editMovie = async (id) => {
  try {
    const movie = await Movie.findOne({ _id: id });
    return { success: true, movie, message: "Movie Successfully Listed" };
  } catch (err) {
    throw new Error('Error listing movie: ' + err.message);
  }
};

const updateMovie = async (id, movieData) => {
  try {

    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      movieData,
      { new: true }
    );
    return { success: true, updatedMovie, message: "Movie Successfully Updated" };
  } catch (err) {
    throw new Error('Error updating movie: ' + err.message);
  }
};

const deleteMovie = async (id) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);
    return deletedMovie;
  } catch (err) {
    throw new Error('Error deleting movie: ' + err.message);
  }
};

module.exports = { createMovie, getMovies, editMovie, updateMovie, deleteMovie };
