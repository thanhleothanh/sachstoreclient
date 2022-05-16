import React from 'react';
import { Row, Col, Modal, Button, Form } from 'react-bootstrap';

const ModalFormAdminUpdateProduct = ({
  productId,
  showUpdate,
  handleCloseUpdate,
  actualUpdateHandler,
  nameUpdate,
  setNameUpdate,
  imageUpdate,
  setImageUpdate,
  stockUpdate,
  setStockUpdate,
  priceUpdate,
  setPriceUpdate,
}) => {
  return (
    <>
      <Modal
        show={showUpdate}
        onHide={handleCloseUpdate}
        backdrop='static'
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật sản phẩm {productId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={actualUpdateHandler}>
            <Form.Group controlId='imgUpdate'>
              <Form.Label>Hình ảnh</Form.Label>
              <Row>
                <Col xl={7}>
                  <Form.Control
                    style={{ resize: 'none' }}
                    type='text'
                    as='textarea'
                    rows={4}
                    placeholder='Hình ảnh (dùng image url)'
                    autoComplete='off'
                    required
                    value={imageUpdate}
                    onChange={(e) => setImageUpdate(e.target.value)}
                  ></Form.Control>
                  <Form.Control.Feedback type='invalid'>
                    Không được để trống!
                  </Form.Control.Feedback>
                </Col>
                <Col xl={5}>
                  <div style={{ display: 'flex' }}>
                    <img
                      style={{
                        objectFit: 'cover',
                        height: '125px',
                        width: '170px',
                      }}
                      src={
                        imageUpdate ||
                        'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png'
                      }
                    />
                  </div>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId='name'>
              <Form.Label>Tên sách</Form.Label>
              <Form.Control
                type='text'
                placeholder='Nhập name'
                value={nameUpdate}
                onChange={(e) => setNameUpdate(e.target.value)}
                autoComplete='off'
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='stock'>
              <Form.Label>Số lượng</Form.Label>
              <Form.Control
                type='text'
                placeholder='Nhập new stock'
                value={stockUpdate}
                onChange={(e) => setStockUpdate(e.target.value)}
                autoComplete='off'
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label>Giá sách</Form.Label>
              <Form.Control
                type='text'
                placeholder='Nhập price'
                value={priceUpdate}
                onChange={(e) => setPriceUpdate(e.target.value)}
                autoComplete='off'
              ></Form.Control>
            </Form.Group>
            <Button variant='dark' className='mt-3' type='submit'>
              Cập nhật
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => handleCloseUpdate()}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalFormAdminUpdateProduct;
