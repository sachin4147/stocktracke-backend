const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    unique: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// Function to update stock prices every minute
stockSchema.statics.updateStockPrices = async function () {
  const stocks = await this.find();
  stocks.forEach(async (stock) => {
    // Update the price with some randomness
    stock.price = stock.price + Math.random();
    await stock.save();
  });
};

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;