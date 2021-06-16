import {DateTime} from "luxon"

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
