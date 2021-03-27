import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";
import {BrowserRouter} from "react-router-dom";

const Main = () => {
    return (
        <BrowserRouter>
            <Container fluid>
                <Row>
                    <Col xs={2}>
                        <Sidebar/>
                    </Col>
                    <Col>
                        <Content/>
                    </Col>
                    <Col xs={2}>
                        {/*Spacer*/}
                    </Col>
                </Row>
            </Container>
        </BrowserRouter>
    )
}

export default Main;