// controllers/movieAssignController.js
const movieAssignService = require('../services/movie_assign_service');

const createMovieAssign = async (req, res) => {
  try {

    const result = await movieAssignService.createMovieAssign(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getMovieAssigns = async (req, res) => {
  try {
    const movieAssigns = await movieAssignService.getMovieAssigns();
    res.status(200).json({ movieAssigns });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const editMovieAssign = async (req, res) => {
  const { id } = req.body;  // Get the movie assignment ID from the request params
  try {
    const editedMovieAssign = await movieAssignService.editMovieAssign(id);
    if (!editedMovieAssign) {
      return res.status(404).json({ error: 'Movie assignment not found' });
    }
    res.status(200).json(editedMovieAssign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateMovieAssign = async (req, res) => {
  const { id } = req.params;  // Get the movie assignment ID from the request params
  const movieAssignData = req.body;  // Only get the description from the request body

  try {
    const updatedMovieAssign = await movieAssignService.updateMovieAssign(id, movieAssignData);
    if (!updatedMovieAssign) {
      return res.status(404).json({ error: 'Movie assignment not found' });
    }
    res.status(200).json({ movieAssign: updatedMovieAssign });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteMovieAssign = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMovieAssign = await movieAssignService.deleteMovieAssign(id);
    if (!deletedMovieAssign) {
      return res.status(404).json({ error: 'Movie assignment not found' });
    }
    res.status(200).json({ message: 'Movie assignment deleted successfully', movieAssign: deletedMovieAssign });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getMovieDetails  =  async (req, res) => {
  const { movieId } = req.body;  // Get the movie assignment ID from the request params
  try {
    const editedMovieAssign = await movieAssignService.getMovieDetails(movieId);
    if (!editedMovieAssign) {
      return res.status(404).json({ error: 'Movie assignment not found' });
    }
    res.status(200).json(editedMovieAssign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const bookSeats  =  async (req, res) => {
  try {
    const editedMovieAssign = await movieAssignService.bookSeats(req.body);
    // if (!editedMovieAssign) {
    //   return res.status(404).json({ error: 'Movie assignment not found' });
    // }
    res.status(200).json(editedMovieAssign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getMyBookings  =  async (req, res) => {
  try {

     const { token } = req.body;  
    const editedMovieAssign = await movieAssignService.getMyBookings(token);
    // if (!editedMovieAssign) {
    //   return res.status(404).json({ error: 'Movie assignment not found' });
    // }
    res.status(200).json(editedMovieAssign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDashboardStats  =  async (req, res) => {
  try {
    const editedMovieAssign = await movieAssignService.getDashboardStats();
    
    res.status(200).json(editedMovieAssign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createMovieAssign, getMovieAssigns, editMovieAssign, updateMovieAssign, deleteMovieAssign, getMovieDetails, bookSeats , getMyBookings, getDashboardStats};
