const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const actualBudgetData = new Schema({
  userID: { type: String, required: true },
  actualItems: {
    vendor: { type: String, required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    category: {
      type: String,
      enum: [
        "Food",
        "Groceries",
        "Shopping",
        "Entertainment",
        "Travel",
        "Education",
        "Auto & Transportation",
        "Other",
      ],
      required: true,
    },
    fileUpload: {type: String }
  },
  budgetItems: { type: Object },
  
});

const model = mongoose.model(
  "actualBudgetData",
  actualBudgetData
);

module.exports = model;
