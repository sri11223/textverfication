const express = require('express');
const router = express.Router();
const { checkTitles, check } = require('../controllers/TitleController');

// Route to check if a title exists in Google Scholar
router.get('/titles', check);

module.exports = router;
