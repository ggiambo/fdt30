import React, {useEffect} from 'react'
import {useDispatch} from "react-redux"
import {useHistory, useParams} from "react-router-dom"
import Messages from "./Messages"
import {doFetchMessagesByPage} from "../../../../app/restOperations"

const MessagesByPage = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const gotoPage = (pageNr) => {
        history.push(`/messages/${pageNr}`)
    }

    let {pageNr} = useParams()
    useEffect(() => {
        doFetchMessagesByPage(pageNr, dispatch)
    }, [pageNr, dispatch])

    return (
        <Messages gotoPage={gotoPage}/>
    )
}

export default MessagesByPage
