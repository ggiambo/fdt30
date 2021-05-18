import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {FaUser} from "react-icons/fa";
import '../App.scss';
import {useSelector} from "react-redux";
import Alerts from "./Alerts";

const Header = () => {

    const isLogged = useSelector(state => state.user.logged)
    const username = useSelector(state => state.user.name)

    return (
        <Container className={"mb-2 mt-2"}>
            <Row className={"headerFooter p-2 mb-2 sticky-top align-items-center rounded"}>
                <Col>
                    <h4 style={{marginBottom: 0}}>Forum dei Troll 3.0</h4>
                </Col>
                {isLogged &&
                <Col>
                    <FaUser/>
                    &nbsp;
                    {username}
                </Col>
                }
            </Row>
            <Row>
                <Alerts/>
            </Row>
        </Container>
    )
};

export default Header;