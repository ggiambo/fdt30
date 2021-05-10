import React from 'react';
import MessageEdit from "./MessageEdit";
import Switch from "react-bootstrap/Switch";
import {Route} from 'react-router-dom';
import Login from "./Login";
import Messages from "./Messages";
import Register from "./Register";
import {Container} from "react-bootstrap";
import styles from './Content.module.scss';

const Content = () => {
    return (
        <Container className={styles.content}>
            <Switch>
                <Route exact path={"/message"}>
                    <MessageEdit/>
                </Route>
                <Route path={"/messages/:pageNr?"}>
                    <Messages/>
                </Route>
                <Route exact path={"/login"}>
                    <Login/>
                </Route>
                <Route exact path={"/register"}>
                    <Register/>
                </Route>
            </Switch>
        </Container>
    );
}

export default Content