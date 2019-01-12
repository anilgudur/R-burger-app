import React, { Component } from "react";
import Button from "../../UI/Button/Button";

class orderSummary extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.isModalShow;
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
          {this.props.ingredients[igKey]}
        </li>
      );
    });

    return (
      <>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button buttonType='Danger' onClick={this.props.closeModal}>
          CANCEL
        </Button>
        <Button buttonType='Success' onClick={this.props.purchaseContinueClick}>
          CONTINUE
        </Button>
      </>
    );
  }
}

export default orderSummary;
