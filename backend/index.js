const express = require("express");
require("dotenv").config();
const path = require("path");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const NEWS_API_KEY = process.env.NEWS_API_KEY;

app.get("/api/news", (req, res) => {
  base_url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`;
  if (req.query.keyword) {
    base_url += `&q=${req.query.keyword}`;
  }
  if (req.query.category) {
    base_url += `&category=${req.query.category}`;
  }
  axios
    .get(base_url)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          msg: "Something went wrong on our end, please try again later.",
        });
    });
});

app.use(express.static(path.join(__dirname, "public")));
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.listen(process.env.PORT || 3000);
