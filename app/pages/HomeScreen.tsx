import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeTabParamList} from '../utils/routerType';
import MonthlyScreen from './tabs/CalendarScreen';
import TestLoginScreen from './tabs/TestLoginScreen';
import SvgIcon from '../components/SvgIcon';
import ModalMissionDelete from '../components/modal/ModalMissionDelete';
import {useState} from 'react';

function EmptyScreen() {
  const [modalVisible, setModalVisible] = useState<string | undefined>();
  return (
    <View style={styles.container}>
      <Text>Modal Test!</Text>
      <TouchableOpacity
        onPress={() => setModalVisible('modal_mission_delete')}
        style={styles.button}>
        <Text style={styles.buttonText}>Open Modal</Text>
      </TouchableOpacity>
      <ModalMissionDelete
        visible={modalVisible === 'modal_mission_delete'}
        onClose={() => setModalVisible(undefined)}
      />
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
        component={TestLoginScreen}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
