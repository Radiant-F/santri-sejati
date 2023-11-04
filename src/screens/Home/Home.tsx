import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {
  Background,
  FloatingButton,
  HeaderHome,
  UserProfile,
  YaumiGraph,
  Gap,
  YaumiCalendar,
} from '../../components';

export default function Home() {
  return (
    <View style={{flex: 1}}>
      <Background />
      <ScrollView>
        <HeaderHome />
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
