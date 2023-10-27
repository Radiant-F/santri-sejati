import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Navigation from './routes';
import {Provider} from 'react-redux';
import {store} from './redux';

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

const styles = StyleSheet.create({});
