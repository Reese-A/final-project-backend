const express = require('express');
const http = require('http');
const multer = require('multer');
const axios = require('axios');

const router = express.Router();
const upload = multer({
  limits: { fieldSize: 15 * 1024 * 1024 }
});

router.route('/').post(upload.array(), (req, res) => {
  const { img_url } = req.body;
  return axios
    .post(
      `https://vision.googleapis.com/v1/images:annotate?key=${
        process.env.GOOGLE_VISION_API_KEY
      }`,
      {
        requests: [
          {
            image: {
              content: img_url
            },
            features: [
              {
                type: 'LABEL_DETECTION'
              },
              {
                type: 'WEB_DETECTION'
              }
            ]
          }
        ]
      }
    )
    .then(result => {
      const data = result.data;
      return res.json(data);
    });
});

module.exports = router;
