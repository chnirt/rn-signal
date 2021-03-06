import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useRecoilState} from 'recoil';

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
import {loadingState} from '../recoils';

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: {backgroundColor: PRIMARY_COLOR},
  headerTitleStyle: {color: '#fff'},
  headerTintColor: '#fff',
};

export function AppStack() {
  // Set an initializing state whilst Firebase connects
  const [loading, setLoading] = useRecoilState(loadingState);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state changes
  function onAuthStateChanged(authUser) {
    // console.log(authUser);
    setUser(authUser);
    if (initializing) setInitializing(false);

    setLoading(false);
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
