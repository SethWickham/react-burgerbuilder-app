import React, { Component } from 'react';

export default class MainMenu extends Component {
  burgerliciousHandler() {
    this.setState({
      ingredients: {
        lettuce: 1,
        bacon: 2,
        cheese: 2,
        meat: 4
      },
      totalPrice: 9.75,
      purchaseEnabled: true
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.burgerliciousHandler.bind(this)}>
          Burgerlicious
        </button>
      </div>
    );
  }
}
