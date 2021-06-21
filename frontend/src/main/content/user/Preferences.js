import React, {Fragment, useEffect, useState} from 'react'
import {Button, Col, Form, Row} from "react-bootstrap"
import {useDispatch} from "react-redux"
import {setWarning} from "../../../app/alertsSlice"
import UploadAvatar from "./UploadAvatar"
import {doUpdateUser, doFetchAvatar} from "../../../app/restOperations"

const Preferences = () => {

    const dispatch = useDispatch()

    const [oldPassword, setOldPassword] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [avatarBase64, setAvatarBase64] = useState(null)

    useEffect(() => {
        doFetchAvatar(setAvatarBase64, dispatch)
    }, [dispatch])

    return (
        <Fragment>
            <Row>
                <Col>
                    <h3>Preferenze</h3>
                    <Form.Group>
                        <Form.Label>Vecchia password</Form.Label>
                        <Form.Control
                            className={"shadow-none"}
                            type={"password"}
                            placeholder={"Vecchia password"}
                            onChange={(e) => setOldPassword(e.target.value)}
                            value={oldPassword}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nuova password</Form.Label>
                        <Form.Control
                            className={"shadow-none"}
                            type={"password"}
                            placeholder={"Nuova password"}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}/>
                    </Form.Group>
                    <Form.Label>Conferma password</Form.Label>
                    <Form.Group>
                        <Form.Control
                            className={"shadow-none"}
                            type={"password"}
                            placeholder={"Conferma password"}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            value={passwordConfirm}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Button onClick={() => doChangePassword(oldPassword, password, passwordConfirm, dispatch)}>
                    Cambia password
                </Button>
            </Row>
            <Row className={"mt-2"}>
                <Col>
                    <Form.Group>
                        <UploadAvatar avatar={avatarBase64} setAvatar={setAvatarBase64}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Button onClick={() => doChangeAvatar(avatarBase64, dispatch)}>
                    Cambia Avatar
                </Button>
            </Row>
        </Fragment>
    )
}


const doChangePassword = (oldPassword, password, passwordConfirm, dispatch) => {
    if (!validate(password, passwordConfirm, dispatch)) {
        return
    }
    doUpdateUser({
        oldPassword: oldPassword,
        newPassword: password,
        dispatch: dispatch
    })
}

const doChangeAvatar = (avatarBase64, dispatch) => {
    doUpdateUser({
        avatarBase64: avatarBase64,
        dispatch: dispatch
    })
}

const validate = (password, passwordConfirm, dispatch) => {
    if (password.length < 6 || password.length > 20) {
        dispatch(setWarning("Password minimo 6 caratteri, massimo 20"))
        return false
    }
    if (password !== passwordConfirm) {
        dispatch(setWarning("Le due password non corrispondono"))
        return false
    }

    return true
}

export default Preferences