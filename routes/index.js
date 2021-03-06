const express = require('express');

const users = require('./users');
const activityLevels = require('./activity_levels');
const foods = require('./foods');
const dishes = require('./dishes');
// const categories = require('./categories');
const images = require('./images');
const genders = require('./genders');
const goals = require('./goals');
const oauth = require('./oauth');
const daily_consumption = require('./daily_consumption');

const router = express.Router();

router.use('/users', users);
router.use('/activitylevels', activityLevels);
router.use('/foods', foods);
router.use('/dishes', dishes);
// router.use('/categories', categories);
router.use('/images', images);
router.use('/genders', genders);
router.use('/goals', goals);
router.use('/oauth', oauth);
router.use('/dailyconsumption', daily_consumption);

module.exports = router;
