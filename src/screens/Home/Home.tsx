import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {Background, Header, UserProfile} from '../../components';

export default function Home() {
  return (
    <View style={{flex: 1}}>
      <Background />
      <View>
        <ScrollView>
          <View style={styles.container}>
            <Header />
            <UserProfile />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    maxWidth: 480,
    width: '100%',
    flex: 1,
  },
});
