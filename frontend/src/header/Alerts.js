import React, {Fragment} from 'react'
import {Alert} from '@mui/material'
import {useDispatch, useSelector} from "react-redux"
import {delError, delSuccess, delWarning} from "../app/alertsSlice"

const Alerts = () => {

    const dispatch = useDispatch()

    const success = useSelector(state => state.alerts.success)
    const warning = useSelector(state => state.alerts.warning)
    const error = useSelector(state => state.alerts.error)

    return (
        <Fragment>
            {success &&
            <Alert severity={"success"} onClose={() => dispatch(delSuccess())} dismissible>{success}</Alert>
            }
            {warning &&
            <Alert severity={"warning"} onClose={() => dispatch(delWarning())} dismissible>{warning}</Alert>
            }
            {error &&
            <Alert severity={"error"} onClose={() => dispatch(delError())} dismissible>{error}</Alert>
            }
        </Fragment>
    )
}

export default Alerts