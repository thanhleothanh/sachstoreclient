import React from 'react';
import { Row, Col, ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './../components/Message';

const OrderSummary = () => {
  const { loading, error, cartItems } = useSelector((state) => state.cart);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        cartItems && (
          <>
            <h4>Đơn hàng của bạn</h4>
            <ListGroup className='mt-3'>
              {cartItems.map((item) => (
                <ListGroupItem key={item.sachid}>
                  <Row className='align-items-center'>
                    <Col md={2}>
                      <Image
                        src={item.hinhanh}
                        alt='product-image'
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={5}>{item.tensach}</Col>
                    <Col>
                      {item.soluong} *{' '}
                      {item.giasach.toLocaleString('vi', {
                        style: 'currency',
                        currency: 'VND',
                      })}{' '}
                      ={' '}
                      {(item.giasach * item.soluong).toLocaleString('vi', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          </>
        )
      )}
    </>
  );
};

export default OrderSummary;
