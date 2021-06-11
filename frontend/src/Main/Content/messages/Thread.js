import {useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DEFAULT_HEADERS, THREAD_URL} from "../../../app/const";
import {setMessages} from "../../../app/threadSlice";
import {Col, Row} from "react-bootstrap";
import MessageView from "./view/MessageView";

const Thread = () => {

    const messages = useSelector(state => state.thread.messages);
    const dispatch = useDispatch();

    let {threadId} = useParams();
    useEffect(() => {
        fetchThread(threadId, dispatch)
    }, [threadId, dispatch])

    return (
            <Row>
                <Col>
                    <h3>Thread #{threadId}</h3>
                    {messages.map((message, index) =>
                        <div key={index} className={"mb-4"}>
                            <MessageView message={message}/>
                        </div>
                    )}
                </Col>
            </Row>
    );
}

const fetchThread = (threadId, dispatch) => {
    fetch(THREAD_URL(threadId), {
        method: "GET",
        headers: DEFAULT_HEADERS,
        mode: "cors"
    })
        .then(response => response.json())
        .then(data => {
            dispatch(setMessages(data.messages));
        })
        .catch(error => {
            console.error(error)
        })
}

export default Thread