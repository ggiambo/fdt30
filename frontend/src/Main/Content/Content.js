import React from 'react';
import MessageEdit from "./messageEdit/MessageEdit";
import Switch from "react-bootstrap/Switch";
import {Route} from 'react-router-dom';
import Login from "./Login";
import Messages from "./messagesView/Messages";
import Register from "./Register";
import {Container} from "react-bootstrap";

const Content = () => {
    return (
        <Container>
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