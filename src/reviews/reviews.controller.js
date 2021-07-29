const service = require('./reviews.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function reviewExists(req, res, next) {
  const reviewId = Number(req.params.reviewId);
  const foundReview = await service.read(reviewId);
  if (foundReview) {
    res.locals.review = foundReview;
    return next();
  }
  next({
    status: 404,
    message: `Review ${reviewId} cannot be found`,
  });
}

async function destroy(req, res) {
  await service.destroy(res.locals.review.review_id);
  res.sendStatus(204);
}

async function read(req, res, next) {
  res.json({ data: await service.read(res.locals.review.review_id) });
}

async function update(req, res, next) {
  const originalReview = res.locals.review;
  const updatedReview = {
    ...originalReview,
    score: req.body.data.score,
    content: req.body.data.content,
    review_id: originalReview.review_id,
  };
  const data = await service.updateReview(updatedReview);
  res.json({ data });
}

module.exports = {
  destroy: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  read: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(read)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
};
