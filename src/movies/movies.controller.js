const service = require('./movies.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function list(req, res, next) {
  const isShowing = req.query.is_showing;
  if (isShowing) {
    res.json({ data: await service.activeMovies() });
  }
  res.json({ data: await service.list() });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
