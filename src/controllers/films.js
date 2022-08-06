const asyncHandler = require('../middleware/async');
const axios = require('axios').default;
const { createQueryStr } = require('../utils/utils');
const ErrorResponse = require('../utils/ErrorResponse');

//@desc Get films including query params
//@route GET /films
//@access Public
exports.getListFilms = asyncHandler(async (req, res, next) => {
  const result = await axios.get(
    `${process.env.OMDB_API_URL}&${createQueryStr(req.query)}`
  );
  if (result.data.Response == 'False') {
    return next(new ErrorResponse(result.data.Error, 400));
  }

  res.status(200).json({
    success: true,
    total: Number(result.data.totalResults),
    page: Number(req.query.page),
    count: result.data.Search.length,
    data: result.data.Search,
  });
});

//@desc Get specific film by id
//@route GET /films/:id
//@access Public
exports.getFilm = asyncHandler(async (req, res, next) => {
  const result = await axios.get(
    `${process.env.OMDB_API_URL}&i=${req.params.id}`
  );
  if (result.data.Response == 'False') {
    return next(new ErrorResponse(result.data.Error, 400));
  }

  res.status(200).json({
    success: true,
    data: result.data,
  });
});
