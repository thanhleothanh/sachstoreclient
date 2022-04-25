import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-1 rounded'>
      <Link to={`/product/${product.id}`}>
        <Card.Img src={product.hinhanh} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.id}`}>
          <Card.Title as='h5'>
            <strong>{product.tensach}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div' className='mt-3'>
          <span>
            {product.giasach.toLocaleString('vi', {
              style: 'currency',
              currency: 'VND',
            })}
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
