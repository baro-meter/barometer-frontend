import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {Button} from 'stories/Button';

interface StoragePageViewProps {
  localData: string;
  asyncData: string;
  getLocalStorageSavedData: () => void;
  getAsyncStorageSavedData: () => void;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleSaveLocalStorageData: () => void;
  handleSaveAsyncStorageData: () => void;
}

const StoragePageView = ({
  localData,
  asyncData,
  getLocalStorageSavedData,
  getAsyncStorageSavedData,
  handleChange,
  handleSaveLocalStorageData,
  handleSaveAsyncStorageData,
}: StoragePageViewProps) => {
  return (
    <div>
      <div>
        <div>{localData}</div>
        <button onClick={getLocalStorageSavedData}>
          localStorage 데이터 불러오기
        </button>
        <div>{asyncData}</div>
        <button onClick={getAsyncStorageSavedData}>
          asyncStorage 데이터 불러오기
        </button>
      </div>
      <div>
        <h2>데이터 설정</h2>
        <label>
          오늘 내 하루는 어땠나요:
          <select
            name="selectedEmotion"
            onChange={handleChange}
            defaultValue="perfect">
            <option value="perfect">완벽했어요</option>
            <option value="good">노력했어요</option>
            <option value="soso">보통이에요</option>
            <option value="bad">못했어요</option>
          </select>
        </label>
        <hr />
        <button onClick={handleSaveLocalStorageData}>
          localStoarge 데이터 저장하기
        </button>
        <button onClick={handleSaveAsyncStorageData}>
          asyncStoarge 데이터 저장하기
        </button>
      </div>
    </div>
  );
};

interface StoragePageProps {}

const StoragePage = ({}: StoragePageProps) => {
  const [emotion, setEmotion] = useState<string>('perfect');
  const [localData, setLocalData] = useState<string>('');
  const [asyncData, setAsyncData] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setEmotion(e.target.value);
  };

  const handleSaveLocalStorageData = useCallback(() => {
    localStorage.setItem('data', emotion ?? '');
  }, [emotion]);

  const getLocalStorageSavedData = () => {
    const savedData = localStorage.getItem('data');
    if (!!savedData && savedData !== null) {
      setLocalData(savedData);
    }
  };

  // TODO 자주쓰이니깐 hook으로 빼기
  useEffect(() => {
    // localStoarge
    getLocalStorageSavedData();

    // asyncStorage

    // 타이밍 시점을 맞추기 위하여 로드가 다 되었다는걸 RN에 알린다.
    //@ts-ignore
    window.ReactNativeWebView.postMessage('request');

    const onMessageEvent = async (e: MessageEvent | any) => {
      // 데이터를 처리하거나 저장할 수 있음
      try {
        const result = JSON.parse(e.data) as {eventKey: string; data: any};
        // 무조건 stringfy로 옴
        if (result.eventKey === 'asyncData') {
          setAsyncData(result.data);
        }
      } catch {
        alert('error!');
      }
    };

    // android는 document / ios는 window로 받아야 한다 함
    document.addEventListener('message', onMessageEvent);
    window.addEventListener('message', onMessageEvent);

    return () => {
      document.removeEventListener('message', onMessageEvent);
      window.removeEventListener('message', onMessageEvent);
    };
  }, []);

  const handleSaveAsyncStorageData = () => {
    // NEXT -> RN DATA 전송
    //@ts-ignore
    window.ReactNativeWebView.postMessage(
      JSON.stringify({eventKey: 'setAsyncData', data: emotion}),
    );
  };

  const getAsyncStorageSavedData = () => {
    // NEXT -> RN DATA 전송
    //@ts-ignore
    window.ReactNativeWebView.postMessage(
      JSON.stringify({eventKey: 'getAsyncData'}),
    );
  };

  const viewProps = {
    getAsyncStorageSavedData,
    getLocalStorageSavedData,
    handleChange,
    handleSaveLocalStorageData,
    handleSaveAsyncStorageData,
    localData,
    asyncData,
  };

  return <StoragePageView {...viewProps} />;
};

export const getServerSideProps = () => {
  return {
    props: {}, // will be passed to the page component as props
  };
};

export default StoragePage;
