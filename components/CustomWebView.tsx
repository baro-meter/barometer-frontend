import {WebView} from 'react-native-webview';

interface CustomWebViewProps {
  uri?: string;
}

const CustomWebView = ({uri}: CustomWebViewProps) => {
  return (
    <WebView
      source={{uri: uri ?? 'https://naver.com'}}
      originWhitelist={['https://*', 'http://*']}
    />
  );
};

export default CustomWebView;
