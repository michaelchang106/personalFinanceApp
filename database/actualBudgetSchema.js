const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userActualBudgetData = new Schema({
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
  },
  budgetItems: { type: Object },
});

const model = mongoose.model("userActualBudgetData", userActualBudgetData);

module.exports = model;
