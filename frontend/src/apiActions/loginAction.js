import {DEFAULT_HEADERS, LOGIN_URL} from "./const";

const login = (username, password, callback) => {
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

const setToken = (response) => {
    const authorization = response.headers.get("Authorization");
    const token = authorization.replace("Bearer", "").trim();
    localStorage.setItem("token", token);
}

export default login;