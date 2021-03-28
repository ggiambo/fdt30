import React, {Fragment, useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import marked from 'marked';
import DOMPurify from 'dompurify';
import fetchMessages from "../../apiActions/messagesAction";
import {useParams} from "react-router-dom";
import MessageView from "./MessageView";

const Messages = () => {

    const {pageNr = 0} = useParams()
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        fetchMessages(pageNr, setMessages)
    }, [pageNr])


    const getHTMLFromMarkDown = (markDown) => {
        const resultHTML = marked(markDown, {
            breaks: true,
            gfm: true
        });
        return {__html: DOMPurify.sanitize(resultHTML)}
    }

    return (
        <Fragment>
            <Row className={"p-3"}>
                <Col>
                    <h3>Messages</h3>
                    {messages.map((item, index) =>
                        <MessageView key={index} subject={item.subject} markdown={item.content}/>
                    )
                    }
                </Col>
            </Row>
        </Fragment>
    )
}


export default Messages