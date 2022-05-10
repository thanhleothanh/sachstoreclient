import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_AUTHORS_FAIL,
  GET_PRODUCT_AUTHORS_SUCCESS,
  GET_PRODUCT_AUTHORS_REQUEST,
  GET_PRODUCT_CATEGORIES_FAIL,
  GET_PRODUCT_CATEGORIES_SUCCESS,
  GET_PRODUCT_CATEGORIES_REQUEST,
  GET_PRODUCT_PUBLISHERS_FAIL,
  GET_PRODUCT_PUBLISHERS_SUCCESS,
  GET_PRODUCT_PUBLISHERS_REQUEST,
  POST_PRODUCT_AUTHORS_FAIL,
  POST_PRODUCT_AUTHORS_SUCCESS,
  POST_PRODUCT_AUTHORS_REQUEST,
  POST_PRODUCT_CATEGORIES_FAIL,
  POST_PRODUCT_CATEGORIES_SUCCESS,
  POST_PRODUCT_CATEGORIES_REQUEST,
  POST_PRODUCT_PUBLISHERS_FAIL,
  POST_PRODUCT_PUBLISHERS_SUCCESS,
  POST_PRODUCT_PUBLISHERS_REQUEST,
  ADMIN_UPDATE_PRODUCT_REQUEST,
  ADMIN_UPDATE_PRODUCT_SUCCESS,
  ADMIN_UPDATE_PRODUCT_FAIL,
  ADMIN_DELETE_PRODUCT_FAIL,
  ADMIN_DELETE_PRODUCT_REQUEST,
  ADMIN_DELETE_PRODUCT_SUCCESS,
  ADMIN_POST_PRODUCT_SUCCESS,
  ADMIN_POST_PRODUCT_REQUEST,
  ADMIN_POST_PRODUCT_FAIL,
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

export const postProductAuthor = (newAuthor) => async (dispatch) => {
  try {
    dispatch({ type: POST_PRODUCT_AUTHORS_REQUEST });

    const { data } = await axios.post(`/api/books/authors`, newAuthor);
    dispatch({ type: POST_PRODUCT_AUTHORS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_PRODUCT_AUTHORS_FAIL,
      payload: error.response ? error.response.data : "There's a problem",
    });
  }
};

export const postProductPublisher = (newPublisher) => async (dispatch) => {
  try {
    dispatch({ type: POST_PRODUCT_PUBLISHERS_REQUEST });
    const { data } = await axios.post(`/api/books/publishers`, newPublisher);
    dispatch({ type: POST_PRODUCT_PUBLISHERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_PRODUCT_PUBLISHERS_FAIL,
      payload: error.response ? error.response.data : "There's a problem",
    });
  }
};

export const postProductCategory = (newCategory) => async (dispatch) => {
  try {
    dispatch({ type: POST_PRODUCT_CATEGORIES_REQUEST });
    const { data } = await axios.post(`/api/books/categories`, newCategory);
    dispatch({ type: POST_PRODUCT_CATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_PRODUCT_CATEGORIES_FAIL,
      payload: error.response ? error.response.data : "There's a problem",
    });
  }
};

//admin

export const adminUpdateProduct =
  (productId, newDetail) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_UPDATE_PRODUCT_REQUEST });

      await axios.patch(`/api/books/${productId}`, newDetail);

      dispatch({ type: ADMIN_UPDATE_PRODUCT_SUCCESS });
    } catch (error) {
      dispatch({
        type: ADMIN_UPDATE_PRODUCT_FAIL,
        payload: error.response ? error.response.data : "There's a problem",
      });
    }
  };

export const adminDeleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DELETE_PRODUCT_REQUEST });

    await axios.delete(`/api/books/${productId}`);

    dispatch({ type: ADMIN_DELETE_PRODUCT_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_PRODUCT_FAIL,
      payload: error.response ? error.response.data : "There's a problem",
    });
  }
};

export const adminPostProduct = (newProduct) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_POST_PRODUCT_REQUEST });

    await axios.post(`/api/books/`, newProduct);

    dispatch({ type: ADMIN_POST_PRODUCT_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADMIN_POST_PRODUCT_FAIL,
      payload: error.response ? error.response.data : "There's a problem",
    });
  }
};
