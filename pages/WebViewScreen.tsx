import {
  Alert,
  NativeEventEmitter,
  NativeModules,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import CustomWebView from '../components/CustomWebView';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../utils/routerType';
import {useEffect, useState} from 'react';
import AppleHealthKit from '../utils/AppleHealthKit';
import {ReceiveDataEventsType} from '../types/CommunicateDataType';

type Props = NativeStackScreenProps<RootStackParamList, 'WebView'>;

const WebViewScreen = ({route}: Props) => {
  const {uri} = route.params;
  const isDarkMode = useColorScheme() === 'dark';

  const handlePressDailyStepCount = () => {
    let options = {
      startDate: new Date(2016, 1, 1).toISOString(), // required
      endDate: new Date().toISOString(), // optional; default now
    };

    AppleHealthKit.getDailyStepCountSamples(
      options,
      (err: Object, results: Array<Object>) => {
        if (err) {
          console.error(`getDailyStepCountSamples error: ${err}`);
        } else {
          Alert.alert(JSON.stringify(results[0]));
        }
      },
    );
  };

  const receiveDataEventsType = {
    requestStepCount: handlePressDailyStepCount,
  };

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.root}>
        <CustomWebView
          uri={uri}
          initSendData="request하셔서 보내유"
          receiveDataEvents={receiveDataEventsType}
        />
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

export default WebViewScreen;
function setDailySteps(results: Object[]) {
  throw new Error('Function not implemented.');
}
