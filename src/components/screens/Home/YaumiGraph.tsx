import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BarChart} from 'react-native-chart-kit';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux';
import {useYaumiQuery} from '../../../redux/api/yaumiApiSlice';

export default function YaumiGraph() {
  const {} = useYaumiQuery(null);
  const yaumi = useSelector((state: RootState) => state.yaumi.graph_data);

  const data = {
    labels: ['STW', 'Dhuha', 'ODOJ', 'Infaq', 'Hafalan', 'Sholawat'],
    datasets: [
      {
        data: [
          yaumi.stw_jamaah.did,
          yaumi.dhuha.did,
          yaumi.odoj_umum.did,
          yaumi.infaq.did,
          yaumi.hafalan.did,
          yaumi.sholawat.did,
        ],
      },
    ],
  };
  const chartConfig = {
    bbackgroundGradientFrom: '#fff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    decimalPlaces: 0,
  };

  return (
    <View style={styles.container}>
      <ScrollView
        nestedScrollEnabled
        horizontal
        contentContainerStyle={{paddingRight: 20, paddingBottom: 10}}>
        <BarChart
          data={data}
          width={400}
          height={200}
          chartConfig={chartConfig}
          yAxisSuffix=" x"
          yAxisLabel=""
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
    borderRadius: 20,
    elevation: 5,
    overflow: 'hidden',
  },
});
