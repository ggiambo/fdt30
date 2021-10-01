import React from 'react'
import {NavLink} from "react-router-dom"
import {AccountCircle} from "@mui/icons-material";
import {useSelector} from "react-redux"
import {IconButton} from "@mui/material";

const UserInfo = () => {

    const username = useSelector(state => state.user.name)

    return (
        <NavLink to={"/preferences"}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
            >
                <AccountCircle/>
            </IconButton>
        </NavLink>
    )
}

export default UserInfo