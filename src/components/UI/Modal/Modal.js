import React, { Component } from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.isShow !== this.props.isShow;
  }

  render() {
    return (
      <>
        <Backdrop
          isShow={this.props.isShow}
          backdropClicked={this.props.closeModal}
        />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.isShow
              ? "translateY(0)"
              : "translateY(-100vh)",
            opacity: this.props.isShow ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </>
    );
  }
}

export default Modal;
