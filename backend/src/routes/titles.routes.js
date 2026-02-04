const express = require('express');
const titlesController = require('../controllers/titles.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/titles', authMiddleware.optional, titlesController.checkTitle);
router.get('/titles/crossref', authMiddleware.optional, titlesController.crossrefLookup);
router.get('/titles/ai', authMiddleware.optional, titlesController.aiFeedback);

module.exports = router;
