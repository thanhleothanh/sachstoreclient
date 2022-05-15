import axios from 'axios';
import {
  CART_ADD_ITEM_FAIL,
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_DELETE_ITEM_FAIL,
  CART_DELETE_ITEM_REQUEST,
  CART_DELETE_ITEM_SUCCESS,
  CART_UPDATE_ITEM_FAIL,
  CART_UPDATE_ITEM_REQUEST,
  CART_UPDATE_ITEM_SUCCESS,
  CART_LIST_ITEMS_FAIL,
  CART_LIST_ITEMS_REQUEST,
  CART_LIST_ITEMS_SUCCESS,
} from './../constants/cartConstants';

export const listCartItems = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_LIST_ITEMS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios.get(
      `https://testsachstore.herokuapp.com/api/cart/${userInfo.id}`
    );
    dispatch({
      type: CART_LIST_ITEMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CART_LIST_ITEMS_FAIL,
      payload: error.response ? error.response.data : "There's a problem",
    });
  }
};

export const addCartItem = (sachid, soluong) => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_ADD_ITEM_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    if (!userInfo)
      dispatch({
        type: CART_ADD_ITEM_FAIL,
        payload: 'Bạn phải đăng nhập để có thể thêm sản phẩm vào giỏ!',
      });
    else {
      const { data } = await axios.post(
        `https://testsachstore.herokuapp.com/api/cart/${userInfo.id}`,
        {
          api_sach: sachid,
          soluong: soluong,
        }
      );

      dispatch({
        type: CART_ADD_ITEM_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: CART_ADD_ITEM_FAIL,
      payload: error.response ? error.response.data : "There's a problem",
    });
  }
};

export const updateCartItem =
  (sachid, soluongmoi) => async (dispatch, getState) => {
    try {
      dispatch({ type: CART_UPDATE_ITEM_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const { data } = await axios.patch(
        `https://testsachstore.herokuapp.com/api/cart/${userInfo.id}`,
        {
          api_sach: sachid,
          soluong: soluongmoi,
        }
      );

      dispatch({
        type: CART_UPDATE_ITEM_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CART_UPDATE_ITEM_FAIL,
        payload: error.response ? error.response.data : "There's a problem",
      });
    }
  };

export const deleteCartItem = (sachid) => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_DELETE_ITEM_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios.delete(
      `https://testsachstore.herokuapp.com/api/cart/${userInfo.id}/${sachid}`
    );

    dispatch({
      type: CART_DELETE_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CART_DELETE_ITEM_FAIL,
      payload: error.response ? error.response.data : "There's a problem",
    });
  }
};
