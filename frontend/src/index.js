import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './palette.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Taverne} from "taverne/hooks";
import createLaTaverne from "taverne";
import items from "./reducers/reducer";
import {devtools} from 'taverne/middlewares';

const {dispatch, store} = createLaTaverne(
    {
        items
    }, [devtools]);

ReactDOM.render(
    <React.StrictMode>
        <Taverne dispatch={dispatch} store={store}>
            <App/>
        </Taverne>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
