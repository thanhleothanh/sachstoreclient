import {
  ADMIN_POST_USER_FAIL,
  ADMIN_POST_USER_SUCCESS,
  ADMIN_POST_USER_REQUEST,
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
  USER_UPDATEADMIN_FAIL,
  USER_UPDATEADMIN_REQUEST,
  USER_UPDATEADMIN_SUCCESS,
  USER_UPDATEDELETE_FAIL,
  USER_UPDATEDELETE_REQUEST,
  USER_UPDATEDELETE_SUCCESS,
  USER_UPDATE_RESET,
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

export const adminUpdateUserReducer = (
  state = { successAdmin: false, successDelete: false },
  action
) => {
  switch (action.type) {
    case USER_UPDATEADMIN_REQUEST:
      return { loading: true };
    case USER_UPDATEADMIN_SUCCESS:
      return { loading: false, successAdmin: true };
    case USER_UPDATEADMIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATEDELETE_REQUEST:
      return { loading: true };
    case USER_UPDATEDELETE_SUCCESS:
      return { loading: false, sucessDelete: true };
    case USER_UPDATEDELETE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {};
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
    default:
      return state;
  }
};
