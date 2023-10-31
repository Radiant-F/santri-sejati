import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux';

export default function UserProfile() {
  const {name, email} = useSelector((state: RootState) => state.auth.user);
  return (
    <View style={{flexDirection: 'row', margin: 20}}>
      <View style={styles.viewAccount}>
        <Icon name="account-circle" color={'black'} size={50} />
        <View style={{width: 10}} />
        <View style={{justifyContent: 'center', flex: 1}}>
          <Text style={styles.textName} numberOfLines={2}>
            {name}
          </Text>
          <Text style={{color: 'grey'}}>{email}</Text>
        </View>
      </View>
      <View style={{width: 10}} />
      <View>
        <View style={styles.viewPresence}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>20 kali</Text>
          <Text style={{color: 'green', fontSize: 12}}>mengisi</Text>
        </View>
        <View style={{height: 10}} />
        <View style={styles.viewAbsent}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>20 kali</Text>
          <Text style={{color: 'tomato', fontSize: 12}}>lalai</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewAbsent: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  viewPresence: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  textName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
    flex: 0.25,
  },
  viewAccount: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 5,
    overflow: 'hidden',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
});
