/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TestApp from './pages/test/TestApp';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <TestApp />
    </NavigationContainer>
  );
}

export default App;
