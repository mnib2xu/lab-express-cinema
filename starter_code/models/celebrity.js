const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CelebModel = mongoose.model("celeb",
  new Schema({
    name: String,
    occupation: String,
    catchPhrase: String
  }))

module.exports = CelebModel;