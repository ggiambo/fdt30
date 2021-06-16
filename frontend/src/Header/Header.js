import React from 'react'
import {Col, Container, Row} from "react-bootstrap"
import '../App.scss'
import {useSelector} from "react-redux"
import Alerts from "./Alerts"
import UserInfo from "./UserInfo"

const Header = () => {

    const isLogged = useSelector(state => state.user.logged)

    return (
        <Container className={"mb-2 mt-2"}>
            <Row className={"headerFooter p-2 mb-2 sticky-top align-items-center rounded"}>
                <Col>
                    <h4 style={{marginBottom: 0}}>Forum dei Troll 3.0</h4>
                </Col>
                {isLogged && <UserInfo/>}
            </Row>
            <Row>
                <Alerts/>
            </Row>
        </Container>
    )
}

export default Header