import React, {useLayoutEffect, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSetRecoilState} from 'recoil';

import {fbAuth} from '../../firebase';
import {MyButton, MyInput, MyText} from '../../components';
import {loadingState} from '../../recoils';
import {PLACEHOLDER_AVATAR} from '../../constants';

export function RegisterScreen() {
  const navigation = useNavigation();
  const setLoading = useSetRecoilState(loadingState);

  const [fullName, setFullName] = useState('Dao Vinh Ky');
  const [email, setEmail] = useState('ky.dao0109@gmail.com');
  const [pwd, setPwd] = useState('12345678');
  const [imageUrl, setImageUrl] = useState(
    '',
    // 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?cs=srgb&dl=pexels-tu%E1%BA%A5n-ki%E1%BB%87t-jr-1382731.jpg&fm=jpg',
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back to Login',
    });
  }, [navigation]);

  const register = () => {
    // console.log('Register');
    setLoading(true);

    fbAuth
      .createUserWithEmailAndPassword(email, pwd)
      .then((authUser) => {
        // console.log('User account created & signed in!');
        authUser.user.updateProfile({
          displayName: fullName,
          photoURL: imageUrl.length > 0 ? imageUrl : PLACEHOLDER_AVATAR,
        });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          // console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          // console.log('That email address is invalid!');
        }

        // console.error(error);
        // eslint-disable-next-line no-alert
        alert(error.message);
        setLoading(false);
      });
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
          autoCapitalize="none"
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
        disable={!email}
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
