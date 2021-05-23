import React, {Fragment, useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {setDanger, setSuccess, setWarning} from "../../../app/alertsSlice";
import {getAuthHeaders, USER_URL} from "../../../app/const";

const Preferences = () => {

    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const dispatch = useDispatch();

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
                <Button onClick={() => doChangePassword(oldPassword, password, passwordConfirm, dispatch)}>Cambia
                    password</Button>
            </Row>
        </Fragment>
    )
}

const doChangePassword = (oldPassword, password, passwordConfirm, dispatch) => {
    if (!validate(password, passwordConfirm, dispatch)) {
        return;
    }
    fetch(USER_URL, {
        method: "PATCH",
        headers: getAuthHeaders(),
        mode: "cors",
        body: JSON.stringify({
            oldPassword: oldPassword,
            newPassword: password
        })
    })
        .then(response => {
            switch (response.status) {
                case 200:
                    dispatch(setSuccess("Password modificata con successo"));
                    break;
                case 403:
                    dispatch(setDanger(`Utente sconosciuto`));
                    break;
                case 404:
                    dispatch(setDanger(`Errore nel cambio della password`));
                    break;
                default:
                    dispatch(setDanger("Errore generico"));
            }
        })
        .catch(error => {
            console.error(error)
        })
}

const validate = (password, passwordConfirm, dispatch) => {
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

export default Preferences