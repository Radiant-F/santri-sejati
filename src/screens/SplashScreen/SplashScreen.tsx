import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import EncryptedStorage from 'react-native-encrypted-storage';

interface Props {
  navigation: NativeStackHeaderProps['navigation'];
}

export default function SplashScreen({navigation}: Props) {
  async function refreshToken() {
    try {
      const credential = await EncryptedStorage.getItem('user_credential');
      if (credential) {
        navigation.replace('SignIn');
      } else navigation.replace('SignIn');
    } catch (error) {
      console.log(error);
      navigation.replace('SignIn');
    }
  }

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
