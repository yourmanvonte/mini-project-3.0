const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserSavedSymbols } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id/saved', getUserSavedSymbols);

module.exports = router;
