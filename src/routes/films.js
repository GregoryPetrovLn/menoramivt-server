const express = require('express');
const { getListFilms, getFilm } = require('../controllers/films');
const router = express.Router({ mergeParams: true });

router.route('/').get(getListFilms);
router.route('/:id').get(getFilm);

module.exports = router;
