import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import React, {useState} from 'react';
import {useYaumiCalendarQuery} from '../../../redux/api/yaumiApiSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function YaumiCalendar() {
  const {data, refetch} = useYaumiCalendarQuery(new Date().getMonth() + 1);

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
        {[...Array(31).keys()].map((val, index) => (
          <View key={index} style={styles.viewDate}>
            <Text>{index + 1}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewDate: {
    width: 40,
    height: 40,
    backgroundColor: 'grey',
    borderRadius: 40 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  viewCalendar: {
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 20,
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
