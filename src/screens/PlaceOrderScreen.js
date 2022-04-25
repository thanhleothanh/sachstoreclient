import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import OrderSummary from './../components/OrderSummary';
import SubtotalSummary from './../components/SubtotalSummary';
import { postOrder } from '../actions/orderActions';
import { deleteCartItem } from '../actions/cartActions';

const PlaceOrderScreen = ({ history }) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const { cartItems } = useSelector((state) => state.cart);
  const { order } = useSelector((state) => state.postOrder);
  const dispatch = useDispatch();
  const [hoten, setHoten] = useState(userInfo.hoten);
  const [diachi, setDiachi] = useState(userInfo.diachi);
  const [sodienthoai, setSodienthoai] = useState(userInfo.sodienthoai);
  const [email, setEmail] = useState(userInfo.email);

  const subtotal =
    cartItems &&
    cartItems.reduce((acc, item) => acc + item.tongtien, 0).toFixed(2) * 1;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login?redirect=placeorder');
    }
  }, [userInfo]);

  useEffect(() => {
    if (order) {
      cartItems.forEach((item) => {
        dispatch(deleteCartItem(item.sachid));
      });
      history.push(`/orders/${order.id}`);
    }
  }, [order]);

  const submitHandler = (e) => {
    console.log(hoten, diachi, sodienthoai, email);
    dispatch(
      postOrder({
        api_khachhang: userInfo.id,
        tongtien: Number(subtotal),
        diachi: diachi,
        hoten: hoten,
        sodienthoai: sodienthoai,
      })
    );
    e.preventDefault();
  };

  return (
    <>
      <Container className='justify-content-left'>
        <Row>
          <h2>Thông tin khách hàng</h2>
        </Row>
        {userInfo && (
          <Row className='my-4'>
            <Col xs={12} md={5}>
              <Form>
                <Form.Row>
                  <Form.Group as={Col} controlId='hoten'>
                    <Form.Label>Họ tên</Form.Label>
                    <Form.Control
                      size='sm'
                      type='text'
                      value={hoten}
                      onChange={(e) => setHoten(e.target.value)}
                      placeholder='Họ tên của bạn'
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId='diachi'>
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control
                      size='sm'
                      type='text'
                      value={diachi}
                      onChange={(e) => setDiachi(e.target.value)}
                      placeholder='Địa chỉ của bạn'
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId='sodienthoai'>
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                      size='sm'
                      type='text'
                      value={sodienthoai}
                      onChange={(e) => setSodienthoai(e.target.value)}
                      placeholder='Số điện thoại của bạn'
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      size='sm'
                      type='text'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Email của bạn'
                    />
                  </Form.Group>
                </Form.Row>

                <h6>{}</h6>
                <Button
                  variant='primary'
                  type='submit'
                  className='mt-3'
                  onClick={submitHandler}
                >
                  Đặt hàng
                </Button>
              </Form>
            </Col>
            <Col md={7} xs={12}>
              <OrderSummary />
              <SubtotalSummary />
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default PlaceOrderScreen;
