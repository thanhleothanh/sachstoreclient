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
import notify from '../utils/notify';

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
  const [showUpdate, setShowUpdate] = useState(false);
  const handleClose = () => setShowUpdate(false);
  const handleShow = () => setShowUpdate(true);
  const [showCreate, setShowCreate] = useState(false);
  const handleCloseCreate = () => {
    setShowCreate(false);
    setValidatedCreate(false);
  };
  const handleShowCreate = () => setShowCreate(true);

  //update details
  const [productId, setProductId] = useState('');
  const [imageUpdate, setImageUpdate] = useState('');
  const [nameUpdate, setNameUpdate] = useState('');
  const [stockUpdate, setStockUpdate] = useState('');
  const [priceUpdate, setPriceUpdate] = useState('');

  //create new sach
  const [validatedCreate, setValidatedCreate] = useState(false);
  const [tensach, setTensach] = useState('');
  const [hinhanh, setHinhanh] = useState('');
  const [soluong, setSoluong] = useState('');
  const [giasach, setGiasach] = useState('');
  const [tacgia, setTacgia] = useState(null);
  const [nhaxuatban, setNhaxuatban] = useState(null);
  const [theloai, setTheloai] = useState(null);
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

  //toastify
  //toastify
  //toastify

  const {
    loading: loadingAdminUpdateProduct,
    success: successAdminUpdateProduct,
    error: errorAdminUpdateProduct,
  } = useSelector((state) => state.adminUpdateProduct);
  useEffect(() => {
    if (
      !loadingAdminUpdateProduct &&
      (successAdminUpdateProduct || errorAdminUpdateProduct)
    ) {
      if (successAdminUpdateProduct)
        notify(false, 'Cập nhật sản phẩm thành công!');
      else notify(true, errorAdminUpdateProduct);
      dispatch({
        type: 'ADMIN_UPDATE_PRODUCT_RESET',
      });
    }
  }, [loadingAdminUpdateProduct]);

  const {
    loading: loadingAdminDeleteProduct,
    success: successAdminDeleteProduct,
    error: errorAdminDeleteProduct,
  } = useSelector((state) => state.adminDeleteProduct);
  useEffect(() => {
    if (
      !loadingAdminDeleteProduct &&
      (successAdminDeleteProduct || errorAdminDeleteProduct)
    ) {
      if (successAdminDeleteProduct) notify(false, 'Xoá sản phẩm thành công!');
      else notify(true, errorAdminDeleteProduct);
      dispatch({
        type: 'ADMIN_DELETE_PRODUCT_RESET',
      });
    }
  }, [loadingAdminDeleteProduct]);

  const {
    loading: loadingAdminPostProduct,
    success: successAdminPostProduct,
    error: errorAdminPostProduct,
  } = useSelector((state) => state.adminPostProduct);
  useEffect(() => {
    if (
      !loadingAdminPostProduct &&
      (successAdminPostProduct || errorAdminPostProduct)
    ) {
      if (successAdminPostProduct) notify(false, 'Thêm sản phẩm thành công!');
      else notify(true, errorAdminPostProduct);
      dispatch({
        type: 'ADMIN_POST_PRODUCT_RESET',
      });
    }
  }, [loadingAdminPostProduct]);

  const {
    loading: loadingPostCategories,
    success: successPostCategories,
    error: errorPostCategories,
  } = useSelector((state) => state.postCategories);
  useEffect(() => {
    if (
      !loadingPostCategories &&
      (successPostCategories || errorPostCategories)
    ) {
      if (successPostCategories)
        notify(false, 'Thêm thể loại sách thành công!');
      else notify(true, errorPostCategories);
      dispatch({
        type: 'POST_PRODUCT_CATEGORIES_RESET',
      });
    }
  }, [loadingPostCategories]);

  const {
    loading: loadingPostPublishers,
    success: successPostPublishers,
    error: errorPostPublishers,
  } = useSelector((state) => state.postPublishers);
  useEffect(() => {
    if (
      !loadingPostPublishers &&
      (successPostPublishers || errorPostPublishers)
    ) {
      if (successPostPublishers)
        notify(false, 'Thêm nhà xuất bản mới thành công!');
      else notify(true, errorPostPublishers);
      dispatch({
        type: 'POST_PRODUCT_PUBLISHERS_RESET',
      });
    }
  }, [loadingPostPublishers]);

  const {
    loading: loadingPostAuthors,
    success: successPostAuthors,
    error: errorPostAuthors,
  } = useSelector((state) => state.postAuthors);
  useEffect(() => {
    if (!loadingPostAuthors && (successPostAuthors || errorPostAuthors)) {
      if (successPostAuthors) notify(false, 'Thêm tác giả mới thành công!');
      else notify(true, errorPostAuthors);
      dispatch({
        type: 'POST_PRODUCT_AUTHORS_RESET',
      });
    }
  }, [loadingPostAuthors]);

  //toastify
  //toastify
  //toastify

  useEffect(() => {
    if (errorPostCategories || successPostCategories)
      dispatch(getProductCategories());
  }, [errorPostCategories, successPostCategories]);
  useEffect(() => {
    if (errorPostPublishers || successPostPublishers)
      dispatch(getProductPublishers());
  }, [errorPostPublishers, successPostPublishers]);
  useEffect(() => {
    if (errorPostAuthors || successPostAuthors) dispatch(getProductAuthors());
  }, [errorPostAuthors, successPostAuthors]);
  useEffect(() => {
    if (
      errorAdminDeleteProduct ||
      errorAdminPostProduct ||
      errorAdminUpdateProduct ||
      successAdminDeleteProduct ||
      successAdminPostProduct ||
      successAdminUpdateProduct
    )
      dispatch(listProducts());
  }, [
    errorAdminDeleteProduct,
    errorAdminPostProduct,
    errorAdminUpdateProduct,
    successAdminDeleteProduct,
    successAdminPostProduct,
    successAdminUpdateProduct,
  ]);

  /////// UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE
  const updateHandler = (productId) => {
    const product = products.find((e) => e.id === productId);
    setImageUpdate(product.hinhanh);
    setNameUpdate(product.tensach);
    setStockUpdate(product.soluong);
    setPriceUpdate(product.giasach);
    setProductId(productId);

    handleShow();
  };
  const actualUpdateHandler = (e) => {
    e.preventDefault();
    console.log(stockUpdate);
    dispatch(
      adminUpdateProduct(productId, {
        hinhanh: imageUpdate,
        tensach: nameUpdate,
        soluong: stockUpdate === '0' ? 0 : stockUpdate * 1,
        giasach: priceUpdate * 1,
      })
    );

    handleClose();
  };

  const deleteHandler = (productId) => {
    if (window.confirm('Bạn có chắc không?')) {
      dispatch(adminDeleteProduct(productId));
    }
  };

  //modal modal modal modal modal modal modal
  const renderUpdateModal = () => {
    return (
      <>
        <Modal
          show={showUpdate}
          onHide={handleClose}
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
            <Button variant='secondary' onClick={() => handleClose()}>
              Đóng
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
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
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
      setTacgia(null);
      setNhaxuatban(null);
      setTheloai(null);
      handleCloseCreate();
    } else setValidatedCreate(true);
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
                      <Col md={6}>
                        <Row>
                          <Form.Group controlId='authorChoose'>
                            <Form.Label className='mt-2'>
                              Chọn tác giả
                            </Form.Label>
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
                            <Form.Label className='mt-2'>
                              Chọn thể loại
                            </Form.Label>
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
                      <Col md={6}>
                        <Row>
                          <Form noValidate>
                            <Form.Group controlId='authorCreate'>
                              <Form.Label className='mt-2'>
                                Thêm tác giả
                              </Form.Label>
                              <div style={{ display: 'flex' }}>
                                <Form.Control
                                  type='text'
                                  placeholder='Thêm tác giả'
                                  autoComplete='off'
                                  value={tacgiaCreate}
                                  onChange={(e) =>
                                    setTacgiaCreate(e.target.value)
                                  }
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
                              <Form.Label className='mt-2'>
                                Thêm Thể loại
                              </Form.Label>
                              <div style={{ display: 'flex' }}>
                                <Form.Control
                                  type='text'
                                  placeholder='Thêm Thể loại'
                                  autoComplete='off'
                                  value={theloaiCreate}
                                  onChange={(e) =>
                                    setTheloaiCreate(e.target.value)
                                  }
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
              )}
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

  const postAuthorHandler = (e) => {
    e.preventDefault();
    if (tacgiaCreate !== '') {
      dispatch(
        postProductAuthor({
          tentacgia: tacgiaCreate,
        })
      );
    }
    setTacgiaCreate('');
  };
  const postCategoryHandler = (e) => {
    e.preventDefault();
    if (theloaiCreate !== '') {
      dispatch(
        postProductCategory({
          tentheloai: theloaiCreate,
        })
      );
    }
    setTheloaiCreate('');
  };
  const postPublisherHandler = (e) => {
    e.preventDefault();
    if (nhaxuatbanCreate !== '') {
      dispatch(
        postProductPublisher({
          tennhaxuatban: nhaxuatbanCreate,
        })
      );
    }
    setNhaxuatbanCreate('');
  };

  return (
    <>
      {renderUpdateModal()}
      {renderCreateModal()}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        !loading &&
        !error &&
        products && (
          <>
            {(loadingPostAuthors ||
              loadingPostCategories ||
              loadingPostPublishers ||
              loadingAdminPostProduct ||
              loadingAdminUpdateProduct ||
              loadingAdminDeleteProduct) && <Loader />}
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
          </>
        )
      )}
    </>
  );
};

export default ADMINProducts;

const renderUpdate = (props) => (
  <Tooltip id='button-tooltip' {...props}>
    Cập nhật
  </Tooltip>
);

const renderDelete = (props) => (
  <Tooltip id='button-tooltip' {...props}>
    Xoá
  </Tooltip>
);
