const express = require('express');

const Activity_Level = require('../db/models/Activity_Level');

const router = express.Router();

router.route('/')
.get((req, res) => {
  return Activity_Level
  .fetchAll()
  .then(activityLevels => {
    return res.json(activityLevels);
  })
  .catch(err => {
    return res.json(err);
  });
})

module.exports = router;