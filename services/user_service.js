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

const editUser = async (id) => {
  try {
   
    const user_rec = await User.findOne({ _id:id });
    return { success:true, user_rec, message:"User Successfully Listed" };
  } catch (err) {
    throw new Error('Error list user: ' + err.message);
  }
};

const updateUser = async (id, userData) => {
  try {

    const updatedUser = await User.findByIdAndUpdate( 
      id,
       userData, 
      { new: true }
    );
    return { success:true, updatedUser, message:"User Successfully Updated" };
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

module.exports = { createUser, getUsers, editUser, updateUser, deleteUser};
