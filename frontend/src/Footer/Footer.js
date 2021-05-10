import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import "../App.scss";

const Footer = () => {
    return (
        <Container>
            <Row className={"headerFooter p-1 fixed-bottom align-items-center"}>
                <Col>
                    <h6  style={{marginBottom: 0}}>Footer</h6>
                </Col>
                <Col>
                    <h6  style={{marginBottom: 0}} className={"float-lg-right"}>(c) El Jambo</h6>
                </Col>
            </Row>
        </Container>
    )
};

export default Footer;