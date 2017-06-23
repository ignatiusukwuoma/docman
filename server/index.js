import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();
app.use(express.static('lib/client'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
routes(app);

const port = process.env.PORT || 5000;

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../lib/client/index.html'));
});

app.listen(port, () => {
  console.log('express app started on port', `${port}`);
});

export default app;

