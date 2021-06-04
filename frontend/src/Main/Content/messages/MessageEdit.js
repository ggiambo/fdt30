import React, {Fragment, useState} from 'react';
import {Button, Col, Form, Row, Tab, Tabs} from "react-bootstrap";
import styles from './MessageEdit.module.scss';
import {setWarning} from "../../../app/alertsSlice";
import {useDispatch, useSelector} from "react-redux";
import MessagePreview from "./MessagePreview";
import {setSubject, setMarkdown} from "../../../app/messageSlice";

const MessageEdit = ({title, saveHandleFunction}) => {

    const subject = useSelector(state => state.message.subject);
    const markDown = useSelector(state => state.message.markDown);
    const dispatch = useDispatch();

    const validateFunction = () => validate(subject, markDown, dispatch);

    return (
        <Fragment>
            <Row>
                <Col>
                    <h3>{title}</h3>
                    <Tabs defaultActiveKey="edit" id="uncontrolled-tab-example">
                        <Tab eventKey="edit" title="Messaggio">
                            <Form.Group>
                                <Form.Control
                                    className={"shadow-none"}
                                    type={"text"}
                                    placeholder={"Soggetto"}
                                    onChange={(e) => dispatch(setSubject(e.target.value))}
                                    value={subject}
                                />

                                <Form.Control
                                    as={"textarea"}
                                    rows={20}
                                    className={styles.messageSize}
                                    onChange={(e) => dispatch(setMarkdown(e.target.value))}
                                    value={markDown}/>
                            </Form.Group>
                        </Tab>
                        <Tab eventKey="view" title="Preview">
                            <Form.Group>
                                <MessagePreview/>
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
                    <Button
                        onClick={() => onClickSave(validateFunction, saveHandleFunction)}>Save</Button>
                </Col>
            </Row>
        </Fragment>
    )
}

const onClickSave = (validateFunction, saveHandleFunction) => {
    if (validateFunction() === false) {
        return;
    }
    saveHandleFunction();
}

const validate = (subject, markDown, dispatch) => {
    if (!subject || subject.length < 2 || subject.length > 20) {
        dispatch(setWarning("Soggetto: Minimo 1 carattere, massimo 255"));
        return false;
    }
    if (!markDown || markDown.length < 2 || markDown.length > 4096) {
        dispatch(setWarning("Testo: Minimo 1 carattere, massimo 4096"));
        return false;
    }

    return true;
}

export default MessageEdit