import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducer,
  productDetailsReducer,
  adminUpdateProductReducer,
  getAuthorsReducer,
  getPublishersReducer,
  getCategoriesReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  orderReducers,
  postOrderReducers,
  allOrdersReducers,
  adminAllOrdersReducers,
  adminUpdateOrderReducers,
  orderDetailsReducers,
} from './reducers/orderReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateDetailsReducer,
  allUsersDetailsReducer,
  adminUpdateUserReducer,
  adminPostUserReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
  //products
  productList: productListReducer,
  productDetails: productDetailsReducer,
  getAuthors: getAuthorsReducer,
  getPublishers: getPublishersReducer,
  getCategories: getCategoriesReducer,
  adminUpdateProduct: adminUpdateProductReducer,
  cart: cartReducer,
  //users
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdateDetails: userUpdateDetailsReducer,
  allUsersDetails: allUsersDetailsReducer,
  adminUpdateUser: adminUpdateUserReducer,
  adminPostUser: adminPostUserReducer,
  //orders
  order: orderReducers,
  orderDetails: orderDetailsReducers,
  postOrder: postOrderReducers,
  allOrders: allOrdersReducers,
  adminAllOrders: adminAllOrdersReducers,
  adminUpdateOrder: adminUpdateOrderReducers,
});

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
  userDetails: { user: {} },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
