const BACKEND_URL = () => "http://" + window.location.hostname + ":8080";
export const LOGIN_URL = BACKEND_URL() + "/login"
export const MESSAGE_URL = BACKEND_URL() + "/message"
export const MESSAGES_URL = (pageNr) => BACKEND_URL() + `/messages/${pageNr}`
export const USER_URL = BACKEND_URL() + "/user"

export const DEFAULT_HEADERS = {"Content-Type": "application/json"};
export const getAuthHeaders = () => {
    return {
        ...DEFAULT_HEADERS,
        "Authorization": "Bearer " + localStorage.getItem("token")
    }
}