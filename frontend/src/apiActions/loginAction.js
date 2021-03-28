import {DEFAULT_HEADERS, LOGIN_URL} from "./const";

export const login = (username, password, callback) => {
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
                setToken(response)
            }
            callback(response.status);
        })
        .catch(error => {
            console.error()
        })
}

export const logout = () => {
    localStorage.removeItem("token")
    window.location.href = window.location.origin
}

const setToken = (response) => {
    const authorization = response.headers.get("Authorization");
    const token = authorization.replace("Bearer", "").trim();
    localStorage.setItem("token", token);
}