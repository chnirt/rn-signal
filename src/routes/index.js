import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {fbAuth} from '../firebase';
import {
  LoginScreen,
  RegisterScreen,
  AppScreen,
  CreateChatScreen,
  ChatScreen,
} from '../screens';
import {MyLoading} from '../components';
import {
  LOGIN,
  REGISTER,
  APP,
  CREATE_CHAT,
  CHAT,
  PRIMARY_COLOR,
} from '../constants';

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: {backgroundColor: PRIMARY_COLOR},
  headerTitleStyle: {color: '#fff'},
  headerTintColor: '#fff',
};

export function AppStack() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Handle user state changes
  function onAuthStateChanged(authUser) {
    setLoading(true);

    setTimeout(() => {
      // console.log(authUser);
      setUser(authUser);
      if (initializing) setInitializing(false);

      setLoading(false);
    }, 1000);
  }

  useEffect(() => {
    const subscriber = fbAuth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (loading) return <MyLoading />;

  return (
    <Stack.Navigator
      initialRouteName={LOGIN}
      screenOptions={globalScreenOptions}>
      {!user ? (
        <>
          <Stack.Screen name={LOGIN} component={LoginScreen} />
          <Stack.Screen name={REGISTER} component={RegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name={APP} component={AppScreen} />
          <Stack.Screen name={CREATE_CHAT} component={CreateChatScreen} />
          <Stack.Screen name={CHAT} component={ChatScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
