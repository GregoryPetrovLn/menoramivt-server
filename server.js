const express = require('express');
const errorHandler = require('./src/middleware/error');
const morgan = require('morgan');
const corsPolicy = require('./src/utils/cors');

//Load env files
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
dotenvExpand.expand(dotenv.config({ path: './config/config.env' }));

//Import routes
const films = require('./src/routes/films');

const app = express();

app.use(corsPolicy);

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Body parser
app.use(express.json());

//Mount routes
app.use(`/api/omdb/films`, films);

//Middleware error hanlder
app.use(errorHandler);

//Init server
const PORT = process.env.PORT || 3300;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

//Handler unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
