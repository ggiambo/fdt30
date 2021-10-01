import React, {Fragment, useState} from "react"
import {Col, Form, Row} from "react-bootstrap"
import {Button} from "@mui/material"
import {useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"
import {useLoginMutation} from '../../../app/api.js'
import {setError, setSuccess, setWarning} from "../../../app/alertsSlice";
import {login} from "../../../app/userSlice";

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const history = useHistory()
    const dispatch = useDispatch()

    const [doLogin, {data: authorization, isSuccess, error}] = useLoginMutation()
    if (isSuccess) {
        // set token in local storage
        const token = authorization.replace("Bearer", "").trim()
        localStorage.setItem("token", token)
        dispatch(setSuccess("Login OK"))
        dispatch(login(username))
        history.push("/message")
    }

    switch (error?.status) {
        case undefined:
            break
        case 401:
            dispatch(setWarning("Nome utente o password errati"))
            break
        default:
            dispatch(setError("Errore sconosciuto"))
    }

    return (
        <Fragment>
            <Row onKeyPress={(e) => (e.key === 'Enter') && doLogin({username: username, password: password})}>
                <Col>
                    <h3>Login</h3>
                    <Form.Group>
                        <Form.Label>Nome utente</Form.Label>
                        <Form.Control
                            className={"shadow-none"}
                            type={"text"}
                            placeholder={"Nome utente"}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            className={"shadow-none"}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row className={"mt-2"}>
                <Col>
                    <Button variant="contained" onClick={() => doLogin({username: username, password: password})}>
                        Login
                    </Button>
                </Col>
            </Row>
        </Fragment>
    )
}

export default Login