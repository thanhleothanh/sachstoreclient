import React, { useState, useEffect } from 'react';
import {
  OverlayTrigger,
  Table,
  Tooltip,
  Button,
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
import ModalFormAdminUpdateUser from '../components/forms/ModalFormAdminUpdateUser';
import ModalFormAdminCreateUser from '../components/forms/ModalFormAdminCreateUser';

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
    loading: loadingAdminPostUser,
    success: successAdminPostUser,
    error: errorAdminPostUser,
  } = useSelector((state) => state.adminPostUser);
  useEffect(() => {
    if (!loadingAdminPostUser && (successAdminPostUser || errorAdminPostUser)) {
      if (successAdminPostUser) notify(false, 'Thêm người dùng thành công!');
      else notify(true, errorAdminPostUser);
      dispatch({
        type: 'ADMIN_POST_USER_RESET',
      });
    }
  }, [loadingAdminPostUser]);

  const {
    loading: loadingAdminUpdateUser,
    success: successAdminUpdateUser,
    error: errorAdminUpdateUser,
  } = useSelector((state) => state.adminUpdateUser);
  useEffect(() => {
    if (
      !loadingAdminUpdateUser &&
      (successAdminUpdateUser || errorAdminUpdateUser)
    ) {
      if (successAdminUpdateUser)
        notify(false, 'Cập nhật người dùng thành công!');
      else notify(true, errorAdminUpdateUser);
      dispatch({
        type: 'ADMIN_UPDATE_USER_RESET',
      });
    }
  }, [loadingAdminUpdateUser]);

  const {
    loading: loadingAdminDeleteUser,
    success: successAdminDeleteUser,
    error: errorAdminDeleteUser,
  } = useSelector((state) => state.adminDeleteUser);
  useEffect(() => {
    if (
      !loadingAdminDeleteUser &&
      (successAdminDeleteUser || errorAdminDeleteUser)
    ) {
      if (successAdminDeleteUser) notify(false, 'Xoá người dùng thành công!');
      else notify(true, errorAdminDeleteUser);
      dispatch({
        type: 'ADMIN_DELETE_USER_RESET',
      });
    }
  }, [loadingAdminDeleteUser]);

  //toastify
  //toastify
  //toastify

  useEffect(() => {
    if (
      errorAdminDeleteUser ||
      errorAdminPostUser ||
      errorAdminUpdateUser ||
      successAdminDeleteUser ||
      successAdminPostUser ||
      successAdminUpdateUser
    )
      dispatch(getAllUsersDetails());
  }, [
    errorAdminDeleteUser,
    errorAdminPostUser,
    errorAdminUpdateUser,
    successAdminDeleteUser,
    successAdminPostUser,
    successAdminUpdateUser,
  ]);

  const deleteUserHandler = (userId) => {
    if (window.confirm('Bạn có chắc không?')) {
      dispatch(adminDeleteUser(userId));
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
    handleCloseUpdate();
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
      handleCloseCreate();
    } else setValidatedCreate(true);
  };

  return (
    <>
      <h2>Tất cả người dùng</h2>
      <>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          users && (
            <>
              {(loadingAdminDeleteUser ||
                loadingAdminPostUser ||
                loadingAdminUpdateUser) && <Loader />}
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
                        {user.id === userInfo.id && ' (Bạn)'}
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

              <ModalFormAdminCreateUser
                showCreate={showCreate}
                handleCloseCreate={handleCloseCreate}
                actualCreateHandler={actualCreateHandler}
                taikhoan={taikhoan}
                setTaikhoan={setTaikhoan}
                matkhau={matkhau}
                setMatkhau={setMatkhau}
                hoten={hoten}
                setHoten={setHoten}
                email={email}
                setEmail={setEmail}
                sodienthoai={sodienthoai}
                setSodienthoai={setSodienthoai}
                diachi={diachi}
                setDiachi={setDiachi}
                setVaitro={setVaitro}
                validatedCreate={validatedCreate}
              />
              <ModalFormAdminUpdateUser
                showUpdate={showUpdate}
                handleCloseUpdate={handleCloseUpdate}
                actualUpdateHandler={actualUpdateHandler}
                taikhoanUpdate={taikhoanUpdate}
                setTaikhoanUpdate={setTaikhoanUpdate}
                matkhauUpdate={matkhauUpdate}
                setMatkhauUpdate={setMatkhauUpdate}
                hotenUpdate={hotenUpdate}
                setHotenUpdate={setHotenUpdate}
                emailUpdate={emailUpdate}
                setEmailUpdate={setEmailUpdate}
                sodienthoaiUpdate={sodienthoaiUpdate}
                setSodienthoaiUpdate={setSodienthoaiUpdate}
                diachiUpdate={diachiUpdate}
                setDiachiUpdate={setDiachiUpdate}
              />
            </>
          )
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
