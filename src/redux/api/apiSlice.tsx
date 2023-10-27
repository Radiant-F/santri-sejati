import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {RootState} from '..';

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

export const apiSlice = createApi({
  baseQuery: baseQuery,
  endpoints: builder => ({}),
});
