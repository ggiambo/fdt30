import React from 'react';
import styles from './Sidebar.module.css';
import {Col, Container, Nav, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const Sidebar = () => {
    return (
        <Container className={styles.sidebar}>
            <Row>
                <Col>
                    {/*}
                    <ul>
                        <li><Link to={"/message"}>Message</Link></li>
                        <li><Link to={"/login"}>Login</Link></li>
                    </ul>
                    {*/}


                    <Nav defaultActiveKey="/" className="flex-column">
                        <Nav.Link href="/message"><Link to={"/message"}>Message</Link></Nav.Link>
                        <Nav.Link href="/messages"><Link to={"/messages"}>Messages</Link></Nav.Link>
                        <Nav.Link eventKey="/login"><Link to={"/login"}>Login</Link></Nav.Link>
                    </Nav>



                </Col>
            </Row>
        </Container>
    )
}

export default Sidebar;