import React from 'react';
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import {Col, Container, Row} from "react-bootstrap";
import './App.scss';

const App = () => {
    return (
        <Container>
            <Row>&nbsp;{/*Spacer*/}</Row>
            <Row>
                <Col><Header/></Col>
            </Row>
            <Row>&nbsp;{/*Spacer*/}</Row>
            <Row>
                <Col><Main/></Col>
            </Row>
            <Row>&nbsp;{/*Spacer*/}</Row>
            <Row>
                <Col><Footer/></Col>
            </Row>
        </Container>
    );
}

export default App;
