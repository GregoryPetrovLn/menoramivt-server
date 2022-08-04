const express = require('express');
const path = require('path');

//Load env files
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

//Import routes

const app = express();

//Body parser
app.use(express.json());

//Init server
const PORT = process.env.PORT || 3300;
const server = app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//Handler unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
