import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

class AddressForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Form>
        <Form.Row>
          <Form.Group md="4" controlId="">
            <Form.Label>Address Line One</Form.Label>
            <Form.Control required type="text" placeholder="Adresse ligne 1" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group md="4" controlId="">
            <Form.Label>Address Line Two</Form.Label>
            <Form.Control required type="text" placeholder="Adresse ligne 2" />
          </Form.Group>
          <Form.Group md="4" controlId="">
            <Form.Label>City</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Ville"
                aria-describedby="inputGroupPrepend"
                required
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group md="6" controlId="">
            <Form.Label>Province</Form.Label>
            <Form.Control as="select" type="text" placeholder="Province">
              <option>Alberta</option>
              <option>British Columbia</option>
              <option>Manitoba</option>
              <option>New Brunswick</option>
              <option>Newfoundland and Labrador</option>
              <option>Nova Scotia</option>
              <option>Ontario</option>
              <option>Prince Edward Island</option>
              <option>Quebec</option>
              <option>Saskatchewan</option>
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
        <Button type="submit">Submit form</Button>
      </Form>
    );
  }
}

export default AddressForm;
