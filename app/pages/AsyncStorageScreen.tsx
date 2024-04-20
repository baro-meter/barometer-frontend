import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import CustomWebView from '../components/CustomWebView';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../utils/routerType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {CommunicateDataType} from '../types/CommunicateDataType';

type Props = NativeStackScreenProps<RootStackParamList, 'Storage'>;

const AsyncStorageScreen = ({route}: Props) => {
  const {uri} = route.params;
  const [data, setData] = useState('');
  const isDarkMode = useColorScheme() === 'dark';
  const [requestData, setRequestData] = useState<
    CommunicateDataType | undefined
  >(); // post요청을 하고 싶을 때 해당 값의 상태를 변경하여 부모에게 알린다.

  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem('my-key', value);
      console.log('save! ' + value);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('my-key');
      if (value !== null) {
        // value previously stored
        setData(value);
        return value;
      }
    } catch (e) {
      // error reading value
    }
    return undefined;
  };

  useEffect(() => {
    getData();
  }, []);

  const handleGetAsyncData = () => {
    console.log('handleGetAsyncData');
    getData().then(savedData => {
      setRequestData({eventKey: 'asyncData', data: savedData});
    });
  };

  const receiveDataEventsType = {
    setAsyncData: storeData,
    getAsyncData: handleGetAsyncData,
  };

  const postEventHandler = (postedData: CommunicateDataType) => {
    // 전송이 성공되었으면 requestData를 초기화 한다.
    if (postedData === requestData) {
      setRequestData(undefined);
    }
  };

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.root}>
        <CustomWebView
          uri={uri}
          receiveDataEvents={receiveDataEventsType}
          initSendData={data}
          requestData={requestData}
          postEventHandler={postEventHandler}
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

export default AsyncStorageScreen;
