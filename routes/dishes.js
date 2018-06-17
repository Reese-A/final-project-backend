const express = require('express');
const axios = require('axios');
const Food = require('../db/models/Food');
const Dish = require('../db/models/Dish');

const router = express.Router();

router.route('/').post((req, res) => {
  console.log('\n\n\n', req.body, '\n\n\n');
  let { foods, name } = req.body;
  const { id } = req.user;

  return new Dish({ name }).fetch().then(dish => {
    if (dish) {
      dish.users().attach(id);
      return new Dish({ id: dish.id })
        .save(
          { popularity: dish.attributes.popularity + 1 },
          { method: 'update' }
        )
        .then(dish => {
          return res.json(dish);
        });
    }
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
          new Dish({ id: dish.id }).ingredients().attach(food.id);
          return new Food({ id: food.id })
            .fetch({ withRelated: ['category'] })
            .then(food => {
              console.log('food data', food);
              new Dish({ id: dish.id })
                .categories()
                .attach(food.attributes.category_id);
              food.save(
                { popularity: food.attributes.popularity + 1 },
                { method: 'update' }
              );
            });
        });
        console.log(dish);
        return res.json(dish);
      });
  });
});

module.exports = router;
