import React from 'react';
import { Row, Modal, Button, Form } from 'react-bootstrap';

const ModalFormAdminCreateUser = ({
  showCreate,
  handleCloseCreate,
  actualCreateHandler,
  taikhoan,
  setTaikhoan,
  matkhau,
  setMatkhau,
  hoten,
  setHoten,
  email,
  setEmail,
  sodienthoai,
  setSodienthoai,
  diachi,
  setDiachi,
  setVaitro,
  validatedCreate,
}) => {
  return (
    <>
      <Modal
        show={showCreate}
        onHide={handleCloseCreate}
        backdrop='static'
        keyboard={false}
        centered
        size='md'
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm tài khoản mới</Modal.Title>
        </Modal.Header>
        <div>
          <Modal.Body>
            <Form
              noValidate
              validated={validatedCreate}
              onSubmit={actualCreateHandler}
            >
              <Form.Group controlId='nameCreate'>
                <Form.Label>Tên tài khoản</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Tài khoản'
                  required
                  value={taikhoan}
                  onChange={(e) => setTaikhoan(e.target.value)}
                  autoComplete='off'
                ></Form.Control>
                <Form.Control.Feedback type='invalid'>
                  Không được để trống!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId='passwordCreate'>
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Mật khẩu'
                  required
                  value={matkhau}
                  onChange={(e) => setMatkhau(e.target.value)}
                  autoComplete='off'
                ></Form.Control>
                <Form.Control.Feedback type='invalid'>
                  Không được để trống!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId='imgCreate'>
                <Form.Label>Họ tên</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Họ tên'
                  required
                  value={hoten}
                  onChange={(e) => setHoten(e.target.value)}
                  autoComplete='off'
                ></Form.Control>
                <Form.Control.Feedback type='invalid'>
                  Không được để trống!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId='stockCreate'>
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type='text'
                  maxLength={11}
                  placeholder='Số điện thoại'
                  value={sodienthoai}
                  onChange={(e) => setSodienthoai(e.target.value)}
                  autoComplete='off'
                ></Form.Control>
                <Form.Control.Feedback>Có thể để trống!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId='stockCreate'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete='off'
                ></Form.Control>
                <Form.Control.Feedback>Có thể để trống!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId='stockCreate'>
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Địa chỉ'
                  value={diachi}
                  onChange={(e) => setDiachi(e.target.value)}
                  autoComplete='off'
                ></Form.Control>
                <Form.Control.Feedback>Có thể để trống!</Form.Control.Feedback>
              </Form.Group>
              <Row>
                <Form.Group controlId='authorChoose'>
                  <Form.Label>Chọn vai trò</Form.Label>
                  <Form.Control
                    as='select'
                    required
                    onChange={(e) => {
                      setVaitro(e.target.value);
                    }}
                  >
                    <option>--Chọn--</option>
                    <option value='khachhang'>Khách hàng</option>
                    <option value='admin'>Admin</option>
                    <option value='nhanvien'>Nhân viên</option>
                  </Form.Control>
                  <Form.Control.Feedback>
                    Mặc định là Khách hàng
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Button variant='dark' className='mt-3' type='submit'>
                Thêm người dùng
              </Button>
            </Form>
          </Modal.Body>
        </div>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => handleCloseCreate()}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalFormAdminCreateUser;
