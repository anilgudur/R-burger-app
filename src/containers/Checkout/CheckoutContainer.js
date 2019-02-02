import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      cheese: 1,
      meat: 1
    }
  };

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

export default Checkout;
