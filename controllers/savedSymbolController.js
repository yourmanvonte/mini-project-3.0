const SavedSymbol = require("../models/savedSymbol");

const saveSymbol = async (req, res) => {
  try {
    const { userId, symbol, alias } = req.body;
    const newSaved = new SavedSymbol({ userId, symbol, alias });
    await newSaved.save();
    res.status(201).json(newSaved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteSavedSymbol = async (req, res) => {
  try {
    const deleted = await SavedSymbol.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Saved symbol not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  saveSymbol,
  deleteSavedSymbol,
};
