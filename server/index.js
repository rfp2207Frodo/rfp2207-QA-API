const express = require('express');
const db = require ('./db/index.js');
const bodyParser = require('body-parser');
const config = require ('../config.js');
const router = require('./routes.js');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use('/qa', router);

app.listen(config.API_port);
console.log(`Listening at http://localhost:${config.API_port}`);

