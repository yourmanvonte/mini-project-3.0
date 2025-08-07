const User = require("../models/user");
const SavedSymbol = require("../models/savedSymbol");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, passwordHash });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUserSavedSymbols = async (req, res) => {
  const userId = req.params.id;
  try {
    const saved = await SavedSymbol.find({ userId });
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  registerUser,
  getUserSavedSymbols,
};
