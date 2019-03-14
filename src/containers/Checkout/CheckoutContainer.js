import React, { Component } from "react";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactDataContainer from "./ContactData/ContactDataContainer";

class CheckoutContainer extends Component {
  // state = {
  //   ingredients: null,
  //   totalPrice: 0
  // };

  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let totalPrice = 0;
  //   for (let param of query.entries()) {
  //     if (param[0] === "totalPrice") {
  //       totalPrice = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   console.log("ingredients: ", ingredients);
  //   this.setState({ ingredients: ingredients, totalPrice: totalPrice });
  // }

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
          ingredients={this.props.ings}
          onCheckoutCancel={this.onCheckoutCancel.bind(this)}
          onCheckoutContinue={this.onCheckoutContinue.bind(this)}
        />
        {/*
        <Route
          path={this.props.match.path + "/contact-data"}
          //component={ContactDataContainer}
          render={props => (
            <ContactDataContainer
              ingredients={this.props.ings}
              totalPrice={this.props.totalPrice}
              {...props}
            />
          )}
        />
          */}
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactDataContainer}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients
  };
};

export default connect(mapStateToProps)(CheckoutContainer);
