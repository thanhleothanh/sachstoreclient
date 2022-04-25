import {
  CART_LIST_ITEMS_FAIL,
  CART_LIST_ITEMS_REQUEST,
  CART_LIST_ITEMS_SUCCESS,
  CART_LIST_ITEMS_RESET,
} from './../constants/cartConstants';

export const cartReducer = (state = { cartItems: null }, action) => {
  switch (action.type) {
    case CART_LIST_ITEMS_REQUEST:
      return { loading: true, cartItems: null };
    case CART_LIST_ITEMS_SUCCESS:
      return { loading: false, cartItems: action.payload };
    case CART_LIST_ITEMS_FAIL:
      return { loading: false, error: action.payload };
    case CART_LIST_ITEMS_RESET:
      return { loading: true, cartItems: null };
    default:
      return state;
  }
};
