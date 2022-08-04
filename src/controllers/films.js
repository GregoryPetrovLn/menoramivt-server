const asyncHandler = require('../middleware/async');
const axios = require('axios').default;
const { createQueryStr } = require('../utils/utils');
const ErrorResponse = require('../utils/ErrorResponse');

//@desc Get all movies
//@route GET /films
//@access Public
exports.getListFilms = asyncHandler(async (req, res, next) => {
  const omdbApiUrl = `${process.env.BASE_API_URL}/?apikey=${process.env.OMDB_API_KEY}`;
  const films = await axios.get(`${omdbApiUrl}&${createQueryStr(req.query)}`);

  if (films.data.Response == 'False') {
    return next(new ErrorResponse(films.data.Error, 400));
  }

  res.status(200).json({
    success: true,
    total: films.data.totalResults,
    data: films.data.Search,
  });
});
