import React, {useState} from 'react';
import {Button, Col, Container, Form, Row, Tab, Tabs} from "react-bootstrap";
import styles from './MessageEdit.module.scss';
import {getAuthHeaders, MESSAGE_URL} from "../../../app/const";
import {delWarning, setWarning} from "../../../app/alertsSlice";
import {useDispatch} from "react-redux";
import MessagePreview from "./MessagePreview";

const MessageEdit = ({messageMarkdown = ""}) => {

    const [markDown, setMarkdown] = useState(messageMarkdown);
    const [subject, setSubject] = useState("");

    const dispatch = useDispatch();

    return (
        <Container fluid>
            <Row>
                <Col>
                    <h3>New message</h3>
                    <Tabs defaultActiveKey="edit" id="uncontrolled-tab-example">
                        <Tab eventKey="edit" title="Edit">
                            <Form.Group>
                                <Form.Control
                                    className={"shadow-none"}
                                    type={"text"}
                                    placeholder={"Subject"}
                                    onChange={(e) => setSubject(e.target.value)}
                                    value={subject}
                                />

                                <Form.Control
                                    as={"textarea"}
                                    rows={20}
                                    className={styles.messageSize}
                                    onChange={(e) => setMarkdown(e.target.value)}
                                    value={markDown}/>
                            </Form.Group>
                        </Tab>
                        <Tab eventKey="view" title="Preview">
                            <Form.Group>
                                <MessagePreview subject={subject} markdown={markDown} isPreview={true}/>
                            </Form.Group>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
            <Row>
                <Col>
                    <img alt={"Markdown logo"} className={styles.markdownLogo} src={"./markdown.svg"}/>
                    &nbsp;
                    <small>
                        <a href={"https://www.markdownguide.org/basic-syntax/"} target={"_blank"} rel={"noreferrer"}>
                            Markdown Syntax
                        </a>
                    </small>
                </Col>
            </Row>
            <Row>&nbsp;</Row>
            <Row>
                <Col>
                    <Button onClick={() => saveNewMessage(subject, markDown, dispatch)}>Save</Button>
                </Col>
            </Row>
        </Container>
    )
}

const saveNewMessage = (subject, content, dispatch) => {
    fetch(MESSAGE_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        mode: "cors",
        body: JSON.stringify({
            subject: subject,
            content: content
        })
    })
        .then(response => {
            switch (response.status) {
                case 200:
                    dispatch(delWarning());
                    window.location.href = window.location.origin + "/messages/0"
                    break;
                default:
                    dispatch(setWarning("Cannot insert message"));
            }
        })
        .catch(error => {
            console.error(error);
        })
}

export default MessageEdit