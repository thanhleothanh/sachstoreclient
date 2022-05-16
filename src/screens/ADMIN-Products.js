import React, { useState, useEffect } from 'react';
import {
  Image,
  OverlayTrigger,
  Table,
  Tooltip,
  Button,
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
import ModalFormAdminCreateProduct from '../components/forms/ModalFormAdminCreateProduct';
import ModalFormAdminUpdateProduct from '../components/forms/ModalFormAdminUpdateProduct';

const ADMINProducts = ({ history }) => {
  //modal
  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);
  const [showCreate, setShowCreate] = useState(false);
  const handleShowCreate = () => setShowCreate(true);
  const handleCloseCreate = () => {
    setShowCreate(false);
    setValidatedCreate(false);
  };

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

  // UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE
  const updateHandler = (productId) => {
    const product = products.find((e) => e.id === productId);
    setImageUpdate(product.hinhanh);
    setNameUpdate(product.tensach);
    setStockUpdate(product.soluong);
    setPriceUpdate(product.giasach);
    setProductId(productId);

    handleShowUpdate();
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

    handleCloseUpdate();
  };

  // CREATE CREATE CREATE CREATE
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

  const deleteHandler = (productId) => {
    if (window.confirm('Bạn có chắc không?')) {
      dispatch(adminDeleteProduct(productId));
    }
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

            <ModalFormAdminUpdateProduct
              productId={productId}
              showUpdate={showUpdate}
              handleCloseUpdate={handleCloseUpdate}
              actualUpdateHandler={actualUpdateHandler}
              nameUpdate={nameUpdate}
              setNameUpdate={setNameUpdate}
              imageUpdate={imageUpdate}
              setImageUpdate={setImageUpdate}
              stockUpdate={stockUpdate}
              setStockUpdate={setStockUpdate}
              priceUpdate={priceUpdate}
              setPriceUpdate={setPriceUpdate}
            />
            <ModalFormAdminCreateProduct
              handleCloseCreate={handleCloseCreate}
              actualCreateHandler={actualCreateHandler}
              validatedCreate={validatedCreate}
              postAuthorHandler={postAuthorHandler}
              postCategoryHandler={postCategoryHandler}
              postPublisherHandler={postPublisherHandler}
              authors={authors}
              categories={categories}
              publishers={publishers}
              showCreate={showCreate}
              tensach={tensach}
              setTensach={setTensach}
              hinhanh={hinhanh}
              setHinhanh={setHinhanh}
              soluong={soluong}
              setSoluong={setSoluong}
              giasach={giasach}
              setGiasach={setGiasach}
              setTacgia={setTacgia}
              setNhaxuatban={setNhaxuatban}
              setTheloai={setTheloai}
              tacgiaCreate={tacgiaCreate}
              setTacgiaCreate={setTacgiaCreate}
              nhaxuatbanCreate={nhaxuatbanCreate}
              setNhaxuatbanCreate={setNhaxuatbanCreate}
              theloaiCreate={theloaiCreate}
              setTheloaiCreate={setTheloaiCreate}
              loadingAuthors={loadingAuthors}
              loadingCategories={loadingCategories}
              loadingPublishers={loadingPublishers}
              errorAuthors={errorAuthors}
              errorCategories={errorCategories}
              errorPublishers={errorPublishers}
            />
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
