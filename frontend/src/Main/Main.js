import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";

const Main = () => {
    return (
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
    )
}

export default Main;