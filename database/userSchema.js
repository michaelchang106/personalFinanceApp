const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userLoginInfo = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userID: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true}
});

const model = mongoose.model("userLoginInfo", userLoginInfo);

module.exports = model;
