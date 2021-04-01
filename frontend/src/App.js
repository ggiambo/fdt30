import {Fragment, React} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Header/Header";
import Content from "./Main/Main";
import Footer from "./Footer/Footer";
import {Col, Container, Row} from "react-bootstrap";

const App = () => {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <Header/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Content/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Footer/>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
