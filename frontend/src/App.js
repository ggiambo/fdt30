import React from 'react'
import Header from "./header/Header"
import Footer from "./footer/Footer"
import {Col, Container, Row} from "react-bootstrap"
import './App.scss'
import {BrowserRouter} from "react-router-dom"
import Sidebar from "./main/sidebar/Sidebar"
import Content from "./main/content/Content"

const App = () => {
    return (
        <BrowserRouter>
            <Container>
                <Row>
                    <Col><Header/></Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col xs={2}>
                                <Sidebar/>
                            </Col>
                            <Col>
                                <Content/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col><Footer/></Col>
                </Row>
            </Container>
        </BrowserRouter>
    )
}

export default App
