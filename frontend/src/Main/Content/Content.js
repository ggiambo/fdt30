import React from 'react';
import Message from "./Message";
import Switch from "react-bootstrap/Switch";
import {Route} from 'react-router-dom';
import Login from "./Login";

const Content = () => {
    return (
        <Switch>
            <Route exact path={"/message"}>
                <Message/>
            </Route>
            <Route exact path={"/login"}>
                <Login/>
            </Route>
        </Switch>
    );
}

export default Content