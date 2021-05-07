import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {FaUser} from "react-icons/fa";
import styles from './Header.module.css';
import {useSelector} from "react-redux";
import Alerts from "./Alerts";

const Header = () => {

    const isLogged = useSelector(state => state.user.logged)
    const username = useSelector(state => state.user.name)

    return (
        <Container>
            <Row className={styles.header + " p-2 sticky-top border-bottom"}>
                <Col>
                    <h4>Header</h4>
                </Col>
                <Col>
                    {isLogged &&
                    <Row>
                        <Col>
                            <FaUser/>
                            &nbsp;
                            {username}
                        </Col>
                    </Row>
                    }
                </Col>
            </Row>
            <Row>
                <Alerts/>
            </Row>
        </Container>
    )
};

export default Header;