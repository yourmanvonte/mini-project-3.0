const express = require("express");
const mongoose = require("mongoose");
const stockRoutes = require("./routes/stockRoutes");
const userRoutes = require("./routes/userRoutes");
const savedSymbolRoutes = require("./routes/savedSymbolRoutes"); 
const { initializeStocks } = require("./controllers/stockController");
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    initializeStocks();
  })
  .catch((err) => console.error(err));

app.use("/api/stocks", stockRoutes);
app.use("/api/users", userRoutes);
app.use("/api/saved-symbols", savedSymbolRoutes);

app.get("/api", (req, res) => {
  res.send("Welcome to the Stock Market API");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
