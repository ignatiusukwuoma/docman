import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

require('dotenv').config();

// Setup Express App
const app = express();

// Log requests to the console
app.use(logger('dev'));

// Parse incoming request data
app.use(bodyParser.urlencoded({ extended: false }));

// Setup default route that sends back a welcome message
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to my web application',
}));

export default app;

