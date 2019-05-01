import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

//a global function to define prices
const INGREDIENT_PRICES = {
  lettuce: 0.25,
  cheese: 0.75,
  meat: 1.0,
  bacon: 0.5
};

//This is our Main Burger Builder  Stateful Component
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      lettuce: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },

    totalPrice: 3,
    purchaseEnabled: false,
    purchaseChecker: false
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchaseEnabled: sum > 0 });
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };
  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseCheckerHandler = () => {
    this.setState({ purchaseChecker: true });
  };

  purchaseContinueHandler = () => {
    alert('Almost Ready!');
  };
  purchaseCancelHandler = () => {
    this.setState({
      purchaseChecker: false
    });
  };
  burgerliciousHandler = () => {
    this.setState({
      ingredients: {
        lettuce: 1,
        bacon: 2,
        cheese: 2,
        meat: 2
      },
      totalPrice: 7.75,
      purchaseEnabled: true
    });
  };
  VeggieDelightHandler = () => {
    this.setState({
      ingredients: {
        lettuce: 5,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 4.25,
      purchaseEnabled: true
    });
  };
  meatopolisHandler = () => {
    this.setState({
      ingredients: {
        lettuce: 0,
        bacon: 5,
        cheese: 0,
        meat: 5
      },
      totalPrice: 10.5,
      purchaseEnabled: true
    });
  };
  grilledCheeseHandler = () => {
    this.setState({
      ingredients: {
        lettuce: 0,
        bacon: 0,
        cheese: 1,
        meat: 0
      },
      totalPrice: 3.75,
      purchaseEnabled: true
    });
  };
  miniVeggieHandler = () => {
    this.setState({
      ingredients: {
        lettuce: 1,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 3.25,
      purchaseEnabled: true
    });
  };
  miniBurgerHandler = () => {
    this.setState({
      ingredients: {
        lettuce: 0,
        bacon: 0,
        cheese: 0,
        meat: 1
      },
      totalPrice: 4.0,
      purchaseEnabled: true
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <div>
        <Aux>
          <Modal
            show={this.state.purchaseChecker}
            closed={this.purchaseCancelHandler}
          >
            <OrderSummary
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              purchaseCancelled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler}
            />
          </Modal>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchaseEnabled={this.state.purchaseEnabled}
            check={this.purchaseCheckerHandler}
            price={this.state.totalPrice}
            chosen1={this.burgerliciousHandler}
            chosen2={this.VeggieDelightHandler}
            chosen3={this.meatopolisHandler}
            kidChosen1={this.grilledCheeseHandler}
            kidChosen2={this.miniVeggieHandler}
            kidChosen3={this.miniBurgerHandler}
          />{' '}
        </Aux>
      </div>
    );
  }
}

export default BurgerBuilder;
