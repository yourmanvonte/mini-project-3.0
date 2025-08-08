const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserSavedSymbols, getAllUsers } = require('../controllers/userController');

router.get('/', getAllUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id/saved', getUserSavedSymbols);

module.exports = router;
