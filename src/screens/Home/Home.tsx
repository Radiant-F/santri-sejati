import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import React from 'react';
import {
  Background,
  FloatingButton,
  UserProfile,
  YaumiGraph,
  Gap,
  YaumiCalendar,
  Header,
} from '../../components';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  useYaumiCalendarQuery,
  useYaumiQuery,
} from '../../redux/api/yaumiApiSlice';

type Props = NativeStackScreenProps<ParamListBase, 'Home'>;

export default function Home({navigation}: Props) {
  const {isLoading: loadingYaumi, refetch: refetchYaumi} = useYaumiQuery(null);
  const {isLoading: loadingCalendar, refetch: refetchYaumiCalendar} =
    useYaumiCalendarQuery(new Date().getMonth() + 1);

  async function signOut() {
    try {
      await EncryptedStorage.removeItem('user_credentials');
      navigation.replace('SignIn');
    } catch (error) {
      const errorMessage = (error as Error).message;
      ToastAndroid.show(
        `Terjadi kesalahan: ${errorMessage}`,
        ToastAndroid.LONG,
      );
      console.log('ERROR Sign Out:', error);
    }
  }

  function confirmSignOut() {
    Alert.alert('Keluar?', 'Sesi Anda akan berakhir.', [
      {text: 'Batal'},
      {text: 'Keluar', onPress: () => signOut()},
    ]);
  }

  const loadingData = loadingYaumi || loadingCalendar;
  function refetchData() {
    refetchYaumiCalendar();
    refetchYaumi();
  }

  return (
    <View style={{flex: 1}}>
      <Background />
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={() => refetchData()}
            refreshing={loadingData}
          />
        }>
        <Header
          onPress={() => confirmSignOut()}
          iconName="logout"
          iconRotate="180deg"
          title="Santri Sejati"
        />
        <View style={styles.container}>
          <UserProfile />
          <Gap height={20} />
          <YaumiGraph />
          <Gap height={20} />
          <YaumiCalendar />
          <Gap height={80} />
        </View>
      </ScrollView>
      <FloatingButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    maxWidth: 480,
    width: '100%',
    flex: 1,
    padding: 20,
  },
});
