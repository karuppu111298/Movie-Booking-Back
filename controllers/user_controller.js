// controllers/userController.js
const userService = require('../services/user_service');

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const editUser = async (req, res) => {
  const { id } = req.body;  // Get the user ID from the request params
  try {
    const editdUser = await userService.editUser(id);
    if (!editdUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user: editdUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateUser = async (req, res) => {
  const { id } = req.params;  // Get the user ID from the request params
  const userData = req.body;  // Only get the description from the request body

  try {
    const updatedUser = await userService.updateUser(id, userData);
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params; 
  try {
    const deletedUser = await userService.deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = { createUser, getUsers, editUser, updateUser, deleteUser};
