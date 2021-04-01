import {MESSAGE_URL, AUTH_HEADERS} from "./const";

const saveNewMessage = (subject, content, callback) => {
    fetch(MESSAGE_URL, {
        method: "POST",
        headers: AUTH_HEADERS,
        mode: "cors",
        body: JSON.stringify({
            subject: subject,
            content: content
        })
    })
        .then(response => {
            callback(response.status);
        })
        .catch(error => {
            console.error()
        })
}

export default saveNewMessage