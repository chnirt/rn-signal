import React, {useState} from 'react';
import {Image, KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {MyInput, MyButton} from '../../components';

export function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const login = () => {
    console.log('Login');
    console.log('email', email);
    console.log('pwd', pwd);
  };

  const navigateRegister = () => navigation.navigate('Register');

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image
        source={{
          uri:
            'https://upload.wikimedia.org/wikipedia/commons/5/56/Logo_Signal..png',
        }}
        style={styles.logo}
      />
      <View style={styles.inputContainer}>
        <MyInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          type="email"
          autoFocus
        />
        <MyInput
          value={pwd}
          onChangeText={setPwd}
          placeholder="Password"
          type="password"
          secureTextEntry
        />
      </View>

      <MyButton containerStyle={styles.button} onPress={login} title="Login" />
      <MyButton
        containerStyle={styles.button}
        onPress={navigateRegister}
        title="Register"
        type="outline"
      />

      <View style={styles.empty} />
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
  logo: {width: 200, height: 200},
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  empty: {
    height: 100,
  },
});
