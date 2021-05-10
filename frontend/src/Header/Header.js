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
        <Container>
            <Row className={"headerFooter p-2 sticky-top border-bottom align-items-center"}>
                <Col>
                    <h4 style={{marginBottom: 0}}>Header</h4>
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