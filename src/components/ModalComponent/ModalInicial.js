import React from 'react';
import { Container, Row, Button, Col } from "react-bootstrap";

const ModalInicial = () => {
    return (
        <Container className="" style={{ width: "80%", height: 300 }} >
            <div class="mt-5 rounded-top rounded-bottom  mx-auto w-25 ">
                <Row className="mx-auto justify-content-center rounded-top w-100   bg-light">
                    <h1 className="w-100 text-justify text-center">Ultimate</h1>
                </Row>
                <Row className=" mx-auto rounded-bottom justify-content-center w-100  bg-light">
                    <h2 className="w-100 text-justify text-center">TicTacToe</h2>
                </Row>
            </div>
            <div class=" d-flex flex-row mx-auto mt-5" style={{ width: 300, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                <Button variant="dark" style={{ width: 140 }}>Começar</Button>
                <Button variant="dark" style={{ width: 140 }}>Reiniciar</Button>

            </div>

        </Container >
    );
}

export default ModalInicial;