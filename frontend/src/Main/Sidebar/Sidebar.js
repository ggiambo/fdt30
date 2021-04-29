import React, {Fragment} from 'react';
import {Col, Container, Nav, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {isLoggedIn} from "../../apiActions/utils";
import {logout} from "../../apiActions/loginAction";
import styles from './Sidebar.module.css';

const Sidebar = () => {
    return (
        <Container className={"withBorder"}>
            <Row>
                <Col>
                    <Nav defaultActiveKey="/" className="flex-column">
                        <NavLink to={"/messages/"} activeClassName={styles.selected}>Messages</NavLink>
                        {isLoggedIn() &&
                        <NavLink to={"/message"} activeClassName={styles.selected}>Message</NavLink>
                        }
                        {!isLoggedIn() &&
                        <Fragment>
                            <NavLink to={"/login"} activeClassName={styles.selected}>Login</NavLink>
                            <NavLink to={"/register"} activeClassName={styles.selected}>Register</NavLink>
                        </Fragment>
                        }
                        {isLoggedIn() &&
                        <NavLink to="/" onClick={logout}>Logout</NavLink>
                        }
                    </Nav>
                </Col>
            </Row>
        </Container>
    )
}

export default Sidebar;