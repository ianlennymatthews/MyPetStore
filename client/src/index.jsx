import React from 'react';
import ReactDOM from 'react-dom';
import AddressForm from './components/AddressForm.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let address = {
      address_line_one: '4455 Boul. Poirier',
      address_line_two: '201',
      city: 'Montréal',
      province: 'Québec',
      postalCode: 'H4R2A4',
      country: 'Canada'
    };
    axios.post('/getBestShippingRate', address).then(data => {
      console.log('This is the data received: ', data.data);
    });
  }

  render() {
    return <AddressForm />;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
