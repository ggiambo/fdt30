import React, {Fragment} from 'react';
import {Pagination} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

const MessagesNavigator = ({actualPageNr, gotoPage}) => {

    const totalPages = useSelector(state => state.messages.totalPages);

    const pageNr = parseInt(actualPageNr);

    const isFirstPage = pageNr === 0;
    const isLastPage = pageNr === totalPages - 1;

    const goToFirst = isFirstPage ? null : <Pagination.First onClick={() => gotoPage(0)}/>;
    const goToLast = isLastPage ? null : <Pagination.Last onClick={() => gotoPage(totalPages - 1)}/>;

    const goToPrevious = isFirstPage ? null : <Pagination.Prev onClick={() => gotoPage(pageNr - 1)}/>;
    const goToNext = isLastPage ? null : <Pagination.Next onClick={() => gotoPage(pageNr + 1)}/>;

    const thisPage = <Pagination.Item>{pageNr + 1}</Pagination.Item>

    const paginations = [goToFirst, goToPrevious, thisPage, goToNext, goToLast];

    return (
        <Pagination>
            {paginations.map((item, key) => item && <Fragment key={key}>{item}</Fragment>)}
        </Pagination>
    );
}

export default MessagesNavigator