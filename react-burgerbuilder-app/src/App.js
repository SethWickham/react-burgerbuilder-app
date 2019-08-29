import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckoutForm from '../src/containers/Checkout/CheckoutForm';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder />
          <CheckoutForm />
        </Layout>
      </div>
    );
  }
}

export default App;
