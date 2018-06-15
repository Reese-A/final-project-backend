const express = require('express');
const http = require('http');
const multer = require('multer');
const axios = require('axios');
const Clarifai = require('clarifai');

const router = express.Router();
const upload = multer({
  limits: { fieldSize: 15 * 1024 * 1024 }
});
const clarifai = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY
});

router.route('/').post(upload.array(), (req, res) => {
  const { img_url } = req.body;
  clarifai.models
    .predict(Clarifai.FOOD_MODEL, { base64: img_url })
    .then(data => {
      console.log(data.outputs[0].data.concepts[0].name);
      return data.outputs[0].data.concepts[0].name;
    })
    .then(food => {
      console.log(food);
      return axios
        .post(
          `https://trackapi.nutritionix.com/v2/natural/nutrients`,
          {
            query: food
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'x-app-id': process.env.NUTRITIONIX_APP_ID,
              'x-app-key': process.env.NUTRITIONIX_API_KEY
            }
          }
        )
        .then(result => {
          console.log(result.data);
          return res.json(result.data);
        });
    });

  // return axios
  //   .post(
  //     // `https://vision.googleapis.com/v1/images:annotate?key=${
  //     //   process.env.GOOGLE_VISION_API_KEY
  //     // }`,
  //     // {
  //     //   requests: [
  //     //     {
  //     //       image: {
  //     //         content: img_url
  //     //       },
  //     //       features: [
  //     //         {
  //     //           type: 'LABEL_DETECTION'
  //     //         }
  //     //       ]
  //     //     }
  //     //   ]
  //     // }

  //   )
  //   .then(result => {
  //     const data = result.data.responses[0].labelAnnotations;
  //     let strings = [];
  //     for (let i = 0; i < 5; i++) {
  //       if (data[i]) {
  //         strings.push(data[i].description);
  //       }
  //     }
  //     console.log(strings);
  //     // res.json(data);
  //     return strings;
  //   })
  //   .then(strings => {
  //     let promises = [];
  //     for (let i = 0; i < strings.length; i++) {
  //       const searchFoods = [];
  //       promises.push(
  //         axios
  //           .get(
  //             `https://api.nal.usda.gov/ndb/search/?format=json&q=${
  //               strings[i]
  //             }&ds=Standard%20Reference&sort=r&max=1&api_key=${
  //               process.env.USDA_API_KEY
  //             }`
  //           )
  //           .then(result => {
  //             searchFoods.push(result.data);
  //             return searchFoods;
  //           })
  //       );
  //     }
  //     return promises;
  //   })
  //   .then(promises => {
  //     return Promise.all(promises);
  //   })
  //   .then(data => {
  //     const foodItems = [];
  //     data.forEach(food => {
  //       if (food[0].list) {
  //         foodItems.push(food[0].list.item[0].ndbno);
  //       }
  //     });
  //     console.log('food items', foodItems);
  //     return foodItems;
  //   })
  //   .then(foodItems => {
  //     promises = [];
  //     for (let i = 0; i < foodItems.length; i++) {
  //       const foodData = [];
  //       promises.push(
  //         axios
  //           .get(
  //             `https://api.nal.usda.gov/ndb/V2/reports?ndbno=${
  //               foodItems[i]
  //             }&type=f&format=json&api_key=${process.env.USDA_API_KEY}`
  //           )
  //           .then(result => {
  //             foodData.push(result.data);
  //             return foodData;
  //           })
  //       );
  //     }
  //     return promises;
  //   })
  //   .then(promises => {
  //     return Promise.all(promises);
  //   })
  //   .then(data => {
  //     const foodNutrition = [];
  //     data.forEach(item => {
  //       foodNutrition.push(item[0].foods[0].food.desc.name);
  //     });
  //     return res.json(data);
  //   });
});

module.exports = router;
