const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

const User = require('../db/models/User');
const User_Profile = require('../db/models/User_Profile');
const Gender = require('../db/models/Gender');
const Activity_Level = require('../db/models/Activity_Level');
const Goal = require('../db/models/Goal');

const saltedRounds = 12;

const router = express.Router();

router.route('/').post((req, res) => {
  let {
    email,
    password,
    first_name,
    last_name,

    birthday,
    weight,
    height,
    gender_id,
    activity_level_id,
    goal_id
  } = req.body;

  if (!password.length) {
    return res.status(400).send('password length 0');
  }

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

  if (birthday.length) {
    birthday = Date.parse(birthday);
    if (isNaN(birthday)) {
      return res.status(400).send('birthday is invalid'); //change to standard message
    }
  }

  if (weight.length) {
    weight = Number(weight);
    if (isNaN(weight)) {
      return res.status(400).send('weight is invalid');
    }
  }

  if (height.length) {
    height = Number(height);

    if (isNaN(height)) {
      return res.status(400).send('height is invalid');
    }
  }

  if (gender_id.length) {
    gender_id = Number(gender_id);

    if (isNaN(gender_id)) {
      return res.status(400).send('gender_id is invalid');
    }
  }

  if (activity_level_id.length) {
    activity_level_id = Number(activity_level_id);

    if (isNaN(activity_level_id)) {
      return res.status(400).send('activity_level_id is invalid');
    }
  }

  if (goal_id.length) {
    goal_id = Number(goal_id);

    if (isNaN(goal_id)) {
      return res.status(400).send('goal_id is invalid');
    }
  }

  const age = Math.floor((new Date() - birthday) * 0.00000000003171);
  birthday = new Date(birthday);
  let x = null;
  let y = null;
  let z = null;
  let bmrEquation = null;

  const userObject = {
    email,
    password,
    first_name,
    last_name
  };

  const profileObject = {
    birthday,
    weight,
    height,
    gender_id,
    activity_level_id,
    goal_id
  };

  return bcrypt
    .genSalt(saltedRounds)
    .then(salt => {
      return bcrypt.hash(password, salt);
    })
    .then(hash => {
      userObject.password = hash;
      return new Gender({ id: gender_id }).fetch();
    })
    .then(gender => {
      if (!gender) {
        return res.send('no gender in database');
      }

      if (gender.id === 1) {
        x = 6.23;
        y = 12.7;
        z = 6.8;
        bmrEquation = x * weight + y * height - z * age;
        bmrEquation += 66;
      }

      if (gender.id === 2) {
        x = 4.35;
        y = 4.7;
        z = 4.7;
        bmrEquation = x * weight + y * height - z * age;
        bmrEquation += 665;
      }

      return new Activity_Level({ id: activity_level_id }).fetch();
    })
    .then(result => {
      const activityLevel = result.toJSON();

      if (!activityLevel) {
        return res.send('no activity level in database');
      }

      profileObject.allowance = Math.floor(
        bmrEquation * Number(activityLevel.modifier)
      );
      return new Goal({ id: goal_id }).fetch();
    })
    .then(result => {
      const goal = result.toJSON();

      if (!goal) {
        return res.send('no goals in database');
      }

      profileObject.allowance += Number(goal.modifier);

      return;
    })
    .then(profileObject => {
      return new User(userObject).save();
    })
    .then(user => {
      if (!user) {
        return res.status(500).send('something went wrong with user');
      }

      return user;
    })
    .then(user => {
      profileObject.user_id = user.id;

      return new User_Profile(profileObject).save();
    })
    .then(userProfile => {
      if (!userProfile) {
        return res
          .status(500)
          .send('something went wrong making the user profile');
      }

      return res.json(userProfile);
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json(err);
    });
});

router.route('/login').post(passport.authenticate('local'), (req, res) => {
  return res.json({
    id: req.user.id,
    email: req.user.email,
    first_name: req.user.first_name
  });
});

router.route('/logout').get((req, res) => {
  req.session.destroy();
  req.logOut();
  return res.json({
    success: true
  });
});

router.route('/dishes').get((req, res) => {
  const { id } = req.user;

  return new User({ id: id })
    .fetch({ withRelated: ['dishes.ingredients'] })
    .then(user => {
      return res.json(user);
    });
});

router.route('/:id').get((req, res) => {
  const user_id = Number(req.params.id);

  return new User_Profile({ user_id })
    .fetch({
      withRelated: ['gender', 'activity_level', 'goal']
    })
    .then(user => {
      if (!user) {
        return res.send('no user by that id');
      }

      return res.json(user);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json(err);
    });
});

module.exports = router;
