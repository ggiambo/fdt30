import {Col, Image, Row} from "react-bootstrap"
import {NavLink} from "react-router-dom"
import React from "react"
import {formatDateTime} from "../../../../app/utils"
import styles from "./MessageViewFooter.module.scss"
import {BASE_URL} from "../../../../app/api"

const MessageViewFooter = ({message}) => {
    return (
        <Row>
            <Col>
                {getAvatar(message)}
                Scritto da
                &nbsp;
                <NavLink to={`/user/${message.user.id}`}>{message.user.name}</NavLink>
                &nbsp;
                il
                &nbsp;
                {formatDateTime(message.created)}
            </Col>
            <Col className={"text-right"}>
                <NavLink to={`/reply/${message.id}`}>Rispondi</NavLink>
            </Col>
        </Row>
    )
}

const getAvatar = (message) => {
    return (
        <Image rounded
               className={styles.smallAvatar}
               src={`${BASE_URL}avatar/${message.user.id}`}
               alt={"Avatar"}
        />
    )
}

export default MessageViewFooter