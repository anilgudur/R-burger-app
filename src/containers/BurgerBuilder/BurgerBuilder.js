import React, { Component } from "react";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BurgerControls/BurgerControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axiosOrder from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import Error from "../../hoc/Error/Error";
import * as burgerBuilderActions from "../../store/actions/burgerBuilder.action";

class BurgerBuilder extends Component {
  state = {
    // ingredients: {
    //   salad: 0,
    //   bacon: 0,
    //   cheese: 0,
    //   meat: 0
    // },
    //ingredients: null,
    //totalPrice: 4,
    //isPurchasable: false,
    isPurchasing: false
    //isLoading: false,
    //isError: false
  };

  componentDidMount() {
    // console.log(
    //   "[BurgerBuilder.js] - componentDidMount - this.props: ",
    //   this.props
    // );
    // this.setState({ isLoading: true });
    // axiosOrder
    //   .get("/ingredients.json")
    //   .then(response => {
    //     this.setState({ ingredients: response.data, isLoading: false });
    //   })
    //   .catch(err => {
    //     this.setState({ isLoading: false, isError: true });
    //   });
    this.props.oninitIngredientsAction();
  }

  /*
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
  */

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    //this.setState({ isPurchasable: sum > 0 });
    return sum > 0;
  }

  purchasingHandler = () => {
    this.setState({ isPurchasing: true });
  };

  closeModal = () => {
    this.setState({ isPurchasing: false });
  };

  purchaseContinueHandler() {
    /*this.setState({ isLoading: true });
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
      })
      .catch(err => {
        this.setState({ isLoading: false, isPurchasing: false });
      });*/
    //this.props.history.push("/checkout");

    // #Query param code
    // const queryParams = [];
    // for (let i in this.props.ings) {
    //   queryParams.push(
    //     encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ings[i])
    //   );
    // }
    // queryParams.push("totalPrice=" + this.props.totalPrice);
    // const queryString = queryParams.join("&");
    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: "?" + queryString
    // });

    this.props.history.push("/checkout");
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let burgerContent = this.props.isError ? (
      <p>Ingredients can't be loaded.</p>
    ) : (
      <Spinner />
    );
    let orderSummary = null;
    if (this.props.ings) {
      burgerContent = (
        <>
          <Burger ingredients={this.props.ings} />
          <BurgerControls
            addIngredientClick={this.props.addIngredientAction}
            removeIngredientClick={this.props.removeIngredientAction}
            disabledInfoArr={disabledInfo}
            price={this.props.totalPrice}
            //isPurchasable={this.state.isPurchasable}
            isPurchasable={this.updatePurchaseState(this.props.ings)}
            purchasingClick={this.purchasingHandler}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          totalPrice={this.props.totalPrice}
          closeModal={this.closeModal}
          purchaseContinueClick={this.purchaseContinueHandler.bind(this)}
          isModalShow={this.state.isPurchasing}
        />
      );
    }
    // if (this.state.isLoading) {
    //   orderSummary = <Spinner />;
    // }

    return (
      <>
        {burgerContent}
        <Modal isShow={this.state.isPurchasing} closeModal={this.closeModal}>
          {orderSummary}
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice,
    isError: state.store_isError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredientAction: ingredientName =>
      dispatch(burgerBuilderActions.addIngredient(ingredientName)),
    removeIngredientAction: ingredientName =>
      dispatch(burgerBuilderActions.removeIngredient(ingredientName)),
    oninitIngredientsAction: () =>
      dispatch(burgerBuilderActions.initIngredients())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Error(BurgerBuilder, axiosOrder));
