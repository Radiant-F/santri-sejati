import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Background, Gap, Header} from '../../components';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';

type Props = NativeStackScreenProps<ParamListBase, 'YaumiForm'>;

export default function YaumiForm({navigation}: Props) {
  const [amalan, setAmalan] = useState([
    {
      status: 1,
      name: 'Sholat Subuh',
    },
    {
      status: 1,
      name: 'Sholat Dzuhur',
    },
    {
      status: 1,
      name: 'Sholat Ashar',
    },
    {
      status: 1,
      name: 'Sholat Maghrib',
    },
    {
      status: 1,
      name: 'Sholat Isya',
    },
    {
      status: 1,
      name: 'ODOJ',
    },
    {
      status: 1,
      name: 'Infaq',
    },
    {
      status: 1,
      name: "Hafalan Al-Qur'an",
    },
    {
      status: 1,
      name: 'Sholawat',
    },
  ]);

  function handleChecklist(id: number) {
    setAmalan(amalans => {
      return amalans.map((amalan, index) =>
        index == id ? {...amalan, status: amalan.status == 1 ? 2 : 1} : amalan,
      );
    });
  }

  return (
    <View style={{flex: 1}}>
      <Background />
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll>
        <Header title={'Isi Yaumi'} onPress={() => navigation.goBack()} />
        <View style={styles.container}>
          {amalan.map((value, index) => {
            return (
              <TouchableNativeFeedback
                useForeground
                key={index}
                onPress={() => handleChecklist(index)}>
                <View
                  style={{
                    ...styles.btnAmalan,
                    backgroundColor: value.status == 1 ? 'white' : '#ebe5ff',
                  }}>
                  <CheckBox
                    value={value.status == 2}
                    tintColors={{true: 'black', false: 'black'}}
                  />
                  <Text style={styles.textAmalan}>{value.name}</Text>
                </View>
              </TouchableNativeFeedback>
            );
          })}
        </View>
        <Gap height={20} />
        <TouchableNativeFeedback useForeground>
          <View style={styles.btnSave}>
            <Icon name="content-save-outline" color={'white'} size={20} />
            <Text style={styles.textSave}>Simpan</Text>
          </View>
        </TouchableNativeFeedback>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  textSave: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 5,
  },
  btnSave: {
    backgroundColor: '#7667AA',
    height: 50,
    borderRadius: 50 / 2,
    elevation: 3,
    alignSelf: 'center',
    width: 250,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  container: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  textAmalan: {
    color: 'black',
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  btnAmalan: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 10,
    padding: 5,
    borderRadius: 5,
    elevation: 3,
    marginHorizontal: 25,
  },
});
