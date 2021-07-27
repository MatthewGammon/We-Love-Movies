const service = require('./reviews.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function reviewExists(req, res, next) {
  const reviewId = Number(req.params.reviewId);
  console.log(typeof reviewId);
  const foundReview = await service.read(reviewId);
  if (foundReview) {
    res.locals.review = foundReview;
    return next();
  }
  next({
    status: 404,
    message: `Review with id ${reviewId} does not exist!`,
  });
}

async function destroy(req, res) {
  await service.destroy(res.locals.review.review_id);
  res.sendStatus(204);
}

module.exports = {
  destroy: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
