const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieModel = mongoose.model("movies",
  new Schema({
    title: String,
    director: String,
    stars: Array,
    image: String,
    description: String,
    showtimes: Array
  }))

  module.exports = MovieModel;