import {setYaumi} from '../slices/yaumiSlice';
import {apiSlice} from './apiSlice';

const yaumiApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    yaumi: builder.query({
      query: () => '/yaumi-santri/dashboard',
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const {data} = await queryFulfilled;
          dispatch(setYaumi(data.persentase_amal.original));
        } catch (error) {
          console.log('ERROR:', error);
        }
      },
    }),
    yaumiCalendar: builder.query({
      query: month => `/month/calendar/${month}`,
      async onQueryStarted(arg, {queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          console.log('SUCCESS:', Object.values(data));
        } catch (error) {
          console.log('ERROR:', error);
        }
      },
    }),
  }),
});

export const {useYaumiQuery, useYaumiCalendarQuery} = yaumiApiSlice;
