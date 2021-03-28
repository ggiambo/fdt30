export const isLoggedIn = () => {
    return  localStorage.getItem("token") !== null
}

export const getUsername = () => {
    if (isLoggedIn()) {
        const token = localStorage.getItem("token")
        const username = token.split(".")[1]
        const content = JSON.parse(atob(username))
        return content.sub
    }

    return undefined
}