import React, {Fragment} from 'react';
import {Col, Container, Nav, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import styles from './Sidebar.module.css';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../app/userSlice";
import {setSuccess} from "../../app/messagesSlice";

const Sidebar = () => {

    const isLogged = useSelector(state => state.user.logged)
    const dispatch = useDispatch();

    return (
        <Container>
            <Row>
                <Col>
                    <Nav defaultActiveKey="/" className="flex-column">
                        <NavLink to={"/messages/"} activeClassName={styles.selected}>Messages</NavLink>
                        {isLogged &&
                        <NavLink to={"/message"} activeClassName={styles.selected}>Message</NavLink>
                        }
                        {!isLogged &&
                        <Fragment>
                            <NavLink to={"/login"} activeClassName={styles.selected}>Login</NavLink>
                            <NavLink to={"/register"} activeClassName={styles.selected}>Register</NavLink>
                        </Fragment>
                        }
                        {isLogged &&
                        <NavLink to="/" onClick={() => doLogout(dispatch)}>Logout</NavLink>
                        }
                    </Nav>
                </Col>
            </Row>
        </Container>
    )
}

const doLogout = (dispatch) => {
    localStorage.removeItem("token")
    dispatch(logout());
    dispatch(setSuccess("Logout successfull"));
}

export default Sidebar;