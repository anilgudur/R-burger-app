import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const modal = props => (
  <>
    <Backdrop isShow={props.isShow} backdropClicked={props.closeModal} />
    <div
      className={classes.Modal}
      style={{
        transform: props.isShow ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.isShow ? "1" : "0"
      }}
    >
      {props.children}
    </div>
  </>
);

export default modal;
