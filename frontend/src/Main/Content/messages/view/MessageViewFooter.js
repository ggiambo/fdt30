import {Col, Image, Row} from "react-bootstrap"
import {NavLink} from "react-router-dom"
import React from "react"
import {formatDateTime} from "../../../../app/utils"
import styles from "./MessageViewFooter.module.scss"

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
    if (message.user.avatarBase64) {
        return (
            <Image rounded
                   className={styles.smallAvatar}
                   src={"data:image/png;base64, " + message.user.avatarBase64}
                   alt={"Avatar"}
            />
        )
    }
    return null
}

export default MessageViewFooter