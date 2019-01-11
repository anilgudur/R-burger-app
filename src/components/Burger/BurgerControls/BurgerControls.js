import React from "react";
import BurgerControl from "./BurgerControl/BurgerControl";
import classes from "./BurgerControls.module.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const burgerControls = props => (
  <div className={classes.BurgerControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map(el => (
      <BurgerControl
        key={el.label}
        label={el.label}
        addIngredientClick={props.addIngredientClick.bind(this, el.type)}
        removeIngredientClick={props.removeIngredientClick.bind(this, el.type)}
        disabledInfo={props.disabledInfoArr[el.type]}
      />
    ))}
  </div>
);

export default burgerControls;
