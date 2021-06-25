import React from 'react'
import {useDispatch} from "react-redux"
import {useParams} from "react-router-dom"
import MessageEdit from "./MessageEdit"
import {useGetMessageByIdQuery} from "../../../app/api";
import {setDanger} from "../../../app/alertsSlice";
import {Spinner} from "react-bootstrap";

const MessageReply = () => {

    let {parentId} = useParams()
    const {data, error, isLoading} = useGetMessageByIdQuery(parentId)

    const dispatch = useDispatch()
    if (error) {
        dispatch(setDanger(`Impossibile leggere i messaggi - ${error.message}`))
    }

    if (isLoading) {
        return <Spinner animation="border" variant="secondary"/>
    }

    const subject = `Re: ${data.subject}`
    const markDown = data.content.split("\n").map(line => `> ${line}`).join("\n")

    return (
        <MessageEdit
            title={"Rispondi al messaggio"}
            subject={subject}
            markDown={markDown}
            parentId={parentId}
        />
    )
}

export default MessageReply