import React, { Component } from "react";
import Order from "../../components/Order/Order";

class Orders extends Component {
  remder() {
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}

export default Orders;
