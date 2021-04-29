import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import fetchMessages from "../../apiActions/messagesAction";
import {useParams} from "react-router-dom";
import MessageView from "./MessageView";

const Messages = () => {

    const {pageNr = 0} = useParams()
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        fetchMessages(pageNr, setMessages)
    }, [pageNr])

    return (
        <Container>
            <Row className={"p-3"}>
                <Col>
                    <h3>Messages</h3>
                    {messages.map((item, index) =>
                        <MessageView key={index} subject={item.subject} markdown={item.content}/>
                    )}
                </Col>
            </Row>
        </Container>
    )
}


export default Messages
