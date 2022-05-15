import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
const Loader = () => {
  return (
    <Modal show={true} backdrop='static' size='sm'>
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
    </Modal>
  );
};

export default Loader;
