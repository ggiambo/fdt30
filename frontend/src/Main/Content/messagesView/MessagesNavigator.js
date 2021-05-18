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

    const isFirstPage = actualPage === 1;
    const isLastPage = actualPage === totalPages;

    const pagesBefore = [];
    if (actualPage > 1) {
        pagesBefore.push(<Pagination.Prev onClick={() => getMessages(actualPage - 1, history)}/>); // previous
        pagesBefore.push(<Pagination.Item onClick={() => getMessages(1, history)}>1</Pagination.Item>); // first page
    }

    if (actualPage > 4) {
        pagesBefore.push(
            <Pagination.Ellipsis/>
        );
    }
    if (actualPage > 2) {
        pagesBefore.push(
            <Pagination.Item onClick={() => getMessages(actualPage - 2, history)}>{actualPage - 2}</Pagination.Item>
        ); // before-previous
    }
    if (actualPage > 3) {
        pagesBefore.push(
            <Pagination.Item onClick={() => getMessages(actualPage - 1, history)}>{actualPage - 1}</Pagination.Item>
        ); // previous
    }

    return (<Pagination>
            {pagesBefore.map((item, key) =>
                <Fragment key={key}>
                    {item}
                </Fragment>
            )}
        </Pagination>
    );
}

export default MessagesNavigator