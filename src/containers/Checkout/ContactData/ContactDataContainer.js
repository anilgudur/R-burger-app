import React, { Component } from "react";
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
    isLoading: false
  };

  onOrderClick(event) {
    event.preventDefault();
    console.log("CLICKED ORDER:", this.props.ingredients);
    this.setState({ isLoading: true });
    const orderData = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
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

  render() {
    let comp = (
      <form>
        <Input
          type='text'
          inputtype="input"
          name='name'
          placeholder='Your Name'
        />
        <Input
          type='text'
          inputtype="input"
          name='email'
          placeholder='Your Email'
        />
        <Input
          type='text'
          inputtype="input"
          name='street'
          placeholder='street'
        />
        <Input
          type='text'
          inputtype="input"
          name='postalCode'
          placeholder='Postal Code'
        />
        <Button buttonType='Success' onClick={this.onOrderClick.bind(this)}>
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

export default ContactDataContainer;
