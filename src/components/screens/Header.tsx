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
  onPress?: () => void | null;
  iconName?: string;
  iconRotate?: string;
  iconRightName?: string | null;
  iconRightRotate?: string;
};

export default function Header({
  title = 'Header',
  onPress,
  iconName = 'chevron-left',
  iconRotate = '0deg',
  iconRightName = null,
  iconRightRotate = '0deg',
}: Props) {
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        useForeground
        background={TouchableNativeFeedback.Ripple('#ffffff33', true, 20)}
        onPress={onPress}>
        <View style={styles.btnBack}>
          <Icon
            name={iconName}
            color={'white'}
            size={25}
            style={{transform: [{rotate: iconRotate}]}}
          />
        </View>
      </TouchableNativeFeedback>
      <View style={{width: 10}} />
      <Text style={styles.textTitle}>{title}</Text>
      {iconRightName && (
        <TouchableNativeFeedback
          useForeground
          background={TouchableNativeFeedback.Ripple('#ffffff33', true, 20)}
          onPress={onPress}>
          <View style={styles.btnBack}>
            <Icon
              name={iconRightName}
              color={'white'}
              size={25}
              style={{transform: [{rotate: iconRightRotate}]}}
            />
          </View>
        </TouchableNativeFeedback>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    flex: 1,
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
