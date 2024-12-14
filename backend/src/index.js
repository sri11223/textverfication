const express=require('express');
const app = express();
const mongoose=require('mongoose');
require('dotenv').config();
const cors = require('cors');
app.use(cors());

const port = process.env.port || 4000;
app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
  
  //database
  const connectDb=require('./utility/db');
  connectDb().then(
    app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  }));  


  app.use(express.json());
// for authentication
  const auth=require('./router/auth');
  app.use('/auth',auth)

  // for titles
  const titleRoutes = require('./router/title');
  app.use('/api', titleRoutes);