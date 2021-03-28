import {Form} from "react-bootstrap";
import styles from "./Message.module.css";
import React from "react";
import marked from "marked";
import DOMPurify from "dompurify";

const MessageView = ({subject, markdown}) => {

    const getHTMLFromMarkDown = (markDown) => {
        const resultHTML = marked(markDown, {
            breaks: true,
            gfm: true
        });
        return {__html: DOMPurify.sanitize(resultHTML)}
    }

    return (
        <Form.Group>
            <Form.Control type={"text"} value={subject} plaintext readOnly/>
            <Form.Control as={"p"}
                          className={styles.messageSize + " " + styles.preview + " pl-2"}
                          plaintext={true}
                          readOnly={true}
                          dangerouslySetInnerHTML={getHTMLFromMarkDown(markdown)}/>
        </Form.Group>
    )
}

export default MessageView