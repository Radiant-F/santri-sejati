import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useSignInMutation} from '../../redux/api/authApiSlice';

interface Props {
  navigation: NativeStackHeaderProps['navigation'];
}

export default function SplashScreen({navigation}: Props) {
  const [signIn, {}] = useSignInMutation();

  async function refreshToken() {
    try {
      const credentials = await EncryptedStorage.getItem('user_credentials');
      if (credentials) {
        signIn({
          credentials: JSON.parse(credentials),
          navigation,
          from: 'splash',
        });
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
