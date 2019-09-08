import {json} from 'express';

const express = require('express');
const app = express();

app.use(json());

module.exports = app.listen(8000);

