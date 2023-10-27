import {apiSlice} from './apiSlice';

const authApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    signin: builder.mutation({
      query: credentials => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          console.log('SUCCESS:', data);
        } catch (error) {
          console.log('ERROR:', error);
        }
      },
    }),
  }),
});

export const {useSigninMutation} = authApiSlice;
