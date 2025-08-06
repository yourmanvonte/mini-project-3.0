const axios = require("axios");
require("dotenv").config();

const fetchStockData = async (symbol) => {
  try {
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&apikey=${process.env.TWELVE_DATA_API_KEY}&format=json&outputsize=1`;

    const response = await axios.get(url);

    if (response.data.status === "error" || !response.data.values) {
      console.log(`No data found for symbol: ${symbol}`);
      return null;
    }

    const latestData = response.data.values[0];

    return {
      symbol,
      date: latestData.datetime,
      price: parseFloat(latestData.close),
    };
  } catch (error) {
    console.error(`Error fetching data for symbol: ${symbol}`, error.message);
    return null;
  }
};

module.exports = {
  fetchStockData,
};
