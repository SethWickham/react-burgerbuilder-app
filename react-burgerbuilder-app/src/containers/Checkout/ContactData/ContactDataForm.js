import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from '../ContactData/ContactDataForm.module.css';

class ContactDataForm extends Component {
  state = {
    name: '',
    email: '',
    address: {
      city: '',
      street: '',
      zipcode: ''
    }
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
            <Button btnType="Success"> PLACE ORDER</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default ContactDataForm;
