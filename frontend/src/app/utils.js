import {DateTime} from "luxon"

export const getUserNameFromLocalStorage = () => {
    const token = localStorage.getItem("token")
    if (token == null) {
        return null
    }
    const parts = token.split(".")
    if (parts.length > 1) {
        const username = token.split(".")[1]
        try {
            const content = JSON.parse(atob(username))
            return content.sub
        } catch (e) {
            console.log(`Cannot parse username '${username}'`)
            localStorage.removeItem("token")
        }
    }
}

export const formatDate = (date) => {
    const isoDate = DateTime.fromISO(date)
    return isoDate.toLocaleString(DateTime.DATE_SHORT)
}

export const formatTime = (date) => {
    const isoDate = DateTime.fromISO(date)
    return isoDate.toLocaleString(DateTime.TIME_24_WITH_SECONDS)
}

export const formatDateTime = (date) => {
    return `${formatDate(date)} alle ${formatTime(date)}`
}
