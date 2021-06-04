import React from 'react';
import {getAuthHeaders, MESSAGE_URL} from "../../../app/const";
import {delWarning, setWarning} from "../../../app/alertsSlice";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import MessageEdit from "./MessageEdit";

const MessageNew = () => {

    const subject = useSelector(state => state.message.subject);
    const markDown = useSelector(state => state.message.markDown);
    const history = useHistory();

    const dispatch = useDispatch();

    const saveHandleFunction = () => saveNewMessage(subject, markDown, dispatch, history);

    return (
        <MessageEdit title={"Nuovo messaggio"} saveHandleFunction={saveHandleFunction}/>
    )
}

const saveNewMessage = (subject, markDown, dispatch, history) => {
    fetch(MESSAGE_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        mode: "cors",
        body: JSON.stringify({
            subject: subject,
            content: markDown
        })
    })
        .then(response => {
            switch (response.status) {
                case 200:
                    dispatch(delWarning());
                    history.push("/messages/0");
                    break;
                default:
                    dispatch(setWarning("Errore nell'inserimento del messaggio"));
            }
        })
        .catch(error => {
            console.error(error);
        })
}

export default MessageNew