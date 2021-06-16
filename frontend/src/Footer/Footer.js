import React from 'react'
import {Col, Container, Row} from "react-bootstrap"
import "../App.scss"

const Footer = () => {
    return (
        <Container className={"mt-1"}>
            <Row className={"headerFooter p-1 fixed-bottom align-items-center"}>
                <Col>
                    <h6 className={"mb-0"}>Version 0.1</h6>
                </Col>
                <Col>
                    <h6 className={"mb-0 float-lg-right"}>(c) El Jambo</h6>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer