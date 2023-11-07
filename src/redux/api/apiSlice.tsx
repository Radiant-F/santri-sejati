import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {RootState} from '..';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {Mutex} from 'async-mutex';
import EncryptedStorage from 'react-native-encrypted-storage';
import {setToken} from '../slices/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://dev.pondokdigital.pondokqu.id/api',
  credentials: 'include',
  prepareHeaders(headers, {getState}) {
    const token = (getState() as RootState).auth.token;
    if (token != '') headers.set('authorization', `Bearer ${token}`);
    headers.set('content-type', 'application/json');
    headers.set('accept', 'application/json');
    return headers;
  },
});

const mutex = new Mutex();
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result: any = await baseQuery(args, api, extraOptions);
  const invalidToken =
    result.data?.status == 'Authorization Token not found' ||
    result.data?.status == 'Token is Expired' ||
    result.data?.status == 'Token is Invalid';

  if (invalidToken) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const credentials = await EncryptedStorage.getItem('user_credentials');
        const {data}: any = await baseQuery(
          {
            url: '/login',
            body: credentials ? JSON.parse(credentials) : null,
            method: 'POST',
          },
          api,
          extraOptions,
        );

        api.dispatch(setToken(data.token));
        result = await baseQuery(args, api, extraOptions);
      } catch (error) {
        console.log('ERROR REAUTH:', error);
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({}),
  tagTypes: ['User'],
});
