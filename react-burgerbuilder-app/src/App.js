import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckoutForm from '../src/containers/Checkout/CheckoutForm';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/orders" component={Orders} />
          <Route path="/checkout" component={CheckoutForm} />
        </Layout>
      </div>
    );
  }
}

export default App;
