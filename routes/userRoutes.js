const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.registerUser);
router.get('/:id/saved', userController.getUserSavedSymbols);

module.exports = router;