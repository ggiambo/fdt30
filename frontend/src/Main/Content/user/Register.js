import React, {Fragment, useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {doLogin} from "./Login";
import {DEFAULT_HEADERS, USER_URL} from "../../../app/const";
import {useDispatch} from "react-redux";
import {setDanger, setWarning} from "../../../app/alertsSlice";

const Register = () => {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

    const dispatch = useDispatch();

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
                </Col>
            </Row>
            <Row>
                <Button onClick={() => doRegister(name, password, passwordConfirm, dispatch)}>Crea</Button>
            </Row>
        </Fragment>
    );
}

const doRegister = (username, password, passwordConfirm, dispatch) => {
    if (!validate(username, password, passwordConfirm, dispatch)) {
        return
    }

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
                case 409:
                    dispatch(setDanger(`L'utente "${username}" esiste già`));
                    break;
                default:
                    dispatch(setDanger("Errore nella registrazione"));
            }
        })
        .catch(error => {
            console.error(error)
        })
}

const validate = (username, password, passwordConfirm, dispatch) => {
    if (username.length < 2 || username.length > 20) {
        dispatch(setWarning("Nome utente minimo 2 caratteri, massimo 20"));
        return false;
    }
    if (password.length < 6 || password.length > 20) {
        dispatch(setWarning("Password minimo 6 caratteri, massimo 20"));
        return false;
    }
    if (password !== passwordConfirm) {
        dispatch(setWarning("Le due password non corrispondono"));
        return false;
    }

    return true;
}

export default Register