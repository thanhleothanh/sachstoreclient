import React, { useState, useEffect } from 'react';
import {
  Modal,
  Image,
  OverlayTrigger,
  Table,
  Tooltip,
  Button,
  Form,
  Row,
  Col,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from './../components/Message';
import Loader from '../components/Loader';
import {
  listProducts,
  adminUpdateProduct,
  adminDeleteProduct,
  adminPostProduct,
  postProductAuthor,
  postProductCategory,
  postProductPublisher,
  getProductAuthors,
  getProductCategories,
  getProductPublishers,
} from './../actions/productActions';

const ADMINProducts = ({ history }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, products, error } = useSelector(
    (state) => state.productList
  );
  const {
    loading: loadingAuthors,
    authors,
    error: errorAuthors,
  } = useSelector((state) => state.getAuthors);
  const {
    loading: loadingPublishers,
    publishers,
    error: errorPublishers,
  } = useSelector((state) => state.getPublishers);
  const {
    loading: loadingCategories,
    categories,
    error: errorCategories,
  } = useSelector((state) => state.getCategories);

  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showCreate, setShowCreate] = useState(false);
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  //update details
  const [productId, setProductId] = useState('');
  const [name, setName] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');

  const [tensach, setTensach] = useState('');
  const [hinhanh, setHinhanh] = useState('');
  const [soluong, setSoluong] = useState('');
  const [giasach, setGiasach] = useState('');
  const [tacgia, setTacgia] = useState(1);
  const [nhaxuatban, setNhaxuatban] = useState(1);
  const [theloai, setTheloai] = useState(1);

  //tacgia nhaxuatban theloai
  const [tacgiaCreate, setTacgiaCreate] = useState('');
  const [nhaxuatbanCreate, setNhaxuatbanCreate] = useState('');
  const [theloaiCreate, setTheloaiCreate] = useState('');

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else if (userInfo.vaitro !== 'nhanvien') {
      history.push('/');
    }
    dispatch(listProducts());
    dispatch(getProductAuthors());
    dispatch(getProductPublishers());
    dispatch(getProductCategories());
  }, [userInfo]);

  /////// UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE
  const updateHandler = (productId) => {
    const product = products.find((e) => e.id === productId);
    setName(product.tensach);
    setStock(product.soluong);
    setPrice(product.giasach);
    setProductId(productId);

    handleShow();
  };
  const actualUpdateHandler = (e) => {
    e.preventDefault();
    dispatch(
      adminUpdateProduct(productId, {
        tensach: name,
        soluong: stock === '0' ? 0 : stock * 1,
        giasach: price * 1,
      })
    );
    setTimeout(() => {
      dispatch(listProducts());
    }, 500);

    handleClose();
  };
  const deleteHandler = (productId) => {
    if (window.confirm('Bạn có chắc không?')) {
      dispatch(adminDeleteProduct(productId));
      setTimeout(() => {
        dispatch(listProducts());
      }, 500);
    }
  };

  //modal modal modal modal modal modal modal
  const renderUpdateModal = () => {
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
            <Modal.Title>Cập nhật sản phẩm {productId}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId='name'>
                <Form.Label>Tên sách</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Nhập name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete='off'
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='stock'>
                <Form.Label>Số lượng</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Nhập new stock'
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  autoComplete='off'
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='price'>
                <Form.Label>Giá sách</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Nhập price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  autoComplete='off'
                ></Form.Control>
              </Form.Group>
              <Button
                variant='dark'
                className='mt-3'
                type='submit'
                onClick={(e) => actualUpdateHandler(e)}
              >
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

  // CREATE CREATE
  const createHandler = () => {
    handleShowCreate();
  };
  const actualCreateHandler = (e) => {
    e.preventDefault();
    console.log({
      tensach: tensach,
      soluong: parseInt(soluong),
      giasach: parseFloat(giasach),
      hinhanh: hinhanh,
      api_nguoidung_id: parseInt(userInfo.id),
      api_tacgia: parseInt(tacgia),
      api_nhaxuatban: parseInt(nhaxuatban),
      api_theloai: parseInt(theloai),
    });
    dispatch(
      adminPostProduct({
        tensach: tensach,
        soluong: parseInt(soluong),
        giasach: parseFloat(giasach),
        hinhanh: hinhanh,
        api_nguoidung_id: parseInt(userInfo.id),
        api_tacgia: parseInt(tacgia),
        api_nhaxuatban: parseInt(nhaxuatban),
        api_theloai: parseInt(theloai),
      })
    );
    setTensach('');
    setSoluong('');
    setGiasach('');
    setHinhanh('');
    setTacgia(1);
    setNhaxuatban(1);
    setTheloai(1);
    setTimeout(() => {
      dispatch(listProducts());
    }, 500);
    handleCloseCreate();
  };

  //modal modal modal
  const renderCreateModal = () => {
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
            {!loadingAuthors &&
              !loadingCategories &&
              !loadingPublishers &&
              !errorAuthors &&
              !errorCategories &&
              !errorPublishers &&
              authors &&
              categories &&
              publishers && (
                <Modal.Body>
                  <Form onSubmit={actualCreateHandler}>
                    <Form.Group controlId='nameCreate'>
                      <Form.Label>Tên sách</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Name'
                        autoComplete='off'
                        value={tensach}
                        onChange={(e) => setTensach(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='imgCreate'>
                      <Form.Label>Hình ảnh</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Hình ảnh'
                        autoComplete='off'
                        value={hinhanh}
                        onChange={(e) => setHinhanh(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='stockCreate'>
                      <Form.Label>Số lượng</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Số lượng stock'
                        autoComplete='off'
                        value={soluong}
                        onChange={(e) => setSoluong(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='priceCreate'>
                      <Form.Label>Giá sách</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Giá sách'
                        autoComplete='off'
                        value={giasach}
                        onChange={(e) => setGiasach(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId='authorChoose'>
                          <Form.Label>Chọn tác giả</Form.Label>
                          <Form.Control
                            as='select'
                            onChange={(e) => {
                              setTacgia(e.target.value);
                            }}
                          >
                            <option>--Chọn--</option>
                            {!loadingAuthors &&
                              !errorAuthors &&
                              authors &&
                              authors.map((item, i) => (
                                <option value={`${item.id}`}>
                                  {item.tentacgia}
                                </option>
                              ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId='authorCreate'>
                          <Form.Label>Thêm tác giả</Form.Label>
                          <Button
                            className=''
                            variant='primary'
                            onClick={(e) => postAuthorHandler(e)}
                          >
                            <i className='fas fa-plus ml-5' />
                          </Button>
                          <Form.Control
                            type='text'
                            placeholder='Thêm tác giả'
                            autoComplete='off'
                            value={tacgiaCreate}
                            onChange={(e) => setTacgiaCreate(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId='publisherChoose'>
                          <Form.Label>Chọn nhà xuất bản</Form.Label>
                          <Form.Control
                            as='select'
                            onChange={(e) => setNhaxuatban(e.target.value)}
                          >
                            <option>--Chọn--</option>
                            {!loadingPublishers &&
                              !errorPublishers &&
                              publishers &&
                              publishers.map((item, i) => (
                                <option value={`${item.id}`}>
                                  {item.tennhaxuatban}
                                </option>
                              ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId='publisherCreate'>
                          <Form.Label>Thêm nhà xuất bản</Form.Label>
                          <Button
                            className=''
                            variant='primary'
                            onClick={(e) => postPublisherHandler(e)}
                          >
                            <i className='fas fa-plus ml-5' />
                          </Button>
                          <Form.Control
                            type='text'
                            placeholder='Thêm nhà xuất bản'
                            autoComplete='off'
                            value={nhaxuatbanCreate}
                            onChange={(e) =>
                              setNhaxuatbanCreate(e.target.value)
                            }
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId='categoryChoose'>
                          <Form.Label>Chọn thể loại</Form.Label>
                          <Form.Control
                            as='select'
                            onChange={(e) => setTheloai(e.target.value)}
                          >
                            <option>--Chọn--</option>
                            {!loadingCategories &&
                              !errorCategories &&
                              categories &&
                              categories.map((item, i) => (
                                <option value={`${item.id}`}>
                                  {item.tentheloai}
                                </option>
                              ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId='categoryCreate'>
                          <Form.Label>Thêm thể loại</Form.Label>
                          <Button
                            className=''
                            variant='primary'
                            onClick={(e) => postCategoryHandler(e)}
                          >
                            <i className='fas fa-plus ml-5' />
                          </Button>
                          <Form.Control
                            type='text'
                            placeholder='Thêm thể loại'
                            autoComplete='off'
                            value={theloaiCreate}
                            onChange={(e) => setTheloaiCreate(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      variant='dark'
                      className='mt-3'
                      type='submit'
                      onClick={(e) => actualCreateHandler(e)}
                    >
                      Thêm sách
                    </Button>
                  </Form>
                </Modal.Body>
              )}
          </div>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => handleCloseCreate()}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  const postAuthorHandler = (e) => {
    e.preventDefault();
    if (tacgiaCreate)
      dispatch(
        postProductAuthor({
          tentacgia: tacgiaCreate,
        })
      );
    setTimeout(() => {
      dispatch(getProductAuthors());
    }, 500);
    setTacgiaCreate('');
  };
  const postCategoryHandler = (e) => {
    e.preventDefault();
    if (theloaiCreate)
      dispatch(
        postProductCategory({
          tentheloai: theloaiCreate,
        })
      );

    setTimeout(() => {
      dispatch(getProductCategories());
    }, 500);
    setTheloaiCreate('');
  };
  const postPublisherHandler = (e) => {
    e.preventDefault();
    if (nhaxuatbanCreate)
      dispatch(
        postProductPublisher({
          tennhaxuatban: nhaxuatbanCreate,
        })
      );
    setTimeout(() => {
      dispatch(getProductPublishers());
    }, 500);
    setNhaxuatbanCreate('');
  };

  return (
    <>
      <>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        {!loading && (
          <>
            <Row>
              <Col>
                <h2>Tất cả sản phẩm</h2>
              </Col>
              <Col className='text-right'>
                <Button variant='dark' onClick={createHandler}>
                  Thêm sản phẩm mới
                </Button>
              </Col>
            </Row>
            <h5>Tổng cộng: {products.length} Sản phẩm </h5>
            <Table hover striped>
              <thead>
                <tr>
                  <th>Sách</th>
                  <th>ID</th>
                  <th>Tên sách</th>
                  <th>Số lượng</th>
                  <th>Giá sách</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className='col-md-2 flex-column'>
                      <Image src={product.hinhanh} fluid rounded />
                    </td>
                    <td>{product.id}</td>
                    <td>{product.tensach}</td>
                    <td>
                      {product.soluong === 0 ? 'Hết hàng' : product.soluong}
                    </td>
                    <td>
                      {product.giasach.toLocaleString('vi', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </td>
                    <td>
                      <OverlayTrigger
                        placement='right'
                        delay={{ show: 250, hide: 250 }}
                        overlay={renderUpdate}
                      >
                        <i
                          className='fas fa-edit fa-2x'
                          onClick={() => updateHandler(product.id)}
                        />
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement='right'
                        delay={{ show: 250, hide: 250 }}
                        overlay={renderDelete}
                      >
                        <i
                          className='fas fa-ban fa-2x'
                          onClick={() => deleteHandler(product.id)}
                        />
                      </OverlayTrigger>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {renderUpdateModal()}
            {renderCreateModal()}
          </>
        )}
      </>
    </>
  );
};

export default ADMINProducts;

const renderUpdate = (props) => (
  <Tooltip id='button-tooltip' {...props}>
    Update
  </Tooltip>
);

const renderDelete = (props) => (
  <Tooltip id='button-tooltip' {...props}>
    Delete
  </Tooltip>
);
