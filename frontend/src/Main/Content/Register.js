import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {doLogin} from "./Login";
import {DEFAULT_HEADERS, USER_URL} from "../../app/const";
import {useDispatch} from "react-redux";
import {setDanger} from "../../app/alertsSlice";

const Register = () => {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

    const dispatch = useDispatch();

    const disabled = () => {
        if (!checkUsername() || !checkPassword()) {
            return "disabled"
        }
    }

    const checkUsername = () => {
        return name.length >= 3;

    }

    const checkPassword = () => {
        return password.length >= 3 && (password === passwordConfirm);

    }

    return (
        <Container fluid>
            <Row>
                <Col>
                    <h3>Create account</h3>
                    <Form.Group>
                        <Form.Control
                            className={"shadow-none"}
                            type={"text"}
                            placeholder={"Username"}
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            className={"shadow-none"}
                            ype={"password"}
                            placeholder={"Password"}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            className={"shadow-none"}
                            type={"password"}
                            placeholder={"Confirm Password"}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            value={passwordConfirm}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Button disabled={disabled()} onClick={() => doRegister(name, password, dispatch)}>Save</Button>
            </Row>
        </Container>
    );
}

const doRegister = (username, password, dispatch) => {
    fetch(USER_URL, {
        method: "POST",
        headers: DEFAULT_HEADERS,
        mode: "cors",
        body: JSON.stringify({
            name: username,
            password: password
        })
    })
        .then(response => {
            switch (response.status) {
                case 200:
                    doLogin(username, password, dispatch);
                    break;
                default:
                    dispatch(setDanger("Unknown error"));
            }
        })
        .catch(error => {
            console.error(error)
        })
}

export default Register