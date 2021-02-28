/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AppScreen, LoginScreen, RegisterScreen} from './src/screens';
import {APP, LOGIN, REGISTER} from './src/constants';

const Stack = createStackNavigator();

const App = () => {
  const isSignedIn = 0;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={LOGIN}>
        {isSignedIn ? (
          <>
            <Stack.Screen name={APP} component={AppScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name={LOGIN} component={LoginScreen} />
            <Stack.Screen name={REGISTER} component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
