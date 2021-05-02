import React, {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {login} from "../../app/userSlice";
import {useDispatch} from "react-redux";
import {setDanger, setSuccess, setWarning} from "../../app/messagesSlice";
import {DEFAULT_HEADERS, LOGIN_URL} from "../../app/const";
import {useHistory} from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const dispatch = useDispatch();

    return (
        <Container fluid className={"mb-3"}>
            <Row className={"mt-3"}>
                <Col>
                    <Row>
                        <Col>
                            <h3>Login</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <Form>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        placeholder="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="primary"
                                        onClick={() => {
                                            doLogin(username, password, dispatch);
                                            history.push("/message");
                                        }}>Login</Button>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export const doLogin = (username, password, dispatch) => {
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
                    dispatch(setSuccess("Login successfull"));
                    dispatch(login(username));
                    break;
                case 401:
                    dispatch(setWarning("Wrong username or password"));
                    break;
                default:
                    dispatch(setDanger("Unknown error"));
            }
        })
        .catch(error => {
            console.error(error)
        })
}

export default Login;