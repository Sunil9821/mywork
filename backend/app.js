const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./router.js');
const app = express();

app.use(bodyParser.json());
app.use(cors(
    {origin: '*'}
))
app.use('/', router);

app.listen(3000);