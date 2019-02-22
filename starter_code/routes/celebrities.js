const express = require('express');
const router = express.Router();
const CelebModel = require('../models/celebrity')

router.get('/', (req, res, next) => {
  CelebModel.find({}, (err, celebs) => {
    if (err) res.send("error")
    res.render('celebrities/index', {
      celebs: celebs
    })
  })
})

router.get('/details', (req, res, next) => {
  debugger
  CelebModel.findOne({_id: req.query.id}, (err, celeb) => {
    res.render('celebrities/show', {
      celeb
    })
  })
});

router.get('/new', (req, res) => {
  res.render('celebrities/new')
})

// CREATE CELEB
router.post('/', (req, res) => {
  const {name, occupation, catchPhrase} = req.body;
  let newUser = {
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  }
  CelebModel.create(newUser, (err) => {
    if (err) {
      res.redirect('celebrities/new')
    } else {
      res.redirect("/celebrities")
    }
  })
})

// DELETE CELEB
router.post('/:id/delete', (req, res) => {
  CelebModel.findByIdAndDelete({_id: req.params.id}, (err) => {
    res.redirect("/celebrities")
  })
})

// EDIT CELEB
router.get('/:id/edit', (req, res) => {
  CelebModel.findOne({_id: req.params.id}, (err, celeb) => {
    if (err) console.log("ERRROR");
    else res.render('celebrities/edit', {celeb})
    // res.render('celebrities/show', {celeb})
  })
})

router.post('/:id', (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  CelebModel.updateOne({ _id: req.params.id }, { $set: {name, occupation, catchPhrase} })
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;