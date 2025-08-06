const Stock = require("../models/stock");
const { fetchStockData } = require("../services/twelveDataService");

const initializeStocks = async () => {
  const symbols = ["AAPL", "GOOGL", "NVDA", "MSFT", "TSLA"];

  for (const symbol of symbols) {
    const stockData = await fetchStockData(symbol);

    if (stockData) {
      await Stock.findOneAndUpdate(
        { symbol: stockData.symbol },
        {
          symbol: stockData.symbol,
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

const getStockById = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) return res.status(404).send("Stock not found");
    res.json(stock);
  } catch (error) {
    res.status(400).send("Invalid ID format");
  }
};

const getStockBySymbol = async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const stockData = await fetchStockData(symbol);

  if (!stockData)
    return res.status(404).send(`No data found for symbol: ${symbol}`);
  res.json(stockData);
};

const createStock = async (req, res) => {
  const { symbol, price, date } = req.body;
  const newStock = new Stock({ symbol, price, date });
  await newStock.save();
  res.status(201).json(newStock);
};

const updateStock = async (req, res) => {
  try {
    const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!stock) return res.status(404).send("Stock not found");
    res.json(stock);
  } catch (error) {
    res.status(400).send("Invalid ID format");
  }
};

const deleteStock = async (req, res) => {
  try {
    const stock = await Stock.findByIdAndDelete(req.params.id);
    if (!stock) return res.status(404).send("Stock not found");
    res.send("Stock deleted");
  } catch (error) {
    res.status(400).send("Invalid ID format");
  }
};

module.exports = {
  initializeStocks,
  getAllStocks,
  getStockById,
  getStockBySymbol,
  createStock,
  updateStock,
  deleteStock,
};
