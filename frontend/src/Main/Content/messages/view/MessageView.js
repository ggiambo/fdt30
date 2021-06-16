import {Card} from "react-bootstrap"
import React from "react"
import marked from "marked"
import DOMPurify from "dompurify"
import styles from './MessageView.module.scss'
import MessageViewFooter from "./MessageViewFooter"
import MessageViewHeader from "./MessageViewHeader"

const MessageView = ({message}) => {

    return (
        <Card>
            <Card.Header className={styles.messageHeader}>
                <MessageViewHeader message={message}/>
            </Card.Header>
            <Card.Body className={styles.messageBody}>
                <div className={styles.messageViewContent}
                     dangerouslySetInnerHTML={getHTMLFromMarkDown(message.content)}/>
            </Card.Body>
            <Card.Footer className={styles.messageFooter}>
                <MessageViewFooter message={message}/>
            </Card.Footer>
        </Card>
    )
}

const getHTMLFromMarkDown = (markDown) => {
    const resultHTML = marked(markDown, {
        breaks: true,
        gfm: true
    })
    return {__html: DOMPurify.sanitize(resultHTML)}
}

export default MessageView