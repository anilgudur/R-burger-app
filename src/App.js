import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";

import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import CheckoutContainer from "./containers/Checkout/CheckoutContainer";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/' exact component={BurgerBuilder} />
            <Route path='/checkout' component={CheckoutContainer} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
