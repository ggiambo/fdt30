import {Card, Col, Image, Row} from "react-bootstrap";
import React from "react";
import marked from "marked";
import DOMPurify from "dompurify";
import styles from './MessageView.module.scss';
import {DateTime} from 'luxon';
import {NavLink} from "react-router-dom";

const MessageView = ({message}) => {

    return (
        <Card>
            <Card.Header className={styles.messageHeader}>
                <Row>
                    <Col>
                        {message.subject}
                    </Col>
                    <Col className={"text-right"}>
                        <NavLink to={`/thread/${message.threadId}`}>Thread #{message.threadId}</NavLink>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body className={styles.messageBody}>
                <div className={styles.messageViewContent}
                     dangerouslySetInnerHTML={getHTMLFromMarkDown(message.content)}/>
            </Card.Body>
            <Card.Footer className={styles.messageFooter}>
                <Row>
                    <Col>
                        {getAvatar(message)}
                        Scritto da {message.user.name} il {getCreationDate(message.created)}
                    </Col>
                    <Col className={"text-right"}>
                        <NavLink to={`/reply/${message.id}`}>Rispondi</NavLink>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    )
}

const getHTMLFromMarkDown = (markDown) => {
    const resultHTML = marked(markDown, {
        breaks: true,
        gfm: true
    });
    return {__html: DOMPurify.sanitize(resultHTML)}
}

const getAvatar = (message) => {
    if (message.user.avatarBase64) {
        return (
            <Image rounded
                   style={{maxWidth: "2em", maxHeight: "2em"}}
                   src={"data:image/png;base64, " + message.user.avatarBase64}
                   alt={"Avatar"}
            />
        );
    }
    return null;
}

const getCreationDate = (creation) => {
    const creationDate = DateTime.fromISO(creation);
    const date = creationDate.toLocaleString(DateTime.DATE_SHORT);
    const time = creationDate.toLocaleString(DateTime.TIME_24_WITH_SECONDS);
    return `${date} alle ${time}`;
}

export default MessageView