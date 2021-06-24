import React from 'react'
import {useHistory, useParams} from "react-router-dom"
import Messages from "./Messages"
import {useGetMessagesByPageQuery} from "../../../../app/api";
import {Spinner} from "react-bootstrap";

const MessagesByPage = () => {
    const history = useHistory()
    const gotoPage = (pageNr) => {
        history.push(`/messages/${pageNr}`)
    }

    const {pageNr} = useParams()
    const {data, error, isLoading} = useGetMessagesByPageQuery(pageNr)

    if (isLoading) {
        return <Spinner animation="border" variant="secondary"/>
    }

    if (error) {
        return "error"
    }

    return <Messages gotoPage={gotoPage} totalPages={data.totalPages} messages={data.messages}/>
}

export default MessagesByPage
