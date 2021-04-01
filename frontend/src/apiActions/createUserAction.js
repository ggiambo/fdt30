import {USER_URL, DEFAULT_HEADERS} from "./const";

const createUser = (name, password, callback) => {
    fetch(USER_URL, {
        method: "POST",
        headers: DEFAULT_HEADERS,
        mode: "cors",
        body: JSON.stringify({
            name: name,
            password: password
        })
    })
        .then(response => {
            callback(response.status);
        })
        .catch(error => {
            console.error()
        })
}

export default createUser