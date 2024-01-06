import {useCallback, useEffect, useRef, useState} from 'react';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import {
  CommunicateDataType,
  ReceiveDataEventsType,
  isCommunicateDataType,
} from '../types/CommunicateDataType';
import {Alert} from 'react-native';

interface CustomWebViewProps {
  uri?: string;
  injectedJavaScript?: string; // // 처음에 실행해야할 코드들 있으면 직접 제어 가능
  initSendData?: any; // 초기에 보내야 할 데이터 정보
  receiveDataEvents: ReceiveDataEventsType; // 웹 -> 앱 전송 이벤트 핸들러 처리
  requestData?: CommunicateDataType;
  postEventHandler?: (data: CommunicateDataType) => void;
}

const CustomWebView = ({
  uri,
  injectedJavaScript,
  initSendData,
  receiveDataEvents,
  requestData,
  postEventHandler,
}: CustomWebViewProps) => {
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    if (requestData && isCommunicateDataType(requestData)) {
      postDataToWeb(requestData);
    }
  }, [requestData]);

  const postDataToWeb = useCallback(
    (data: CommunicateDataType) => {
      if (webViewRef.current && !!data) {
        webViewRef.current.postMessage(JSON.stringify(data));
        if (!!postEventHandler) {
          postEventHandler(data);
        }
      }
    },
    [postEventHandler],
  );

  const initPostDataToWeb = useCallback(() => {
    if (!!initSendData) {
      console.log(`설정됨.... ${initSendData}`);
      postDataToWeb(initSendData);
    }
  }, [initSendData]);

  const handleReceiveEvent = useCallback(
    (data: string) => {
      if (!!receiveDataEvents) {
        try {
          // json인 경우 = type CommunicateDataType
          const json = JSON.parse(data) as CommunicateDataType;
          if (isCommunicateDataType(json)) {
            const {eventKey, data} = json;
            console.log(`${eventKey} - ${data}`);
            receiveDataEvents[eventKey](data);
          } else {
            throw Error('no CommunicateDataType type');
          }
        } catch {
          // json 이외의 타입인 경우는 없어야 한다.
          Alert.alert('적절치 않은 웹 -> 앱 데이터가 전송되었습니다.');
        }
      }
    },
    [receiveDataEvents],
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
          initPostDataToWeb();
        }
      } else {
        // 웹 -> 앱 데이터 전송 시 호출
        handleReceiveEvent(data);
      }
    },
    [initPostDataToWeb],
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
