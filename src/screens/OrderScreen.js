import React, { useEffect } from 'react';
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Image,
  Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllOrders,
  getOrder,
  getOrderDetails,
  payOrder,
} from './../actions/orderActions';
import Loader from './../components/Loader';
import Message from './../components/Message';
import notify from '../utils/notify';

const OrderScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { order, loading, error } = useSelector((state) => state.order);
  const {
    orderDetails,
    loading: loadingDetails,
    error: errorDetails,
  } = useSelector((state) => state.orderDetails);
  const orderId = match.params.id;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(getOrder(orderId));
      dispatch(getOrderDetails(orderId));
      setTimeout(() => {
        dispatch({ type: 'CART_DELETE_ITEM_RESET' });
      }, 500);
    }
  }, [userInfo]);

  const {
    loading: loadingPayOrder,
    success: successPayOrder,
    error: errorPayOrder,
  } = useSelector((state) => state.payOrder);
  useEffect(() => {
    if (!loadingPayOrder && (successPayOrder || errorPayOrder)) {
      if (successPayOrder) notify(false, 'Thanh toán đơn hàng thành công!');
      else notify(true, errorPayOrder);
      dispatch({
        type: 'PAY_ORDER_RESET',
      });
    }
  }, [loadingPayOrder]);

  const payOrderHandler = () => {
    if (window.confirm('Bạn có xác nhận muốn thanh toán đơn hàng này!')) {
      dispatch(payOrder(orderId));
      setTimeout(() => {
        dispatch(getOrder(orderId));
        dispatch(getOrderDetails(orderId));
        dispatch(getAllOrders());
      }, 500);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        order && (
          <>
            <Row>
              <h2>Order ID: #{orderId}</h2>
            </Row>
            <Row>
              <Col md={8}>
                <ListGroup className='mt-3'>
                  <ListGroupItem>
                    <h4>Thông tin khách hàng</h4>
                    <Row className='mt-3 align-items-center'>
                      <Col>Họ tên: </Col>
                      <Col>{order.donhanghoten}</Col>
                    </Row>
                    <Row className='mt-3 align-items-center'>
                      <Col>Email: </Col>
                      <Col>{order.khachhangemail || 'N/A'}</Col>
                    </Row>
                    <Row className='mt-3 align-items-center'>
                      <Col>Địa chỉ: </Col>
                      <Col>{order.donhangdiachi}</Col>
                    </Row>
                    <Row className='mt-3 align-items-center'>
                      <Col>Số điện thoại: </Col>
                      <Col>{order.donhangsodienthoai}</Col>
                    </Row>
                    {!order.donhangishoanthanh ? (
                      <Message>Đơn hàng này chưa được hoàn thành</Message>
                    ) : (
                      <Message variant='success'>
                        Đơn hàng đã hoàn thành và được shipped tới bạn!
                      </Message>
                    )}
                  </ListGroupItem>
                  <ListGroupItem>
                    <h4>Phương thức thanh toán</h4>
                    {!order.donhangisthanhtoan || !order.thoigianthanhtoan ? (
                      <div>
                        <Message variant='danger'>
                          Đơn hàng chưa được thanh toán!
                        </Message>
                        <Button onClick={payOrderHandler}>
                          Thanh toán (giả lập quá trình thanh toán)
                        </Button>
                      </div>
                    ) : (
                      <Message variant='success'>
                        Đã thanh toán vào :{' '}
                        {order.thoigianthanhtoan
                          ? order.thoigianthanhtoan
                          : 'Đơn hàng chưa được thanh toán!'}
                      </Message>
                    )}
                  </ListGroupItem>
                  <ListGroupItem>
                    <h4>Các mặt hàng</h4>
                    <ListGroup variant='flush'>
                      {loadingDetails ? (
                        <Loader />
                      ) : errorDetails ? (
                        <Message>{errorDetails}</Message>
                      ) : orderDetails && orderDetails.length === 0 ? (
                        <Message>
                          Không có sản phẩm nào trong đơn hàng này!
                        </Message>
                      ) : (
                        orderDetails.map((item) => (
                          <Row
                            className='mt-3 align-items-center'
                            key={item.sachid}
                          >
                            <Col md={3}>
                              <Image
                                src={item.hinhanh}
                                alt='product-image'
                                fluid
                                rounded
                              />
                            </Col>
                            <Col md={5}>{item.tensachdadat}</Col>
                            <Col>
                              {item.soluongdadat} *{' '}
                              {item.giabandadat.toLocaleString('vi', {
                                style: 'currency',
                                currency: 'VND',
                              })}{' '}
                              ={' '}
                              {(
                                item.giabandadat * item.soluongdadat
                              ).toLocaleString('vi', {
                                style: 'currency',
                                currency: 'VND',
                              })}
                            </Col>
                          </Row>
                        ))
                      )}
                    </ListGroup>
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col md={4}>
                <ListGroup className='mt-3'>
                  <ListGroupItem>
                    <h4>Tổng kết đơn hàng</h4>
                    <Row className='mt-3 align-items-center'>
                      <Col>Tổng tiền:</Col>
                      <Col>
                        {order.donhangtongtien.toLocaleString('vi', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </Col>
                    </Row>
                    <Row className='mt-3 align-items-center'>
                      <Col>Giá ship:</Col>
                      <Col>0</Col>
                    </Row>
                    <Row className='mt-3 align-items-center'>
                      <Col>Giá thuế:</Col>
                      <Col>0</Col>
                    </Row>
                    <Row className='mt-3 align-items-center'>
                      <Col className='font-weight-bold'>Tổng tiền: </Col>
                      <Col className='font-weight-bold'>
                        {order.donhangtongtien.toLocaleString('vi', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
          </>
        )
      )}
    </>
  );
};

export default OrderScreen;
