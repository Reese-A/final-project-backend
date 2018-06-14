const express = require('express');
const http = require('http');
const multer = require('multer');
const axios = require('axios');

const router = express.Router();
const upload = multer();

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
              }
            ]
          }
        ]
      }
    )
    .then(result => {
      const data = result.data.responses[0].labelAnnotations;
      return res.json(data);
    });
});

module.exports = router;
