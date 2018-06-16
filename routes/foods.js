const express = require('express');
const axios = require('axios');
const Food = require('../db/models/Food');
const Category = require('../db/models/Category');

const router = express.Router();

router.route('/:name').get((req, res) => {
  let { name } = req.params;
  name = name.toLowerCase().trim();

  return new Food({ name })
    .fetch({ withRelated: ['category'] })
    .then(food => {
      console.log('database lookup)', food);
      if (food) {
        return res.json(food);
      }
      return axios
        .post(
          `https://trackapi.nutritionix.com/v2/natural/nutrients`,
          {
            query: name
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'x-app-id': process.env.NUTRITIONIX_APP_ID,
              'x-app-key': process.env.NUTRITIONIX_API_KEY,
              'x-remote-user-id': 0
            }
          }
        )
        .then(result => {
          const newFood = {
            name: result.data.foods[0].food_name,
            calories: Math.round(result.data.foods[0].nf_calories),
            carb: Math.round(result.data.foods[0].nf_total_carbohydrate),
            fat: Math.round(result.data.foods[0].nf_total_fat),
            protein: Math.round(result.data.foods[0].nf_protein),
            category_id: result.data.foods[0].tags.food_group,
            serving_size: result.data.foods[0].serving_unit,
            serving_grams: Math.round(
              Number(result.data.foods[0].serving_weight_grams)
            )
          };
          return new Food(newFood).save().then(food => {
            console.log(food);
            return res.json(food);
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
