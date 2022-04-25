import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_RESET,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_DETAILS_REQUEST,
  USER_UPDATE_DETAILS_SUCCESS,
  USER_UPDATE_DETAILS_FAIL,
  USER_UPDATE_DETAILS_RESET,
  USER_UPDATE_PASSWORD_RESET,
  USER_DETAILS_RESET,
  ALL_USERS_DETAILS_SUCCESS,
  ALL_USERS_DETAILS_FAIL,
  ALL_USERS_DETAILS_RESET,
  ALL_USERS_DETAILS_REQUEST,
  USER_UPDATEDELETE_SUCCESS,
  USER_UPDATEDELETE_FAIL,
  USER_UPDATEDELETE_REQUEST,
  USER_UPDATE_RESET,
  ADMIN_POST_USER_FAIL,
  ADMIN_POST_USER_REQUEST,
  ADMIN_POST_USER_SUCCESS,
} from '../constants/userConstants';
import axios from 'axios';

export const login = (taikhoan, matkhau) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const { data } = await axios.post('/api/users/signin', {
      taikhoan,
      matkhau,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
    //
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response ? error.response.data : "There's a problem",
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({
    type: USER_REGISTER_RESET,
  });
  dispatch({
    type: USER_DETAILS_RESET,
  });
  dispatch({
    type: USER_UPDATE_DETAILS_RESET,
  });
  dispatch({
    type: USER_UPDATE_PASSWORD_RESET,
  });
  dispatch({
    type: ALL_USERS_DETAILS_RESET,
  });
  dispatch({
    type: USER_UPDATE_RESET,
  });
  localStorage.removeItem('userInfo');
};

export const register = (newUser) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const { data } = await axios.post('/api/users/', newUser);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response ? error.response.data : "There's a problem",
    });
  }
};

export const updateUserDetails =
  (newDetailUser) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_DETAILS_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();
      const { data } = await axios.patch(
        `/api/users/${userInfo.id}`,
        newDetailUser
      );
      dispatch({
        type: USER_UPDATE_DETAILS_SUCCESS,
        payload: data,
      });
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_UPDATE_DETAILS_FAIL,
        payload: error.response ? error.response.data : "There's a problem",
      });
    }
  };

//admin
export const getAllUsersDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ALL_USERS_DETAILS_REQUEST,
    });
    const { data } = await axios.get('/api/users');
    dispatch({
      type: ALL_USERS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_USERS_DETAILS_FAIL,
      payload: error.response ? error.response.data : "There's a problem",
    });
  }
};

export const updateDeleteUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATEDELETE_REQUEST,
    });

    await axios.delete(`/api/users/${userId}`);

    dispatch({
      type: USER_UPDATEDELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATEDELETE_FAIL,
      payload: error.response ? error.response.data : "There's a problem",
    });
  }
};

export const adminPostUser = (newUser) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_POST_USER_REQUEST });

    await axios.post(`/api/users/`, newUser);

    dispatch({ type: ADMIN_POST_USER_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADMIN_POST_USER_FAIL,
      payload: error.response ? error.response.data : "There's a problem",
    });
  }
};
