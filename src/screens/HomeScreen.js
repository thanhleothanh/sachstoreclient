import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Col, Row } from 'react-bootstrap';
import Product from './../components/Product';
import { listProducts } from './../actions/productActions';
import Loader from './../components/Loader';
import Message from './../components/Message';

const HomeScreen = () => {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.productList
  );
  useEffect(() => {
    dispatch(listProducts());
    dispatch({ type: 'GET_ORDER_RESET' });
    dispatch({ type: 'GET_ORDER_DETAILS_RESET' });
  }, [dispatch]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='carousel/carousel2.png'
            alt='Second slide'
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='carousel/carousel3.jpg'
            alt='Third slide'
          />

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <h2 className='mt-5'>Sản phẩm mới nhất</h2>
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
