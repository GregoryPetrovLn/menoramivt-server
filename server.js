const express = require('express');
const errorHandler = require('./src/middleware/error');

//Load env files
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

//Import routes
const films = require('./src/routes/films');

const app = express();

//Body parser
app.use(express.json());

//Mount routes
app.use(`/api/ombdb`, films);

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
