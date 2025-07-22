// services/userService.js
const User = require('../models/user_model');

const createUser = async (userData) => {
  try {
    const user = await User.findOne({ email:userData.email });
    if(user){
        return { success:false, message:"User Already Exist" };
    }else{
    const user = new User(userData);
    await user.save();
    return { success:true, user, message:"User Successfully Created" };
    }
  } catch (err) {
    throw new Error('Error creating user: ' + err.message);
  }
};

const getUsers = async () => {
  try {
    return await User.find();
  } catch (err) {
    throw new Error('Error fetching users: ' + err.message);
  }
};

const updateUser = async (id, userData) => {
  try {
    // Update only the description field
    var desc = userData.description;

    const updatedUser = await User.findByIdAndUpdate( id, { description: desc  }, { new: true } );
    return updatedUser;
  } catch (err) {
    throw new Error('Error updating user: ' + err.message);
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
  } catch (err) {
    throw new Error('Error deleting user: ' + err.message);
  }
};

module.exports = { createUser, getUsers, updateUser, deleteUser};
