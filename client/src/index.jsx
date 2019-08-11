import React from 'react';
import ReactDOM from 'react-dom';
import AddressForm from './components/AddressForm.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //Event Handler Function that upon click of Submit Button in form,
  //sends request to internal serverAPI with client address data
  handleSubmit(e, addressObj) {
    let validReq = true;

    //prevent default submit request sent from client's browser;
    e.preventDefault();

    //iterate through addressObj keys
    for (let key in addressObj) {
      //check if any keys in addressObj are empty strings/form is incomplete
      if (addressObj[key] === '') {
        validReq = false;
      }
    }
    //if all keys in addressObj do not consist of empty strings
    if (validReq) {
      axios
        //send post request to server API with addressObj in request body
        .post('/getBestShippingRate', addressObj)
        .then(data => {
          let successMessage = `Congrats! \n\nWe've found the best shipping deal for you! \n\n${
            data.data.description.split(' ')[0]
          } can ship your package in ${
            data.data.estimate_days
          } days, for the low price of ${
            data.data.price
          } CAD! \n\nThanks for shopping with MyPetStore!`;
          //Alert user with shipping information
          alert(successMessage);
        })
        .catch(err => {
          console.log(
            'There was an error returned to the browser from the initial request: ',
            err
          );
        });
    } else {
      //Alert User to finish filling out form
      alert('Please continue filling out the form with valid information!');
    }
  }

  render() {
    return <AddressForm handleSubmit={this.handleSubmit} />;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
