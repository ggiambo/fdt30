import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import MessageView from "./MessageView";
import {DEFAULT_HEADERS, MESSAGES_URL} from "../../app/const";

const Messages = () => {

    const {pageNr = 0} = useParams()
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        fetchMessages(pageNr, setMessages)
    }, [pageNr])

    return (
        <Container fluid>
            <Row>
                <Col>
                    <h3>Messages</h3>
                    {messages.map((item, index) =>
                        <div className={"mb-2"}>
                            <MessageView key={index} subject={item.subject} markdown={item.content} isPreview={false}/>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

const fetchMessages = (pageNr, setMessages) => {
    fetch(MESSAGES_URL(pageNr), {
        method: "GET",
        headers: DEFAULT_HEADERS,
        mode: "cors"
    })
        .then(response => response.json())
        .then(data => setMessages(data))
        .catch(error => {
            console.error(error)
        })
}

export default Messages
