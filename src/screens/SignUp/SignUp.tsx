import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import React from 'react';
import {useForm, FieldValues} from 'react-hook-form';
import {Background, FormInput, Gap} from '../../components';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';

type SignUpProps = NativeStackScreenProps<ParamListBase, 'SignUp'>;

export default function SignUp({navigation}: SignUpProps) {
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm();

  function submitForm(values: FieldValues) {
    console.log(values);
  }

  return (
    <View style={{flex: 1}}>
      <Background />
      <View style={styles.container}>
        <View style={styles.containerInput}>
          <Text style={styles.textTitle}>Daftar</Text>
          <FormInput
            control={control}
            errors={errors}
            name="name"
            title="Nama"
            iconName="account-outline"
            placeholder="Masukan nama"
            keyboardType="name-phone-pad"
          />
          <FormInput
            control={control}
            errors={errors}
            name="email"
            placeholder="contoh@email.com"
          />
          <FormInput
            control={control}
            errors={errors}
            name="password"
            type="password"
            iconName="lock-outline"
            title="Password"
            placeholder="Masukan password"
          />
        </View>
        <Gap height={10} />
        <TouchableNativeFeedback
          useForeground
          onPress={handleSubmit(submitForm)}>
          <View style={styles.btnSubmit}>
            <Text style={styles.textBtnSubmit}>Daftar</Text>
          </View>
        </TouchableNativeFeedback>
        <Gap height={10} />
        <TouchableNativeFeedback
          useForeground
          onPress={() => navigation.goBack()}>
          <View style={styles.btnRegister}>
            <Text style={styles.textBtnSubmit}>Kembali</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textBtnSubmit: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  btnRegister: {
    height: 50,
    width: 150,
    backgroundColor: '#403F81',
    borderRadius: 50 / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  btnSubmit: {
    height: 50,
    width: 225,
    backgroundColor: '#7667AA',
    borderRadius: 50 / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  textTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  containerInput: {
    // backgroundColor: '#ffffff30',
    width: '85%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
