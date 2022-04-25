import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Product from './../components/Product';
import { listProducts } from './../actions/productActions';
import Loader from './../components/Loader';
import Message from './../components/Message';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(listProducts());
    dispatch({ type: 'GET_ORDER_RESET' });
    dispatch({ type: 'GET_ORDER_DETAILS_RESET' });
  }, [dispatch]);

  return (
    <>
      <h2>Sản phẩm mới nhất</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        products && (
          <Row>
            {products.map((product) => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
        )
      )}
    </>
  );
};

export default HomeScreen;
