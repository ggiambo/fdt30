import React, {Fragment} from 'react';
import {Pagination} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

const MessagesNavigator = ({actualPage}) => {

    const totalPages = useSelector(state => state.messages.totalPages);
    const history = useHistory();

    const getMessages = (pageNr) => {
        history.push(`/messages/${pageNr}`);
    }

    const goToFirst = <Pagination.First onClick={() => getMessages(0, history)}/>
    const goTolast = <Pagination.Last onClick={() => getMessages(totalPages - 1, history)}/>

    const goToPrevious = actualPage > 0 ?
        <Pagination.Prev onClick={() => getMessages(actualPage - 1, history)}/> : null;
    const goToNext = actualPage < totalPages - 1 ?
        <Pagination.Next onClick={() => getMessages(totalPages - 1, history)}/> : null;

    const thisPage = <Pagination.Item>{parseInt(actualPage) + 1}</Pagination.Item>

    const paginations = [goToFirst, goToPrevious, thisPage, goToNext, goTolast];

    return (<Pagination>
            {paginations.map((item, key) => {
                if (item) {
                    return (<Fragment key={key}>{item}</Fragment>);
                }
            })
            }
        </Pagination>
    );
}

export default MessagesNavigator