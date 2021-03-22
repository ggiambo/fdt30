import React from 'react';
import styles from './Sidebar.module.css';
import {Col, Container, Row} from "react-bootstrap";

const Sidebar = () => {
    return (
        <Container className={styles.sidebar}>
            <Row className="p-2">
                <Col>
                    Sidebar
                </Col>
            </Row>
        </Container>
    )
}

export default Sidebar;