const express = require('express');

const Gender = require('../db/models/Gender');

const router = express.Router();

router.route('/')
.get((req, res) => {
  return Gender
  .fetchAll()
  .then(genders => {
    return res.json(genders);
  })
  .catch(err => {
    return res.json(err);
  });
})

module.exports = router;