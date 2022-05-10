import React, { useState, useEffect } from 'react';
import {
  Modal,
  OverlayTrigger,
  Table,
  Tooltip,
  Button,
  Form,
  Row,
  Col,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  adminDeleteUser,
  adminUpdateUser,
  adminPostUser,
  getAllUsersDetails,
} from './../actions/userActions';
import Loader from '../components/Loader';
import Message from './../components/Message';
import notify from '../utils/notify';

const ADMINUsers = ({ history }) => {
  const [showCreate, setShowCreate] = useState(false);
  const [validatedCreate, setValidatedCreate] = useState(false);
  const [taikhoan, setTaikhoan] = useState('');
  const [matkhau, setMatkhau] = useState('');
  const [hoten, setHoten] = useState('');
  const [diachi, setDiachi] = useState('');
  const [sodienthoai, setSodienthoai] = useState('');
  const [email, setEmail] = useState('');
  const [vaitro, setVaitro] = useState('');
  const handleCloseCreate = () => {
    setValidatedCreate(false);
    setShowCreate(false);
  };
  const handleShowCreate = () => setShowCreate(true);

  //
  const [showUpdate, setShowUpdate] = useState(false);
  const [userUpdate, setUserUpdate] = useState('');
  const [taikhoanUpdate, setTaikhoanUpdate] = useState('');
  const [matkhauUpdate, setMatkhauUpdate] = useState('');
  const [hotenUpdate, setHotenUpdate] = useState('');
  const [diachiUpdate, setDiachiUpdate] = useState('');
  const [sodienthoaiUpdate, setSodienthoaiUpdate] = useState('');
  const [emailUpdate, setEmailUpdate] = useState('');
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading: loadingUpdate } = useSelector(
    (state) => state.adminUpdateUser
  );
  const { users, loading, error } = useSelector(
    (state) => state.allUsersDetails
  );

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else if (!userInfo.vaitro === 'admin') {
      history.push('/');
    } else dispatch(getAllUsersDetails());
  }, [userInfo]);

  //toastify
  //toastify
  //toastify
  const {
    loading: loadinAdminPostUser,
    success: successAdminPostUser,
    error: errorAdminPostUser,
  } = useSelector((state) => state.adminPostUser);
  useEffect(() => {
    if (!loadinAdminPostUser && (successAdminPostUser || errorAdminPostUser)) {
      if (successAdminPostUser) notify(false, 'Thêm người dùng thành công!');
      else notify(true, errorAdminPostUser);
      dispatch({
        type: 'ADMIN_POST_USER_RESET',
      });
    }
  }, [loadinAdminPostUser]);

  const {
    loading: loadinAdminUpdateUser,
    success: successAdminUpdateUser,
    error: errorAdminUpdateUser,
  } = useSelector((state) => state.adminUpdateUser);
  useEffect(() => {
    if (
      !loadinAdminUpdateUser &&
      (successAdminUpdateUser || errorAdminUpdateUser)
    ) {
      if (successAdminUpdateUser)
        notify(false, 'Cập nhật người dùng thành công!');
      else notify(true, errorAdminUpdateUser);
      dispatch({
        type: 'ADMIN_UPDATE_USER_RESET',
      });
    }
  }, [loadinAdminUpdateUser]);

  const {
    loading: loadinAdminDeleteUser,
    success: successAdminDeleteUser,
    error: errorAdminDeleteUser,
  } = useSelector((state) => state.adminDeleteUser);
  useEffect(() => {
    if (
      !loadinAdminDeleteUser &&
      (successAdminDeleteUser || errorAdminDeleteUser)
    ) {
      if (successAdminDeleteUser) notify(false, 'Xoá người dùng thành công!');
      else notify(true, errorAdminDeleteUser);
      dispatch({
        type: 'ADMIN_DELETE_USER_RESET',
      });
    }
  }, [loadinAdminDeleteUser]);

  //toastify
  //toastify
  //toastify
  const deleteUserHandler = (userId) => {
    if (window.confirm('Bạn có chắc không?')) {
      dispatch(adminDeleteUser(userId));
      setTimeout(() => {
        dispatch(getAllUsersDetails());
      }, 500);
    }
  };

  const updateUserHandler = (userId) => {
    const user = users.find((e) => e.id === userId);
    setTaikhoanUpdate(user.taikhoan);
    setHotenUpdate(user.hoten);
    setDiachiUpdate(user.diachi);
    setSodienthoaiUpdate(user.sodienthoai);
    setEmailUpdate(user.email);
    setUserUpdate(userId);

    handleShowUpdate();
  };
  const actualUpdateHandler = (e) => {
    e.preventDefault();
    dispatch(
      adminUpdateUser(userUpdate, {
        matkhau: matkhauUpdate,
        diachi: diachiUpdate,
        sodienthoai: sodienthoaiUpdate,
        email: emailUpdate,
        hoten: hotenUpdate,
      })
    );
    setTimeout(() => {
      dispatch(getAllUsersDetails());
    }, 500);

    handleCloseUpdate();
  };
  const renderUpdateModal = () => {
    return (
      <>
        <Modal
          show={showUpdate}
          onHide={handleCloseUpdate}
          backdrop='static'
          keyboard={false}
          centered
          size='lg'
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
                    placeholder='Mật khẩu'
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

  const createHandler = () => {
    handleShowCreate();
  };
  const actualCreateHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      dispatch(
        adminPostUser({
          hoten: hoten,
          taikhoan: taikhoan,
          matkhau: matkhau,
          diachi: diachi,
          sodienthoai: sodienthoai,
          vaitro: vaitro,
          email: email,
        })
      );
      setHoten('');
      setDiachi('');
      setTaikhoan('');
      setMatkhau('');
      setSodienthoai('');
      setVaitro('');
      setEmail('');
      setTimeout(() => {
        dispatch(getAllUsersDetails());
      }, 500);
      handleCloseCreate();
    } else setValidatedCreate(true);
  };
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
                    placeholder='Số điện thoại'
                    value={sodienthoai}
                    onChange={(e) => setSodienthoai(e.target.value)}
                    autoComplete='off'
                  ></Form.Control>
                  <Form.Control.Feedback>
                    Có thể để trống!
                  </Form.Control.Feedback>
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
                  <Form.Control.Feedback>
                    Có thể để trống!
                  </Form.Control.Feedback>
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
                  <Form.Control.Feedback>
                    Có thể để trống!
                  </Form.Control.Feedback>
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
  return (
    <>
      <h2>Tất cả người dùng</h2>
      <>
        {loading || loadingUpdate ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Row>
              <Col>
                <h2>Tổng cộng: {users.length} người dùng</h2>
              </Col>
              <Col className='text-right'>
                <Button variant='dark' onClick={createHandler}>
                  Thêm tài khoản mới
                </Button>
              </Col>
            </Row>
            <Table hover responsive striped>
              <thead>
                <tr>
                  <th>USER ID</th>
                  <th>Tài khoản</th>
                  <th>Họ tên</th>
                  <th>Email</th>
                  <th>Địa chỉ</th>
                  <th>Số điện thoại</th>
                  <th>Vai trò</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.taikhoan}</td>
                    <td>
                      {user.hoten}
                      {user.id === userInfo.id && ' (You)'}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.diachi}</td>
                    <td>{user.sodienthoai}</td>
                    <td>
                      {user.vaitro === 'admin'
                        ? 'Admin'
                        : user.vaitro === 'nhanvien'
                        ? 'Nhân viên'
                        : 'Khách hàng'}
                    </td>
                    <td>
                      <OverlayTrigger
                        placement='top'
                        delay={{ show: 150, hide: 150 }}
                        overlay={renderTooltipUpdate}
                      >
                        <i
                          className='fas fa-edit mr-3 fa-2x'
                          onClick={() => updateUserHandler(user.id)}
                        />
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement='top'
                        delay={{ show: 150, hide: 150 }}
                        overlay={renderTooltipDelete}
                      >
                        <i
                          className='fas fa-ban fa-2x'
                          onClick={() => deleteUserHandler(user.id)}
                        />
                      </OverlayTrigger>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {renderCreateModal()}
            {renderUpdateModal()}
          </>
        )}
      </>
    </>
  );
};

export default ADMINUsers;

const renderTooltipDelete = (props) => (
  <Tooltip id='button-tooltip' {...props}>
    Delete User
  </Tooltip>
);

const renderTooltipUpdate = (props) => (
  <Tooltip id='button-tooltip' {...props}>
    Update User
  </Tooltip>
);
