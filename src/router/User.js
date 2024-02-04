const express = require('express');
const { register, login, Delete } = require('../controllers/User');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/delete', Delete);
module.exports = router;
