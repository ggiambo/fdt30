import React, {useState} from "react";
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import login from "../../apiActions/loginAction";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [visibleAlert, setVisibleAlert] = useState("");

    const callback = (status) => {
        switch (status) {
            case 200:
                setVisibleAlert("success");
                break;
            case 401:
                setVisibleAlert("warning");
                break;
            default:
                setVisibleAlert("danger");
        }
    }

    const closeAlerts = () => setVisibleAlert("");

    const doLogin = () => {
        closeAlerts();
        login(username, password, callback);
    }

    return (
        <Container fluid>
            <Row className={"mt-3"}>
                <Col>
                    <Row>
                        <Col>
                            {visibleAlert === "success" &&
                            <Alert variant={"success"} onClose={closeAlerts} dismissible>
                                Log in successfull
                            </Alert>
                            }
                            {visibleAlert === "warning" &&
                            <Alert variant={"warning"} onClose={closeAlerts} dismissible>
                                Wrong username or password
                            </Alert>
                            }
                            {visibleAlert === "danger" &&
                            <Alert variant={"danger"} onClose={closeAlerts} dismissible>
                                Unknown error
                            </Alert>
                            }
                        </Col>
                    </Row>
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
                                        onClick={() => doLogin()}>Login</Button>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;