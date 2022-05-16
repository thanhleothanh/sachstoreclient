import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const ModalFormAdminUpdateOrder = ({
  orderId,
  show,
  handleClose,
  actualUpdateHandler,
  address,
  setAddress,
  phone,
  setPhone,
  ishoanthanh,
  setIshoanthanh,
}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật cho đơn hàng: {orderId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => actualUpdateHandler(e)}>
            <Form.Group controlId='address'>
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type='text'
                placeholder='Nhập địa chỉ mới'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                autoComplete='off'
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='phone'>
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type='text'
                placeholder='Nhập số điện thoại mới'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete='off'
              ></Form.Control>
            </Form.Group>
            <Form.Group className='mt-3' controlId='ishoanthanh'>
              <Form.Label>Đã hoàn thành</Form.Label>
              <span>
                <i
                  className={` fa-2x mx-3 ${
                    ishoanthanh ? 'fas fa-check-circle' : 'fas fa-times-circle'
                  }`}
                  onClick={() => {
                    setIshoanthanh(!ishoanthanh);
                  }}
                />
              </span>
            </Form.Group>

            <Button variant='dark' className='mt-3' type='submit'>
              Cập nhật
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => handleClose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalFormAdminUpdateOrder;
