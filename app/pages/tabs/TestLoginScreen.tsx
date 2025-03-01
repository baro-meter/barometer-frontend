import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import CustomWebView from '../../components/CustomWebView';
import {HomeTabScreenProps} from '../../utils/routerType';
import React from 'react';

const MonthlyScreen = ({navigation, route}: HomeTabScreenProps<'Mission'>) => {
  const uri = 'http://localhost:3000/test/login';
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.root}>
        <CustomWebView uri={uri} receiveDataEvents={{}} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});

export default MonthlyScreen;
