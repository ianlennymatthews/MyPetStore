const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files found in dist folder
app.use('/', express.static(path.join(__dirname, '/../client/dist')));

let getCanadaPostAPI = `https://7ywg61mqp6.execute-api.us-east-1.amazonaws.com/prod/rates/${
  req.body.postal
}`;

let getBoxKnightAPI = `https://lo2frq9f4l.execute-api.us-east-1.amazonaws.com/prod/rates/${
  req.body.postal
}`;

app.post('/getBestShippingRate', (req, res) => {
  let canadaData = [];

  let boxKnightData = [];

  axios
    .get(getCanadaPostAPI)
    .then(data => {
      canadaData = data;
    })
    .catch(err => {
      console.log(
        'An error returned from making a request to CanadaPost API: ',
        err
      );
    });

  axios
    .get(getBoxKnightAPI)
    .then(data => {
      boxKnightData = data;

      getLowestCostOrDate(canadaData, boxKnightData);
    })
    .catch(err => {
      console.log(
        'An error returned from making a request to BoxKnight API: ',
        err
      );
    });
});

parseRates = (array) => {};

getLowestCostOrDate = (set1, set2) => {
  let lowest = [];

  lowest.push(parseRates(set1));
  lowest.push(parseRates(set2));

  if (lowest[0].price === lowest[1].price) {
    // return rate with lowest shipping day
  } else(true){
    //check which has lowest price and return
  }
};

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
