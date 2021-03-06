import React, {useState} from 'react';
import {Image, KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {MyInput, MyButton} from '../../components';
import {fbAuth} from '../../firebase';

export function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('trinhchinchin@gmail.com');
  const [pwd, setPwd] = useState('12345678');

  const login = () => {
    // console.log('Login');
    // console.log('email', email);
    // console.log('pwd', pwd);

    fbAuth
      .signInWithEmailAndPassword(email, pwd)
      .then(() => {
        // console.log('User signed in anonymously');
      })
      .catch((error) => {
        if (error.code === 'auth/operation-not-allowed') {
          // console.log('Enable anonymous in your firebase console.');
        }

        // console.error(error);

        // eslint-disable-next-line no-alert
        alert(error.message);
      });
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
          autoCapitalize="none"
        />
        <MyInput
          value={pwd}
          onChangeText={setPwd}
          onSubmitEditing={login}
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
