import {Fragment, React} from 'react'
import '../App.scss'
import {useDispatch, useSelector} from "react-redux"
import Alerts from "./Alerts"
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {AccountCircle} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {setOpen} from "../app/sidebarSlice";

const Header = () => {

    const isLogged = useSelector(state => state.user.logged)
    const isSidebarOpen = useSelector(state => state.sidebar.open)
    const dispatch = useDispatch()

    return (
        <Fragment>
            <AppBar position="sticky">
                <Toolbar variant="dense">
                    {!isSidebarOpen &&
                    <IconButton color="inherit">
                        <MenuIcon onClick={() => dispatch(setOpen(true))}/>
                    </IconButton>
                    }
                    <Typography variant="h5"  sx={{flexGrow: 1}}>
                        Forum dei Troll 3.0
                    </Typography>
                    {isLogged &&
                    <IconButton component={Link} to={"/preferences"} color="inherit">
                        <AccountCircle/>
                    </IconButton>
                    }
                </Toolbar>
            </AppBar>
            <Alerts/>
        </Fragment>
    )
}

export default Header