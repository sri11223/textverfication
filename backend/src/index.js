const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const connectDb = require('./utility/db');
const registerRoutes = require('./routes');
const errorHandler = require('./middlewares/error.middleware');
const { info } = require('./utils/logger');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (_req, res) => {
  res.send('Text Verification API');
});

registerRoutes(app);

app.use(errorHandler);

connectDb().then(() => {
  app.listen(port, () => {
    info(`Server running at http://localhost:${port}`);
  });
});
