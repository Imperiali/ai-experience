import React from 'react';
import { Container, Row, Button, Col } from "react-bootstrap";

import ModalInicial from '../ModalComponent/ModalInicial'
import Board from '../Board'

const Home = () => {
  return (
    <Container className="d-flex " style={{ width: "100%", height: 700, alignItems: 'center' }}>
      <ModalInicial />
      {/* <Board /> */}
    </Container>


  );
};


export default Home;
