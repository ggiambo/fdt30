import React, {Fragment} from 'react';
import MessageNew from "./messages/MessageNew";
import {Route} from 'react-router-dom';
import Login from "./user/Login";
import Messages from "./messages/Messages";
import Register from "./user/Register";
import Preferences from "./user/Preferences";
import Threads from "./messages/Threads";
import Thread from "./messages/Thread";
import MessageReply from "./messages/MessageReply";

const Content = () => {
    return (
        <Fragment>
            <Route exact path={"/message"}>
                <MessageNew/>
            </Route>
            <Route exact path={"/reply/:parentId"}>
                <MessageReply/>
            </Route>
            <Route path={"/messages/:pageNr?"}>
                <Messages/>
            </Route>
            <Route path={"/threads/:pageNr?"}>
                <Threads/>
            </Route>
            <Route path={"/thread/:threadId"}>
                <Thread/>
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