import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducer,
  productDetailsReducer,
  adminUpdateProductReducer,
  adminPostProductReducer,
  adminDeleteProductReducer,
  getAuthorsReducer,
  getPublishersReducer,
  getCategoriesReducer,
  postAuthorsReducer,
  postPublishersReducer,
  postCategoriesReducer,
} from './reducers/productReducers';
import {
  cartReducer,
  postCartReducer,
  updateCartReducer,
  deleteCartReducer,
} from './reducers/cartReducers';
import {
  orderReducers,
  postOrderReducers,
  payOrderReducer,
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
  adminDeleteUserReducer,
  adminPostUserReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
  //products
  productList: productListReducer,
  productDetails: productDetailsReducer,
  getAuthors: getAuthorsReducer,
  getPublishers: getPublishersReducer,
  getCategories: getCategoriesReducer,
  postAuthors: postAuthorsReducer,
  postPublishers: postPublishersReducer,
  postCategories: postCategoriesReducer,
  adminUpdateProduct: adminUpdateProductReducer,
  adminPostProduct: adminPostProductReducer,
  adminDeleteProduct: adminDeleteProductReducer,
  cart: cartReducer,
  postCart: postCartReducer,
  updateCart: updateCartReducer,
  deleteCart: deleteCartReducer,
  //users
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdateDetails: userUpdateDetailsReducer,
  allUsersDetails: allUsersDetailsReducer,
  adminUpdateUser: adminUpdateUserReducer,
  adminDeleteUser: adminDeleteUserReducer,
  adminPostUser: adminPostUserReducer,
  //orders
  order: orderReducers,
  orderDetails: orderDetailsReducers,
  postOrder: postOrderReducers,
  payOrder: payOrderReducer,
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
