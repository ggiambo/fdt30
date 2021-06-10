import React, {useEffect} from 'react';
import {GET_MESSAGE_URL, AUTH_HEADERS, MESSAGE_URL} from "../../../app/const";
import {delWarning, setWarning} from "../../../app/alertsSlice";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import MessageEdit from "./MessageEdit";
import {setMarkdown, setSubject} from "../../../app/messageSlice";

const MessageReply = () => {

    const subject = useSelector(state => state.message.subject);
    const markDown = useSelector(state => state.message.markDown);
    const history = useHistory();

    const dispatch = useDispatch();

    let {parentId} = useParams();
    useEffect(() => {
        fetchMessage(parentId, dispatch)
    }, [parentId, dispatch])

    const saveHandleFunction = () => replyMessage(subject, markDown, parentId, dispatch, history);

    return (
        <MessageEdit title={"Rispondi al messaggio"} saveHandleFunction={saveHandleFunction}/>
    )
}

const fetchMessage = (messageId, dispatch) => {
    fetch(GET_MESSAGE_URL(messageId), {
        method: "GET",
        headers: AUTH_HEADERS(),
        mode: "cors"

    })
        .then(response => {
            switch (response.status) {
                case 200:
                    dispatch(delWarning());
                    response.json().then(data => {
                        dispatch(setSubject("Re: " + data.subject))
                        dispatch(setMarkdown(data.content.split("\n").map(line => `> ${line}`).join("\n")))
                    });
                    break;
                default:
                    dispatch(setWarning("Errore nel caricare il messaggio"));
            }
        })
        .catch(error => {
            console.error(error);
        })
}

const replyMessage = (subject, markDown, parentId, dispatch, history) => {
    fetch(MESSAGE_URL, {
        method: "POST",
        headers: AUTH_HEADERS(),
        mode: "cors",
        body: JSON.stringify({
            subject: subject,
            content: markDown,
            parentId: parentId
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

export default MessageReply