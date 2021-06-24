import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const messagesApi = createApi({
    reducerPath: 'messagesApi',
    baseQuery: fetchBaseQuery({baseUrl: `${window.location.protocol}//${window.location.hostname}:8080/`}),
    endpoints: (builder) => ({
        getMessagesByPage: builder.query({
            query: (pageNr) => `messages/${pageNr}`
        }),
        getMessagesByPageAndUser: builder.query({
            query: ({pageNr, userId}) => `messages/${pageNr}/user/${userId}`
        }),
        getMessagesByThreadId: builder.query({
            query: (threadId) => `thread/${threadId}`
        }),
        getThreadsByPage: builder.query({
            query: (pageNr) => `threads/${pageNr}`
        }),
    }),
})

export const {
    useGetMessagesByPageQuery,
    useGetMessagesByPageAndUserQuery,
    useGetMessagesByThreadIdQuery,
    useGetThreadsByPageQuery
} = messagesApi