const dotenv = require('dotenv');
dotenv.config();
const mongoose = require("mongoose");
const dbPath = process.env.DB_PRODUCTION_URL;

mongoose.connect(dbPath, { useNewUrlParser: true, useUnifiedTopology: true},err => {
  if(err) console.log('DB disconnecte');
  console.log('DB connected');
});


const db = mongoose.connection;

module.exports = db;