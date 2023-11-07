import {setUser} from '../slices/authSlice';
import {apiSlice} from './apiSlice';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import axiosInstance from './axiosInstance';
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
      query: ({credentials}) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
      async onQueryStarted(
        {credentials, navigation, from},
        {dispatch, queryFulfilled},
      ) {
        try {
          const {data} = await queryFulfilled;

          const {data: userData} = await axiosInstance(data.token).get('/user');

          dispatch(setUser({token: data.token, user: userData.user}));

          await EncryptedStorage.setItem(
            'user_credentials',
            JSON.stringify(credentials),
          );

          navigation.replace('Home');
        } catch (error) {
          const response = error as ErrorResponse;
          if (response.error) {
            console.log('RESPONSE ERROR:', response.error.data);
            from == 'splash' && navigation.replace('SignIn');
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
      async onQueryStarted(credentials, {dispatch, queryFulfilled}) {
        console.log(credentials);
        try {
          const {data} = await queryFulfilled;

          const {data: data_login} = await axiosInstance().post(
            '/login',
            credentials,
          );
          const {data: data_user} = await axiosInstance(data_login.token).get(
            '/user',
          );

          console.log('SUCCESS:', data);
          console.log('SUCCESS2:', data_login);
          console.log('SUCCESS3:', data_user);
        } catch (error: any) {
          const response = error as ErrorResponse;
          if (response.error) {
            console.log('RESPONSE ERROR:', response.error.data);
          } else console.log('SYNTAX ERROR:', error?.response.data);
        }
      },
    }),
  }),
});

export const {useSignInMutation, useSignUpMutation} = authApiSlice;
