import React, {Fragment} from 'react';
import {Col, Container, Nav, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import styles from './Sidebar.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../app/userSlice";
import {setSuccess} from "../../app/alertsSlice";

const Sidebar = () => {

    const isLogged = useSelector(state => state.user.logged)
    const dispatch = useDispatch();

    return (
        <Container>
            <Row>
                <Col>
                    <Nav defaultActiveKey="/" className="flex-column">
                        <NavLink to={"/messages/"} className={styles.link}
                                 activeClassName={styles.selectedLink}>Messages</NavLink>
                        {isLogged &&
                        <NavLink to={"/message"} className={styles.link}
                                 activeClassName={styles.selectedLink}>Message</NavLink>
                        }
                        {!isLogged &&
                        <Fragment>
                            <NavLink to={"/login"} className={styles.link}
                                     activeClassName={styles.selectedLink}>Login</NavLink>
                            <NavLink to={"/register"} className={styles.link}
                                     activeClassName={styles.selectedLink}>Register</NavLink>
                        </Fragment>
                        }
                        {isLogged &&
                        <NavLink className={styles.link} to="/" onClick={() => doLogout(dispatch)}>Logout</NavLink>
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