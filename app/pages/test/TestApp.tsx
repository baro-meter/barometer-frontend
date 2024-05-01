import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TestAppRootStackParamList} from '../../utils/routerType';
import TestHomeScreen from './TestHomeScreen';
import AppleHealthTestScreen from './AppleHealthTestScreen';
import WebViewScreen from './WebViewScreen';
import AsyncStorageScreen from './AsyncStorageScreen';
import BaroMeterHomeScreen from '../HomeScreen';

const Stack = createNativeStackNavigator<TestAppRootStackParamList>();

export default function TestApp() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={TestHomeScreen} />
      <Stack.Screen name="BaroMeter" component={BaroMeterHomeScreen} />
      <Stack.Screen name="Test" component={AppleHealthTestScreen} />
      <Stack.Screen name="WebView" component={WebViewScreen} />
      <Stack.Screen name="Storage" component={AsyncStorageScreen} />
    </Stack.Navigator>
  );
}
