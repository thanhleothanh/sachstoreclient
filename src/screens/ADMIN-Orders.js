import React, { useState, useEffect } from 'react';
import {
  Button,
  OverlayTrigger,
  Table,
  Tooltip,
  Modal,
  Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { adminGetAllOrders, adminUpdateOrder } from './../actions/orderActions';
import Message from './../components/Message';
import Loader from '../components/Loader';
import notify from '../utils/notify';

const ADMINOrders = ({ history }) => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { adminAllOrders, loading, error } = useSelector(
    (state) => state.adminAllOrders
  );

  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //update details
  const [orderId, setOrderId] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [ishoanthanh, setIshoanthanh] = useState(false);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.adminUpdateOrder);
  useEffect(() => {
    if (!loadingUpdate && (successUpdate || errorUpdate)) {
      if (successUpdate) notify(false, 'Cập nhật đơn hàng thành công!');
      else notify(true, errorUpdate);
      dispatch({
        type: 'ADMIN_UPDATE_ORDER_RESET',
      });
    }
  }, [loadingUpdate]);

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else if (!userInfo.vaitro == 'nhanvien') {
      history.push('/');
    }
    if (userInfo && !loadingUpdate) {
      dispatch(adminGetAllOrders());
    }
  }, [userInfo, loadingUpdate]);

  const updateHandler = (orderId) => {
    const order = adminAllOrders.find((e) => e.donhangid === orderId);
    console.log(order);
    setAddress(order.donhangdiachi);
    setPhone(order.donhangsodienthoai);
    setIshoanthanh(order.donhangishoanthanh === 0 ? false : true);
    setOrderId(orderId);

    handleShow();
  };
  const actualUpdateHandler = (e) => {
    e.preventDefault();
    setTimeout(() => {
      dispatch(
        adminUpdateOrder(orderId, {
          diachi: address,
          sodienthoai: phone,
          isHoanthanh: ishoanthanh,
        })
      );
    }, 500);
    handleClose();
  };

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
                      ishoanthanh
                        ? 'fas fa-check-circle'
                        : 'fas fa-times-circle'
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

  return (
    <>
      {(loading || loadingUpdate) && <Loader />}
      {(error || errorUpdate) && (
        <Message variant='danger'>
          {error || errorUpdate} Hệ thống đang có lỗi!
        </Message>
      )}
      {!loading && (
        <>
          <h2>Tất cả đơn hàng</h2>
          <h5>Tổng cộng: {adminAllOrders.length} đơn hàng </h5>
          <Table hover striped responsive>
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>Họ tên</th>
                <th>Địa chỉ</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Ngày đặt</th>
                <th>Tổng tiền</th>
                <th>Đã thanh toán</th>
                <th>Đã hoàn thành</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {adminAllOrders.map((order) => (
                <tr key={order.donhangid}>
                  <td>
                    <a href={`/orders/${order.donhangid}`}>{order.donhangid}</a>
                  </td>
                  <td>{order.donhanghoten}</td>
                  <td>{order.donhangdiachi}</td>
                  <td>{order.donhangsodienthoai}</td>
                  <td>{order.khachhangemail || 'N/A'}</td>
                  <td>{order.donhangngaydat.substring(0, 10)}</td>
                  <td>
                    {order.donhangtongtien.toLocaleString('vi', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </td>

                  <td>
                    <i
                      className={
                        order.donhangisthanhtoan && order.thoigianthanhtoan
                          ? 'fas fa-check fa-lg'
                          : 'fas fa-times fa-lg'
                      }
                    />{' '}
                    {!order.donhangisthanhtoan ? (
                      ''
                    ) : order.thoigianthanhtoan ? (
                      ': ' + order.thoigianthanhtoan.substring(0, 10)
                    ) : (
                      <i className='fas fa-question-circle' />
                    )}
                  </td>
                  <td>
                    <i
                      className={
                        order.donhangishoanthanh
                          ? 'fas fa-check fa-lg'
                          : 'fas fa-times fa-lg'
                      }
                    />{' '}
                  </td>
                  <td>
                    <OverlayTrigger
                      placement='top'
                      delay={{ show: 250, hide: 250 }}
                      overlay={renderUpdate}
                    >
                      <i
                        className='fas fa-edit fa-2x'
                        onClick={() => updateHandler(order.donhangid)}
                      />
                    </OverlayTrigger>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* {//modal modal modal modal modal modal modal modal modal modal modal modal} */}
          {renderUpdateModal()}
        </>
      )}
    </>
  );
};

export default ADMINOrders;

const renderUpdate = (props) => (
  <Tooltip id='update-tooltip' {...props}>
    Cập nhật
  </Tooltip>
);
