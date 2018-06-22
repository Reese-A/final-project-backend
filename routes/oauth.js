const express = require('express');

const router = express.Router();

const User = require('../db/models/User');

router.route('/google/token')
.get((req, res) => {
  const { id } = req.user;
  return new User({ id })
  .fetch()
  .then(user => {
    const access_token = user.attributes.access_token;
    if (!access_token) {
      return res.status(500)
    }
    console.log('user token', user);
    console.log('access tokennnnnn', access_token);
    return res.json(access_token)
  })
  .catch(err => {
    return res.status(500).json(err);
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