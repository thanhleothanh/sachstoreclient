import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  ADMIN_UPDATE_PRODUCT_REQUEST,
  ADMIN_DELETE_PRODUCT_FAIL,
  ADMIN_DELETE_PRODUCT_REQUEST,
  ADMIN_DELETE_PRODUCT_SUCCESS,
  ADMIN_DELETE_PRODUCT_RESET,
  ADMIN_UPDATE_PRODUCT_FAIL,
  ADMIN_UPDATE_PRODUCT_SUCCESS,
  ADMIN_UPDATE_PRODUCT_RESET,
  ADMIN_POST_PRODUCT_FAIL,
  ADMIN_POST_PRODUCT_RESET,
  ADMIN_POST_PRODUCT_REQUEST,
  ADMIN_POST_PRODUCT_SUCCESS,
  GET_PRODUCT_AUTHORS_FAIL,
  GET_PRODUCT_AUTHORS_RESET,
  GET_PRODUCT_AUTHORS_REQUEST,
  GET_PRODUCT_AUTHORS_SUCCESS,
  GET_PRODUCT_PUBLISHERS_FAIL,
  GET_PRODUCT_PUBLISHERS_RESET,
  GET_PRODUCT_PUBLISHERS_REQUEST,
  GET_PRODUCT_PUBLISHERS_SUCCESS,
  GET_PRODUCT_CATEGORIES_FAIL,
  GET_PRODUCT_CATEGORIES_RESET,
  GET_PRODUCT_CATEGORIES_REQUEST,
  GET_PRODUCT_CATEGORIES_SUCCESS,
  POST_PRODUCT_AUTHORS_FAIL,
  POST_PRODUCT_AUTHORS_RESET,
  POST_PRODUCT_AUTHORS_REQUEST,
  POST_PRODUCT_AUTHORS_SUCCESS,
  POST_PRODUCT_PUBLISHERS_FAIL,
  POST_PRODUCT_PUBLISHERS_RESET,
  POST_PRODUCT_PUBLISHERS_REQUEST,
  POST_PRODUCT_PUBLISHERS_SUCCESS,
  POST_PRODUCT_CATEGORIES_FAIL,
  POST_PRODUCT_CATEGORIES_RESET,
  POST_PRODUCT_CATEGORIES_REQUEST,
  POST_PRODUCT_CATEGORIES_SUCCESS,
} from './../constants/productConstants';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: null }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, product: {} };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminUpdateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_PRODUCT_REQUEST:
      return { loading: true };
    case ADMIN_UPDATE_PRODUCT_SUCCESS:
      return { loading: false, success: true };
    case ADMIN_UPDATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_UPDATE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};
export const adminPostProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_POST_PRODUCT_REQUEST:
      return { loading: true };
    case ADMIN_POST_PRODUCT_SUCCESS:
      return { loading: false, success: true };
    case ADMIN_POST_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_POST_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};
export const adminDeleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETE_PRODUCT_REQUEST:
      return { loading: true };
    case ADMIN_DELETE_PRODUCT_SUCCESS:
      return { loading: false, success: true };
    case ADMIN_DELETE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_DELETE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const getAuthorsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT_AUTHORS_REQUEST:
      return { loading: true };
    case GET_PRODUCT_AUTHORS_SUCCESS:
      return { loading: false, authors: action.payload };
    case GET_PRODUCT_AUTHORS_FAIL:
      return { loading: false, error: action.payload };
    case GET_PRODUCT_AUTHORS_RESET:
      return {};
    default:
      return state;
  }
};

export const postAuthorsReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_PRODUCT_AUTHORS_REQUEST:
      return { loading: true };
    case POST_PRODUCT_AUTHORS_SUCCESS:
      return { loading: false, author: action.payload, success: true };
    case POST_PRODUCT_AUTHORS_FAIL:
      return { loading: false, error: action.payload };
    case POST_PRODUCT_AUTHORS_RESET:
      return {};
    default:
      return state;
  }
};

export const getPublishersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT_PUBLISHERS_REQUEST:
      return { loading: true };
    case GET_PRODUCT_PUBLISHERS_SUCCESS:
      return { loading: false, publishers: action.payload };
    case GET_PRODUCT_PUBLISHERS_FAIL:
      return { loading: false, error: action.payload };
    case GET_PRODUCT_PUBLISHERS_RESET:
      return {};
    default:
      return state;
  }
};

export const postPublishersReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_PRODUCT_PUBLISHERS_REQUEST:
      return { loading: true };
    case POST_PRODUCT_PUBLISHERS_SUCCESS:
      return { loading: false, publisher: action.payload, success: true };
    case POST_PRODUCT_PUBLISHERS_FAIL:
      return { loading: false, error: action.payload };
    case POST_PRODUCT_PUBLISHERS_RESET:
      return {};
    default:
      return state;
  }
};

export const getCategoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT_CATEGORIES_REQUEST:
      return { loading: true };
    case GET_PRODUCT_CATEGORIES_SUCCESS:
      return { loading: false, categories: action.payload };
    case GET_PRODUCT_CATEGORIES_FAIL:
      return { loading: false, error: action.payload };
    case GET_PRODUCT_CATEGORIES_RESET:
      return {};
    default:
      return state;
  }
};

export const postCategoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_PRODUCT_CATEGORIES_REQUEST:
      return { loading: true };
    case POST_PRODUCT_CATEGORIES_SUCCESS:
      return { loading: false, success: true, category: action.payload };
    case POST_PRODUCT_CATEGORIES_FAIL:
      return { loading: false, error: action.payload };
    case POST_PRODUCT_CATEGORIES_RESET:
      return {};
    default:
      return state;
  }
};
