// controllers/movieController.js
const movieService = require('../services/movie_service');

const createMovie = async (req, res) => {
  try {
    const result = await movieService.createMovie(req);
    if (result.success) {
      res.status(201).json({ result });
    } else {
      res.status(400).json({ success: false, message: result.message });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getMovies = async (req, res) => {
  try {
    const movies = await movieService.getMovies();
    res.status(200).json({ movies });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const editMovie = async (req, res) => {
  const { id } = req.body;  // Get the movie ID from the request params
  try {
    const editedMovie = await movieService.editMovie(id);
    if (!editedMovie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(200).json(editedMovie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateMovie = async (req, res) => {
  const { id } = req.params;  // Get the movie ID from the request params
  const movieData = req.body;  // Only get the description from the request body

  try {
    const updatedMovie = await movieService.updateMovie(id, movieData);
    if (!updatedMovie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(200).json({ movie: updatedMovie });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMovie = await movieService.deleteMovie(id);
    if (!deletedMovie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(200).json({ message: 'Movie deleted successfully', movie: deletedMovie });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = { createMovie, getMovies, editMovie, updateMovie, deleteMovie };
