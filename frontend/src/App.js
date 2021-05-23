import React from 'react';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import {Col, Container, Row} from "react-bootstrap";
import './App.scss';
import {BrowserRouter} from "react-router-dom";
import Sidebar from "./Main/Sidebar/Sidebar";
import Content from "./Main/Content/Content";

const App = () => {
    return (
        <BrowserRouter>
            <Container>
                <Row>
                    <Col><Header/></Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col xs={2}>
                                <Sidebar/>
                            </Col>
                            <Col>
                                <Content/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col><Footer/></Col>
                </Row>
            </Container>
        </BrowserRouter>
    );
}

export default App;
