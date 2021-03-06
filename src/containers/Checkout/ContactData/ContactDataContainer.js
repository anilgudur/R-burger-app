import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactDataContainer.module.css";
import axiosOrder from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/Form/Input/Input";

class ContactDataContainer extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validationRules: {
          required: true
        },
        isValid: false,
        isTouched: false,
        valueType: "name"
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validationRules: {
          required: true
        },
        isValid: false,
        isTouched: false,
        valueType: "street"
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code"
        },
        value: "",
        validationRules: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        isValid: false,
        isTouched: false,
        valueType: "zip code"
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validationRules: {
          required: true
        },
        isValid: false,
        isTouched: false,
        valueType: "country"
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        validationRules: {
          required: true
        },
        isValid: false,
        isTouched: false,
        valueType: "email"
      },
      type: {
        elementType: "select",
        elementConfig: {
          options: [
            { name: "Fastest", value: "fastest" },
            { name: "Cheapest", value: "cheapest" }
          ]
        },
        value: "cheapest",
        validationRules: {},
        isValid: true
      }
    },

    isLoading: false,
    isFormValid: false
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  onOrderClick(event) {
    event.preventDefault();
    console.log("CLICKED ORDER:", this.props.ings);
    this.setState({ isLoading: true });

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    // const orderData = {
    //   ingredients: this.props.ingredients,
    //   price: this.props.totalPrice,
    //   customer: {
    //     name: "Anil Gudur",
    //     address: {
    //       street: "Teststreet 1",
    //       zipCode: "32154",
    //       country: "INDIA"
    //     },
    //     email: "test@test.com"
    //   },
    //   delivery: {
    //     type: "fastest"
    //   }
    // };
    const orderData = {
      ingredients: this.props.ings,
      price: this.props.totalPrice,
      orderData: formData,
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
        this.setState({ isLoading: false });
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({ isLoading: false });
      });
  }

  onChangeHandler(event, inputIdentifier) {
    console.log("On Change", event.target.value);
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.isValid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validationRules
    );
    updatedFormElement.isTouched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let isFormValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      isFormValid = updatedOrderForm[inputIdentifier].isValid && isFormValid;
    }

    this.setState({ orderForm: updatedOrderForm, isFormValid: isFormValid });
  }

  render() {
    const formEleArray = [];
    for (let key in this.state.orderForm) {
      formEleArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let comp = (
      <form onSubmit={this.onOrderClick.bind(this)}>
        {formEleArray.map(formEle => (
          <Input
            key={formEle.id}
            elementType={formEle.config.elementType}
            elementConfig={formEle.config.elementConfig}
            value={formEle.config.value}
            onChangeHandler={event => this.onChangeHandler(event, formEle.id)}
            isValid={formEle.config.isValid}
            shouldValidate={!!formEle.config.validationRules}
            isTouched={formEle.config.isTouched}
            valueType={formEle.config.valueType}
          />
        ))}
        <Button buttonType='Success' disabled={!this.state.isFormValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.isLoading) {
      comp = <Spinner />;
    }
    return (
      <div className={classes.ContactDataContainer}>
        <h4>Enter your Contact Data</h4>
        {comp}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice
  };
};

export default connect(mapStateToProps)(ContactDataContainer);
