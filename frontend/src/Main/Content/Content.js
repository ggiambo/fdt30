import React from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {useTaverne} from 'taverne/hooks';
import items from "../../reducers/reducer";
import {RESET_VALUE, SET_VALUE} from "../../reducers/reactions"

const Content = () => {

    const {dispatch, pour} = useTaverne();
    const items = pour('items');

    const onChange = (value) => {
        dispatch({
            type: SET_VALUE,
            value: value
        })
    }

    return (
        <Row className={"p-3"}>
            <Col>
                <h3>Content</h3>
                <Form.Control onChange={(e) => onChange(e.target.value)} value={items?.value}/>
                <Button onClick={() => dispatch({
                    type: RESET_VALUE
                })
                }>Reset</Button>


                <p>value: {items?.value}</p>
            </Col>
        </Row>
    )
}

export default Content