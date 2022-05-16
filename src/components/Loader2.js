import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader2 = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        marginTop: '2rem',
        marginBottom: '2rem',
      }}
    ></Spinner>
  );
};

export default Loader2;
