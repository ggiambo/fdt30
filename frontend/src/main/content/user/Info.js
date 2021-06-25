import {NavLink, useParams} from "react-router-dom"
import React, {Fragment} from "react"
import {Col, Container, Image, Row, Spinner} from "react-bootstrap"
import {formatDateTime} from "../../../app/utils"
import styles from "./UploadAvatar.module.scss"
import {BASE_URL, useGetUserInfoQuery} from "../../../app/api";
import {useDispatch} from "react-redux";
import {setDanger} from "../../../app/alertsSlice";

const Info = () => {

    let {userId} = useParams()
    const {data: userInfo, error, isLoading} = useGetUserInfoQuery(userId)

    const dispatch = useDispatch();
    if (error) {
        dispatch(setDanger(`Impossibile leggere i messaggi - ${error.message}`))
    }

    if (isLoading) {
        return <Spinner animation="border" variant="secondary"/>
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
                           src={`${BASE_URL}avatar/${userInfo.id}`}
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