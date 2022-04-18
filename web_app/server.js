const express = require('express');
const engine = require('express-handlebars').engine;
const path = require('path');
const dotenv = require('dotenv');
const colors = require('colors');
const debug = require('debug')('app');
const morgan = require('morgan');
const errorHandler = require(`./middleware/error`);

dotenv.config({ path: './config.env' });

const app = express();

//templating engine with handlebars
app.engine(
  'hbs',
  engine({
    layoutsDir: 'src/views/layouts/',
    defaultLayout: 'main-layout',
    extname: 'hbs',
  })
);
app.set('view engine', 'hbs');
app.set('views', './src/views');

//logging with morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

/**
 * @desc     Get home page
 * @route    GET /
 * @access   Public
 */
app.get('/', (req, res) => {
  res.status(200).render('index', {
    pageTitle: 'Welcome!',
  });
});

/**
 * @desc     Returns 404 on bad route request
 * @route    GET /{all errors}
 * @access   Public
 */
app.use('/', (req, res) => {
  res.status(404).render('error', {
    pageTitle: 'Error',
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () =>
  debug(
    colors.green.inverse(`Server is active on port ${PORT} - hello there...`)
  )
);
