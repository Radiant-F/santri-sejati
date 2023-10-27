import {
  KeyboardEventName,
  KeyboardType,
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  Controller,
  ControllerProps,
  FieldErrors,
  useForm,
} from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  name: string;
  control: ControllerProps['control'];
  title?: string;
  type?: 'text' | string;
  placeholder?: string;
  errors: FieldErrors;
  iconName?: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
};

export default function FormInput({
  control,
  name,
  title = 'Email',
  type,
  placeholder = 'Placeholder...',
  errors,
  iconName = 'gmail',
  keyboardType,
  autoCapitalize,
}: Props) {
  const [secure, setSecure] = useState(true);
  return (
    <Controller
      control={control}
      name={name}
      rules={{required: true}}
      render={({field: {onChange, onBlur, value}}) => {
        return (
          <View>
            <Text style={{color: 'white'}}>{title}</Text>
            <View style={styles.inputContainer}>
              <Icon name={iconName} size={25} color={'white'} />
              <TextInput
                placeholder={placeholder}
                placeholderTextColor={'grey'}
                style={styles.textInput}
                onChangeText={onChange}
                secureTextEntry={type == 'password' && secure}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
              />
              {type == 'password' && (
                <TouchableNativeFeedback
                  useForeground
                  onPress={() => setSecure(!secure)}>
                  <View style={styles.btnEye}>
                    <Icon
                      name={secure ? 'eye-off-outline' : 'eye-outline'}
                      size={25}
                      color={'white'}
                    />
                  </View>
                </TouchableNativeFeedback>
              )}
            </View>
            <Text style={styles.textError}>
              {errors[name] && 'Perlu diisi'}
            </Text>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  btnEye: {
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35 / 2,
    overflow: 'hidden',
  },
  textError: {
    color: 'tomato',
    textAlign: 'right',
    margin: 2.5,
    fontSize: 12,
  },
  textInput: {
    color: 'white',
    marginHorizontal: 5,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    paddingHorizontal: 10,
  },
});
