import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Background, Header} from '../../components';

export default function YaumiForm() {
  return (
    <View style={{flex: 1}}>
      <Background />
      <Header title={'Isi Yaumi'} />
      <Text>YaumiForm</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
