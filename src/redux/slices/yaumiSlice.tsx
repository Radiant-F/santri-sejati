import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  graph_data: {
    stw_jamaah: {
      did: 0,
      didnt: 0,
    },
    dhuha: {
      did: 0,
      didnt: 0,
    },
    odoj_umum: {
      did: 0,
      didnt: 0,
    },
    infaq: {
      did: 0,
      didnt: 0,
    },
    hafalan: {
      did: 0,
      didnt: 0,
    },
    sholawat: {
      did: 0,
      didnt: 0,
    },
  },
  calendar: [false, false, false, false, false],
};

const yaumiSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setYaumi(state, {payload}) {
      state.graph_data = payload;
    },
    setCalendar(state, {payload}) {
      state.calendar = payload;
    },
  },
});

export const {setYaumi, setCalendar} = yaumiSlice.actions;

export default yaumiSlice.reducer;
