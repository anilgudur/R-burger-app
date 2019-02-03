import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axiosOrder from "../../axios-orders";
import Error from "../../hoc/Error/Error";

class Orders extends Component {
  state = {
    orderList: [],
    isLoading: true
  };

  componentDidMount() {
    axiosOrder
      .get("orders.json")
      .then(res => {
        const orderList = [];
        for (let key in res.data) {
          orderList.push(res.data[key]);
          orderList.push({
            ...res.data[key],
            id: key
          });
        }
        this.setState({
          orderList,
          isLoading: false
        });
        console.log("[Orders.js - componentDidMount - res]", res.data);
      })
      .catch(err => {
        this.setState({
          isLoading: false
        });
      });
  }

  render() {
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}

export default Error(Orders, axiosOrder);
