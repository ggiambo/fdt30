import React, {Fragment} from 'react';
import {Alert, Col, Row} from "react-bootstrap";
import {FaUser} from "react-icons/fa";
import styles from './Header.module.css';
import {useDispatch, useSelector} from "react-redux";
import {delDanger, delSuccess, delWarning} from "../app/messagesSlice";

const Header = () => {

    const dispatch = useDispatch()

    const success = useSelector(state => state.messages.success);
    const warning = useSelector(state => state.messages.warning);
    const danger = useSelector(state => state.messages.danger);

    const isLogged = useSelector(state => state.user.logged)
    const username = useSelector(state => state.user.name)

    return (
        <Fragment>
            <Row className={styles.header + " p-2 sticky-top border-bottom"}>
                <Col>
                    <h4>Header</h4>
                </Col>
                <Col>
                    {isLogged &&
                    <Row>
                        <Col>
                            <FaUser/>
                            &nbsp;
                            {username}
                        </Col>
                    </Row>
                    }
                </Col>
            </Row>
            {success &&
            <Row>
                <Col>
                    <Alert variant={"success"} onClose={() => dispatch(delSuccess())} dismissible>{success}</Alert>
                </Col>
            </Row>
            }
            {warning &&
            <Row>
                <Col>
                    <Alert variant={"warning"} onClose={() => dispatch(delWarning())} dismissible>{warning}</Alert>
                </Col>
            </Row>
            }
            {danger &&
            <Row>
                <Col>
                    <Alert variant={"danger"} onClose={() => dispatch(delDanger())} dismissible>{danger}</Alert>
                </Col>
            </Row>
            }
        </Fragment>
    )
};

export default Header;