import React from 'react';
import { Container, Row, Button, Col } from "react-bootstrap";

import ModalInicial from '../ModalComponent/ModalInicial'

const Home = () => {
  return (
    <Container className="d-flex " style={{ width: "100%", height: 700, alignItems: 'center' }}>
      <ModalInicial />

    </Container>


  );
};


export default Home;
