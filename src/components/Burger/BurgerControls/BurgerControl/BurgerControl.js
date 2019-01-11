import React from "react";
import classes from "./BurgerControl.module.css";

const burgerControl = props => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      onClick={props.removeIngredientClick}
      disabled={props.disabledInfo}
    >
      Less
    </button>
    <button className={classes.More} onClick={props.addIngredientClick}>
      More
    </button>
  </div>
);

export default burgerControl;
