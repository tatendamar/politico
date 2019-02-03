const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const partyRoutes = require('./api/routes/parties');
const officeRoutes = require('./api/routes/office');

const exampleRoutes = require('./routes/api');

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configuring cores
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, GET, DELETE');
    return res.status(200).json({});
  }
  next();
});

//init routes using the standard specified
app.use('/api/v1', partyRoutes);
app.use('/api/v1', officeRoutes);

//FIXME: DELETE THIS PATH
app.use('/api/v1', exampleRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

const port = process.env.PORT || 4000;

//listen for request
app.listen(port, () => {
  console.log('listening for request on port 4000');
});
