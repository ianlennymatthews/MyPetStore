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
    // prevent default request sent from client's browser;
    e.preventDefault();
    axios
      .post('/getBestShippingRate', addressObj)
      .then(data => {
        let successMessage = `Congrats! \nWe've found the best shipping deal for you! \n${
          data.data.description.split(' ')[0]
        } can ship your package in ${
          data.data.estimated_days
        } days, for the low price of ${
          data.data.price
        } CAD! \nThanks for shopping with MyPetStore`;

        alert(successMessage);
      })
      .catch(err => {
        console.log(
          'There was an error returned to the browser from the initial request: ',
          err
        );
      });
  }

  render() {
    return <AddressForm handleSubmit={this.handleSubmit} />;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
