import {useParams} from "react-router-dom"
import React from "react"
import {useDispatch} from "react-redux"
import {Col, Row, Spinner} from "react-bootstrap"
import MessageView from "./view/MessageView"
import {useGetMessagesByThreadIdQuery} from "../../../app/api"
import {setError} from "../../../app/alertsSlice"

const Thread = () => {

    let {threadId} = useParams()
    const {data, error, isLoading, isSuccess} = useGetMessagesByThreadIdQuery(threadId)
    const dispatch = useDispatch()
    if (error) {
        dispatch(setError(`Impossibile leggere i messaggi del thread - ${error.message}`))
    }

    if (isLoading) {
        return <Spinner animation="border" variant="secondary"/>
    }

    if (isSuccess ) {
        return (
            <Row>
                <Col>
                    <h3>Thread #{threadId}</h3>
                    {data.messages.map((message, index) =>
                        <div key={index} className={"mb-4"}>
                            <MessageView message={message}/>
                        </div>
                    )}
                </Col>
            </Row>
        )
    }

    return null
}

export default Thread