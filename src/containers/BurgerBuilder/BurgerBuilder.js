import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BurgerControls/BurgerControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axiosOrder from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import Error from "../../hoc/Error/Error";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    isPurchasable: false,
    isPurchasing: false,
    isLoading: false
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    // Price
    const priceAddion = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddion;
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
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

    // Price
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ isPurchasable: sum > 0 });
  }

  purchasingHandler = () => {
    this.setState({ isPurchasing: true });
  };

  closeModal = () => {
    this.setState({ isPurchasing: false });
  };

  purchaseContinueHandler() {
    this.setState({ isLoading: true });
    const orderData = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Anil Gudur",
        address: {
          street: "Teststreet 1",
          zipCode: "32154",
          country: "INDIA"
        },
        email: "test@test.com"
      },
      delivery: {
        type: "fastest"
      }
    };
    axiosOrder
      .post("/orders.json", orderData)
      .then(response => {
        this.setState({ isLoading: false, isPurchasing: false });
        console.log("response: ", response);
      })
      .catch(err => {
        this.setState({ isLoading: false, isPurchasing: false });
        console.log("Err: ", err);
      });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        totalPrice={this.state.totalPrice}
        closeModal={this.closeModal}
        purchaseContinueClick={this.purchaseContinueHandler.bind(this)}
        isModalShow={this.state.isPurchasing}
      />
    );
    if (this.state.isLoading) {
      orderSummary = <Spinner />;
    }

    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <BurgerControls
          addIngredientClick={this.addIngredientHandler}
          removeIngredientClick={this.removeIngredientHandler}
          disabledInfoArr={disabledInfo}
          price={this.state.totalPrice}
          isPurchasable={this.state.isPurchasable}
          purchasingClick={this.purchasingHandler}
        />
        <Modal isShow={this.state.isPurchasing} closeModal={this.closeModal}>
          {orderSummary}
        </Modal>
      </>
    );
  }
}

export default Error(BurgerBuilder, axiosOrder);
