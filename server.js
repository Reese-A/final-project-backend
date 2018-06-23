require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const Redis = require('connect-redis')(session);

const User = require('./db/models/User');
const routes = require('./routes');
const path = require('path');

const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    store: new Redis(),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  console.log('serializing');
  return done(null, {
    id: user.id,
    username: user.username
  });
});

passport.deserializeUser((user, done) => {
  console.log('deserializing');
  new User({
    id: user.id
  })
    .fetch()
    .then(user => {
      user = user.toJSON();
      return done(null, {
        id: user.id,
        username: user.username
      });
    })
    .catch(err => {
      console.log(err);
      return done(err);
    });
});

passport.use(
  new LocalStrategy({ usernameField: 'email' }, function(
    email,
    password,
    done
  ) {
    return new User({ email })
      .fetch()
      .then(user => {
        user = user.toJSON();
        console.log(user);

        if (user === null) {
          return done(null, false, {
            message: 'bad username or password'
          });
        } else {
          console.log(password, user.password);
          bcrypt.compare(password, user.password).then(res => {
            if (res) {
              console.log(res);
              return done(null, user);
            } else {
              return done(null, false, {
                message: 'Bad username or password'
              });
            }
          });
        }
      })
      .catch(err => {
        console.log('error', err);
        return done(err);
      });
  })
);

app.use('/api', routes);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = app;
