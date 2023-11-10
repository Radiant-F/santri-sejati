import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {Background, Gap, Header} from '../../components';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useYaumiFormMutation} from '../../redux/api/yaumiApiSlice';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';

type Props = NativeStackScreenProps<ParamListBase, 'YaumiForm'>;

export default function YaumiForm({navigation}: Props) {
  const [yaumiForm, {isLoading}] = useYaumiFormMutation();

  const [amalan, setAmalan] = useState([
    {
      status: 0,
      name: 'Sholat Subuh',
    },
    {
      status: 0,
      name: 'Sholat Dzuhur',
    },
    {
      status: 0,
      name: 'Sholat Ashar',
    },
    {
      status: 0,
      name: 'Sholat Maghrib',
    },
    {
      status: 0,
      name: 'Sholat Isya',
    },
    {
      status: 0,
      name: 'Sholat Dhuha',
    },
    {
      status: 0,
      name: 'ODOJ',
    },
    {
      status: 0,
      name: 'Infaq',
    },
    {
      status: 0,
      name: "Hafalan Al-Qur'an",
    },
    {
      status: 0,
      name: 'Sholawat',
    },
  ]);

  function handleChecklist(id: number) {
    setAmalan(amalans => {
      return amalans.map((amalan, index) => {
        if (index == id)
          return {
            ...amalan,
            status: amalan.status == 0 ? 1 : 0,
          };
        else return amalan;
        // return index == id
        //   ? {...amalan, status: amalan.status == 0 ? 1 : 0}
        //   : amalan;
      });
    });
  }

  function submitForm() {
    const formData = {
      sholat_subuh: amalan[0].status,
      sholat_dzuhur: amalan[1].status,
      sholat_ashar: amalan[2].status,
      sholat_maghrib: amalan[3].status,
      sholat_isya: amalan[4].status,
      sholat_dhuha: amalan[5].status,
      odoj_umum: amalan[6].status,
      donasi_infaq: amalan[7].status,
      quran_hafalan_quran: amalan[8].status,
      lain_sholawat_100: amalan[9].status,
    };
    yaumiForm({body: formData, navigation});
  }

  function handleChecklistDraft(id: number) {
    setAmalan(amalans => {
      return amalans.map((amalan, index) => {
        const status_amalan =
          amalan.name == 'Sholat Dhuha'
            ? amalan.status == 0
              ? 1
              : 0
            : amalan.name.includes('Sholat') || amalan.name.includes('ODOJ')
            ? amalan.status == 1
              ? 2
              : 1
            : amalan.status == 0
            ? 1
            : 0;
        if (index == id)
          return {
            ...amalan,
            status: status_amalan,
          };
        else return amalan;
      });
    });
  }

  return (
    <View style={{flex: 1}}>
      <Background />
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll>
        <Header title={'Isi Yaumi'} onPress={() => navigation.goBack()} />
        <View style={styles.container}>
          {amalan.map((value, index) => {
            // const valueStatus =
            //   (value.name == 'Sholat Dhuha' && value.status == 1) ||
            //   (value.name.includes('Sholat') && value.status == 2) ||
            //   (!value.name.includes('Sholat') &&
            //     !value.name.includes('ODOJ') &&
            //     value.status == 1) ||
            //   value.status == 2;
            const valueStatus = value.status == 1;

            return (
              <TouchableNativeFeedback
                useForeground
                key={index}
                onPress={() => handleChecklist(index)}>
                <View
                  style={{
                    ...styles.btnAmalan,
                    backgroundColor: valueStatus ? '#ebe5ff' : 'white',
                  }}>
                  <CheckBox
                    value={valueStatus}
                    tintColors={{true: 'black', false: 'black'}}
                    onValueChange={() => handleChecklist(index)}
                  />
                  <Text style={styles.textAmalan}>{value.name}</Text>
                </View>
              </TouchableNativeFeedback>
            );
          })}
        </View>
        <Gap height={20} />
        <TouchableNativeFeedback useForeground onPress={submitForm}>
          <View style={styles.btnSave}>
            {isLoading ? (
              <ActivityIndicator color={'white'} />
            ) : (
              <>
                <Icon name="content-save-outline" color={'white'} size={20} />
                <Text style={styles.textSave}>Simpan</Text>
              </>
            )}
          </View>
        </TouchableNativeFeedback>
        <Gap height={30} />
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
