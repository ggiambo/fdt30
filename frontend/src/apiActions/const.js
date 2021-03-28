export const BACKEND_URL = "http://localhost:8080";
export const LOGIN_URL = BACKEND_URL + "/login"
export const MESSAGE_URL = BACKEND_URL + "/message"

export const DEFAULT_HEADERS = {"Content-Type": "application/json"};
export const AUTH_HEADERS = {
    ...DEFAULT_HEADERS,
    "Authorization": "Bearer " + localStorage.getItem("token")
}