const express = require('express');
const engine = require('express-handlebars').engine;
const path = require('path');
const dotenv = require('dotenv');
const errorHandler = require(`./middleware/error`);

const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const debug = require('debug')('app:server');
const colors = require('colors');
const morgan = require('morgan');

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

//parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//auth
app.use(cookieParser());
app.use(session({ secret: process.env.SECRET }));
//passport
require('./src/config/passport')(app);

//import routes
const routes = require('./src/routes');

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//get routes
app.use(routes);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>
  debug(
    colors.green.inverse(`Server is active on port ${PORT} - hello there...`)
  )
);
