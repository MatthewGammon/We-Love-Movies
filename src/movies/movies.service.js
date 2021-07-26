const knex = require('../db/connection');

function list() {
  return knex('movies').select('*');
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
  list,
  activeMovies,
};
