import {createSlice} from '@reduxjs/toolkit';

function getDaysInMonth(currentMonth: number) {
  switch (currentMonth) {
    case 0: // January
    case 2: // March
    case 4: // May
    case 6: // July
    case 7: // August
    case 9: // October
    case 11: // December
      return 31;
    case 3: // April
    case 5: // June
    case 8: // September
    case 10: // November
      return 30;
    case 1: // February
      const year = new Date().getFullYear(); // Get the current year
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        // Leap year
        return 29;
      } else {
        return 28;
      }
    default:
      return 0; // Invalid month index
  }
}

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

  calendar: {
    month: Array(getDaysInMonth(new Date().getMonth())).fill(false),
    selected_month: new Date().getMonth(),
  },
};

const yaumiSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setYaumi(state, {payload}) {
      state.graph_data = payload;
    },
    setCalendar(state, {payload}) {
      state.calendar.month = payload;
    },
    setSelectedMonth(state, {payload}) {
      state.calendar.selected_month = payload;
      state.calendar.month = Array(getDaysInMonth(payload)).fill(false);
    },
  },
});

export const {setYaumi, setCalendar, setSelectedMonth} = yaumiSlice.actions;

export default yaumiSlice.reducer;
