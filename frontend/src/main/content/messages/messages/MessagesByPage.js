import React from 'react'
import {useHistory, useParams} from "react-router-dom"
import Messages from "./Messages"
import {useGetMessagesByPageQuery} from "../../../../app/api"
import {Spinner} from "react-bootstrap"
import {setDanger} from "../../../../app/alertsSlice"
import {useDispatch} from "react-redux"

const MessagesByPage = () => {
    const history = useHistory()
    const gotoPage = (pageNr) => {
        history.push(`/messages/${pageNr}`)
    }

    const {pageNr} = useParams()
    const {data, error, isLoading} = useGetMessagesByPageQuery(pageNr)

    const dispatch = useDispatch()
    if (error) {
        dispatch(setDanger(`Impossibile leggere i messaggi - ${error.message}`))
    }

    if (isLoading) {
        return <Spinner animation="border" variant="secondary"/>
    }

    return <Messages gotoPage={gotoPage} totalPages={data.totalPages} messages={data.messages}/>
}

export default MessagesByPage
