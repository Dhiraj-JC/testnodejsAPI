const express = require('express');
const dotenv = require('dotenv');
const { authenticateRouter, productRouter } = require('./routes');
const { connect } = require('mongoose');
const cors = require('cors');
const {
  customLoggerMiddleware,
  tokenValidatorMiddleWare,
} = require('./middlewares');

const app = express();
dotenv.config();
connect(
  process.env.DB_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log(err);
    console.log('database is connected');
  }
);

app.use(express.json());
app.use(cors());
app.use(customLoggerMiddleware);
app.use('/auth', authenticateRouter);
app.use('/products', tokenValidatorMiddleWare, productRouter);

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (err) console.error(err);
  console.log(`listening on port ${PORT}`);
});
