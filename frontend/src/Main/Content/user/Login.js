import React, {Fragment, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {login} from "../../../app/userSlice";
import {useDispatch} from "react-redux";
import {setDanger, setSuccess, setWarning} from "../../../app/alertsSlice";
import {DEFAULT_HEADERS, LOGIN_URL} from "../../../app/const";
import {useHistory} from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <Fragment>
            <Row>
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

export const doLogin = (username, password, dispatch, history) => {
    fetch(LOGIN_URL, {
        method: "POST",
        headers: DEFAULT_HEADERS,
        mode: "cors",
        body: JSON.stringify({
            name: username,
            password: password
        })
    })
        .then(response => {
            if (response.ok) {
                // set token in local storage
                const authorization = response.headers.get("Authorization");
                const token = authorization.replace("Bearer", "").trim();
                localStorage.setItem("token", token);
            }

            switch (response.status) {
                case 200:
                    dispatch(setSuccess("Login OK"));
                    dispatch(login(username));
                    history.push("/message");
                    break;
                case 401:
                    dispatch(setWarning("Nome utente o password errati"));
                    break;
                default:
                    dispatch(setDanger("Errore sconosciuto"));
            }
        })
        .catch(error => {
            console.error(error)
        })
}

export default Login;