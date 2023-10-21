import {WebView} from 'react-native-webview';

const CustomWebView = () => {
  return (
    <WebView
      source={{uri: 'https://naver.com'}}
      originWhitelist={['https://*', 'http://*']}
    />
  );
};

export default CustomWebView;
