import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import CustomWebView from '../components/CustomWebView';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../utils/routerType';
import {useEffect} from 'react';

type Props = NativeStackScreenProps<RootStackParamList, 'WebView'>;

const WebViewScreen = ({route}: Props) => {
  const {uri} = route.params;
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    console.log(`uri 전달 됨: ${uri}`);
  }, []);

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.root}>
        <CustomWebView uri={uri} />
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
