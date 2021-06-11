import {Col, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import React from "react";

const MessageViewHeader = ({message}) => {
    return (
        <Row>
            <Col>
                {message.subject}
            </Col>
            <Col className={"text-right"}>
                <NavLink to={`/thread/${message.threadId}`}>Thread #{message.threadId}</NavLink>
            </Col>
        </Row>
    );
}

export default MessageViewHeader