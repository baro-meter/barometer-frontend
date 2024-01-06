/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './pages/HomeScreen';
import AppleHealthTestScreen from './pages/AppleHealthTestScreen';
import WebViewScreen from './pages/WebViewScreen';
import {RootStackParamList} from './utils/routerType';
import AsyncStorageScreenPage from './pages/AsyncStorageScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Test" component={AppleHealthTestScreen} />
        <Stack.Screen name="WebView" component={WebViewScreen} />
        <Stack.Screen name="Storage" component={AsyncStorageScreenPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
