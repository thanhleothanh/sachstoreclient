import React from 'react';
import { Nav, Navbar, Container, Button, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './../actions/userActions';

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Sach Store</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Giỏ hàng
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Thông tin tài khoản</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Đăng xuất
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Đăng nhập/Đăng ký
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo &&
                (userInfo.vaitro === 'admin' ||
                  userInfo.vaitro === 'nhanvien') && (
                  <NavDropdown title='Quản lý' id='manage'>
                    {userInfo.vaitro === 'admin' && (
                      <LinkContainer to='/admin/users'>
                        <NavDropdown.Item>Tài khoản</NavDropdown.Item>
                      </LinkContainer>
                    )}
                    {userInfo.vaitro === 'nhanvien' && (
                      <>
                        <LinkContainer to='/admin/products'>
                          <NavDropdown.Item>Sản phẩm</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/orders'>
                          <NavDropdown.Item>Đơn hàng</NavDropdown.Item>
                        </LinkContainer>
                      </>
                    )}
                  </NavDropdown>
                )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
