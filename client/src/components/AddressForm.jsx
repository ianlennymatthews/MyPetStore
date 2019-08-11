import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
  }

  handleChange(e, key) {
    this.setState({
      [key]: e.target.value
    });
  }

  handleProvince(e) {
    this.setState({
      province: e.target.value
    });
  }

  render() {
    return (
      <Card
        className="card"
        style={{
          // justifyContent: 'center',
          // alignItems: 'center',
          display: 'flex',
          width: '35rem',
          background: '#BAB2B5'
          // width: '100eem'
          // height: '100eem'
        }}
        text="blue"
      >
        {' '}
        <Card.Header style={{ textAlign: 'center' }}>
          MyPetStore Optimal Shipping Calculator!
        </Card.Header>
        <Form style={{ marginLeft: '10px', marginTop: '5px' }}>
          <Form.Row>
            <Form.Group>
              <Form.Label>Address Line One</Form.Label>
              <Form.Control
                onChange={e => {
                  this.handleChange(e, 'address_line_one');
                }}
                required
                type="text"
                placeholder="Adresse ligne 1"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Address Line Two</Form.Label>
              <Form.Control
                onChange={e => {
                  this.handleChange(e, 'address_line_two');
                }}
                required
                type="text"
                placeholder="Adresse ligne 2"
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
                required
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group>
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
                required
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
                required
              />
            </Form.Group>
          </Form.Row>

          <Button
            onClick={e => {
              this.props.handleSubmit(e, this.state);
            }}
            type="submit"
            style={{ background: '#AC3B61', borderColor: '#AC3B61' }}
          >
            Submit
          </Button>
        </Form>
      </Card>
    );
  }
}

export default AddressForm;
