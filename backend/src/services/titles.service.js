const { fetchTitles } = require('../utility/googlescholor');
const { fetchFromCrossRef } = require('../utility/crossapi');
const pythonAiService = require('./python-ai.service');
const { createError } = require('../utils/errors');

const checkGoogleScholarTitle = async (query) => {
  if (!query) {
    throw createError(400, 'Query parameter is required.');
  }

  const titles = await fetchTitles(query);
  const normalizedQuery = query.toLowerCase();
  const titleExists = titles.some((title) => title === normalizedQuery);

  return {
    exists: titleExists,
    title: titleExists ? query : undefined,
  };
};

const checkCrossrefTitles = async (query) => {
  if (!query) {
    throw createError(400, 'Query is required.');
  }

  const results = await fetchFromCrossRef(query);
  if (!results.length) {
    throw createError(404, 'No titles found.');
  }

  return { success: true, data: results };
};

const getAiFeedback = async (title) => {
  if (!title) {
    throw createError(400, 'Title is required.');
  }

  const feedback = await pythonAiService.execute(title);
  return { feedback };
};

module.exports = {
  checkGoogleScholarTitle,
  checkCrossrefTitles,
  getAiFeedback,
};
