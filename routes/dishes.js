const express = require('express');
const axios = require('axios');
const Food = require('../db/models/Food');
const Dish = require('../db/models/Dish');
const Dishes_Foods = require('../db/models/Dishes_Foods');

const router = express.Router();

router.route('/').post((req, res) => {
  console.log('\n\n\n', req.body, '\n\n\n');
  let { foods, name } = req.body;
  const { id } = req.user;

  return new Dish({
    name,
    user_id: id
  })
    .save()
    .then(dish => {
      new Dish({ id: dish.id }).users().attach(id);
      return dish;
    })
    .then(dish => {
      foods.forEach(food => {
        let servings = food.servings;
        // new Dish({ id: dish.id }).ingredients().attach(food);
        return new Food({ id: food.food.id })
          .fetch({ withRelated: ['category'] })
          .then(food => {
            // console.log('food data', food);
            new Dishes_Foods({
              dish_id: dish.id,
              food_id: food.id,
              servings: servings
            }).save();
            // new Dish({ id: dish.id })
            //   .categories()
            //   .attach(food.attributes.category_id);
            food.save(
              { popularity: food.attributes.popularity + 1 },
              { method: 'update' }
            );
          })
          .catch(err => {
            console.log(err);
          });
      });
      return res.json(dish);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
