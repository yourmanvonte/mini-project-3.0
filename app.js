const express = require('express');
const app = express();
const connectDB = require('./config/database');
const stockRoutes = require('./routes/stockRoutes');
const { initializeStocks } = require('./controllers/stockController');
require('dotenv').config();

app.get('/api', (req, res) => {
    res.send('Welcome to the Stock Market API');
});


app.use(express.json());
app.use('/api/stocks', stockRoutes);

connectDB().then(async () => {
    await initializeStocks();
    app.listen(3000, () => console.log('Server running on port 3000'));
});