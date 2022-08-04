const asyncHandler = require('../middleware/async');
const axios = require('axios').default;
const { createQueryStr } = require('../utils/utils');
const ErrorResponse = require('../utils/ErrorResponse');

const OMDB_API_URL = `${process.env.BASE_API_URL}/?apikey=${process.env.OMDB_API_KEY}`;

//@desc Get films including query params
//@route GET /films
//@access Public
exports.getListFilms = asyncHandler(async (req, res, next) => {
  const OMDB_API_URL = `${process.env.BASE_API_URL}/?apikey=${process.env.OMDB_API_KEY}`;
  const result = await axios.get(
    `${OMDB_API_URL}&${createQueryStr(req.query)}`
  );
  if (result.data.Response == 'False') {
    return next(new ErrorResponse(result.data.Error, 400));
  }

  res.status(200).json({
    success: true,
    total: result.data.totalResults,
    data: result.data.Search,
  });
});

//@desc Get specific film
//@route GET /films/:id
//@access Public
exports.getFilm = asyncHandler(async (req, res, next) => {
  console.log(`${OMDB_API_URL}&i=${req.query.id}`);
  const result = await axios.get(`${OMDB_API_URL}&i=${req.params.id}`);
  if (result.data.Response == 'False') {
    return next(new ErrorResponse(result.data.Error, 400));
  }

  res.status(200).json({
    success: true,
    data: result.data,
  });
});
