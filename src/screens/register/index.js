import React, {useLayoutEffect, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {MyButton, MyInput, MyText} from '../../components';

export function RegisterScreen() {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back to Login',
    });
  }, [navigation]);

  const register = () => {
    console.log('Register');
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <MyText style={styles.title} h3>
        Create a Signal account
      </MyText>

      <View style={styles.inputContainer}>
        <MyInput
          value={fullName}
          onChangeText={setFullName}
          placeholder="FullName"
          type="text"
          autoFocus
        />
        <MyInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          type="email"
        />
        <MyInput
          value={pwd}
          onChangeText={setPwd}
          placeholder="Password"
          type="password"
          secureTextEntry
        />
        <MyInput
          value={imageUrl}
          onChangeText={setImageUrl}
          onSubmitEditing={register}
          placeholder="Profile Picture URL (optional)"
          type="text"
        />
      </View>

      <MyButton
        containerStyle={styles.button}
        onPress={register}
        title="Register"
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    marginBottom: 50,
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
