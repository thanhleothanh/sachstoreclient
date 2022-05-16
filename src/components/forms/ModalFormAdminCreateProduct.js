import React from 'react';
import { Row, Modal, Button, Form, Col } from 'react-bootstrap';
import Loader2 from '../Loader2';

const ModalFormAdminCreateProduct = ({
  showCreate,
  handleCloseCreate,
  actualCreateHandler,
  validatedCreate,
  postAuthorHandler,
  postCategoryHandler,
  postPublisherHandler,
  authors,
  categories,
  publishers,
  tensach,
  setTensach,
  hinhanh,
  setHinhanh,
  soluong,
  setSoluong,
  giasach,
  setGiasach,
  setTacgia,
  setNhaxuatban,
  setTheloai,
  tacgiaCreate,
  setTacgiaCreate,
  nhaxuatbanCreate,
  setNhaxuatbanCreate,
  theloaiCreate,
  setTheloaiCreate,
  loadingAuthors,
  loadingCategories,
  loadingPublishers,
  errorAuthors,
  errorCategories,
  errorPublishers,
}) => {
  return (
    <>
      <Modal
        show={showCreate}
        onHide={handleCloseCreate}
        backdrop='static'
        keyboard={false}
        centered
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm sách mới</Modal.Title>
        </Modal.Header>
        <div>
          <Modal.Body>
            <Form
              noValidate
              validated={validatedCreate}
              onSubmit={actualCreateHandler}
            >
              <Form.Group controlId='nameCreate'>
                <Form.Label>Tên sách</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Tên sách'
                  required
                  autoComplete='off'
                  value={tensach}
                  onChange={(e) => setTensach(e.target.value)}
                ></Form.Control>
                <Form.Control.Feedback type='invalid'>
                  Không được để trống!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId='imgCreate'>
                <Form.Label>Hình ảnh</Form.Label>
                <Row>
                  <Col xl={9}>
                    <Form.Control
                      style={{ resize: 'none' }}
                      type='text'
                      as='textarea'
                      rows={4}
                      placeholder='Hình ảnh (dùng image url)'
                      autoComplete='off'
                      required
                      value={hinhanh}
                      onChange={(e) => setHinhanh(e.target.value)}
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                      Không được để trống!
                    </Form.Control.Feedback>
                  </Col>
                  <Col xl={3}>
                    <div style={{ display: 'flex' }}>
                      <img
                        style={{
                          objectFit: 'cover',
                          height: '125px',
                          width: '170px',
                        }}
                        src={
                          hinhanh ||
                          'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png'
                        }
                      />
                    </div>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId='stockCreate'>
                <Form.Label>Số lượng</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Số lượng stock'
                  required
                  autoComplete='off'
                  value={soluong}
                  onChange={(e) => setSoluong(e.target.value)}
                ></Form.Control>
                <Form.Control.Feedback type='invalid'>
                  Không được để trống!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId='priceCreate'>
                <Form.Label>Giá sách</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Giá sách'
                  required
                  autoComplete='off'
                  value={giasach}
                  onChange={(e) => setGiasach(e.target.value)}
                ></Form.Control>
                <Form.Control.Feedback type='invalid'>
                  Không được để trống!
                </Form.Control.Feedback>
              </Form.Group>
              <Row>
                {loadingAuthors || loadingCategories || loadingPublishers ? (
                  <Loader2 />
                ) : (
                  <Col md={6}>
                    <Row>
                      <Form.Group controlId='authorChoose'>
                        <Form.Label className='mt-2'>Chọn tác giả</Form.Label>
                        <Form.Control
                          as='select'
                          onChange={(e) => {
                            setTacgia(e.target.value);
                          }}
                        >
                          <option value={null}>--Chọn--</option>
                          {!loadingAuthors &&
                            !errorAuthors &&
                            authors &&
                            authors.map((item, i) => (
                              <option value={`${item.id}`}>
                                {item.tentacgia}
                              </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type='valid'>
                          Có thể để trống
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group controlId='publisherChoose'>
                        <Form.Label className='mt-2'>
                          Chọn nhà xuất bản
                        </Form.Label>
                        <Form.Control
                          as='select'
                          required
                          onChange={(e) => setNhaxuatban(e.target.value)}
                        >
                          <option value={null}>--Chọn--</option>
                          {!loadingPublishers &&
                            !errorPublishers &&
                            publishers &&
                            publishers.map((item, i) => (
                              <option value={`${item.id}`}>
                                {item.tennhaxuatban}
                              </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type='valid'>
                          Có thể để trống
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group controlId='categoryChoose'>
                        <Form.Label className='mt-2'>Chọn thể loại</Form.Label>
                        <Form.Control
                          as='select'
                          required
                          onChange={(e) => setTheloai(e.target.value)}
                        >
                          <option value={null}>--Chọn--</option>
                          {!loadingCategories &&
                            !errorCategories &&
                            categories &&
                            categories.map((item, i) => (
                              <option value={`${item.id}`}>
                                {item.tentheloai}
                              </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type='valid'>
                          Có thể để trống
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                  </Col>
                )}
                <Col md={6}>
                  <Row>
                    <Form noValidate>
                      <Form.Group controlId='authorCreate'>
                        <Form.Label className='mt-2'>Thêm tác giả</Form.Label>
                        <div style={{ display: 'flex' }}>
                          <Form.Control
                            type='text'
                            placeholder='Thêm tác giả'
                            autoComplete='off'
                            value={tacgiaCreate}
                            onChange={(e) => setTacgiaCreate(e.target.value)}
                          ></Form.Control>
                          <Button
                            variant='secondary'
                            onClick={(e) => postAuthorHandler(e)}
                          >
                            <i className='fas fa-plus ' />
                          </Button>
                        </div>
                      </Form.Group>
                    </Form>
                  </Row>
                  <Row>
                    <Form noValidate>
                      <Form.Group controlId='publisherCreate'>
                        <Form.Label className='mt-2'>
                          Thêm nhà xuất bản
                        </Form.Label>
                        <div style={{ display: 'flex' }}>
                          <Form.Control
                            type='text'
                            placeholder='Thêm nhà xuất bản'
                            autoComplete='off'
                            value={nhaxuatbanCreate}
                            onChange={(e) =>
                              setNhaxuatbanCreate(e.target.value)
                            }
                          ></Form.Control>
                          <Button
                            variant='secondary'
                            onClick={(e) => postPublisherHandler(e)}
                          >
                            <i className='fas fa-plus ' />
                          </Button>
                        </div>
                      </Form.Group>
                    </Form>
                  </Row>
                  <Row>
                    <Form noValidate>
                      <Form.Group controlId='authorCreate'>
                        <Form.Label className='mt-2'>Thêm Thể loại</Form.Label>
                        <div style={{ display: 'flex' }}>
                          <Form.Control
                            type='text'
                            placeholder='Thêm Thể loại'
                            autoComplete='off'
                            value={theloaiCreate}
                            onChange={(e) => setTheloaiCreate(e.target.value)}
                          ></Form.Control>
                          <Button
                            variant='secondary'
                            onClick={(e) => postCategoryHandler(e)}
                          >
                            <i className='fas fa-plus ' />
                          </Button>
                        </div>
                      </Form.Group>
                    </Form>
                  </Row>
                </Col>
              </Row>
              <Button variant='dark' className='mt-3' type='submit'>
                Thêm sách
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

export default ModalFormAdminCreateProduct;
