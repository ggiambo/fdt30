import React, {Fragment, useRef, useState} from 'react'
import {Button, Col, Form, Row, Tab, Tabs} from "react-bootstrap"
import styles from './MessageEdit.module.scss'
import {delWarning, setSuccess, setWarning} from "../../../app/alertsSlice"
import {useDispatch} from "react-redux"
import MessagePreview from "./MessagePreview"
import EmojiPicker from "./EmojiPicker"
import {useSaveMessageMutation} from "../../../app/api"
import {useHistory} from "react-router-dom"

const MessageEdit = ({title, subject: sourceSubject, markDown: sourceMarkdown, parentId = null}) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const [subject, setSubject] = useState(sourceSubject)
    const [markDown, setMarkdown] = useState(sourceMarkdown)

    const textAreaRef = useRef()
    const handleEmojiClick = (emoji) => {
        const selectionStart = 0 || textAreaRef.current.selectionStart
        const selectionEnd = textAreaRef.current.selectionEnd
        const newMarkdown = markDown.substr(0, selectionStart) + emoji + markDown.substr(selectionEnd)
        setMarkdown(newMarkdown)
    }

    const [saveMessage, {isSuccess, error}] = useSaveMessageMutation()
    const save = () => {
        if (!validate(subject, markDown, dispatch)) return
        saveMessage({
            subject: subject,
            content: markDown,
            parentId: parentId,
        })
    }

    if (isSuccess) {
        dispatch(delWarning())
        history.push("/messages/0")
        dispatch(setSuccess("Messaggio inserito con successo"))
    }
    if (error) {
        dispatch(setWarning(`Errore nell'inserimento del messaggio: ${error.message}`))
    }

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
                                    onChange={(e) => setSubject(e.target.value)}
                                    value={subject}
                                />

                                <Form.Control
                                    ref={textAreaRef}
                                    as={"textarea"}
                                    rows={20}
                                    className={styles.messageSize}
                                    onChange={(e) => setMarkdown(e.target.value)}
                                    value={markDown}
                                />
                            </Form.Group>
                            <EmojiPicker handleEmojiClick={handleEmojiClick}/>
                        </Tab>
                        <Tab eventKey="view" title="Preview">
                            <Form.Group>
                                <MessagePreview subject={subject} markDown={markDown}/>
                            </Form.Group>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
            <Row>
                <Col>
                    <img alt={"Markdown logo"} className={styles.markdownLogo} src={"/markdown.svg"}/>
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
                        onClick={() => save()}>Save</Button>
                </Col>
            </Row>
        </Fragment>
    )
}

const validate = (subject, markDown, dispatch) => {
    if (!subject || subject.length < 2 || subject.length > 255) {
        dispatch(setWarning("Soggetto: Minimo 1 carattere, massimo 255"))
        return false
    }
    if (!markDown || markDown.length < 2 || markDown.length > 4096) {
        dispatch(setWarning("Testo: Minimo 1 carattere, massimo 4096"))
        return false
    }

    return true
}

export default MessageEdit