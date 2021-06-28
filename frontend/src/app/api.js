import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const BASE_URL = `${window.location.protocol}//${window.location.hostname}:8080/`

export const messagesApi = createApi({
    reducerPath: 'messagesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token")
            if (token) {
                headers.set("Authorization", "Bearer " + token)
            }
            return headers
        },
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
            query: ({subject, content, parentId}) => ({
                url: `message`,
                method: 'POST',
                body: {
                    subject: subject,
                    content: content,
                    parentId: parentId,
                }
            })
        }),
        getMessagesByThreadId: builder.query({
            query: (threadId) => `thread/${threadId}`,
        }),
        getThreadsByPage: builder.query({
            query: (pageNr) => `threads/${pageNr}`,
        }),
    }),
})

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token")
            if (token) {
                headers.set("Authorization", "Bearer " + token)
            }
            return headers
        },
    }),
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        getUserInfo: builder.query({
            query: (userId) => `user/${userId}`,
        }),
        getLoggedUserInfo: builder.query({
            query: () => `user`,
        }),
        getAvatarBase64: builder.query({
            query: (userId) => `avatar/${userId}`,
            transformResponse: (response) => {
                return btoa(response)
            }
        }),
        login: builder.mutation({
            query: ({username, password}) => ({
                url: `login`,
                method: 'POST',
                body: {
                    name: username,
                    password: password,
                }
            }),
            transformResponse: (data, meta) => meta?.response?.headers?.get("Authorization"),
        }),
        updateUser: builder.mutation({
            query: ({oldPassword, newPassword, avatarBase64}) => ({
                url: `user`,
                method: 'PATCH',
                body: {
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                    avatarBase64: avatarBase64
                }
            }),
        }),
        registerUser: builder.mutation({
            query: ({username, password, avatarBase64}) => ({
                url: `user`,
                method: 'POST',
                body: {
                    name: username,
                    password: password,
                    avatarBase64: avatarBase64
                }
            }),
            transformResponse: (data, meta) => meta?.response?.headers?.get("Authorization"),
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
    useGetLoggedUserInfoQuery,
    useGetAvatarBase64Query,
    useLoginMutation,
    useUpdateUserMutation,
    useRegisterUserMutation
} = userApi