const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();
const router = require('./routes/router');


const app = express();

app.use(express.json())

const PORT = process.env.PORT || 5000;

app.use('/api/v1', router);

app.listen(PORT, () => {
  console.log("listening on port 5000");
});
