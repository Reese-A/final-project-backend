const express = require('express');

const Daily_Consumption = require('../db/models/Daily_Consumption');

const router = express.Router();
const moment = require('moment');

router
  .route('/')

  .get((req, res) => {
    // const id = req.user.id;

    const start = moment(Date.now()).startOf('day');
    const end = moment(Date.now()).endOf('day');
    return new Daily_Consumption()
      .query(qb => {
        qb.where({ user_id: 1 });
        qb.whereBetween('created_at', [start, end]);
      })
      .fetch()
      .then(daily_consumption => {
        if (daily_consumption) {
          return res.json(daily_consumption);
        }
        return res.json(null);
      })
      .catch(err => {
        console.log(err);
      });
  })

  .post((req, res) => {
    // const id = req.user.id;
    let { calories } = req.body;
    const start = moment(Date.now()).startOf('day');
    const end = moment(Date.now()).endOf('day');
    return new Daily_Consumption()
      .query(qb => {
        qb.where({ user_id: 1 });
        qb.whereBetween('created_at', [start, end]);
      })
      .fetch()
      .then(daily_consumption => {
        if (daily_consumption) {
          const dailyJson = daily_consumption.toJSON();
          if (!dailyJson.tracked_calories.includes(calories)) {
            const newCalories = [...dailyJson.tracked_calories, calories];
            daily_consumption
              .save(
                {
                  total_calories: calories,
                  tracked_calories: newCalories
                },
                { method: 'update' }
              )
              .then(daily_consumption => {
                return res.json(daily_consumption);
              })
              .catch(err => {
                console.log(err);
              });
          }
          return res.json(daily_consumption);
        } else {
          if (!calories) {
            calories = 0;
          }
          return new Daily_Consumption({
            user_id: 1,
            total_calories: calories,
            tracked_calories: [calories]
          })
            .save()
            .then(daily_consumption => {
              return res.json(daily_consumption);
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  });

module.exports = router;
