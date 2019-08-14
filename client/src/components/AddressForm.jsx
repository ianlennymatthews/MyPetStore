import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ReactDOM from 'react-dom';
import axios from 'axios';

class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address_line_one: '',
      address_line_two: '',
      city: '',
      province: '',
      postalCode: '',
      country: ''
    };
    this.handleProvince = this.handleProvince.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Event-Listener function that when triggered, changes component state with corresponding key to form input string
  handleChange(e, key) {
    this.setState({
      [key]: e.target.value
    });
  }
  //Event-Listener function that uses setState() to set province key in state object to value chosen from form drop
  handleProvince(e) {
    this.setState({
      province: e.target.value
    });
  }
  // Function will find message Form's node and reset its contents
  // Known side effect: will synchronously trigger before alert is triggered from return from post request
  reset() {
    ReactDOM.findDOMNode(this.messageForm).reset();
    this.setState({
      address_line_one: '',
      address_line_two: '',
      city: '',
      province: '',
      postalCode: '',
      country: ''
    });
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
          this.reset();
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
    return (
      <Card
        className="card"
        style={{
          display: 'flex',
          width: '35rem',
          right: '100px',
          background: '#BAB2B5',
          paddingBottom: '5px'
        }}
        text="blue"
      >
        {' '}
        <Card.Header style={{ textAlign: 'center' }}>
          MyPetStore Optimal Shipping Calculator!
        </Card.Header>
        <Form
          style={{ marginLeft: '10px', marginTop: '5px' }}
          ref={form => (this.messageForm = form)}
        >
          <Form.Row>
            <Form.Group style={{ paddingRight: '5px' }}>
              s<Form.Label>Address Line One</Form.Label>
              <Form.Control
                onChange={e => {
                  this.handleChange(e, 'address_line_one');
                }}
                type="text"
                placeholder="Adresse ligne 1"
                autoComplete="new-password"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Address Line Two</Form.Label>
              <Form.Control
                onChange={e => {
                  this.handleChange(e, 'address_line_two');
                }}
                type="text"
                placeholder="Adresse ligne 2"
                autoComplete="new-password"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control
                onChange={e => {
                  this.handleChange(e, 'city');
                }}
                type="text"
                placeholder="Ville"
                autoComplete="new-password"
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group style={{ paddingRight: '5px' }}>
              <Form.Label>Province</Form.Label>
              <Form.Control
                onChange={this.handleProvince}
                as="select"
                type="text"
                placeholder="Province"
              >
                <option>...</option>
                <option value="Alberta">Alberta</option>
                <option value="British Columbia">British Columbia</option>
                <option value="Manitoba">Manitoba</option>
                <option value="New Brunswick">New Brunswick</option>
                <option value="Newfoundland and Labrador">
                  Newfoundland and Labrador
                </option>
                <option value="Nova Scotia">Nova Scotia</option>
                <option value="Ontario">Ontario</option>
                <option value="Prince Edward Island">
                  Prince Edward Island
                </option>
                <option value="Quebec">Quebec</option>
                <option value="Saskatchewan">Saskatchewan</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                onChange={e => {
                  this.handleChange(e, 'postalCode');
                }}
                type="text"
                placeholder="Code Postal"
                autoComplete="new-password"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Country</Form.Label>
              <Form.Control
                onChange={e => {
                  this.handleChange(e, 'country');
                }}
                type="text"
                placeholder="Pays"
                autoComplete="new-password"
              />
            </Form.Group>
          </Form.Row>

          <Button
            onClick={e => {
              this.handleSubmit(e, this.state);
            }}
            type="submit"
            style={{
              background: '#AC3B61',
              borderColor: '#AC3B61'
            }}
          >
            Submit
          </Button>
        </Form>
      </Card>
    );
  }
}

export default AddressForm;
