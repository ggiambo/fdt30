import React from 'react';
import styles from './Sidebar.module.css';
import {Col, Container, Nav, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {isLoggedIn} from "../../apiActions/utils";
import {logout} from "../../apiActions/loginAction";

const Sidebar = () => {
    return (
        <Container className={styles.sidebar}>
            <Row>
                <Col>
                    <Nav defaultActiveKey="/" className="flex-column">
                        <Nav.Link href="/messages/"><Link to={"/messages/"}>Messages</Link></Nav.Link>
                        {isLoggedIn() &&
                        <Nav.Link href="/message"><Link to={"/message"}>Message</Link></Nav.Link>
                        }
                        {!isLoggedIn() &&
                        <Nav.Link href="/login"><Link to={"/login"}>Login</Link></Nav.Link>
                        }
                        {isLoggedIn() &&
                        <Nav.Link href="/" onSelect={logout}>Logout</Nav.Link>
                        }
                    </Nav>
                </Col>
            </Row>
        </Container>
    )
}

export default Sidebar;