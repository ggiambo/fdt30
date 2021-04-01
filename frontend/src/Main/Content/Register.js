import React, {Fragment, useState} from 'react';
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import createUser from "../../apiActions/createUserAction";
import {login} from "../../apiActions/loginAction";

const Register = () => {

    const [visibleAlert, setVisibleAlert] = useState(false)
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

    const callback = (status) => {
        switch (status) {
            case 200:
                setVisibleAlert(false)
                login(name, password, () =>  window.location.href = window.location.origin)
                break;
            default:
                setVisibleAlert(true)
        }
    }

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
        <Fragment>
            <Row className={"p-3"}>
                <Col>
                    {visibleAlert &&
                    <Alert variant={"warning"} onClose={() => setVisibleAlert(false)} dismissible>
                        Cannot create user
                    </Alert>
                    }
                    <h3>Create account</h3>
                    <Form.Group>
                        <Form.Control type={"text"}
                                      placeholder={"Username"}
                                      onChange={(e) => setName(e.target.value)}
                                      value={name}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type={"password"}
                                      placeholder={"Password"}
                                      onChange={(e) => setPassword(e.target.value)}
                                      value={password}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type={"password"}
                                      placeholder={"Confirm Password"}
                                      onChange={(e) => setPasswordConfirm(e.target.value)}
                                      value={passwordConfirm}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Button disabled={disabled()} onClick={() => createUser(name, password, callback)}>Save</Button>
            </Row>
        </Fragment>
    );
}

export default Register