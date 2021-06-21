import {NavLink, useParams} from "react-router-dom"
import React, {Fragment, useEffect, useState} from "react"
import {Col, Container, Image, Row} from "react-bootstrap"
import {formatDateTime} from "../../../app/utils"
import styles from "./UploadAvatar.module.scss"
import {doFetchUserInfo} from "../../../app/restOperations"

const Info = () => {

    const [userInfo, setUserInfo] = useState()

    let {userId} = useParams()
    useEffect(() => {
            doFetchUserInfo(userId, setUserInfo)
        }, [userId]
    )

    if (!userInfo) {
        return <Fragment/>
    }

    return (
        <Fragment>
            <Row>
                <Col>
                    <h3>Informazioni utente</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Image rounded
                           className={styles.avatarImage}
                           src={"data:image/png;base64, " + userInfo.avatarBase64}
                           alt={"Avatar"}
                    />
                </Col>
                <Col sm={8}>
                    <Container>
                        <Row>
                            <Col><b>Nome</b></Col>
                            <Col>{userInfo.name}</Col>
                        </Row>
                        <Row>
                            <Col><b>Registrato il</b></Col>
                            <Col>{formatDateTime(userInfo.created)}</Col>
                        </Row>
                        {userInfo.updated && <Row>
                            <Col><b>Modificato il</b></Col>
                            <Col>{formatDateTime(userInfo.updated)}</Col>
                        </Row>
                        }
                        <Row>
                            <Col><b>Messaggi</b></Col>
                            <Col>
                                <NavLink to={`/messages/0/user/${userId}`}>Lista</NavLink>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Fragment>
    )
}

export default Info