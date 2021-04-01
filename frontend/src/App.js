import React, {Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import {Col, Container, Row} from "react-bootstrap";

const App = () => {
    return (
        <Fragment>
            <Container fluid>
                <Row>
                    <Col>
                        <Header/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Main/>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    <Col>
                        <Footer/>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default App;
