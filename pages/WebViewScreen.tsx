import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import CustomWebView from '../components/CustomWebView';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../utils/routerType';
import {useCallback, useEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';

type Props = NativeStackScreenProps<RootStackParamList, 'WebView'>;

const WebViewScreen = ({route}: Props) => {
  const {uri} = route.params;
  const isDarkMode = useColorScheme() === 'dark';
  const webViewRef = useRef<WebView>(null);
  // const [webViewLoaded, setWebViewLoaded] = useState(false);

  // iframe 원리: https://developer.mozilla.org/ko/docs/Web/API/Window/message_event
  // 첨에 데이터를 보내고 싶은데 이게 안됨 - 실행은 되는 것 같은데 타이밍이 다른듯?

  const initSendData = useCallback(() => {
    if (webViewRef.current) {
      webViewRef.current.postMessage('load 되어서 메세지 보냅니닷');
    }
  }, []);

  // 실패 산출물들
  // useEffect(() => {
  //   // 타이밍이 다 안맞는듯? 강제로 timeout 하니깐 됨
  //   setTimeout(() => {
  //     initSendData;
  //   }, 600);
  // }, []);

  // useEffect(() => {
  //   console.log('useEffect - ref');
  //   if (webViewRef.current) {
  //     webViewRef.current.postMessage('test 메시짐당33333');
  //   }
  // }, [webViewRef.current]);

  // useEffect(() => {
  //   if (webViewRef.current && webViewLoaded) {
  //     console.log('webView load 됨!');
  //     webViewRef.current.postMessage('load 돼서 메시지 보내여');
  //   }
  // }, [webViewLoaded]);

  // 처음에 실행해야할 코드들 있으면 직접 제어 가능
  const runFirst = `
    document.body.style.backgroundColor = 'red';
    true; // note: this is required, or you'll sometimes get silent failures
  `;

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.root}>
        {/* <CustomWebView uri={uri} injectedJavaScript={injectedJavaScript} /> */}
        <WebView
          source={{uri}}
          originWhitelist={['https://*', 'http://*']}
          ref={webViewRef}
          onMessage={event => {
            const {data} = event.nativeEvent;
            // 잘됨
            if (data === 'onload') {
              initSendData();
            }
          }}
          injectedJavaScript={runFirst}
          // onLoadEnd={() => setWebViewLoaded(true)} // 잘되나 타이밍 안맞음
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
