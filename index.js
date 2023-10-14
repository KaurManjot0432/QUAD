const express = require('express');
const router = require('./app/routes/index');
let cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const port = 3001;
app.use('/',router);

app.listen(port, () => {
  console.log(`QUAD listening at http://localhost:${port}`)
})