import {RootState} from '..';
import {setCalendar, setYaumi} from '../slices/yaumiSlice';
import {apiSlice} from './apiSlice';

const yaumiApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    yaumi: builder.query({
      query: () => '/yaumi-santri/dashboard',
      providesTags: ['Yaumi'],
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const {data} = await queryFulfilled;
          dispatch(setYaumi(data.persentase_amal.original));
        } catch (error) {
          console.log('ERROR YAUMI:', error);
        }
      },
    }),
    yaumiCalendar: builder.query({
      query: month => `/month/calendar/${month + 1}`,
      providesTags: ['Yaumi'],
      async onQueryStarted(arg, {queryFulfilled, dispatch, getState}) {
        try {
          const {data} = await queryFulfilled;
          const {month} = (getState() as RootState).yaumi.calendar;
          const combined = month.map((value, index) => {
            if (index < Object.values(data).length)
              return Object.values(data)[index];
            return value;
          });

          dispatch(setCalendar(combined));
        } catch (error) {
          console.log('ERROR YAUMI CALENDAR:', error);
        }
      },
    }),
    yaumiForm: builder.mutation({
      query: ({body}) => ({
        url: '/yaumi',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Yaumi'],
      async onQueryStarted({navigation}, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          navigation.goBack();
          console.log('SUCCESS YAUMI FORM', data);
        } catch (error) {
          console.log('ERROR YAUMI FORM', error);
        }
      },
    }),
  }),
});

export const {useYaumiQuery, useYaumiCalendarQuery, useYaumiFormMutation} =
  yaumiApiSlice;
