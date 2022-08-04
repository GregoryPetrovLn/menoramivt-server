const express = require('express');
const { getListFilms } = require('../controllers/films');
const router = express.Router({ mergeParams: true });

router.route('/films').get(getListFilms);

module.exports = router;
