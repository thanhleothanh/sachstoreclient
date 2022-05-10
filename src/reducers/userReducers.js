import {
  ADMIN_POST_USER_FAIL,
  ADMIN_POST_USER_SUCCESS,
  ADMIN_POST_USER_REQUEST,
  ADMIN_POST_USER_RESET,
  ADMIN_UPDATE_USER_FAIL,
  ADMIN_UPDATE_USER_SUCCESS,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_RESET,
  ADMIN_DELETE_USER_FAIL,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_RESET,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_UPDATE_DETAILS_REQUEST,
  USER_UPDATE_DETAILS_SUCCESS,
  USER_UPDATE_DETAILS_FAIL,
  USER_UPDATE_DETAILS_RESET,
  ALL_USERS_DETAILS_REQUEST,
  ALL_USERS_DETAILS_RESET,
  ALL_USERS_DETAILS_FAIL,
  ALL_USERS_DETAILS_SUCCESS,
} from './../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_DETAILS_REQUEST:
      return { loading: true };
    case USER_UPDATE_DETAILS_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_UPDATE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

//ADMIN
export const allUsersDetailsReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USERS_DETAILS_REQUEST:
      return { loading: true };
    case ALL_USERS_DETAILS_SUCCESS:
      return { loading: false, users: action.payload };
    case ALL_USERS_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case ALL_USERS_DETAILS_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const adminPostUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_POST_USER_REQUEST:
      return { loading: true };
    case ADMIN_POST_USER_SUCCESS:
      return { loading: false, success: true };
    case ADMIN_POST_USER_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_POST_USER_RESET:
      return {};
    default:
      return state;
  }
};

export const adminUpdateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_USER_REQUEST:
      return { loading: true };
    case ADMIN_UPDATE_USER_SUCCESS:
      return { loading: false, success: true };
    case ADMIN_UPDATE_USER_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_UPDATE_USER_RESET:
      return {};
    default:
      return state;
  }
};

export const adminDeleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETE_USER_REQUEST:
      return { loading: true };
    case ADMIN_DELETE_USER_SUCCESS:
      return { loading: false, success: true };
    case ADMIN_DELETE_USER_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_DELETE_USER_RESET:
      return {};
    default:
      return state;
  }
};
