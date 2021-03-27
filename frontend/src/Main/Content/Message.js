import React, {useState, Fragment} from 'react';
import {Button, Col, Form, Row, Tab, Tabs} from "react-bootstrap";
import marked from 'marked';
import DOMPurify from 'dompurify';
import styles from './Message.module.css';

const Message = ({messageMarkdown = ""}) => {

    const [markDown, setMarkdown] = useState(messageMarkdown);

    const getHTMLFromMarkDown = () => {
        const resultHTML = marked(markDown, {
            breaks: true,
            gfm: true
        });
        return {__html: DOMPurify.sanitize(resultHTML)}
    }

    return (
        <Fragment>
            <Row className={"p-3"}>
                <Col>
                    <h3>Message</h3>
                    <Tabs defaultActiveKey="edit" id="uncontrolled-tab-example">
                        <Tab eventKey="edit" title="Edit">
                            <Form.Control as={"textarea"}
                                          className={styles.messageSize}
                                          onChange={(e) => setMarkdown(e.target.value)}
                                          value={markDown}/>
                        </Tab>
                        <Tab eventKey="view" title="Preview">
                            <Form.Control as={"p"}
                                          className={styles.messageSize + " " + styles.preview + " pl-2"}
                                          plaintext={true}
                                          readOnly={true}
                                          dangerouslySetInnerHTML={getHTMLFromMarkDown()}/>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
            <Row>
                <Button onClick={() => save(markDown)}>Save</Button>
            </Row>
        </Fragment>
    )
}

const save = () => {
    alert("saved");
}

export default Message