const router = require('express').Router({ mergeParams: true });
const controller = require('./movies.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/').get(controller.list).all(methodNotAllowed);
router.route('/:movieId/theaters').get(controller.theatersList);
router.route('/:movieId/reviews').get(controller.reviewsList);
router.route('/:movieId').get(controller.read);

module.exports = router;
