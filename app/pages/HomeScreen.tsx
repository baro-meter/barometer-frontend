import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeTabParamList} from '../utils/routerType';
import MonthlyScreen from './tabs/CalendarScreen';
import SvgIcon from '../components/SvgIcon';

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
        tabBarActiveTintColor: '#C3C4C7',
        tabBarInactiveTintColor: '#5C6166',
        tabBarStyle: {backgroundColor: '#212324'},
      }}>
      <Tab.Screen
        name="Calendar"
        component={MonthlyScreen}
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({color}) => <SvgIcon name="Calendar" color={color} />,
        }}
      />
      <Tab.Screen
        name="Mission"
        component={EmptyScreen}
        options={{
          tabBarLabel: 'Mission',
          tabBarIcon: ({color}) => <SvgIcon name="Mission" color={color} />,
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={EmptyScreen}
        options={{
          tabBarLabel: 'Analytics',
          tabBarIcon: ({color}) => <SvgIcon name="Analytics" color={color} />,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={EmptyScreen}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({color}) => <SvgIcon name="Setting" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
