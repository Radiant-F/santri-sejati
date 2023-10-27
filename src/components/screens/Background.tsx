import {Image, View, StyleSheet} from 'react-native';
import React from 'react';
import {ImgBackground} from '../../assets';

export default function Background() {
  return (
    <View style={styles.container}>
      <Image source={ImgBackground} style={styles.container} />
      <View
        style={{...styles.container, backgroundColor: 'black', opacity: 0.4}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
