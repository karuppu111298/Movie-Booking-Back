// controllers/screenController.js
const screenService = require('../services/screen_service');

const createScreen = async (req, res) => {
  try {
    const screen = await screenService.createScreen(req.body);
    res.status(201).json({ screen });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getScreens = async (req, res) => {
  try {
    const screens = await screenService.getScreens();
    res.status(200).json({ screens });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const editScreen = async (req, res) => {
  const { id } = req.body;  // Get the screen ID from the request params
  try {
    const editedScreen = await screenService.editScreen(id);
    if (!editedScreen) {
      return res.status(404).json({ error: 'Screen not found' });
    }
    res.status(200).json(editedScreen);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateScreen = async (req, res) => {
  const { id } = req.params;  // Get the screen ID from the request params
  const screenData = req.body;  // Only get the description from the request body

  try {
    const updatedScreen = await screenService.updateScreen(id, screenData);
    if (!updatedScreen) {
      return res.status(404).json({ error: 'Screen not found' });
    }
    res.status(200).json({ screen: updatedScreen });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteScreen = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedScreen = await screenService.deleteScreen(id);
    if (!deletedScreen) {
      return res.status(404).json({ error: 'Screen not found' });
    }
    res.status(200).json({ message: 'Screen deleted successfully', screen: deletedScreen });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = { createScreen, getScreens, editScreen, updateScreen, deleteScreen };
