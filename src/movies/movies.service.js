const knex = require('../db/connection');

function read(movieId) {
  return knex('movies').select('*').where({ movie_id: movieId }).first();
}

function list(isShowing) {
  return knex('movies as m')
    .select('m.*')
    .modify((queryBuilder) => {
      if (isShowing) {
        queryBuilder
          .join('movies_theaters', 'm.movie_id', 'movies_theaters.movie_id')
          .where({ 'movies_theaters.is_showing': true })
          .groupBy('m.movie_id');
      }
    });
}

function activeMovies() {
  return knex('movies_theaters as mt')
    .join('movies as m', 'mt.movie_id', 'm.movie_id')
    .select(
      'm.movie_id as id',
      'm.title',
      'm.runtime_in_minutes',
      'm.rating',
      'm.description',
      'm.image_url'
    )
    .where({ 'mt.is_showing': true })
    .groupBy(
      'm.movie_id',
      'm.title',
      'm.runtime_in_minutes',
      'm.rating',
      'm.description',
      'm.image_url'
    );
}

module.exports = {
  read,
  list,
  activeMovies,
};
