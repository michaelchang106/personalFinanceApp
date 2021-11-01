const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taxData = new Schema({
  salary: { type: Number, required: true },
  state: {
    type: String,
    enum: ["California", "New York", "Texas", "Florida"],
    required: true,
  },
  marital: { type: String, enum: ["Single", "MFS", "MFJ"], required: true },
});

const UserLoginDB = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userID: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  taxData: taxData,
});

const model = mongoose.model("UserLoginDB", UserLoginDB);

module.exports = model;
