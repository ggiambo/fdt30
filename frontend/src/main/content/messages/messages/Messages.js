import React, {Fragment} from 'react'
import {Col, Row} from "react-bootstrap"
import MessageView from "../view/MessageView"
import {useSelector} from "react-redux"
import MessagesNavigator from "./MessagesNavigator"
import {useParams} from "react-router-dom"

const Messages = ({gotoPage, totalPages, messages}) => {

    const {pageNr} = useParams()

    return (
        <Fragment>
            <Row>
                <Col>
                    <h3>Messaggi</h3>
                    {messages.map((message, index) =>
                        <div key={index} className={"mb-4"}>
                            <MessageView message={message}/>
                        </div>
                    )}
                </Col>
            </Row>
            <Row className={"mb-3"}>
                <Col>
                    <MessagesNavigator actualPageNr={pageNr} totalPages={totalPages} gotoPage={gotoPage}/>
                </Col>
            </Row>
        </Fragment>
    )
}

export default Messages
