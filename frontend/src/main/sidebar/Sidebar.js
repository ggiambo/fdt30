import React, {Fragment} from 'react'
import {Nav} from "react-bootstrap"
import {NavLink} from "react-router-dom"
import styles from './Sidebar.module.scss'
import {useDispatch, useSelector} from "react-redux"
import {logout} from "../../app/userSlice"
import {Divider, Drawer, IconButton} from "@mui/material";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import {setOpen} from "../../app/sidebarSlice";
import {setSuccess} from "../../app/alertsSlice";

const Sidebar = () => {

    const isLogged = useSelector(state => state.user.logged)
    const isOpen = useSelector(state => state.sidebar.open)
    const dispatch = useDispatch()

    return (
        <Drawer variant="persistent" anchor="left" open={isOpen}>
            <IconButton >
                {isOpen &&
                <ChevronLeft onClick={() => dispatch(setOpen(false))}/>
                }
            </IconButton>
            <Divider />
            <Nav defaultActiveKey="/" className="flex-column">
                <NavLink to={"/messages/0"} className={styles.link}
                         activeClassName={styles.selectedLink}>Messaggi</NavLink>
                <NavLink to={"/threads/0"} className={styles.link}
                         activeClassName={styles.selectedLink}>Threads</NavLink>
                {isLogged &&
                <Fragment>
                    <NavLink to={"/message"} className={styles.link}
                             activeClassName={styles.selectedLink}>Nuovo messaggio</NavLink>
                    <NavLink to={"/preferences"} className={styles.link}
                             activeClassName={styles.selectedLink}>Preferenze</NavLink>
                </Fragment>
                }
                {!isLogged &&
                <Fragment>
                    <NavLink to={"/login"} className={styles.link}
                             activeClassName={styles.selectedLink}>Login</NavLink>
                    <NavLink to={"/register"} className={styles.link}
                             activeClassName={styles.selectedLink}>Registrati</NavLink>
                </Fragment>
                }
                {isLogged &&
                <NavLink className={styles.link} to="/" onClick={() => doLogout(dispatch)}>Logout</NavLink>
                }
            </Nav>
        </Drawer>
    )
}

const doLogout = (dispatch) => {
    localStorage.removeItem("token")
    dispatch(logout())
    dispatch(setSuccess("Logout successfull"))
}

export default Sidebar