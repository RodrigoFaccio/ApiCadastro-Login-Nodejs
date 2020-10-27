const express = require('express');
const BodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('./database/index.js');
const multer = require('multer');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('ok');
});

require('./controllers/authController.js')(app);

app.listen(3001);
