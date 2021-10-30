const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const taxData = new mongoose.Schema({
  salary: { type: Number, required: true },
  state: {
    type: String,
    enum: ["California", "New York", "Texas", "Florida"],
    required: true,
  },
  marital: { type: String, enum: ["Single", "MFS", "MFJ"], required: true },
});

// const actualData = new mongoose.Schema({
//   salary: { type: Number, required: true },
//   state: { type: String, enum: ["California", "New York", "Texas", "Florida"] },
//   marital: { type: String, enum: ["Single", "MFS", "MFJ"] },
// });

// const budgetData = new mongoose.Schema({
//   salary: { type: Number, required: true },
//   state: { type: String, enum: ["California", "New York", "Texas", "Florida"] },
//   marital: { type: String, enum: ["Single", "MFS", "MFJ"] },
// });

const userLoginInfo = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userID: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  taxData: taxData,
  actualData: { type: Object },
  budgetData: { type: Object },
});

const model = mongoose.model("userLoginInfo", userLoginInfo);

module.exports = model;
