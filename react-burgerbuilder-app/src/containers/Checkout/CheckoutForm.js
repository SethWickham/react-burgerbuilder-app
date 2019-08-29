import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

export default class extends Component {
  //test data
  state = {
    ingredients: {
      meat: 1,
      lettuce: 1,
      cheese: 1,
      bacon: 2
    }
  };
  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} />
      </div>
    );
  }
}
