import React from 'react';
import {Alert, Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {delDanger, delSuccess, delWarning} from "../app/messagesSlice";

const Messages = () => {

    const dispatch = useDispatch()

    const success = useSelector(state => state.messages.success);
    const warning = useSelector(state => state.messages.warning);
    const danger = useSelector(state => state.messages.danger);

    return (
        <Container>
            {success &&
            <Row>
                <Col>
                    <Alert variant={"success"} onClose={() => dispatch(delSuccess())} dismissible>{success}</Alert>
                </Col>
            </Row>
            }
            {warning &&
            <Row>
                <Col>
                    <Alert variant={"warning"} onClose={() => dispatch(delWarning())} dismissible>{warning}</Alert>
                </Col>
            </Row>
            }
            {danger &&
            <Row>
                <Col>
                    <Alert variant={"danger"} onClose={() => dispatch(delDanger())} dismissible>{danger}</Alert>
                </Col>
            </Row>
            }
        </Container>
    )
};

export default Messages;