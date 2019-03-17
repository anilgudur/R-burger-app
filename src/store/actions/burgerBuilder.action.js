import * as actionTypes from "./actionTypes";
import axiosOrder from "../../axios-orders";

export const addIngredient = ingredientName => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingredientName
  };
};

export const removeIngredient = ingredientName => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingredientName
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};
export const initIngredients = () => {
  return dispatch => {
    axiosOrder
      .get("/ingredients.jsons")
      .then(response => {
        //this.setState({ ingredients: response.data, isLoading: false });
        dispatch(setIngredients(response.data));
      })
      .catch(err => {
        //this.setState({ isLoading: false, isError: true });
        dispatch(fetchIngredientsFailed());
      });
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};
