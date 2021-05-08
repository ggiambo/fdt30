import {Card} from "react-bootstrap";
import React from "react";
import marked from "marked";
import DOMPurify from "dompurify";
import styles from './MessageView.module.scss'

const MessageView = ({subject, markdown, isPreview}) => {

    const getHTMLFromMarkDown = (markDown) => {
        const resultHTML = marked(markDown, {
            breaks: true,
            gfm: true
        });
        return {__html: DOMPurify.sanitize(resultHTML)}
    }

    return (
        <Card>
            <Card.Header style={{padding: "0.375rem 0.75rem", minHeight: "2em"}}>{subject}</Card.Header>
            <Card.Body style={{overflow: "auto", padding: "0.375rem 0.75rem"}}>
                <div className={isPreview ? styles.messageViewContentPreview : styles.messageViewContent}
                     dangerouslySetInnerHTML={getHTMLFromMarkDown(markdown)}/>
            </Card.Body>
        </Card>
    )
}

export default MessageView