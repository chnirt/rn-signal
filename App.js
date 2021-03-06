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
import {RecoilRoot} from 'recoil';

import {AppStack} from './src/routes';

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
