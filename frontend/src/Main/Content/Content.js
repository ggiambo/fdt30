import React from 'react';
import Message from "./Message";
import Switch from "react-bootstrap/Switch";
import {Route} from 'react-router-dom';
import Login from "./Login";
import Messages from "./Messages";
import Register from "./Register";

const Content = () => {
    return (
        <Switch>
            <Route exact path={"/message"}>
                <Message/>
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
    );
}

export default Content