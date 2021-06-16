import React, {Fragment, useEffect} from 'react'
import {Col, Row} from "react-bootstrap"
import MessageView from "./view/MessageView"
import {useDispatch, useSelector} from "react-redux"
import {useParams} from "react-router-dom"
import MessagesNavigator from "./messages/MessagesNavigator"
import {doFetchThreads} from "../../../app/restOperations"

const Threads = () => {

    const messages = useSelector(state => state.messages.messages)
    const dispatch = useDispatch()

    let {pageNr} = useParams()
    useEffect(() => {
        doFetchThreads(pageNr, dispatch)
    }, [pageNr, dispatch])

    return (
        <Fragment>
            <Row>
                <Col>
                    <h3>Threads</h3>
                    {messages.map((message, index) =>
                        <div key={index} className={"mb-4"}>
                            <MessageView message={message}/>
                        </div>
                    )}
                </Col>
            </Row>
            <Row className={"mb-3"}>
                <Col>
                    <MessagesNavigator actualPageNr={pageNr}/>
                </Col>
            </Row>
        </Fragment>
    )
}

export default Threads
