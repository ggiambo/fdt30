import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useHistory} from "react-router-dom"
import MessageEdit from "./MessageEdit"
import {doSaveNewMessage} from "../../../app/restOperations"

const MessageNew = () => {

    const subject = useSelector(state => state.message.subject)
    const markDown = useSelector(state => state.message.markDown)
    const history = useHistory()

    const dispatch = useDispatch()

    const saveHandleFunction = () => doSaveNewMessage(subject, markDown, dispatch, history)

    return (
        <MessageEdit title={"Nuovo messaggio"} saveHandleFunction={saveHandleFunction}/>
    )
}

export default MessageNew