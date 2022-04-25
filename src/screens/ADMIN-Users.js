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
  adminPostUser,
  getAllUsersDetails,
  updateDeleteUser,
} from './../actions/userActions';
import Loader from '../components/Loader';
import Message from './../components/Message';

const ADMINUsers = ({ history }) => {
  const [showCreate, setShowCreate] = useState(false);
  const [taikhoan, setTaikhoan] = useState('');
  const [matkhau, setMatkhau] = useState('');
  const [hoten, setHoten] = useState('');
  const [diachi, setDiachi] = useState('');
  const [sodienthoai, setSodienthoai] = useState('');
  const [email, setEmail] = useState('');
  const [vaitro, setVaitro] = useState('');
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

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

  const deleteUserHandler = (userId) => {
    if (window.confirm('Bạn có chắc không?')) {
      dispatch(updateDeleteUser(userId));
      setTimeout(() => {
        dispatch(getAllUsersDetails());
      }, 500);
    }
  };

  const createHandler = () => {
    handleShowCreate();
  };
  const actualCreateHandler = (e) => {
    e.preventDefault();
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
              <Form onSubmit={actualCreateHandler}>
                <Form.Group controlId='nameCreate'>
                  <Form.Label>Tên tài khoản</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Tài khoản'
                    value={taikhoan}
                    onChange={(e) => setTaikhoan(e.target.value)}
                    autoComplete='off'
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='passwordCreate'>
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Mật khẩu'
                    value={matkhau}
                    onChange={(e) => setMatkhau(e.target.value)}
                    autoComplete='off'
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='imgCreate'>
                  <Form.Label>Họ tên</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Họ tên'
                    value={hoten}
                    onChange={(e) => setHoten(e.target.value)}
                    autoComplete='off'
                  ></Form.Control>
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
                </Form.Group>
                <Row>
                  <Form.Group controlId='authorChoose'>
                    <Form.Label>Chọn vai trò</Form.Label>
                    <Form.Control
                      as='select'
                      onChange={(e) => {
                        setVaitro(e.target.value);
                      }}
                    >
                      <option>--Chọn--</option>
                      <option value='khachhang'>Khách hàng</option>
                      <option value='admin'>Admin</option>
                      <option value='nhanvien'>Nhân viên</option>
                    </Form.Control>
                  </Form.Group>
                </Row>
                <Button
                  variant='dark'
                  className='mt-3'
                  type='submit'
                  onClick={(e) => actualCreateHandler(e)}
                >
                  Thêm người dùng
                </Button>
              </Form>
            </Modal.Body>
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
