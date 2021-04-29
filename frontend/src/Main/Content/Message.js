import React, {Fragment, useState} from 'react';
import {Alert, Button, Col, Container, Form, Row, Tab, Tabs} from "react-bootstrap";
import styles from './Message.module.css';
import saveNewMessage from "../../apiActions/saveNewMessageAction"
import MessageView from "./MessageView";

const Message = ({messageMarkdown = ""}) => {

    const [markDown, setMarkdown] = useState(messageMarkdown);
    const [subject, setSubject] = useState("");
    const [visibleAlert, setVisibleAlert] = useState(false);

    const callback = (status) => {
        switch (status) {
            case 200:
                setVisibleAlert(false)
                window.location.href = window.location.origin + "/messages/0"
                break;
            default:
                setVisibleAlert(true)
        }
    }

    return (
        <Container>
            <Row className={"p-3"}>
                <Col>
                    {visibleAlert &&
                    <Alert variant={"warning"} onClose={() => setVisibleAlert(false)} dismissible>
                        Cannot insert message
                    </Alert>
                    }
                    <h3>Message</h3>
                    <Tabs defaultActiveKey="edit" id="uncontrolled-tab-example">
                        <Tab eventKey="edit" title="Edit">
                            <Form.Group>
                                <Form.Control type={"text"}
                                              placeholder={"Subject"}
                                              onChange={(e) => setSubject(e.target.value)}
                                              value={subject}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control as={"textarea"}
                                              className={styles.messageSize}
                                              onChange={(e) => setMarkdown(e.target.value)}
                                              value={markDown}/>
                            </Form.Group>
                        </Tab>
                        <Tab eventKey="view" title="Preview">
                            <MessageView subject={subject} markdown={markDown}/>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
            <Row>
                <Button onClick={() => saveNewMessage(subject, markDown, callback)}>Save</Button>
            </Row>
        </Container>
    )
}

export default Message