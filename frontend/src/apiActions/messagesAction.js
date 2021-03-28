import {DEFAULT_HEADERS, MESSAGES_URL} from "./const";

const fetchMessages = (pageNr, callback) => {
    fetch(MESSAGES_URL(pageNr), {
        method: "GET",
        headers: DEFAULT_HEADERS,
        mode: "cors"
    })
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => {
            console.error(error)
        })
}

export default fetchMessages