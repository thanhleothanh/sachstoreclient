import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalFormAdminUpdateUser = ({
  showUpdate,
  handleCloseUpdate,
  actualUpdateHandler,
  taikhoanUpdate,
  setTaikhoanUpdate,
  matkhauUpdate,
  setMatkhauUpdate,
  hotenUpdate,
  setHotenUpdate,
  emailUpdate,
  setEmailUpdate,
  sodienthoaiUpdate,
  setSodienthoaiUpdate,
  diachiUpdate,
  setDiachiUpdate,
}) => {
  return (
    <>
      <Modal
        show={showUpdate}
        onHide={handleCloseUpdate}
        backdrop='static'
        keyboard={false}
        centered
        size='md'
      >
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật tài khoản</Modal.Title>
        </Modal.Header>
        <div>
          <Modal.Body>
            <Form onSubmit={actualUpdateHandler}>
              <Form.Group controlId='nameUpdate'>
                <Form.Label>Tên tài khoản</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Tài khoản'
                  disabled
                  value={taikhoanUpdate}
                  onChange={(e) => setTaikhoanUpdate(e.target.value)}
                  autoComplete='off'
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='passwordUpdate'>
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Reset mật khẩu'
                  value={matkhauUpdate}
                  onChange={(e) => setMatkhauUpdate(e.target.value)}
                  autoComplete='off'
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='imgUpdate'>
                <Form.Label>Họ tên</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Họ tên'
                  value={hotenUpdate}
                  onChange={(e) => setHotenUpdate(e.target.value)}
                  autoComplete='off'
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='stockUpdate'>
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type='text'
                  maxLength={11}
                  placeholder='Số điện thoại'
                  value={sodienthoaiUpdate}
                  onChange={(e) => setSodienthoaiUpdate(e.target.value)}
                  autoComplete='off'
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='stockUpdate'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Email'
                  value={emailUpdate}
                  onChange={(e) => setEmailUpdate(e.target.value)}
                  autoComplete='off'
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='stockUpdate'>
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Địa chỉ'
                  value={diachiUpdate}
                  onChange={(e) => setDiachiUpdate(e.target.value)}
                  autoComplete='off'
                ></Form.Control>
              </Form.Group>
              <Button variant='dark' className='mt-3' type='submit'>
                Sửa người dùng
              </Button>
            </Form>
          </Modal.Body>
        </div>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => handleCloseUpdate()}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalFormAdminUpdateUser;
