import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_UPDATEDETAIL_REQUEST,
  PRODUCT_UPDATEDETAIL_SUCCESS,
  PRODUCT_UPDATEDETAIL_FAIL,
  PRODUCT_UPDATEDELETE_FAIL,
  PRODUCT_UPDATEDELETE_REQUEST,
  PRODUCT_UPDATEDELETE_SUCCESS,
  PRODUCT_UPDATECREATE_SUCCESS,
  PRODUCT_UPDATECREATE_REQUEST,
  PRODUCT_UPDATECREATE_FAIL,
  GET_PRODUCT_AUTHORS_FAIL,
  GET_PRODUCT_AUTHORS_SUCCESS,
  GET_PRODUCT_AUTHORS_REQUEST,
  GET_PRODUCT_CATEGORIES_FAIL,
  GET_PRODUCT_CATEGORIES_SUCCESS,
  GET_PRODUCT_CATEGORIES_REQUEST,
  GET_PRODUCT_PUBLISHERS_FAIL,
  GET_PRODUCT_PUBLISHERS_SUCCESS,
  GET_PRODUCT_PUBLISHERS_REQUEST,
} from './../constants/productConstants';
import axios from 'axios';

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get('/api/books/');
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response ? error.response.data : "There's a problem",
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/books/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data[0] });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response ? error.response.data : "There's a problem",
    });
  }
};

export const getProductAuthors = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_AUTHORS_REQUEST });

    const { data } = await axios.get(`/api/books/authors`);
    dispatch({ type: GET_PRODUCT_AUTHORS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_AUTHORS_FAIL,
      payload: error.response ? error.response.data : "There's a problem",
    });
  }
};

export const getProductPublishers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_PUBLISHERS_REQUEST });

    const { data } = await axios.get(`/api/books/publishers`);
    dispatch({ type: GET_PRODUCT_PUBLISHERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_PUBLISHERS_FAIL,
      payload: error.response ? error.response.data : "There's a problem",
    });
  }
};

export const getProductCategories = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_CATEGORIES_REQUEST });

    const { data } = await axios.get(`/api/books/categories`);
    dispatch({ type: GET_PRODUCT_CATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_CATEGORIES_FAIL,
      payload: error.response ? error.response.data : "There's a problem",
    });
  }
};

export const postProductAuthor = (newAuthor) => async () => {
  try {
    const { data } = await axios.post(`/api/books/authors`, newAuthor);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const postProductPublisher = (newPublisher) => async () => {
  try {
    const { data } = await axios.post(`/api/books/publishers`, newPublisher);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const postProductCategory = (newCategory) => async () => {
  try {
    const { data } = await axios.post(`/api/books/categories`, newCategory);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

//admin

export const adminUpdateProduct =
  (productId, newDetail) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_UPDATEDETAIL_REQUEST });

      await axios.patch(`/api/books/${productId}`, newDetail);

      dispatch({ type: PRODUCT_UPDATEDETAIL_SUCCESS });
    } catch (error) {
      dispatch({
        type: PRODUCT_UPDATEDETAIL_FAIL,
        payload: error.response ? error.response.data : "There's a problem",
      });
    }
  };

export const adminDeleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_UPDATEDELETE_REQUEST });

    await axios.delete(`/api/books/${productId}`);

    dispatch({ type: PRODUCT_UPDATEDELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATEDELETE_FAIL,
      payload: error.response ? error.response.data : "There's a problem",
    });
  }
};

export const adminPostProduct = (newProduct) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_UPDATECREATE_REQUEST });

    await axios.post(`/api/books/`, newProduct);

    dispatch({ type: PRODUCT_UPDATECREATE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATECREATE_FAIL,
      payload: error.response ? error.response.data : "There's a problem",
    });
  }
};
