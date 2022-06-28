import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const OTPAuthApi = createApi({
  reducerPath: 'OTPAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/user/' }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (user) => {
        return {
          url: 'login',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    verifyOTP: builder.mutation({
      query: (user) => {
        return {
          url: 'verify',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),

  }),
})

export const { useLoginUserMutation, useVerifyOTPMutation } = OTPAuthApi