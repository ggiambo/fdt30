import {Fragment, React} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Header/Header";
import Content from "./Main/Main";
import Footer from "./Footer/Footer";

const App = () => {
    return (
        <Fragment>
            <Header/>
            <Content/>
            <Footer/>
        </Fragment>
    );
}

export default App;
