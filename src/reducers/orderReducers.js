import {
  PAY_ORDER_FAIL,
  PAY_ORDER_REQUEST,
  PAY_ORDER_RESET,
  PAY_ORDER_SUCCESS,
  POST_ORDER_FAIL,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_RESET,
  GET_ORDER_FAIL,
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_RESET,
  GET_ORDER_DETAILS_FAIL,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_RESET,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAIL,
  ADMIN_GET_ALL_ORDERS_FAIL,
  ADMIN_GET_ALL_ORDERS_REQUEST,
  ADMIN_GET_ALL_ORDERS_SUCCESS,
  ADMIN_UPDATE_ORDER_FAIL,
  ADMIN_UPDATE_ORDER_REQUEST,
  ADMIN_UPDATE_ORDER_SUCCESS,
  ADMIN_UPDATE_ORDER_RESET,
} from './../constants/orderConstants';

export const orderReducers = (state = { loading: false }, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return { loading: true };
    case GET_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case GET_ORDER_FAIL:
      return { loading: false, error: action.payload };
    case GET_ORDER_RESET:
      return { loading: false };
    default:
      return state;
  }
};

export const orderDetailsReducers = (state = { loading: false }, action) => {
  switch (action.type) {
    case GET_ORDER_DETAILS_REQUEST:
      return { loading: true };
    case GET_ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        orderDetails: action.payload,
      };
    case GET_ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case GET_ORDER_DETAILS_RESET:
      return { loading: false };
    default:
      return state;
  }
};

export const postOrderReducers = (state = { loading: false }, action) => {
  switch (action.type) {
    case POST_ORDER_REQUEST:
      return { loading: true };
    case POST_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
        success: true,
      };
    case POST_ORDER_FAIL:
      return { loading: false, error: action.payload };
    case POST_ORDER_RESET:
      return { loading: false };
    default:
      return state;
  }
};

export const allOrdersReducers = (state = { allOrders: [] }, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS_REQUEST:
      return { loading: true };
    case GET_ALL_ORDERS_SUCCESS:
      return { loading: false, allOrders: action.payload };
    case GET_ALL_ORDERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminAllOrdersReducers = (
  state = { adminAllOrders: [] },
  action
) => {
  switch (action.type) {
    case ADMIN_GET_ALL_ORDERS_REQUEST:
      return { loading: true };
    case ADMIN_GET_ALL_ORDERS_SUCCESS:
      return { loading: false, adminAllOrders: action.payload };
    case ADMIN_GET_ALL_ORDERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const adminUpdateOrderReducers = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_ORDER_REQUEST:
      return { loading: true };
    case ADMIN_UPDATE_ORDER_SUCCESS:
      return { loading: false, success: true };
    case ADMIN_UPDATE_ORDER_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_UPDATE_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export const payOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case PAY_ORDER_REQUEST:
      return { loading: true };
    case PAY_ORDER_SUCCESS:
      return { loading: false, success: true };
    case PAY_ORDER_FAIL:
      return { loading: false, error: action.payload };
    case PAY_ORDER_RESET:
      return {};
    default:
      return state;
  }
};
