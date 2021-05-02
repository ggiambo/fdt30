import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import styles from "../Header/Header.module.css";

const Footer = () => {
    return (
        <Container>
            <Row className={styles.header + " p-1 fixed-bottom"}>
                <Col>
                    <h6>Footer</h6>
                </Col>
                <Col>
                    <h6 className={"float-lg-right"}>(c) El Jambo</h6>
                </Col>
            </Row>
        </Container>
    )
};

export default Footer;