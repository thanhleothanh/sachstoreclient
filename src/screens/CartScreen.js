import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import notify from '../utils/notify';
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Image,
  Button,
  Card,
  FormControl,
} from 'react-bootstrap';
import Message from './../components/Message';
import {
  deleteCartItem,
  listCartItems,
  updateCartItem,
} from './../actions/cartActions';
import Loader from '../components/Loader';

const CartScreen = ({ history }) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCartItems());
  }, []);

  const {
    loading: loadingUpdateCart,
    success: successUpdateCart,
    error: errorUpdateCart,
  } = useSelector((state) => state.updateCart);
  useEffect(() => {
    if (!loadingUpdateCart && (successUpdateCart || errorUpdateCart)) {
      if (successUpdateCart)
        notify(false, 'Cập nhật số lượng sản phẩm trong giỏ thành công!');
      else notify(true, errorUpdateCart);
      dispatch({
        type: 'CART_UPDATE_ITEM_RESET',
      });
    }
  }, [loadingUpdateCart]);

  const {
    loading: loadingDeleteCart,
    success: successDeleteCart,
    error: errorDeleteCart,
  } = useSelector((state) => state.deleteCart);
  useEffect(() => {
    if (!loadingDeleteCart && (successDeleteCart || errorDeleteCart)) {
      if (successDeleteCart)
        notify(false, 'Xoá sản phẩm khỏi giỏ hàng thành công!');
      else notify(true, errorDeleteCart);
      dispatch({
        type: 'CART_DELETE_ITEM_RESET',
      });
    }
  }, [loadingDeleteCart]);

  useEffect(() => {
    if (
      errorDeleteCart ||
      errorUpdateCart ||
      successDeleteCart ||
      successUpdateCart
    )
      dispatch(listCartItems());
  }, [errorDeleteCart, errorUpdateCart, successDeleteCart, successUpdateCart]);

  const updateCartItemHandler = (sachid, soluongmoi) => {
    dispatch(updateCartItem(sachid, soluongmoi));
  };
  const deleteCartItemHandler = (sachid) => {
    if (
      window.confirm('Bạn có chắc chắn muốn xoá sản phẩm này khỏi giỏ hàng!')
    ) {
      dispatch(deleteCartItem(sachid));
    }
  };
  const checkoutHandler = () => {
    history.push('/placeorder');
  };

  return (
    <>
      {!userInfo && (
        <>
          <Message>
            {'Bạn cần phải '}
            <Link to='/login'>đăng nhập</Link>
            {' trước!'}
          </Message>
        </>
      )}
      {userInfo &&
        (loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          cartItems && (
            <>
              {(loadingDeleteCart || loadingUpdateCart) && <Loader />}
              <Row>
                <Col md={4}>
                  <h2>Giỏ hàng của bạn</h2>
                  <Card>
                    <ListGroup variant='flush'>
                      <ListGroupItem>
                        <h4>
                          Tổng cộng: (
                          {cartItems.reduce(
                            (acc, item) => acc + item.soluong,
                            0
                          )}
                          ) Sản phẩm
                        </h4>
                      </ListGroupItem>
                      <ListGroupItem>
                        <strong>Tổng tiền: </strong>
                        {cartItems
                          .reduce((acc, item) => acc + item.tongtien, 0)
                          .toLocaleString('vi', {
                            style: 'currency',
                            currency: 'VND',
                          })}
                      </ListGroupItem>
                      <ListGroupItem>
                        <Button
                          type='button'
                          className='btn-block'
                          disabled={
                            cartItems.length === 0 ||
                            cartItems.reduce((acc, item) => acc + item.qty, 0) *
                              1 ===
                              0
                          }
                          onClick={() => checkoutHandler()}
                        >
                          Đặt hàng
                        </Button>
                      </ListGroupItem>
                    </ListGroup>
                  </Card>
                  {cartItems.length !== 0 && (
                    <Link to='/'>
                      <Button className='btn mt-3' block>
                        <strong>Tiếp tục mua sắm</strong>
                      </Button>
                    </Link>
                  )}
                </Col>
                <Col md={8}>
                  {cartItems && cartItems.length === 0 ? (
                    <Message>
                      {'Không có sản phẩm nào trong giỏ hàng!'}
                      <Link to='/'> Quay lại mua hàng!</Link>
                    </Message>
                  ) : (
                    <ListGroup variant='flush'>
                      {cartItems.map((item) => (
                        <ListGroupItem key={item.sachid}>
                          <Row>
                            <Col md={2}>
                              <Image
                                src={item.hinhanh}
                                alt='product-image'
                                fluid
                                rounded
                              />
                            </Col>
                            <Col md={4}>
                              <Link to={`/product/${item.sachid}`}>
                                {item.tensach}
                              </Link>
                            </Col>
                            <Col md={2}>
                              {item.giasach.toLocaleString('vi', {
                                style: 'currency',
                                currency: 'VND',
                              })}
                            </Col>

                            <Col md={2}>
                              {item.soluongStock === 0 ? (
                                <span>Hết hàng</span>
                              ) : (
                                <FormControl
                                  size='sm'
                                  as='select'
                                  value={item.soluong}
                                  onChange={(e) =>
                                    updateCartItemHandler(
                                      item.sachid,
                                      Number(e.target.value)
                                    )
                                  }
                                >
                                  {[...Array(item.soluongStock).keys()].map(
                                    (x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    )
                                  )}
                                </FormControl>
                              )}
                            </Col>
                            <Col md={2}>
                              <Button
                                type='btn'
                                variant='dark'
                                onClick={(e) =>
                                  deleteCartItemHandler(item.sachid)
                                }
                              >
                                <i className='fas fa-trash' />
                              </Button>
                            </Col>
                          </Row>
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  )}
                </Col>
              </Row>
            </>
          )
        ))}
    </>
  );
};

export default CartScreen;
