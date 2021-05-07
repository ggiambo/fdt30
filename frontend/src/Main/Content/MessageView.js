import {Card} from "react-bootstrap";
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
        <Card style={{width: '100%'}}>
            <Card.Header>{subject}</Card.Header>
            <Card.Body>
                <Card.Text>
                    <div dangerouslySetInnerHTML={getHTMLFromMarkDown(markdown)}/>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default MessageView