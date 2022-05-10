import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from './../components/Message';
import Loader from './../components/Loader';
import { register } from './../actions/userActions';
import FormContainer from './../components/FormContainer';

const RegisterScreen = ({ history, location }) => {
  const [validatedCreate, setValidatedCreate] = useState(false);
  const [taikhoan, setTaikhoan] = useState('');
  const [hoten, setHoten] = useState('');
  const [matkhau, setMatkhau] = useState('');

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      dispatch(
        register({
          taikhoan: taikhoan,
          hoten: hoten,
          matkhau: matkhau,
          vaitro: 'khachhang',
          diachi: '',
          sodienthoai: '',
          email: '',
        })
      );
    } else setValidatedCreate(true);
  };

  return (
    <FormContainer>
      <h2>Đăng ký</h2>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form noValidate validated={validatedCreate} onSubmit={submitHandler}>
        <Form.Group controlId='taikhoan'>
          <Form.Label>Tài khoản</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Nhập tài khoản mới'
            value={taikhoan}
            onChange={(e) => setTaikhoan(e.target.value)}
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
            Không được để trống!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='hoten'>
          <Form.Label>Họ tên</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Nhập họ tên'
            value={hoten}
            onChange={(e) => setHoten(e.target.value)}
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
            Không được để trống!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='matkhau'>
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type='password'
            required
            placeholder='Nhập mật khẩu'
            value={matkhau}
            onChange={(e) => setMatkhau(e.target.value)}
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
            Không được để trống!
          </Form.Control.Feedback>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Đăng ký
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Đã có tài khoản?
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            {' '}
            Đăng nhập!
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
