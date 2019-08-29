import React from 'react';

import Burger from '../../Burger/Burger';
import Buttons from '../../UI/Button/Button';
import classes from '../CheckoutSummary/CheckoutSummary.module.css';

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope you enjoy your burger!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Buttons btnType="Danger" clicked>
        Cancel
      </Buttons>
      <Buttons btnType="Success" clicked>
        Continue
      </Buttons>
    </div>
  );
};

export default checkoutSummary;
