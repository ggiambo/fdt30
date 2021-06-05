import React from 'react';
import {NavLink} from "react-router-dom";
import styles from "./UserInfo.module.scss";
import { PersonFill } from 'react-bootstrap-icons';
import {useSelector} from "react-redux";
import {Col, OverlayTrigger, Tooltip} from "react-bootstrap";

const UserInfo = () => {

    const username = useSelector(state => state.user.name)

    return (
        <Col>
            <OverlayTrigger placement={"bottom"} overlay={<Tooltip id={"preferenze"}>Preferenze</Tooltip>}>
                <NavLink to={"/preferences"} className={styles.userLink} activeClassName={styles.userLink}>
                    <PersonFill/>
                    &nbsp;
                    {username}
                </NavLink>
            </OverlayTrigger>
        </Col>
    );
}

export default UserInfo