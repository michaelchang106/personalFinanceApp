const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userActualBudgetIncomeData = new Schema({
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
  incomeDate: {
    salary: { type: Number, required: true },
    state: {
      type: String,
      enum: ["California", "New York", "Texas", "Florida"],
      required: true,
    },
    marital: { type: String, enum: ["Single", "MFS", "MFJ"], required: true },
  },
});

const model = mongoose.model(
  "userActualBudgetIncomeData",
  userActualBudgetIncomeData
);

module.exports = model;
