import React from "react";
import classes from "./Backdrop.module.css";

const backdrop = props =>
  props.isShow ? (
    <div className={classes.Backdrop} onClick={props.backdropClicked} />
  ) : null;

export default backdrop;
