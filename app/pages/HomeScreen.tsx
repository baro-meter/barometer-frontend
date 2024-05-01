import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeTabParamList} from '../utils/routerType';
import MonthlyScreen from './tabs/CalendarScreen';

function EmptyScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Test!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator<HomeTabParamList>();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <Tab.Screen name="Calendar" component={MonthlyScreen} />
      <Tab.Screen name="Test" component={EmptyScreen} />
    </Tab.Navigator>
  );
}
