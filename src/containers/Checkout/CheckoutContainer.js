import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class CheckoutContainer extends Component {
  state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      cheese: 1,
      meat: 1
    }
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }
    console.log("ingredients: ", ingredients);
    this.setState({ ingredients: ingredients });
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
      </div>
    );
  }
}

export default CheckoutContainer;
