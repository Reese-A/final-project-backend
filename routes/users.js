const express = require('express');

const User = require('../db/models/User');
const User_Profile = require('../db/models/User_Profile');

const router = express.Router();

router.route('/')
  .post((req, res) => {
    let { email, first_name, last_name } = req.body;
    const { password } = req.body;

    let { }

    if (email.length) {
      email = email.trim().toLowerCase();

      if (!email.length) {
        return res.status(400).send('email length 0'); //change to standard message
      }
    }

    if (first_name.length) {
      first_name = first_name.trim().toLowerCase();

      if (!first_name.length) {
        return res.status(400).send('first_name length 0'); //change to standard message
      }
    }

    if (last_name.length) {
      last_name = last_name.trim().toLowerCase();

      if (!last_name.length) {
        return res.status(400).send('last_name length 0'); //change to standard message
      }
    }


  })

module.exports = router;