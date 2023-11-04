import React, {useEffect, useState} from 'react';

interface TestHealthTestPagePageViewProps {
  testData: string;
  handleClickBtn: () => void;
}

const TestHealthTestPagePageView = ({
  testData,
  handleClickBtn,
}: TestHealthTestPagePageViewProps) => {
  return (
    <>
      <div style={{position: 'absolute', height: '100%'}}>
        <div>{testData}</div>
        <button onClick={handleClickBtn}>click</button>
      </div>
    </>
  );
};

interface TestHealthTestPagePageProps {}

const TestHealthTestPagePage = ({}: TestHealthTestPagePageProps) => {
  const [testData, setTestData] = useState('aaa');

  useEffect(() => {
    // 타이밍 시점을 맞추기 위하여 로드가 다 되었다는걸 RN에 알린다.
    //@ts-ignore
    window.ReactNativeWebView.postMessage('onload');

    const onMessageEvent = async (e: MessageEvent | any) => {
      // e.stopPropagation();
      // 데이터를 처리하거나 저장할 수 있음
      console.log(`Received message: ${e.data}`);
      const data = e.data;
      let result = undefined;
      switch (typeof data) {
        case 'object':
          console.log('type is object');
          data as object;
          result = JSON.stringify(data);
          break;
        case 'string':
          result = data;
          break;
        default:
          result = 'none';
      }
      console.log(data);
      console.log(typeof data);
      setTestData(result);
    };

    document.addEventListener('message', onMessageEvent);
    window.addEventListener('message', onMessageEvent);

    return () => window.removeEventListener('message', onMessageEvent);
  }, []);

  const handleClickBtn = () => {
    // NEXT -> RN DATA 전송
    //@ts-ignore
    window.ReactNativeWebView.postMessage('request');
  };

  const viewProps = {testData, handleClickBtn};

  return <TestHealthTestPagePageView {...viewProps} />;
};

export const getServerSideProps = () => {
  return {
    props: {}, // will be passed to the page component as props
  };
};

export default TestHealthTestPagePage;
