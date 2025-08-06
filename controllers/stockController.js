const Stock = require("../models/stock");
const { fetchStockData } = require("../services/alphaVantageService");

const initializeStocks = async () => {
  const symbols = ["AAPL", "GOOGL", "NVDA", "MSFT", "TSLA"];

  for (const symbol of symbols) {
    const stockData = await fetchStockData(symbol);

    if (stockData) {
      await Stock.findOneAndUpdate(
        { symbol: stockData.symbol },
        {
          symbol: stockData.symbol,
          name: stockData.symbol,
          price: stockData.price,
          date: stockData.date,
        },
        { upsert: true, new: true }
      );
    }
  }
};

const getAllStocks = async (req, res) => {
  const stocks = await Stock.find();
  res.json(stocks);
};

const getStockBySymbol = async (req, res) =>{
    const symbol = req.params.symbol.toUpperCase();
    const stockData = await fetchStockData(symbol);
    stockData ? res.json(stockData) : res.status(404).send(`Stock with symbol ${symbol} not found`);
};

const getStockById = async (req, res) => {
  const stock = await Stock.findById(req.params.id);
  stock ? res.json(stock) : res.status(404).send("Stock not found");
};

const createStock = async (req, res) => {
  const { symbol, name, price, date } = req.body;
  const newStock = new Stock({ symbol, name, price, date });
  await newStock.save();
  res.status(201).json(newStock);
};

const updateStock = async (req, res) => {
  const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  stock ? res.json(stock) : res.status(404).send("Stock not found");
};

const deleteStock = async (req, res) => {
  const stock = await Stock.findByIdAndDelete(req.params.id);
  stock ? res.send("Stock deleted") : res.status(404).send("Stock not found");
};

module.exports = {
  initializeStocks,
  getAllStocks,
  getStockBySymbol,
  getStockById,
  createStock,
  updateStock,
  deleteStock,
};
