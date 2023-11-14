const express = require('express');
const router = require('./app/routes/index');
let cors = require("cors");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;
app.use('/',router);

app.listen(port, () => {
  console.log(`QUAD listening at http://localhost:${port}`)
})