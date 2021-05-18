import React, {Fragment} from 'react';
import {Pagination} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

const MessagesNavigator = ({actualPageNr}) => {

    const totalPages = useSelector(state => state.messages.totalPages);
    const history = useHistory();

    const pageNr = parseInt(actualPageNr);

    const isFirstPage = pageNr === 0;
    const isLastPage = pageNr === totalPages - 1;

    const goToFirst = isFirstPage ? null : <Pagination.First onClick={() => getMessages(0, history)}/>;
    const goToLast = isLastPage ? null : <Pagination.Last onClick={() => getMessages(totalPages - 1, history)}/>;

    const goToPrevious = isFirstPage ? null : <Pagination.Prev onClick={() => getMessages(pageNr - 1, history)}/>;
    const goToNext = isLastPage ? null : <Pagination.Next onClick={() => getMessages(pageNr + 1, history)}/>;

    const thisPage = <Pagination.Item>{pageNr + 1}</Pagination.Item>

    const paginations = [goToFirst, goToPrevious, thisPage, goToNext, goToLast];

    return (
        <Pagination>
            {paginations.map((item, key) => item && <Fragment key={key}>{item}</Fragment>)}
        </Pagination>
    );
}

const getMessages = (pageNr, history) => {
    history.push(`/messages/${pageNr}`);
}

export default MessagesNavigator