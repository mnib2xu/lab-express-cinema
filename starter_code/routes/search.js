const express = require('express');
const router = express.Router();
const CelebModel = require('../models/celebrity')


// router.get('/', (req, res) => {
//   res.render('celebrities/show')
// })

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.post('/', (req, res) => {
  if (req.body.search) {
    const regex = new RegExp(escapeRegex(req.body.search), 'gi');
    CelebModel.find({ $or :[{"name": regex}, {"occupation": regex}, {"catchPhrase": regex} ]}, (err, celebs) => {
      if (err) res.status(500).send(err);
      else res.render('celebrities/search', {celebs})
    })
  }
})

module.exports = router