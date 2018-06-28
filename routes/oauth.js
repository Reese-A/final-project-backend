const express = require('express');

const router = express.Router();

const User = require('../db/models/User');
const User_Profile = require('../db/models/User_Profile');

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
    return res.json(access_token)
  })
  .catch(err => {
    return res.status(500).json(err);
  })
})
.put((req, res) => {
  const { access_token } = req.body.tokenObj;
  const { id } = req.user;
  return new User()
  .where({ id })
  .save(
    { 
      access_token
     }, 
    { method: 'update' }
  )
  .then(user => {
    return new User_Profile()
    .where({ user_id: id})
    .save(
      {
        google_fit: true
      },
      { method: 'update' }
    )
  })
  .then(user_profile => {
    return res.json(user_profile);
  })
  .catch(err => {
    console.log(err);
    return res.status(500).json(err);
  })
});


module.exports = router;