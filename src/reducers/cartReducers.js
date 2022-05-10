import {
  CART_LIST_ITEMS_FAIL,
  CART_LIST_ITEMS_REQUEST,
  CART_LIST_ITEMS_SUCCESS,
  CART_LIST_ITEMS_RESET,
  CART_ADD_ITEM_FAIL,
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_RESET,
  CART_DELETE_ITEM_FAIL,
  CART_DELETE_ITEM_REQUEST,
  CART_DELETE_ITEM_SUCCESS,
  CART_DELETE_ITEM_RESET,
  CART_UPDATE_ITEM_FAIL,
  CART_UPDATE_ITEM_REQUEST,
  CART_UPDATE_ITEM_SUCCESS,
  CART_UPDATE_ITEM_RESET,
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
      return { cartItems: null };
    default:
      return state;
  }
};

export const postCartReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_ADD_ITEM_REQUEST:
      return { loading: true };
    case CART_ADD_ITEM_SUCCESS:
      return { loading: false, success: action.payload };
    case CART_ADD_ITEM_FAIL:
      return { loading: false, error: action.payload };
    case CART_ADD_ITEM_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteCartReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_DELETE_ITEM_REQUEST:
      return { loading: true };
    case CART_DELETE_ITEM_SUCCESS:
      return { loading: false, success: action.payload };
    case CART_DELETE_ITEM_FAIL:
      return { loading: false, error: action.payload };
    case CART_DELETE_ITEM_RESET:
      return {};
    default:
      return state;
  }
};
export const updateCartReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_UPDATE_ITEM_REQUEST:
      return { loading: true };
    case CART_UPDATE_ITEM_SUCCESS:
      return { loading: false, success: action.payload };
    case CART_UPDATE_ITEM_FAIL:
      return { loading: false, error: action.payload };
    case CART_UPDATE_ITEM_RESET:
      return {};
    default:
      return state;
  }
};
