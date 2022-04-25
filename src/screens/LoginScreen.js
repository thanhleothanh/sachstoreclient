import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from './../components/Message';
import Loader from './../components/Loader';
import { login } from './../actions/userActions';
import FormContainer from './../components/FormContainer';

const LoginScreen = ({ location, history }) => {
  const [taikhoan, setTaikhoan] = useState('');
  const [matkhau, setMatkhau] = useState('');

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(taikhoan, matkhau));
  };

  return (
    <FormContainer>
      {redirect !== '/' && redirect && <Message>Bạn phải đăng nhập!</Message>}
      <h2>Đăng nhập</h2>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='taikhoan'>
          <Form.Label>Tài khoản</Form.Label>
          <Form.Control
            type='text'
            placeholder='Nhập tài khoản'
            value={taikhoan}
            onChange={(e) => setTaikhoan(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='matkhau'>
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type='password'
            placeholder='Nhập mật khẩu'
            value={matkhau}
            onChange={(e) => setMatkhau(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button className='mt-3' type='submit' variant='primary'>
          Đăng nhập
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Khách hàng mới?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Đăng ký ngay
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
