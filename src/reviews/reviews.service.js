const knex = require('../db/connection');

function read(reviewId) {
  console.log(reviewId);
  return knex('reviews').select('*').where({ review_id: reviewId }).first();
}

function destroy(reviewId) {
  return knex('reviews').where({ review_id: reviewId }).first().del();
  //   Received: "select * from `reviews` where `reviewId` = '337' - SQLITE_ERROR: no such column: reviewId
}

module.exports = {
  read,
  destroy,
};
