import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux';

export default function YaumiCalendar() {
  const {calendar} = useSelector((state: RootState) => state.yaumi);
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
  function getDaysInMonth(monthIndex: number) {
    switch (monthIndex) {
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

  var selectedMonthDays = getDaysInMonth(0);

  return (
    <View>
      <View style={styles.viewHeader}>
        <TouchableNativeFeedback useForeground>
          <View style={styles.btnMonthNav}>
            <Icon name="chevron-left" size={30} color={'black'} />
          </View>
        </TouchableNativeFeedback>
        <View style={styles.viewTextMonth}>
          <Text style={styles.textMonth}>{months[monthIndex]}</Text>
        </View>
        <TouchableNativeFeedback useForeground>
          <View style={styles.btnMonthNav}>
            <Icon name="chevron-right" size={30} color={'black'} />
          </View>
        </TouchableNativeFeedback>
      </View>
      <View style={{height: 10}} />
      <View style={styles.viewCalendar}>
        <View style={styles.viewDates}>
          {calendar.map((val, index) => (
            <View key={index} style={styles.viewDate}>
              <Text>{index + 1}</Text>
            </View>
          ))}
        </View>
        <View style={styles.viewDetail}>
          <View>
            <View style={styles.viewStatus}>
              <Text style={styles.textStatus}>Mengisi</Text>
            </View>
            <View style={{height: 5}} />
            <View style={{...styles.viewStatus, backgroundColor: 'orange'}}>
              <Text style={{...styles.textStatus, color: 'black'}}>
                Belum Mengisi
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
