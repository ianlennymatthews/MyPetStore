import React from 'react';
import ReactDOM from 'react-dom';
import AddressForm from './components/AddressForm.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <AddressForm />;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
