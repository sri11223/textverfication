const titlesService = require('../services/titles.service');

const checkTitle = async (req, res, next) => {
  try {
    const { query } = req.query;
    const response = await titlesService.checkGoogleScholarTitle(query);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

const crossrefLookup = async (req, res, next) => {
  try {
    const { query } = req.query;
    const response = await titlesService.checkCrossrefTitles(query);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

const aiFeedback = async (req, res, next) => {
  try {
    const { title } = req.query;
    const response = await titlesService.getAiFeedback(title);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  checkTitle,
  crossrefLookup,
  aiFeedback,
};
