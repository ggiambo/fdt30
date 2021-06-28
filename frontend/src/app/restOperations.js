import {setDanger, setSuccess, setWarning} from "./alertsSlice"
import {login} from "./userSlice"

const BACKEND_URL = `${window.location.protocol}//${window.location.hostname}:8080`
const LOGIN_URL = BACKEND_URL + "/login"
const USER_URL = BACKEND_URL + "/user"
const DEFAULT_HEADERS = {"Content-Type": "application/json"}

export const doLogin = (username, password, dispatch, history) => {
    fetch(LOGIN_URL, {
        method: "POST",
        headers: DEFAULT_HEADERS,
        mode: "cors",
        body: JSON.stringify({
            name: username,
            password: password
        })
    })
        .then(response => {
            if (response.ok) {
                // set token in local storage
                const authorization = response.headers.get("Authorization")
                const token = authorization.replace("Bearer", "").trim()
                localStorage.setItem("token", token)
            }

            switch (response.status) {
                case 200:
                    dispatch(setSuccess("Login OK"))
                    dispatch(login(username))
                    history.push("/message")
                    break
                case 401:
                    dispatch(setWarning("Nome utente o password errati"))
                    break
                default:
                    dispatch(setDanger("Errore sconosciuto"))
            }
        })
        .catch(error => {
            console.error(error)
        })
}

export const doRegisterUser = (username, password, avatarBase64, dispatch) => {
    fetch(USER_URL, {
        method: "POST",
        headers: DEFAULT_HEADERS,
        mode: "cors",
        body: JSON.stringify({
            name: username,
            password: password,
            avatarBase64: avatarBase64
        })
    })
        .then(response => {
            switch (response.status) {
                case 200:
                    doLogin(username, password, dispatch)
                    break
                case 409:
                    dispatch(setDanger(`L'utente "${username}" esiste già`))
                    break
                default:
                    dispatch(setDanger("Errore nella registrazione"))
            }
        })
        .catch(error => {
            console.error(error)
        })
}
