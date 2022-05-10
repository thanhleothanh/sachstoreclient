import {
  POST_ORDER_SUCCESS,
  POST_ORDER_REQUEST,
  POST_ORDER_FAIL,
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_FAIL,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_FAIL,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAIL,
  ADMIN_GET_ALL_ORDERS_REQUEST,
  ADMIN_UPDATE_ORDER_SUCCESS,
  ADMIN_UPDATE_ORDER_REQUEST,
  ADMIN_UPDATE_ORDER_FAIL,
  ADMIN_GET_ALL_ORDERS_SUCCESS,
  ADMIN_GET_ALL_ORDERS_FAIL,
  PAY_ORDER_FAIL,
  PAY_ORDER_REQUEST,
  PAY_ORDER_SUCCESS,
} from './../constants/orderConstants';
import axios from 'axios';

export const postOrder = (orderInfo) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_ORDER_REQUEST });

    const {
      cart: { cartItems },
    } = getState();

    const { data } = await axios.post('/api/orders/', orderInfo);

    await Promise.all(
      cartItems.map(async (item) => {
        await axios.post(`/api/orders/${data.id}/items`, {
          api_sach: Number(item.sachid),
          giaban: Number(item.giasach),
          soluong: Number(item.soluong),
        });
      })
    );

    await Promise.all(
      cartItems.map(async (item) => {
        await axios.patch(`/api/books/${item.sachid}`, {
          soluong: Number(item.soluongStock - item.soluong),
        });
      })
    );

    dispatch({ type: POST_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_ORDER_FAIL,
      payload: error.response ? error.response.data : "There's a problem",
    });
  }
};

export const getOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ORDER_REQUEST });

    const { data } = await axios.get(`/api/orders/${orderId}`);

    dispatch({ type: GET_ORDER_SUCCESS, payload: data[0] });
  } catch (error) {
    dispatch({
      type: GET_ORDER_FAIL,
      payload: error.response ? error.response.data : "There's a problem",
    });
  }
};

export const getOrderDetails = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/orders/${orderId}/items`);

    dispatch({ type: GET_ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ORDER_DETAILS_FAIL,
      payload: error.response ? error.response.data : "There's a problem",
    });
  }
};

export const payOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: PAY_ORDER_REQUEST });

    const { data } = await axios.post(`/api/orders/${orderId}/pay`);

    dispatch({ type: PAY_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PAY_ORDER_FAIL,
      payload: error.response ? error.response.data : "There's a problem",
    });
  }
};

export const getAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_ORDERS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios.get(`/api/orders/myorders/${userInfo.id}`);

    dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ORDERS_FAIL,
      payload: error.response ? error.response.data : "There's a problem",
    });
  }
};

export const adminGetAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_GET_ALL_ORDERS_REQUEST });

    const { data } = await axios.get(`/api/orders/`);

    dispatch({ type: ADMIN_GET_ALL_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_ALL_ORDERS_FAIL,
      payload: error.response ? error.response.data : "There's a problem",
    });
  }
};

export const adminUpdateOrder = (orderId, newUpdate) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_UPDATE_ORDER_REQUEST });

    await axios.patch(`/api/orders/${orderId}`, newUpdate);

    dispatch({ type: ADMIN_UPDATE_ORDER_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_ORDER_FAIL,
      payload: error.response ? error.response.data : "There's a problem",
    });
  }
};
