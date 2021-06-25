import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const BASE_URL = `${window.location.protocol}//${window.location.hostname}:8080/`

export const messagesApi = createApi({
    reducerPath: 'messagesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
            /*
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem("token")
            if (token) {
                headers.set("Authorization", "Bearer " + token)
            }

        },
             */
    }),
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        getMessagesByPage: builder.query({
            query: (pageNr) => `messages/${pageNr}`,
        }),
        getMessagesByPageAndUser: builder.query({
            query: ({pageNr, userId}) => `messages/${pageNr}/user/${userId}`,
        }),
        getMessageById: builder.query({
            query: (messageId) => `message/${messageId}`
        }),
        saveMessage: builder.mutation({
            query: ({subject, markDown, parentId}) => ({
                url: `message`,
                body: {
                    subject: subject,
                    content: markDown,
                    parentId: parentId
                }
            })
        }),
        getMessagesByThreadId: builder.query({
            query: ({threadId}) => `thread/${threadId}`,
        }),
        getThreadsByPage: builder.query({
            query: (pageNr) => `threads/${pageNr}`,
        }),
    }),
})

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        getUserInfo: builder.query({
            query: (userId) => `user/${userId}`,
        }),
    })
})

export const {
    useGetMessagesByPageQuery,
    useGetMessagesByPageAndUserQuery,
    useGetMessageByIdQuery,
    useSaveMessageMutation,
    useGetMessagesByThreadIdQuery,
    useGetThreadsByPageQuery
} = messagesApi

export const {
    useGetUserInfoQuery,
} = userApi