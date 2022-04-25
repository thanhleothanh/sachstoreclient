import React, { useEffect } from 'react';
import { Row, Col, ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder, getOrderDetails } from './../actions/orderActions';
import Loader from './../components/Loader';
import Message from './../components/Message';

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
    }
  }, [userInfo]);

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
                    <p className='mt-3'>Họ tên: {order.donhanghoten}</p>
                    <p>Email: {order.donhangemail || 'N/A'}</p>
                    <p>Địa chỉ: {order.donhangdiachi}</p>
                    {!order.donhangishoanthanh ? (
                      <Message>Đơn hàng này chưa được hoàn thành</Message>
                    ) : (
                      <Message variant='success'>
                        Đơn hàng đã hoàn thành
                      </Message>
                    )}
                  </ListGroupItem>
                  <ListGroupItem>
                    <h4>Phương thức thanh toán</h4>
                    {!order.donhangisthanhtoan || !order.thoigianthanhtoan ? (
                      <Message variant='danger'>
                        Đơn hàng chưa được thanh toán!
                      </Message>
                    ) : (
                      <Message variant='success'>
                        Paid on:{' '}
                        {order.thoigianthanhtoan
                          ? order.thoigianthanhtoan.substring(0, 10)
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
