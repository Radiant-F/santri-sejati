import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FloatingButton() {
  return (
    <TouchableNativeFeedback useForeground>
      <View style={styles.container}>
        <Icon name={'format-list-bulleted-square'} color={'white'} size={30} />
        <View style={{width: 10}} />
        <Text style={styles.textTitle}>Isi Yaumi</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    position: 'absolute',
    height: 55,
    bottom: 25,
    right: 20,
    borderRadius: 55 / 2,
    overflow: 'hidden',
    backgroundColor: '#403F81',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    elevation: 3,
  },
});
