import {delWarning, setDanger, setSuccess, setWarning} from "./alertsSlice"
import {setMarkdown, setSubject, clear} from "./messageSlice"
import {setMessages, setTotalPages} from "./messagesSlice"
import {login} from "./userSlice"

const BACKEND_URL = `${window.location.protocol}//${window.location.hostname}:8080`
const LOGIN_URL = BACKEND_URL + "/login"
const MESSAGE_URL = BACKEND_URL + "/message"
const GET_MESSAGE_URL = (messageId) => BACKEND_URL + `/message/${messageId}`
const MESSAGES_URL = (pageNr) => BACKEND_URL + `/messages/${pageNr}`
const MESSAGES_BY_USER_URL = (pageNr, userId) => BACKEND_URL + `/messages/${pageNr}/user/${userId}`
const THREAD_URL = (threadId) => BACKEND_URL + `/thread/${threadId}`
const THREADS_URL = (pageNr) => BACKEND_URL + `/threads/${pageNr}`
const USER_URL = BACKEND_URL + "/user"
const USER_INFO_URL = (userId) => BACKEND_URL + `/user/${userId}`
const DEFAULT_HEADERS = {"Content-Type": "application/json"}
const AUTH_HEADERS = () => {
    return {
        ...DEFAULT_HEADERS,
        "Authorization": "Bearer " + localStorage.getItem("token")
    }
}

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

export const doUpdateUser = ({oldPassword, newPassword, avatarBase64, dispatch}) => {
    fetch(USER_URL, {
        method: "PATCH",
        headers: AUTH_HEADERS(),
        mode: "cors",
        body: JSON.stringify({
            oldPassword: oldPassword,
            newPassword: newPassword,
            avatarBase64: avatarBase64
        })
    })
        .then(response => {
            switch (response.status) {
                case 200:
                    dispatch(setSuccess("Utente modificato con successo"))
                    break
                case 403:
                    dispatch(setDanger(`Utente sconosciuto`))
                    break
                case 404:
                    dispatch(setDanger(`Errore nel cambio della password`))
                    break
                default:
                    dispatch(setDanger("Errore generico"))
            }
        })
        .catch(error => {
            console.error(error)
        })
}

export const doSaveNewMessage = (subject, markDown, dispatch, history) => {
    fetch(MESSAGE_URL, {
        method: "POST",
        headers: AUTH_HEADERS(),
        mode: "cors",
        body: JSON.stringify({
            subject: subject,
            content: markDown
        })
    })
        .then(response => {
            switch (response.status) {
                case 200:
                    dispatch(delWarning())
                    history.push("/messages/0")
                    dispatch(clear())
                    break
                case 403:
                    dispatch(setWarning("Non sei autorizzato a inserire il messaggio"))
                    break
                default:
                    dispatch(setWarning("Errore nell'inserimento del messaggio"))
            }
        })
        .catch(error => {
            console.error(error)
        })
}

export const doFetchMessage = (messageId, dispatch) => {
    fetch(GET_MESSAGE_URL(messageId), {
        method: "GET",
        headers: AUTH_HEADERS(),
        mode: "cors"

    })
        .then(response => {
            switch (response.status) {
                case 200:
                    dispatch(delWarning())
                    response.json().then(data => {
                        dispatch(setSubject("Re: " + data.subject))
                        dispatch(setMarkdown(data.content.split("\n").map(line => `> ${line}`).join("\n")))
                    })
                    break
                default:
                    dispatch(setWarning("Errore nel caricare il messaggio"))
            }
        })
        .catch(error => {
            console.error(error)
        })
}

export const doFetchMessagesByPage = (pageNr, dispatch) => {
    fetch(MESSAGES_URL(pageNr), {
        method: "GET",
        headers: DEFAULT_HEADERS,
        mode: "cors"
    })
        .then(response => response.json())
        .then(data => {
            dispatch(setMessages(data.messages))
            dispatch(setTotalPages(data.totalPages))
        })
        .catch(error => {
            console.error(error)
        })
}

export const doFetchMessagesByPageAndUser = (pageNr, userId, dispatch) => {
    fetch(MESSAGES_BY_USER_URL(pageNr, userId), {
        method: "GET",
        headers: DEFAULT_HEADERS,
        mode: "cors"
    })
        .then(response => response.json())
        .then(data => {
            dispatch(setMessages(data.messages))
            dispatch(setTotalPages(data.totalPages))
        })
        .catch(error => {
            console.error(error)
        })
}

export const doReplyMessage = (subject, markDown, parentId, dispatch, history) => {
    fetch(MESSAGE_URL, {
        method: "POST",
        headers: AUTH_HEADERS(),
        mode: "cors",
        body: JSON.stringify({
            subject: subject,
            content: markDown,
            parentId: parentId
        })
    })
        .then(response => {
            switch (response.status) {
                case 200:
                    dispatch(delWarning())
                    history.push("/messages/0")
                    dispatch(clear())
                    break
                default:
                    dispatch(setWarning("Errore nell'inserimento del messaggio"))
            }
        })
        .catch(error => {
            console.error(error)
        })
}

export const doFetchThread = (threadId, dispatch) => {
    fetch(THREAD_URL(threadId), {
        method: "GET",
        headers: DEFAULT_HEADERS,
        mode: "cors"
    })
        .then(response => response.json())
        .then(data => {
            dispatch(setMessages(data.messages))
        })
        .catch(error => {
            console.error(error)
        })
}

export const doFetchThreads = (pageNr, dispatch) => {
    fetch(THREADS_URL(pageNr), {
        method: "GET",
        headers: DEFAULT_HEADERS,
        mode: "cors"
    })
        .then(response => response.json())
        .then(data => {
            dispatch(setMessages(data.messages))
            dispatch(setTotalPages(data.totalPages))
        })
        .catch(error => {
            console.error(error)
        })
}

export const doFetchUserInfo = (userId, setUserInfo) => {
    fetch(USER_INFO_URL(userId), {
        method: "GET",
        headers: DEFAULT_HEADERS,
        mode: "cors"
    })
        .then(response => response.json())
        .then(data => {
            setUserInfo(data)
        })
        .catch(error => {
            console.error(error)
        })
}

export const doFetchAvatar = (setAvatarBase64, dispatch) => {
    fetch(USER_URL, {
        method: "GET",
        headers: AUTH_HEADERS(),
        mode: "cors",
    })
        .then(response => {
            switch (response.status) {
                case 200:
                    dispatch(delWarning())
                    response.json().then(data => {
                        setAvatarBase64(data.avatarBase64)
                    })
                    break
                default:
                    dispatch(setDanger("Errore generico"))
            }
        })
        .catch(error => {
            console.error(error)
        })
}