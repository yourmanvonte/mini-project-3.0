const express = require('express');
const router = express.Router();
const savedController = require('../controllers/savedSymbolController');

router.post('/', savedController.saveSymbol);
router.delete('/:id', savedController.deleteSavedSymbol);

module.exports = router;
