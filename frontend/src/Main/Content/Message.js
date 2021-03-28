import React, {Fragment, useState} from 'react';
import {Button, Col, Form, Row, Tab, Tabs} from "react-bootstrap";
import marked from 'marked';
import DOMPurify from 'dompurify';
import styles from './Message.module.css';
import saveNewMessage from "../../apiActions/saveMessageAction"

const Message = ({messageMarkdown = ""}) => {

    const [markDown, setMarkdown] = useState(messageMarkdown);
    const [subject, setSubject] = useState("");

    const getHTMLFromMarkDown = () => {
        const resultHTML = marked(markDown, {
            breaks: true,
            gfm: true
        });
        return {__html: DOMPurify.sanitize(resultHTML)}
    }

    const callback = (status) => {

    }

    return (
        <Fragment>
            <Row className={"p-3"}>
                <Col>
                    <h3>Message</h3>
                    <Tabs defaultActiveKey="edit" id="uncontrolled-tab-example">
                        <Tab eventKey="edit" title="Edit">
                            <Form.Group>
                                <Form.Control type={"text"}
                                              placeholder={"Subject"}
                                              onChange={(e) => setSubject(e.target.value)}
                                              value={subject}
                                />
                                <Form.Control as={"textarea"}
                                              className={styles.messageSize}
                                              onChange={(e) => setMarkdown(e.target.value)}
                                              value={markDown}/>
                            </Form.Group>
                        </Tab>
                        <Tab eventKey="view" title="Preview">
                            <Form.Group>
                                <Form.Control type={"text"} value={subject} plaintext readOnly/>
                                <Form.Control as={"p"}
                                              className={styles.messageSize + " " + styles.preview + " pl-2"}
                                              plaintext={true}
                                              readOnly={true}
                                              dangerouslySetInnerHTML={getHTMLFromMarkDown()}/>
                            </Form.Group>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
            <Row>
                <Button onClick={() => saveNewMessage(subject, markDown, save)}>Save</Button>
            </Row>
        </Fragment>
    )
}

const save = (status) => {
    alert("status: " + status)
}

export default Message