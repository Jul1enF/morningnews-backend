var express = require('express');
var router = express.Router();
require('../models/connection');
const mongoose = require('mongoose');

const connectionString = process.env.CONNECTION_STRING;

const fetch = require('node-fetch');

const NEWS_API_KEY = process.env.NEWS_API_KEY;

router.get('/articles', async (req, res) => {
  await mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  
  fetch(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${NEWS_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'ok') {
        res.json({ articles: data.articles });
      } else {
        res.json({ articles: [] });
      }
    });
});

module.exports = router;
