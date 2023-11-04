import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HeaderHome() {
  return (
    <View style={styles.container}>
      <Icon
        name="logout"
        color={'white'}
        size={25}
        style={{transform: [{rotate: '180deg'}]}}
      />
      <Text style={styles.textHeader}>Santri Sejati</Text>
      <Icon name="information-outline" color={'grey'} size={25} />
    </View>
  );
}

const styles = StyleSheet.create({
  textHeader: {
    color: 'white',
    marginHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    height: 50,
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});
