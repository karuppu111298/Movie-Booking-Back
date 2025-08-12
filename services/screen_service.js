// services/screenService.js
const Screen = require('../models/screen_model');

const generateSeats = (qty) => {
  let left = [];
  let center = [];
  let right = [];

  let perSection = Math.ceil(qty / 3);
  let sectionLimits = [perSection, perSection * 2, qty];

  let seatId = 1;

  for (let i = 1; i <= qty; i++) {
    let seatName = "";
    if (i <= sectionLimits[0]) {
      seatName = `L${i}`;
      left.push({
        id: seatId++,
        name: seatName,
        isBooked: false,
        bookedBy: null
      });
    } else if (i <= sectionLimits[1]) {
      seatName = `C${i - sectionLimits[0]}`;
      center.push({
        id: seatId++,
        name: seatName,
        isBooked: false,
        bookedBy: null
      });
    } else {
      seatName = `R${i - sectionLimits[1]}`;
      right.push({
        id: seatId++,
        name: seatName,
        isBooked: false,
        bookedBy: null
      });
    }
  }

  return { left, center, right };
};




const createScreen = async (screenData) => {
  try {
    const { screen_name, seat_qty } = screenData;

    if (!seat_qty || seat_qty <= 0) {
      throw new Error("Invalid seat quantity");
    }

    const seats = generateSeats(seat_qty);

    const screen = new Screen({
      screen_name,
      seat_qty,
      seat_number: seats
    });

    await screen.save();
    return { success: true, screen, message: "Screen Successfully Created" };

  } catch (err) {
    throw new Error('Error creating screen: ' + err.message);
  }
};

const getScreens = async () => {
  try {
    return await Screen.find();
  } catch (err) {
    throw new Error('Error fetching screens: ' + err.message);
  }
};



const editScreen = async (id) => {
  try {
    const screen = await Screen.findOne({ _id: id });
    return { success: true, screen, message: "Screen Successfully Listed" };
  } catch (err) {
    throw new Error('Error listing screen: ' + err.message);
  }
};

const updateScreen = async (id, screenData) => {
  try {

    const updatedScreen = await Screen.findByIdAndUpdate(
      id,
      screenData,
      { new: true }
    );
    return { success: true, updatedScreen, message: "Screen Successfully Updated" };
  } catch (err) {
    throw new Error('Error updating screen: ' + err.message);
  }
};

const deleteScreen = async (id) => {
  try {
    const deletedScreen = await Screen.findByIdAndDelete(id);
    return deletedScreen;
  } catch (err) {
    throw new Error('Error deleting screen: ' + err.message);
  }
};

module.exports = { createScreen, getScreens, editScreen, updateScreen, deleteScreen };
