import React, {useEffect} from 'react';
import {DEFAULT_HEADERS, MESSAGES_URL} from "../../../../app/const";
import {useDispatch} from "react-redux";
import {useHistory, useParams} from "react-router-dom"
import {setMessages, setTotalPages} from "../../../../app/messagesSlice";
import Messages from "./Messages";

const MessagesByPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const gotoPage = (pageNr) => {
        history.push(`/messages/${pageNr}`);
    }

    let {pageNr} = useParams();
    useEffect(() => {
        fetchMessages(pageNr, dispatch)
    }, [pageNr, dispatch])

    return (
        <Messages gotoPage={gotoPage}/>
    )
}

const fetchMessages = (pageNr, dispatch) => {
    fetch(MESSAGES_URL(pageNr), {
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

export default MessagesByPage
