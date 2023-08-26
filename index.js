const express = require('express');
const connect = require('./app/models/quadDb');
const router = require('./app/routes/index');

connect();
const app = express();
app.use(express.json());
const port = 3001;
app.use('/',router);

app.listen(port, () => {
  console.log(`myApp listening at http://localhost:${port}`)
})