const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

const fetchStockData = async (symbol) => {
  try {
    const response = await axios.get("https://www.alphavantage.co/query", {
      params: {
        function: "GLOBAL_QUOTE",
        symbol: symbol,
        apikey: API_KEY,
      },
    });
    const data = response.data["Global Quote"];

    if (!data || Object.keys(data).length === 0) {
      console.error(`No data found for symbol: ${symbol}`);
      return null;
    }
    return {
      symbol: data["01. symbol"],
      price: parseFloat(data["05. price"]),
      date: data["07. latest trading day"],
    };
  } catch (error) {
    console.error("Error fetching data from Alpha Vantage:", error.message);
    return null;
  }
};

module.exports = { fetchStockData };
