import {Card} from "react-bootstrap"
import React from "react"
import marked from "marked"
import DOMPurify from "dompurify"
import styles from './MessagePreview.module.scss'

const MessagePreview = ({subject, markDown}) => {

    const getHTMLFromMarkDown = () => {
        const resultHTML = marked(markDown, {
            breaks: true,
            gfm: true
        })
        return {__html: DOMPurify.sanitize(resultHTML)}
    }

    return (
        <Card>
            <Card.Header className={styles.messageHeader}>{subject}</Card.Header>
            <Card.Body className={styles.messageBody}>
                <div className={styles.messageViewContentPreview}
                     dangerouslySetInnerHTML={getHTMLFromMarkDown(markDown)}/>
            </Card.Body>
        </Card>
    )
}

export default MessagePreview