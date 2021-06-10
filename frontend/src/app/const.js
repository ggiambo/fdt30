const BACKEND_URL = () => "http://" + window.location.hostname + ":8080";
export const LOGIN_URL = BACKEND_URL() + "/login"
export const MESSAGE_URL = BACKEND_URL() + "/message"
export const GET_MESSAGE_URL = (messageId) => BACKEND_URL() + `/message/${messageId}`
export const MESSAGES_URL = (pageNr) => BACKEND_URL() + `/messages/${pageNr}`
export const THREAD_URL = (threadId) => BACKEND_URL() + `/thread/${threadId}`
export const THREADS_URL = (pageNr) => BACKEND_URL() + `/threads/${pageNr}`
export const USER_URL = BACKEND_URL() + "/user"

export const DEFAULT_HEADERS = {"Content-Type": "application/json"};
export const AUTH_HEADERS = () => {
    return {
        ...DEFAULT_HEADERS,
        "Authorization": "Bearer " + localStorage.getItem("token")
    }
}