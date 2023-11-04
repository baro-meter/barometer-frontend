import {useEffect, useRef} from 'react';
import {WebView} from 'react-native-webview';

interface CustomWebViewProps {
  uri?: string;
  injectedJavaScript?: string;
}

const CustomWebView = ({uri, injectedJavaScript}: CustomWebViewProps) => {
  const webViewRef = useRef<any>();

  useEffect(() => {
    console.log(injectedJavaScript);
  }, []);

  return (
    <WebView
      source={{uri: uri ?? 'https://naver.com'}}
      originWhitelist={['https://*', 'http://*']}
      injectedJavaScript={injectedJavaScript}
      ref={webViewRef}
    />
  );
};

export default CustomWebView;
