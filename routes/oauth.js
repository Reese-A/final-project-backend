const express = require('express');

const router = express.Router();

const User = require('../db/models/User');

router.route('/google/token')
.get((req, res) => {
  const { id } = req.user;
  return new User({ id })
  .fetch()
  .then(user => {
    return res.json(user)
  })
  .catch(err => {
    console.log(err); 
  })
})
.put((req, res) => {
  const { access_token } = req.body.tokenObj;
  const { email } = req.body.profileObj;
  return new User()
  .where({ email })
  .save(
    { access_token }, 
    { method: 'update' }
  )
  .then(user => {
    return res.json(user);
  })
  .catch(err => {
    console.log(err);
    return res.status(500).json(err);
  })
});


module.exports = router;