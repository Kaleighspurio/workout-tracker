const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8080;

const app = express();

// put middleware here!


let MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/workout';

mongoose.connect(MONGO_URI)