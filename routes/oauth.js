const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../db/models/User');

router.route('/google/token')
.get((req, res) => {
  
})
.put((req, res) => {
  console.log('req body', req.body);
  console.log('req user', req);
  // const { id } = req.user;
  // return new User({})

});




// router.route('/google/callback')
// .get((req, res, next) => {
//   passport.authenticate('google', (err, user, info) => {
//     console.log('callback err', err);
//     console.log('callback user', user);
//     console.log('callback info', info);
//     if (err) { return next(err) }
//     if (!user) {
//       console.log('!user');
//       console.log('!user req', req.body);
//       return res.json({ message: info.message })
//     } else {
//       console.log('callback user req', user);
//       return res.json(user);
//     }
//   })(req, res, next);
// })

module.exports = router;