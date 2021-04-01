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

    const checkValues = () => {
        if (!checkUsername()) {
            return false
        }
        if (password?.length < 8) {
            return false
        }
        if (password !== passwordConfirm) {
            return false
        }

        return true
    }

    const checkUsername = () => {
        if (name?.length < 3) {
            console.log(false)
            return false
        }
        console.log(true)
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
                                      isInvalid={checkUsername}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid city.
                        </Form.Control.Feedback>
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
                <Button disabled={checkValues()} onClick={() => createUser(name, password, callback)}>Save</Button>
            </Row>
        </Fragment>
    );
}

export default Register