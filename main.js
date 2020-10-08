const express = require("express");
const cors = require("cors");
const products = require('./app/src/Products/Products');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/', products);

if(process.env.NODE_ENV === 'test') module.exports = app;
else {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}
