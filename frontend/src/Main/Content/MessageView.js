import {Card, Container, Row} from "react-bootstrap";
import React, {Fragment} from "react";
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
        <Container>
            <Row>
                <Card style={{ width: '100%' }}>
                    <Card.Header>{subject}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div dangerouslySetInnerHTML={getHTMLFromMarkDown(markdown)}/>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    )
}

export default MessageView