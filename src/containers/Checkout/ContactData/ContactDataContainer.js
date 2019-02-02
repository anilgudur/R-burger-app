import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactDataContainer.module.css";

class ContactDataContainer extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    }
  };

  render() {
    return (
      <div className={classes.ContactDataContainer}>
        <h4>Enter your Contact Data</h4>
        <form>
          <input
            type='text'
            name='name'
            className={classes.Input}
            placeholder='Your Name'
          />
          <input
            type='text'
            name='email'
            className={classes.Input}
            placeholder='Your Email'
          />
          <input
            type='text'
            name='street'
            className={classes.Input}
            placeholder='street'
          />
          <input
            type='text'
            name='postalCode'
            className={classes.Input}
            placeholder='Postal Code'
          />
          <Button buttonType='Success' className>
            ORDER
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactDataContainer;
