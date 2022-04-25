import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_UPDATEDETAIL_REQUEST,
  PRODUCT_UPDATEDELETE_FAIL,
  PRODUCT_UPDATEDELETE_REQUEST,
  PRODUCT_UPDATEDELETE_SUCCESS,
  PRODUCT_UPDATEDETAIL_FAIL,
  PRODUCT_UPDATEDETAIL_SUCCESS,
  PRODUCT_UPDATECREATE_FAIL,
  PRODUCT_UPDATECREATE_REQUEST,
  PRODUCT_UPDATECREATE_SUCCESS,
  PRODUCT_UPDATE_RESET,
  GET_PRODUCT_AUTHORS_FAIL,
  GET_PRODUCT_AUTHORS_REQUEST,
  GET_PRODUCT_AUTHORS_SUCCESS,
  GET_PRODUCT_PUBLISHERS_FAIL,
  GET_PRODUCT_PUBLISHERS_REQUEST,
  GET_PRODUCT_PUBLISHERS_SUCCESS,
  GET_PRODUCT_CATEGORIES_FAIL,
  GET_PRODUCT_CATEGORIES_REQUEST,
  GET_PRODUCT_CATEGORIES_SUCCESS,
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

export const adminUpdateProductReducer = (
  state = { successCreate: false, successDetail: false, successDelete: false },
  action
) => {
  switch (action.type) {
    case PRODUCT_UPDATEDETAIL_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATEDETAIL_SUCCESS:
      return { loading: false, successDetail: true };
    case PRODUCT_UPDATEDETAIL_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATEDELETE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATEDELETE_SUCCESS:
      return { loading: false, sucessDelete: true };
    case PRODUCT_UPDATEDELETE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATECREATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATECREATE_SUCCESS:
      return { loading: false, sucessCreate: true };
    case PRODUCT_UPDATECREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return {
        successCreate: false,
        successDetail: false,
        successDelete: false,
      };
    default:
      return state;
  }
};
export const getAuthorsReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case GET_PRODUCT_AUTHORS_REQUEST:
      return { loading: true };
    case GET_PRODUCT_AUTHORS_SUCCESS:
      return { loading: false, authors: action.payload };
    case GET_PRODUCT_AUTHORS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const getPublishersReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case GET_PRODUCT_PUBLISHERS_REQUEST:
      return { loading: true };
    case GET_PRODUCT_PUBLISHERS_SUCCESS:
      return { loading: false, publishers: action.payload };
    case GET_PRODUCT_PUBLISHERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const getCategoriesReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case GET_PRODUCT_CATEGORIES_REQUEST:
      return { loading: true };
    case GET_PRODUCT_CATEGORIES_SUCCESS:
      return { loading: false, categories: action.payload };
    case GET_PRODUCT_CATEGORIES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
