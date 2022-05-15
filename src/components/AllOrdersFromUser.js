import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import { getAllOrders } from './../actions/orderActions';
import { Link } from 'react-router-dom';

const AllOrdersFromUser = () => {
  const dispatch = useDispatch();
  const { loading, error, allOrders } = useSelector((state) => state.allOrders);

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : allOrders && allOrders.length === 0 ? (
        <Message>Bạn chưa mua đơn hàng nào!</Message>
      ) : (
        allOrders && (
          <Table hover responsive striped>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Ngày đặt</th>
                <th>Đã thanh toán</th>
                <th>Hoàn thành</th>
                <th>Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((item) => (
                <tr key={item.donhangid}>
                  <td>
                    <Link to={`/orders/${item.donhangid}`}>
                      {item.donhangid}
                    </Link>
                  </td>
                  <td>{item.donhangngaydat.substring(0, 10)}</td>
                  <td>
                    <i
                      className={
                        item.donhangisthanhtoan && item.thoigianthanhtoan
                          ? 'fas fa-check fa-lg'
                          : 'fas fa-times fa-lg'
                      }
                    />{' '}
                    {!item.donhangisthanhtoan ? (
                      ''
                    ) : item.thoigianthanhtoan ? (
                      ': ' + item.thoigianthanhtoan
                    ) : (
                      <i className='fas fa-question-circle mx-3' />
                    )}
                  </td>
                  <td>
                    <i
                      className={
                        item.donhangishoanthanh
                          ? 'fas fa-check fa-lg'
                          : 'fas fa-times fa-lg'
                      }
                    ></i>
                  </td>
                  <td>
                    {item.donhangtongtien.toLocaleString('vi', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )
      )}
    </>
  );
};

export default AllOrdersFromUser;
