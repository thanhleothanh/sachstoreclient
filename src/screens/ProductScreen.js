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
import notify from '../utils/notify';

const ProductScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );

  const {
    loading: loadingPostCart,
    success: successPostCart,
    error: errorPostCart,
  } = useSelector((state) => state.postCart);
  useEffect(() => {
    if (!loadingPostCart && (successPostCart || errorPostCart)) {
      if (successPostCart)
        notify(false, 'Thêm sản phẩm vào giỏ hàng thành công!');
      else notify(true, errorPostCart);

      dispatch({
        type: 'CART_ADD_ITEM_RESET',
      });
    }
  }, [loadingPostCart]);

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
                <ListGroup variant='flush'>
                  <ListGroupItem>
                    <h3>{product.tensach}</h3>
                  </ListGroupItem>
                  <ListGroupItem>{product.mota}</ListGroupItem>
                </ListGroup>
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
                        type='button'
                        disabled={product.soluong === 0}
                      >
                        Thêm vào giỏ hàng
                      </Button>
                    </ListGroupItem>
                  </ListGroup>
                </Card>
              </Col>
              <Col md={6}>
                <div className='d-flex flex-column'>
                  <Image src={product.hinhanh} alt='product-image' fluid />
                </div>
              </Col>
            </Row>
          </>
        )
      )}
    </>
  );
};

export default ProductScreen;
