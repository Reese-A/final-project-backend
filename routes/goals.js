const express = require('express');

const Goal = require('../db/models/Goal');

const router = express.Router();

router.route('/')
.get((req, res) => {
  return Goal
  .fetchAll()
  .then(goals => {
    return res.json(goals);
  })
  .catch(err => {
    return res.json(err);
  });
})

module.exports = router;