const authRoutes = require('./auth.routes');
const titlesRoutes = require('./titles.routes');

const registerRoutes = (app) => {
  app.use('/auth', authRoutes);
  app.use('/api', titlesRoutes);
};

module.exports = registerRoutes;
