import React, {useEffect} from 'react'
import {useDispatch} from "react-redux"
import {useHistory, useParams} from "react-router-dom"
import Messages from "./Messages"
import {doFetchMessagesByPageAndUser} from "../../../../app/restOperations"

const MessagesByPageAndUser = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const {userId} = useParams()
    const gotoPage = (pageNr) => {
        history.push(`/messages/${pageNr}/user/${userId}`)
    }

    const {pageNr} = useParams()
    useEffect(() => {
        doFetchMessagesByPageAndUser(pageNr, userId, dispatch)
    }, [pageNr, userId, dispatch])

    return (
        <Messages gotoPage={gotoPage}/>
    )
}

export default MessagesByPageAndUser
