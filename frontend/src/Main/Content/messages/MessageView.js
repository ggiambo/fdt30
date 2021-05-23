import {Card} from "react-bootstrap";
import React from "react";
import marked from "marked";
import DOMPurify from "dompurify";
import styles from './MessageView.module.scss';
import {DateTime} from 'luxon';

const MessageView = ({message}) => {

    return (
        <Card>
            <Card.Header className={styles.messageHeader}>{message.subject}</Card.Header>
            <Card.Body className={styles.messageBody}>
                <div className={styles.messageViewContent}
                     dangerouslySetInnerHTML={getHTMLFromMarkDown(message.content)}/>
            </Card.Body>
            <Card.Footer className={styles.messageFooter}>
                Scritto da {message.user.name} il {getCreationDate(message.created)}
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

const getCreationDate = (creation) => {
    const creationDate = DateTime.fromISO(creation);
    const date = creationDate.toLocaleString(DateTime.DATE_SHORT);
    const time = creationDate.toLocaleString(DateTime.TIME_24_WITH_SECONDS);
    return `${date} alle ${time}`;
}

export default MessageView