import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableNativeFeedback,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  title?: string;
};

export default function Header({title = 'Header'}: Props) {
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        useForeground
        background={TouchableNativeFeedback.Ripple('#ffffff33', true, 20)}>
        <View style={styles.btnBack}>
          <Icon name="chevron-left" color={'white'} size={25} />
        </View>
      </TouchableNativeFeedback>
      <View style={{width: 10}} />
      <Text style={styles.textTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
  btnBack: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginTop: StatusBar.currentHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
