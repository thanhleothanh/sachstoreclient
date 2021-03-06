import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
const SubtotalSummary = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const subtotal =
    cartItems &&
    cartItems.reduce((acc, item) => acc + item.tongtien, 0).toFixed(2) * 1;

  return (
    <>
      <Row className='mt-5 align-items-center'>
        <Col md={9}>
          <h6>Thuế:</h6>
        </Col>
        <Col md={3}>
          <h6>0 đ</h6>
        </Col>
      </Row>
      <Row className='mt-2 align-items-center'>
        <Col md={9}>
          <h6>Giá ship:</h6>
        </Col>
        <Col md={3}>
          <h6>0 đ</h6>
        </Col>
      </Row>
      <Row className='mt-2 align-items-center'>
        <Col md={9}>
          <h4>Tổng cộng:</h4>
        </Col>
        <Col md={3}>
          <h6>
            {subtotal &&
              subtotal.toLocaleString('vi', {
                style: 'currency',
                currency: 'VND',
              })}
          </h6>
        </Col>
      </Row>
    </>
  );
};

export default SubtotalSummary;
