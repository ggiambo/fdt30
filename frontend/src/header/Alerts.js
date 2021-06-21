import React from 'react'
import {Alert, Col} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import {delDanger, delSuccess, delWarning} from "../app/alertsSlice"

const Alerts = () => {

    const dispatch = useDispatch()

    const success = useSelector(state => state.alerts.success)
    const warning = useSelector(state => state.alerts.warning)
    const danger = useSelector(state => state.alerts.danger)

    return (
        <Col>
            {success &&
            <Alert variant={"success"} onClose={() => dispatch(delSuccess())} dismissible>{success}</Alert>
            }
            {warning &&
            <Alert variant={"warning"} onClose={() => dispatch(delWarning())} dismissible>{warning}</Alert>
            }
            {danger &&
            <Alert variant={"danger"} onClose={() => dispatch(delDanger())} dismissible>{danger}</Alert>
            }
        </Col>
    )
}

export default Alerts