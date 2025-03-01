import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeTabParamList} from '../utils/routerType';
import MonthlyScreen from './tabs/CalendarScreen';
import TestLoginScreen from './tabs/TestLoginScreen';
import SvgIcon from '../assets/icon/TabSvgIcon';
import MissionDeleteModal from '../components/modal/MissionDeleteModal';
import MissionNameEditModal from '../components/modal/MissionNameEditModal';
import {useState} from 'react';
import MissionCategorySelectModal, {
  CategoryType,
} from '../components/modal/MissionCategorySelectModal';

function ModalTestScreen() {
  const [modalVisible, setModalVisible] = useState<string | undefined>();
  return (
    <View style={styles.container}>
      <Text>Modal Test!</Text>
      <TouchableOpacity
        onPress={() => setModalVisible('modal_mission_delete')}
        style={styles.button}>
        <Text style={styles.buttonText}>미션 삭제 모달</Text>
      </TouchableOpacity>
      <MissionDeleteModal
        visible={modalVisible === 'modal_mission_delete'}
        onClose={() => setModalVisible(undefined)}
      />
      <TouchableOpacity
        onPress={() => setModalVisible('modal_mission_edit')}
        style={styles.button}>
        <Text style={styles.buttonText}>미션 수정 모달</Text>
      </TouchableOpacity>
      <MissionNameEditModal
        visible={modalVisible === 'modal_mission_edit'}
        onClose={() => setModalVisible(undefined)}
        onConfirm={result => console.log(result)}
      />
      <TouchableOpacity
        onPress={() => setModalVisible('modal_mission_category')}
        style={styles.button}>
        <Text style={styles.buttonText}>미션 카테고리 선택 모달</Text>
      </TouchableOpacity>
      <MissionCategorySelectModal
        visible={modalVisible === 'modal_mission_category'}
        onClose={() => setModalVisible(undefined)}
        onConfirm={(selectedCategory: CategoryType) => {
          console.log(`${selectedCategory.id} 선택됨`);
        }}
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
        component={ModalTestScreen}
        options={{
          tabBarLabel: 'Analytics',
          tabBarIcon: ({color}) => <SvgIcon name="Analytics" color={color} />,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={ModalTestScreen}
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
