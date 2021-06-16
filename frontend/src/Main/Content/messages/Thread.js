import {useParams} from "react-router-dom"
import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Col, Row} from "react-bootstrap"
import MessageView from "./view/MessageView"
import {doFetchThread} from "../../../app/restOperations"

const Thread = () => {

    const messages = useSelector(state => state.messages.messages)
    const dispatch = useDispatch()

    let {threadId} = useParams()
    useEffect(() => {
        doFetchThread(threadId, dispatch)
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
    )
}

export default Thread