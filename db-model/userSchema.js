const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserLoginInfo = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userID: { type: String, required: true },
});

const model = mongoose.model("UserLoginInfo", UserLoginInfo);

module.exports = model;
