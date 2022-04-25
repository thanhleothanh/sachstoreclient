import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserDetails } from './../actions/userActions';
import AllOrdersFromUser from './../components/AllOrdersFromUser';

const ProfileScreen = ({ history }) => {
  const [hoten, setHoten] = useState('');
  const [diachi, setDiachi] = useState('');
  const [sodienthoai, setSodienthoai] = useState('');
  const [email, setEmail] = useState('');
  const [matkhau, setMatkhau] = useState('');
  const [matkhaumoi, setMatkhaumoi] = useState('');

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) {
      history.push('/login?redirect=profile');
    } else {
      setHoten(userInfo.hoten);
      setDiachi(userInfo.diachi);
      setSodienthoai(userInfo.sodienthoai);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserDetails({ hoten, diachi, sodienthoai, email }));
    setTimeout(() => window.location.reload(), 1000);
  };

  return (
    <>
      <Row>
        <Col md={3}>
          <Row>
            <h3>Thông tin tài khoản</h3>
          </Row>
          <Row>
            <Form onSubmit={updateHandler}>
              <Form.Group controlId='email'>
                <Form.Label>Họ tên</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Nhap ho ten moi'
                  value={hoten}
                  onChange={(e) => setHoten(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='hoten'>
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Nhap dia chi moi'
                  value={diachi}
                  onChange={(e) => setDiachi(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='hoten'>
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Nhap so dien thoai moi'
                  value={sodienthoai}
                  onChange={(e) => setSodienthoai(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='hoten'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Nhap email moi'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button
                type='submit'
                className='mt-3 btn-block'
                variant='primary'
              >
                Cập nhật
              </Button>
            </Form>
          </Row>
          <Row className='py-5'>
            <h3>Thay đổi mật khẩu</h3>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                if (matkhau === userInfo.matkhau && matkhaumoi) {
                  dispatch(updateUserDetails({ matkhau: matkhaumoi }));
                  setTimeout(() => window.location.reload(), 1000);
                }
              }}
            >
              <Form.Group controlId='matkhau'>
                <Form.Label>Mật khẩu hiện tại</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Mật khẩu hiện tại'
                  value={matkhau}
                  onChange={(e) => setMatkhau(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='matkhaumoi'>
                <Form.Label>Mật khẩu mới</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Mật khẩu mới'
                  value={matkhaumoi}
                  onChange={(e) => setMatkhaumoi(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button
                type='submit'
                className='mt-3 btn-block'
                variant='primary'
              >
                Cập nhật mật khẩu
              </Button>
            </Form>
          </Row>
        </Col>
        <Col md={9}>
          <h3>Các đơn hàng</h3>
          <AllOrdersFromUser />
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
