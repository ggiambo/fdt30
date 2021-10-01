import React from 'react'
import {Container, Row} from "react-bootstrap"
import '../App.scss'
import {useSelector} from "react-redux"
import Alerts from "./Alerts"
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {AccountCircle} from "@mui/icons-material";
import {Link} from "react-router-dom";

const Header = () => {

    const isLogged = useSelector(state => state.user.logged)

    return (
        <Container className={"mb-2 mt-2"}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h5" color="inherit" component="div" sx={{flexGrow: 1}}>
                        Forum dei Troll 3.0
                    </Typography>
                    {isLogged &&
                    <IconButton component={Link} to={"/preferences"} color="inherit">
                        <AccountCircle/>
                    </IconButton>
                    }
                </Toolbar>
            </AppBar>
            <Row>
                <Alerts/>
            </Row>
        </Container>
    )
}

export default Header