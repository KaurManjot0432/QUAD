const express = require('express');
const router = require('./app/routes/index');

const app = express();
app.use(express.json());
const port = 3001;
app.use('/',router);

app.listen(port, () => {
  console.log(`QUAD listening at http://localhost:${port}`)
})