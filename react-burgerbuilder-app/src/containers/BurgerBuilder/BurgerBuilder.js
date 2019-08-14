import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../components/Axios/axios-orders';

//a global function to define prices
const INGREDIENT_PRICES = {
  lettuce: 0.25,
  cheese: 0.75,
  meat: 1.0,
  bacon: 0.5
};

//This is our Main Burger Builder  Stateful Component
class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: null,
      totalPrice: 3,
      purchaseEnabled: false,
      purchaseChecker: false,
      loading: false,
      error: false
    };
    // our get request to our firebase database getting our ingredients
    axios
      .get('https://react-burgerbuilder-d3e6e.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

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
    this.setState({ loading: true });
    // alert('Almost Ready!');
    const order = {
      ingredients: this.state.ingredients,
      // typically total price is calculated on the server to make sure user doesn't manipulate the price
      price: this.state.totalPrice,
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
    // post request to database
    axios
      .post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
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
    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      burger = (
        <Aux>
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
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <div>
        <Aux>
          <Modal
            show={this.state.purchaseChecker}
            closed={this.purchaseCancelHandler}
          >
            {orderSummary}
          </Modal>
          {burger}
        </Aux>
      </div>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
