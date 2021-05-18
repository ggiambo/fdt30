import React, {Fragment, useEffect} from 'react';
import {Col, Row} from "react-bootstrap";
import MessageView from "./MessageView";
import {DEFAULT_HEADERS, MESSAGES_URL} from "../../../app/const";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom"
import {setMessages, setTotalPages} from "../../../app/messagesSlice";
import MessagesNavigator from "./MessagesNavigator";

const Messages = () => {

    let {pageNr} = useParams();
    useEffect(() => {
        fetchMessages(pageNr, dispatch)
    }, [pageNr])

    const messages = useSelector(state => state.messages.messages);

    const dispatch = useDispatch();

    return (
        <Fragment>
            <Row>
                <Col>
                    <h3>Messaggi</h3>
                    {messages.map((message, index) =>
                        <div className={"mb-4"}>
                            <MessageView key={index} message={message}/>
                        </div>
                    )}
                </Col>
            </Row>
            <Row>
                <MessagesNavigator actualPage={pageNr}/>
            </Row>
        </Fragment>
    )
}

const fetchMessages = (pageNr, dispatch) => {
    fetch(MESSAGES_URL(pageNr), {
        method: "GET",
        headers: DEFAULT_HEADERS,
        mode: "cors"
    })
        .then(response => response.json())
        .then(data => {
            dispatch(setMessages(data.messages));
            dispatch(setTotalPages(data.totalPages));
        })
        .catch(error => {
            console.error(error)
        })
}

export default Messages
