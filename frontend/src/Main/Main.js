import React from 'react';
import {Col, Row} from "react-bootstrap";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";
import {BrowserRouter} from "react-router-dom";

const Main = () => {
    return (
        <BrowserRouter>
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
        </BrowserRouter>
    )
}

export default Main;