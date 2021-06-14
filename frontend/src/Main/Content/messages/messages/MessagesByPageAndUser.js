import React, {useEffect} from 'react';
import {DEFAULT_HEADERS, MESSAGES_BY_USER_URL} from "../../../../app/const";
import {useDispatch} from "react-redux";
import {useHistory, useParams} from "react-router-dom"
import {setMessages, setTotalPages} from "../../../../app/messagesSlice";
import Messages from "./Messages";

const MessagesByPageAndUser = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const {userId} = useParams();
    const gotoPage = (pageNr) => {
        history.push(`/messages/${pageNr}/user/${userId}`);
    }

    const {pageNr} = useParams();
    useEffect(() => {
        fetchMessages(pageNr, userId, dispatch)
    }, [pageNr, dispatch])

    return (
        <Messages gotoPage={gotoPage}/>
    )
}

const fetchMessages = (pageNr, userId, dispatch) => {
    fetch(MESSAGES_BY_USER_URL(pageNr, userId), {
        method: "GET",
        headers: DEFAULT_HEADERS,
        mode: "cors"
    })
        .then(response => response.json())
        .then(data => {
            dispatch(setMessages(data.messages));
            dispatch(setTotalPages(data.totalPages));
        })
        .catch(error => {
            console.error(error)
        })
}

export default MessagesByPageAndUser
