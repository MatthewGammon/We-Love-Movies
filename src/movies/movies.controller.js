const service = require('./movies.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function movieExists(req, res, next) {
  const movieId = Number(req.params.movieId);
  const foundMovie = await service.read(movieId);
  if (foundMovie) {
    res.locals.movie = foundMovie;
    return next();
  }
  next({
    status: 404,
    message: `Movie with id ${movieId} does not exist!`,
  });
}

async function read(req, res, next) {
  res.json({ data: res.locals.movie });
}

async function list(req, res, next) {
  const isShowing = req.query.is_showing;
  if (isShowing) {
    res.json({ data: await service.activeMovies() });
  }
  res.json({ data: await service.list() });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
};
