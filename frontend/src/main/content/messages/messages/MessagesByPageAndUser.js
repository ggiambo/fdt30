import React from 'react'
import {useHistory, useParams} from "react-router-dom"
import Messages from "./Messages"
import {useGetMessagesByPageAndUserQuery} from "../../../../app/api";
import {Spinner} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {setDanger} from "../../../../app/alertsSlice";

const MessagesByPageAndUser = () => {

    const history = useHistory()
    const {userId, pageNr} = useParams()
    const gotoPage = (pageNr) => {
        history.push(`/messages/${pageNr}/user/${userId}`)
    }

    const {data, error, isLoading} = useGetMessagesByPageAndUserQuery({pageNr: pageNr, userId: userId})

    const dispatch = useDispatch()
    if (error) {
        dispatch(setDanger(`Impossibile leggere i messaggi - ${error.message}`))
    }

    if (isLoading) {
        return <Spinner animation="border" variant="secondary"/>
    }

    return <Messages gotoPage={gotoPage} totalPages={data.totalPages} messages={data.messages}/>
}

export default MessagesByPageAndUser
