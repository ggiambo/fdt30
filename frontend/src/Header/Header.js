import React from 'react';
import {Col, Row} from "react-bootstrap";
import {FaUser} from "react-icons/fa";
import {getUsername, isLoggedIn} from "../apiActions/utils"

import styles from './Header.module.css';

const Header = () => {
    return (
        <Row className={styles.header + " p-2 sticky-top border-bottom"}>
            <Col>
                <h4>Header</h4>
            </Col>
            <Col>
                {isLoggedIn() &&
                <Row>
                    <Col>
                        <FaUser/>
                        &nbsp;
                        {getUsername()}
                    </Col>
                </Row>
                }
            </Col>
        </Row>
    )
};

export default Header;