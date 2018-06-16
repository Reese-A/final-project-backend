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
      const foodNames = [];
      for (let i = 0; i < 3; i++) {
        foodNames.push(data.outputs[0].data.concepts[i].name);
      }
      // return data.outputs[0].data.concepts[0].name;
      return res.json({ foods: foodNames });
    });
});

module.exports = router;
