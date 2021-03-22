import React from 'react';
import {Col, Row} from "react-bootstrap";

import styles from './Header.module.css';

const Header = () => {
    return (
        <Row className={styles.header + " p-3"}>
            <Col>
                <h4>Header</h4>
            </Col>
        </Row>
    )
};

export default Header;