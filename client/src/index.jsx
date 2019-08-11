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

  handleSubmit(e, addressObj) {
    let validReq = true;

    e.preventDefault();
    // prevent default submit request sent from client's browser;
    for (let key in addressObj) {
      if (addressObj[key] === '') {
        validReq = false;
      }
    }

    if (validReq) {
      axios
        .post('/getBestShippingRate', addressObj)
        .then(data => {
          let successMessage = `Congrats! \n\nWe've found the best shipping deal for you! \n\n${
            data.data.description.split(' ')[0]
          } can ship your package in ${
            data.data.estimate_days
          } days, for the low price of ${
            data.data.price
          } CAD! \n\nThanks for shopping with MyPetStore!`;

          alert(successMessage);
        })
        .catch(err => {
          console.log(
            'There was an error returned to the browser from the initial request: ',
            err
          );
        });
    } else {
      alert('Please continue filling out the form with valid information!');
    }
  }

  render() {
    return <AddressForm handleSubmit={this.handleSubmit} />;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
