import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from '../ContactData/ContactDataForm.module.css';
import axios from '../../../components/Axios/axios-orders';
class ContactDataForm extends Component {
  state = {
    name: '',
    email: '',
    address: {
      city: '',
      street: '',
      zipcode: ''
    },
    loading: false
  };
  orderHandler = event => {
    console.log(this.props.ingredients);
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,

      // typically total price is calculated on the server to make sure user doesn't manipulate the price

      //test data
      customer: {
        name: 'Seth Wickham',
        address: {
          street: 'Pretty Street',
          city: 'Redding',
          zipCode: '967098'
        },
        email: 'hellohello@hi.com',
        deliverySpeed: 'fastest'
      }
    };
    //post request to database
    axios
      .post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <div className={classes.ContactDataForm}>
        <h4>Enter Your Contact Data</h4>
        <form>
          <input
            className={classes.Input}
            type="text"
            name="name"
            placeholder="Your Name"
          />
          <input
            className={classes.Input}
            type="email"
            name="email"
            placeholder="Your Email"
          />
          <input
            className={classes.Input}
            type="text"
            name="city"
            placeholder="City"
          />
          <input
            className={classes.Input}
            type="text"
            name="street"
            placeholder="Street"
          />
          <input
            className={classes.Input}
            type="text"
            name="zipcode"
            placeholder="Zip Code"
          />
          <div>
            <Button btnType="Success" clicked={this.orderHandler}>
              {' '}
              PLACE ORDER
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default ContactDataForm;
