const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3001;

//Allow Express to make use of Body-Parser Middle-Ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files found in dist folder
app.use('/', express.static(path.join(__dirname, '/../client/dist')));

//API Url of CanaPostAPI
const canadaPostAPI =
  'https://7ywg61mqp6.execute-api.us-east-1.amazonaws.com/prod/rates/';
//API Url of BoxKnightAPI
const boxKnightAPI =
  'https://lo2frq9f4l.execute-api.us-east-1.amazonaws.com/prod/rates/';

app.post('/getBestShippingRate', (req, res) => {
  //Use es6 syntax to de-structure properties from req.body object
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

  //Async function that performs requests to both carrier API endpoints in parallel and either resolves or rejects
  axios
    .all([getCanadaRates(postalCode), getBoxKnightRates(postalCode)])
    .then(
      //spread array into multiple arguments after all requests are complete
      axios.spread((canadaResponseData, boxKnightResponseData) => {
        //set contents of responses to canadaData and boxKnightData arrays
        canadaData = canadaResponseData.data;
        boxKnightData = boxKnightResponseData.data;

        let lowestRate = getLowestCostOrDate(canadaData, boxKnightData);
        //Send Lowest Rate Back To Client
        res.send(lowestRate);
        //Create Shipment in the background
        let shipmentRequest = '';
        let serviceUsed = '';

        //if lowest rate has sendCanada property set to truee
        if (sendViaCanada(lowestRate)) {
          //alter Canada Post apiUrl string and set it to be value of shipmentRequest
          shipmentRequest = canadaPostAPI.replace('rates', 'shipments');
          //set service Used string appropriately
          serviceUsed = 'Canada Post';
        } else {
          //alter BoxKnight apiUrl string and set it to be value of shipmentRequest
          shipmentRequest = boxKnightAPI.replace('rates', 'shipments');
          //set service Used string appropriately
          serviceUsed = 'Box Knight';
        }
        //Send Post-request to server with rateId and properties from request body
        axios
          .post(shipmentRequest, {
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
          .then(response => {
            console.log(
              `We have successfully posted a shipment request to the ${serviceUsed} server!`
            );

            // Uncomment to see server's response
            // console.log(
            //   `This is the server's response from the successful posting`,
            //   response
            // );
          })
          .catch(err => {
            console.log(
              `There was an error while making post request to ${serviceUsed}, while attempting to create shipment: `,
              err
            );
          });
      })
    )
    .catch(err => {
      console.log('Error occurred, see log: ', err);
    });
});
//Function that when called when called an error handled promise containing get request to canadaPostAPI with input postalCode
function getCanadaRates(postalCode) {
  return axios.get(canadaPostAPI + postalCode).catch(err => {
    console.log(
      'An error turned from making initial get request to Canada Post API: ',
      err
    );
  });
}
//Function that when called when called an error handled promise containing get request to boxKnightAPI with input postalCode
function getBoxKnightRates(postalCode) {
  return axios.get(boxKnightAPI + postalCode).catch(err => {
    console.log(
      'An error turned from making initial get request to BoxKnight API: ',
      err
    );
  });
}

getLowestCostOrDate = (set1, set2) => {
  //set1: data returned from CanadaAPI
  //set2: data returned from BoxKnightAPI
  let lowest = [];

  lowest.push(parseRates(set1));
  lowest.push(parseRates(set2));
  //check if both lowest rates pushed to lowest array have the same price
  if (lowest[0].price === lowest[1].price) {
    //check which item in array has the least estimated_days property
    if (lowest[0].estimated_days < lowest[1].estimated_days) {
      //set identifier, CASE:(canadaPostAPI has lower estimated_day property)
      lowest[0].sendCanada = true;
      //return lowest rate
      return lowest[0];
    } else {
      //set identifier, CASE:(boxKnight has lower estimated_day property)
      lowest[1].sendCanada = false;
      //return lowest rate
      return lowest[1];
    }
    //check which item in array has the lowest price
  } else if (lowest[0].price < lowest[1].price) {
    //set identifier, CASE:(canadaPostAPI has lower price property)
    lowest[0].sendCanada = true;
    //return lowest rate
    return lowest[0];
  } else {
    //set identifier, CASE:(boxKnightAPI has lower price property)
    lowest[1].sendCanada = false;
    //return lowest rate
    return lowest[1];
  }
};

//Function that given array of rates, iterates each element and returns element with least .price property
parseRates = array => {
  let lowestPrice = array[0].price;
  let index = 0;

  for (let i = 1; i < array.length; i++) {
    if (array[i].price < lowestPrice) {
      lowestPrice = array[i].price;
      index = i;
    }
  }
  return array[index];
};
//Ternary Function that returns true or false based on sendCanada property found in rateObj
sendViaCanada = rateObj => {
  return rateObj.sendCanada === true ? true : false;
};
//Start server && Log which port is being listened on
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
