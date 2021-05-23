import React, {Fragment} from 'react';
import MessageEdit from "./messages/MessageEdit";
import {Route} from 'react-router-dom';
import Login from "./user/Login";
import Messages from "./messages/Messages";
import Register from "./user/Register";
import Preferences from "./user/Preferences";

const Content = () => {
    return (
        <Fragment>
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
            <Route exact path={"/preferences"}>
                <Preferences/>
            </Route>
        </Fragment>
    );
}

export default Content