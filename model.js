const mongoose = require("mongoose");
const tickerSchema = mongoose.Schema(
  {
    base_unit: {
      type: String,
    },
    last: {
      type: String,
    },
    buy: {
      type: String,
    },
    sell: {
      type: String,
    },
    open: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Ticker = mongoose.model("Ticker", tickerSchema);
module.exports = Ticker;
