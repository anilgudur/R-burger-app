import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactDataContainer from "./ContactData/ContactDataContainer";

class CheckoutContainer extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let totalPrice = 0;
    for (let param of query.entries()) {
      if (param[0] === "totalPrice") {
        totalPrice = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    console.log("ingredients: ", ingredients);
    this.setState({ ingredients: ingredients, totalPrice: totalPrice });
  }

  onCheckoutCancel() {
    this.props.history.goBack();
  }

  onCheckoutContinue() {
    this.props.history.replace("/checkout/contact-data");
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          onCheckoutCancel={this.onCheckoutCancel.bind(this)}
          onCheckoutContinue={this.onCheckoutContinue.bind(this)}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          //component={ContactDataContainer}
          render={props => (
            <ContactDataContainer
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default CheckoutContainer;
