const axios = require("axios");
require('dotenv').config();
const PORT = process.env.PORT;
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/word", (req, res) => {
    const options = {
        method: 'GET',
        url: process.env.RAPID_API_URL,
        params: {count: '5', wordLength: '5'},
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': process.env.RAPID_API_HOST
        }
      };
      
      axios.request(options).then((response) => {
          console.log(response.data);
          res.json(response.data[0]);
      }).catch((error) => {
          console.error(error);
      });
})

app.listen(PORT, () => console.log("Server listening on port " + PORT));
