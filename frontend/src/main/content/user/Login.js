import React, {Fragment, useState} from "react"
import {Button, Col, Form, Row} from "react-bootstrap"
import {useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"
import {doLogin} from "../../../app/restOperations"

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const history = useHistory()
    const dispatch = useDispatch()

    return (
        <Fragment>
            <Row onKeyPress={(e) => (e.key === 'Enter') && doLogin(username, password, dispatch, history)}>
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
            <Row>
                <Button
                    variant="primary"
                    onClick={() => doLogin(username, password, dispatch, history)}
                >
                    Login
                </Button>
            </Row>
        </Fragment>
    )
}

export default Login