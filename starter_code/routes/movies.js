const express = require('express');
const router  = express.Router();
const MovieModel = require('../models/movie')

router.get('/', (req, res, next) => {
  MovieModel.find({}, (err, movies) => {
    if (err) res.send("Shit fuck AIDS")
    else res.render('movies/index', {movies})
  })
})

router.get('/details', (req, res, next) => {
  debugger
  MovieModel.findById(req.query.id, (err, movie) => {
    if (err) res.send("ShitFuckAIDS")
    else res.render('movies/details', {movie})
  })
})

router.get('/new', (req, res, next) => {
  res.render('movies/new')
})

router.post('/', (req, res, next) => {
  const {title, director, stars, image, description, showtimes} = req.body;
  newMovie = {
    title: title,
    director: director,
    stars,
    image,
    description,
    showtimes
  }

  MovieModel.create(newMovie, (err) => {
    if (err) console.log("Fuckers");
    else res.redirect('/movies');
  })
})

module.exports = router;