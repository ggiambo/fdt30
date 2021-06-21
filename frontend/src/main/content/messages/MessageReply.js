import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useHistory, useParams} from "react-router-dom"
import MessageEdit from "./MessageEdit"
import {doFetchMessage, doReplyMessage} from "../../../app/restOperations"

const MessageReply = () => {

    const subject = useSelector(state => state.message.subject)
    const markDown = useSelector(state => state.message.markDown)
    const history = useHistory()

    const dispatch = useDispatch()

    let {parentId} = useParams()
    useEffect(() => {
        doFetchMessage(parentId, dispatch)
    }, [parentId, dispatch])

    const saveHandleFunction = () => doReplyMessage(subject, markDown, parentId, dispatch, history)

    return (
        <MessageEdit title={"Rispondi al messaggio"} saveHandleFunction={saveHandleFunction}/>
    )
}

export default MessageReply