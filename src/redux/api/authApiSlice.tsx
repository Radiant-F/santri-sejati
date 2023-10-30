import {setToken} from '../slices/authSlice';
import {apiSlice} from './apiSlice';

interface ErrorResponse {
  error: {
    data: {
      message: string;
      status: string;
    };
    status: number;
  };
}

export const authApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    user: builder.query({
      query: () => '/user',
      providesTags: ['User'],
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          console.log('SUCCESS:', data);
        } catch (error) {
          const response = error as ErrorResponse;
          if (response.error) {
            console.log('RESPONSE ERROR:', response.error);
          } else console.log('SYNTAX ERROR:', error);
        }
      },
    }),
    signIn: builder.mutation({
      query: credentials => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          dispatch(setToken(data.token));
          console.log('SUCCESS:', data);
        } catch (error) {
          const response = error as ErrorResponse;
          if (response.error) {
            console.log('RESPONSE ERROR:', response.error.data);
          } else console.log('SYNTAX ERROR:', error);
        }
      },
    }),
    signUp: builder.mutation({
      query: credentials => ({
        url: '/register',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          console.log('SUCCESS:', data);
        } catch (error) {
          const response = error as ErrorResponse;
          if (response.error) {
            console.log('RESPONSE ERROR:', response.error.data);
          } else console.log('SYNTAX ERROR:', error);
        }
      },
    }),
  }),
});

export const {useSignInMutation, useSignUpMutation, useUserQuery} =
  authApiSlice;
