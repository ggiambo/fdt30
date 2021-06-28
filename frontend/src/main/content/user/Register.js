import React, {Fragment, useState} from 'react'
import {Button, Col, Form, Row} from "react-bootstrap"
import {useDispatch} from "react-redux"
import {setDanger, setSuccess, setWarning} from "../../../app/alertsSlice"
import UploadAvatar from "./UploadAvatar"
import {useRegisterUserMutation} from "../../../app/api"
import {login} from "../../../app/userSlice";
import {useHistory} from "react-router-dom";

const Register = () => {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [avatarBase64, setAvatarBase64] = useState(null)

    const history = useHistory()
    const dispatch = useDispatch()
    const [doRegisterUser, {data: authorization, isSuccess, error}] = useRegisterUserMutation()
    const doRegister = () => {
        if (!validate(name, password, passwordConfirm, dispatch)) {
            return
        }
        doRegisterUser({
            username: name,
            password: password,
            avatarBase64: avatarBase64
        })
    }

    if (isSuccess) {
        // set token in local storage
        const token = authorization.replace("Bearer", "").trim()
        localStorage.setItem("token", token)
        dispatch(setSuccess("Login OK"))
        dispatch(login(name))
        history.push("/message")
    }

    switch (error?.status) {
        case undefined:
            break
        case 401:
            dispatch(setWarning("Nome utente o password errati"))
            break
        default:
            dispatch(setDanger("Errore generico"))
    }

    return (
        <Fragment>
            <Row>
                <Col>
                    <h3>Registrati</h3>
                    <Form.Group>
                        <Form.Label>Nome utente</Form.Label>
                        <Form.Control
                            className={"shadow-none"}
                            type={"text"}
                            placeholder={"Nome utente"}
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            className={"shadow-none"}
                            type={"password"}
                            placeholder={"Password"}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Conferma password</Form.Label>
                        <Form.Control
                            className={"shadow-none"}
                            type={"password"}
                            placeholder={"Conferma password"}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            value={passwordConfirm}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Avatar</Form.Label>
                        <UploadAvatar avatar={avatarBase64} setAvatar={setAvatarBase64}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Button
                    onClick={() => doRegister(name, password, passwordConfirm, avatarBase64, dispatch)}>Crea</Button>
            </Row>
        </Fragment>
    )
}

const validate = (username, password, passwordConfirm, dispatch) => {
    if (username.length < 2 || username.length > 20) {
        dispatch(setWarning("Nome utente minimo 2 caratteri, massimo 20"))
        return false
    }
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

export default Register