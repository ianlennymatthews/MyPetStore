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

let canadaPostAPI =
  'https://7ywg61mqp6.execute-api.us-east-1.amazonaws.com/prod/rates/';

let boxKnightAPI =
  'https://lo2frq9f4l.execute-api.us-east-1.amazonaws.com/prod/rates/';

function getCanadaRates(postalCode) {
  return axios.get(canadaPostAPI + postalCode);
}

function getBoxKnightRates(postalCode) {
  return axios.get(boxKnightAPI + postalCode);
}

app.post('/getBestShippingRate', (req, res) => {
  let {
    address_line_one,
    address_line_two,
    city,
    province,
    postalCode,
    country
  } = req.body;

  let canadaData = [];
  let boxKnightData = [];

  axios
    .all([getCanadaRates(postalCode), getBoxKnightRates(postalCode)])
    .then(
      axios.spread((canadaResponseData, boxKnightResponseData) => {
        canadaData = canadaResponseData;
        boxKnightData = boxKnightResponseData;

        let lowestRate = getLowestCostOrDate(canadaData, boxKnightData);
        res.send(lowestRate);

        if (sendViaCanada(lowestRate)) {
          axios
            .post(canadaPostAPI + 'shipments', {
              rate_id: lowestRate.id,
              destination: {
                address_line_one: address_line_one,
                address_line_two: address_line_two,
                city: city,
                province: province,
                postalCode: postalCode,
                country: country
              }
            })
            .catch(err => {
              console.log(
                'There was an error while making post request to Canada Post API: ',
                err
              );
            });
        } else {
          axios
            .post(boxKnightAPI + 'shipments', {
              rate_id: lowestRate.id,
              destination: {
                address_line_one: address_line_one,
                address_line_two: address_line_two,
                city: city,
                province: province,
                postalCode: postalCode,
                country: country
              }
            })
            .catch(err => {
              console.log(
                'There was an error while making post request to BoxKnight API: ',
                err
              );
            });
        }
      })
    )
    .catch(err => {
      console.log(
        'And error turned from making initial get request to BoxKnight API || Canada Post API: ',
        err
      );
    });
});

sendViaCanada = obj => {
  return obj.sendCanada ? true : false;
};

parseRates = array => {};

getLowestCostOrDate = (set1, set2) => {
  let lowest = [];

  lowest.push(parseRates(set1));
  lowest.push(parseRates(set2));

  if (lowest[0].price === lowest[1].price) {
    // return rate with lowest shipping day

    if (lowest[0].estimated_days < lowest[1].estimated_days) {
      lowest[0].sendCanada = true;
      return lowest[0];
    } else {
      lowest[1].sendCanada = false;
      return lowest[1];
    }
  } else if (lowest[0].price < lowest[1].price) {
    //check which has lowest price and return
    lowest[0].sendCanada = true;
    return lowest[0];
  } else {
    lowest[1].sendCanada = true;
    return lowest[1];
  }
};

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
