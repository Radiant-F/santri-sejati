import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  Button,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../../redux';
import {useYaumiCalendarQuery} from '../../../redux/api/yaumiApiSlice';
import {setSelectedMonth} from '../../../redux/slices/yaumiSlice';

export default function YaumiCalendar() {
  const dispatch = useDispatch();
  const {month, selected_month} = useSelector(
    (state: RootState) => state.yaumi.calendar,
  );
  const {refetch, isFetching} = useYaumiCalendarQuery(selected_month);
  useEffect(() => {
    refetch();
  }, [selected_month]);

  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const disableNext = selected_month == new Date().getMonth() || isFetching;
  const disablePrev = selected_month == 0 || isFetching;

  function navigateMonth(nextMonth: Boolean) {
    const selectedMonth = nextMonth ? selected_month + 1 : selected_month - 1;
    dispatch(setSelectedMonth(selectedMonth));
  }

  return (
    <View>
      <View style={styles.viewHeader}>
        <TouchableNativeFeedback
          useForeground
          disabled={disablePrev}
          onPress={() => navigateMonth(false)}>
          <View style={styles.btnMonthNav}>
            <Icon
              name="chevron-left"
              size={30}
              color={disablePrev ? 'grey' : 'black'}
            />
          </View>
        </TouchableNativeFeedback>
        <View style={styles.viewTextMonth}>
          <Text style={styles.textMonth}>{months[selected_month]}</Text>
        </View>
        <TouchableNativeFeedback
          useForeground
          disabled={disableNext}
          onPress={() => navigateMonth(true)}>
          <View style={styles.btnMonthNav}>
            <Icon
              name="chevron-right"
              size={30}
              color={disableNext ? 'grey' : 'black'}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
      <View style={{height: 10}} />
      <View style={styles.viewCalendar}>
        <View style={styles.viewDates}>
          {month?.map((value, index) => {
            const status = value ? 'green' : 'orange';
            const textStatus = value ? 'white' : 'black';
            return (
              <View
                key={index}
                style={{...styles.viewDate, backgroundColor: status}}>
                <Text style={{fontWeight: 'bold', color: textStatus}}>
                  {index + 1}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.viewDetail}>
          <View>
            <View style={styles.viewStatus}>
              <Text style={styles.textStatus}>Mengisi</Text>
            </View>
            <View style={{height: 5}} />
            <View style={{...styles.viewStatus, backgroundColor: 'orange'}}>
              <Text style={{...styles.textStatus, color: 'black'}}>
                Tidak/Belum Mengisi
              </Text>
            </View>
          </View>
          <TouchableNativeFeedback useForeground>
            <View style={styles.btnCalendar}>
              <Icon name="calendar-multiple" color={'black'} size={25} />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textStatus: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
  viewStatus: {
    backgroundColor: 'green',
    height: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25 / 2,
    elevation: 3,
    paddingHorizontal: 20,
  },
  viewDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  btnCalendar: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewCalendar: {
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 5,
  },
  viewDate: {
    width: 40,
    height: 40,
    backgroundColor: 'grey',
    borderRadius: 40 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  viewDates: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
  viewTextMonth: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    height: 35,
    paddingHorizontal: 20,
    justifyContent: 'center',
    width: 125,
    alignItems: 'center',
  },
  textMonth: {
    color: 'black',
    fontWeight: 'bold',
  },
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  btnMonthNav: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 40 / 2,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
