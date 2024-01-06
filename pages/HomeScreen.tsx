import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {hasHealthKitAuth} from '../utils/AppleHealthKit';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../utils/routerType';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({navigation}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';

  const onPressGoStorageViewPage = () => {
    navigation.navigate('Storage', {uri: 'http://localhost:3000/test/storage'});
  };
  const onPressGoWebViewPage = () => {
    // navigation.navigate('WebView', {uri: 'https://www.google.com'});
    navigation.navigate('WebView', {uri: 'http://localhost:3000/test'});
  };

  const onPressGoToTestPage = () => {
    hasHealthKitAuth(available => {
      if (available) {
        navigation.navigate('Test');
      }
    });
  };

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.root}>
        {/* <CustomWebView /> */}
        <TouchableOpacity style={styles.button} onPress={onPressGoToTestPage}>
          <Text>건강 데이터 테스트 페이지 이동</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onPressGoWebViewPage}>
          <Text>webview 테스트 페이지 이동</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={onPressGoStorageViewPage}>
          <Text>Storage 테스트 페이지 이동</Text>
        </TouchableOpacity>
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
    marginBottom: 10,
  },
});

export default HomeScreen;
