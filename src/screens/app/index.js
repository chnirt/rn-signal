import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';

import {MyButton} from '../../components';

export function AppScreen() {
  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <View style={styles.container}>
      <Text>App</Text>
      <MyButton
        containerStyle={styles.button}
        onPress={logout}
        title="Log out"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  button: {
    width: 200,
    marginTop: 10,
  },
});
