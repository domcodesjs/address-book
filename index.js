require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());

app.use(morgan('tiny'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/address', require('./routes/index'));
app.get('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Not Found'
  });
});

app.listen(PORT, () => console.log(`Express is running on port ${PORT}`));
