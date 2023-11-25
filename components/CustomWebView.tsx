import {useCallback, useRef} from 'react';
import {Alert} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';

interface CustomWebViewProps {
  uri?: string;
  injectedJavaScript?: string; // // 처음에 실행해야할 코드들 있으면 직접 제어 가능
  initSendData?: any; // 초기에 보내야 할 데이터 정보
  onReceiveData?: (data: any) => void;
}

const CustomWebView = ({
  uri,
  injectedJavaScript,
  initSendData,
  onReceiveData,
}: CustomWebViewProps) => {
  const webViewRef = useRef<WebView>(null);

  const postDataToWeb = useCallback(() => {
    if (webViewRef.current && !!initSendData) {
      webViewRef.current.postMessage(initSendData);
    }
  }, []);

  const handleReceiveEvent = useCallback(
    (data: any) => {
      if (!!onReceiveData) {
        let result = data;
        try {
          result = JSON.parse(data);
        } catch {}
        onReceiveData(result);
      }
    },
    [onReceiveData],
  );

  const handleMessage = useCallback(
    (event: WebViewMessageEvent) => {
      const {data} = event.nativeEvent;

      /**
       * 실행 순서 = window.onload -> nextjs.useEffect
       * - 그래서 어쩔 수 없이 nextJS 쪽에서 페이지 로드되자마자 데이터 받고 싶으면 `request`로 데이터 요청 필요
       */
      if (data === 'request') {
        //  앱 -> 웹 데이터를 요청할 때 호출
        if (webViewRef.current) {
          postDataToWeb();
        }
      } else {
        // 웹 -> 앱 데이터 전송 시 호출
        handleReceiveEvent(data);
      }
    },
    [postDataToWeb],
  );

  return (
    <WebView
      source={{uri: uri ?? 'https://naver.com'}}
      originWhitelist={['https://*', 'http://*']}
      injectedJavaScript={injectedJavaScript}
      ref={webViewRef}
      onMessage={handleMessage}
    />
  );
};

export default CustomWebView;
