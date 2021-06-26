import React, {Fragment} from 'react'
import {Col, Row, Spinner} from "react-bootstrap"
import MessageView from "./view/MessageView"
import {useDispatch} from "react-redux"
import {useParams} from "react-router-dom"
import MessagesNavigator from "./messages/MessagesNavigator"
import {useGetThreadsByPageQuery} from "../../../app/api"
import {setDanger} from "../../../app/alertsSlice"

const Threads = () => {

    let {pageNr} = useParams()
    const {data, error, isLoading} = useGetThreadsByPageQuery(pageNr)

    const dispatch = useDispatch()
    if (error) {
        dispatch(setDanger(`Impossibile leggere i messaggi del thread - ${error.message}`))
    }

    if (isLoading) {
        return <Spinner animation="border" variant="secondary"/>
    }

    return (
        <Fragment>
            <Row>
                <Col>
                    <h3>Threads</h3>
                    {data.messages.map((message, index) =>
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
