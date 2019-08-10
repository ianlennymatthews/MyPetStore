import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

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
  }

  handleProvince(e) {
    console.log('This is the province value: ', e.target.value);
  }

  render() {
    return (
      <Form>
        <Form.Row>
          <Form.Group md="4" controlId="">
            <Form.Label>Address Line One</Form.Label>
            <Form.Control required type="text" placeholder="Adresse ligne 1" />
          </Form.Group>
          <Form.Group md="4" controlId="">
            <Form.Label>Address Line Two</Form.Label>
            <Form.Control required type="text" placeholder="Adresse ligne 2" />
          </Form.Group>
          <Form.Group md="4" controlId="">
            <Form.Label>City</Form.Label>
            <InputGroup>
              <Form.Control type="text" placeholder="Ville" required />
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group md="6" controlId="">
            <Form.Label>Province</Form.Label>
            <Form.Control
              onChange={this.handleProvince}
              as="select"
              type="text"
              placeholder="Province"
            >
              <option value="Alberta">Alberta</option>
              <option value="British Columbia">British Columbia</option>
              <option value="Manitoba">Manitoba</option>
              <option value="New Brunswick">New Brunswick</option>
              <option value="Newfoundland and Labrador">
                Newfoundland and Labrador
              </option>
              <option value="Nova Scotia">Nova Scotia</option>
              <option value="Ontario">Ontario</option>
              <option value="Prince Edward Island">Prince Edward Island</option>
              <option value="Quebec">Quebec</option>
              <option value="Saskatchewan">Saskatchewan</option>
            </Form.Control>
          </Form.Group>
          <Form.Group md="3" controlId="">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control type="text" placeholder="Code Postal" required />
          </Form.Group>
          <Form.Group md="3" controlId="">
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" placeholder="Pays" required />
          </Form.Group>
        </Form.Row>
        <Button
          onClick={e => {
            this.props.handleSubmit(e);
          }}
          type="submit"
        >
          Submit form
        </Button>
      </Form>
    );
  }
}

export default AddressForm;
