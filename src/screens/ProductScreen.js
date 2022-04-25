import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  FormControl,
} from 'react-bootstrap';
import { listProductDetails } from './../actions/productActions';
import Loader from './../components/Loader';
import Message from './../components/Message';
import { addCartItem } from '../actions/cartActions';

const ProductScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );

  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, []);

  const addToCartHandler = () => {
    dispatch(addCartItem(match.params.id, qty));
    setTimeout(() => {
      history.push('/cart');
    }, 500);
  };

  return (
    <>
      <Link className='btn py-3' to='/'>
        Trở lại
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        product && (
          <>
            <Row>
              <Col md={6}>
                <div className='d-flex flex-column'>
                  <Image src={product.hinhanh} alt='product-image' fluid />
                </div>
              </Col>
              <Col md={3}>
                <ListGroup variant='flush'>
                  <ListGroupItem>
                    <h3>{product.tensach}</h3>
                  </ListGroupItem>
                  <ListGroupItem>
                    Giá bán:{' '}
                    {product.giasach.toLocaleString('vi', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </ListGroupItem>
                  <ListGroupItem>{product.mota}</ListGroupItem>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroupItem>
                      <Row>
                        <Col>Giá bán:</Col>
                        <Col>
                          {product.giasach.toLocaleString('vi', {
                            style: 'currency',
                            currency: 'VND',
                          })}
                        </Col>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Row>
                        <Col>Tình trạng:</Col>
                        <Col>
                          {product.soluong > 0 ? 'Còn hàng' : 'Hết hàng'}
                        </Col>
                      </Row>
                    </ListGroupItem>

                    {product.soluong > 0 && (
                      <ListGroupItem>
                        <Row>
                          <Col>Số lượng còn lại:</Col>
                          <Col>
                            <FormControl
                              as='select'
                              value={qty}
                              onChange={(e) => {
                                setQty(e.target.value);
                              }}
                            >
                              {[...Array(product.soluong).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </FormControl>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    )}

                    <ListGroupItem>
                      <Button
                        onClick={addToCartHandler}
                        className='btn-block'
                        type='button'
                        disabled={product.soluong === 0}
                      >
                        Thêm vào giỏ hàng
                      </Button>
                    </ListGroupItem>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </>
        )
      )}
    </>
  );
};

export default ProductScreen;
