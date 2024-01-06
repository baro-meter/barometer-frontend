import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {Button} from 'stories/Button';

interface StoragePageViewProps {
  data: string;
  getSavedData: () => void;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleSaveData: () => void;
}

const StoragePageView = ({
  data,
  getSavedData,
  handleChange,
  handleSaveData,
}: StoragePageViewProps) => {
  return (
    <div>
      <div>
        <div>{data}</div>
        <Button label="데이터 불러오기" onClick={getSavedData} />
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
        <Button label="데이터 저장하기" onClick={handleSaveData} />
      </div>
    </div>
  );
};

interface StoragePageProps {}

const StoragePage = ({}: StoragePageProps) => {
  const [emotion, setEmotion] = useState<string>('perfect');
  const [data, setData] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setEmotion(e.target.value);
  };

  const handleSaveData = useCallback(() => {
    localStorage.setItem('data', emotion ?? '');
  }, [emotion]);

  const getSavedData = () => {
    const savedData = localStorage.getItem('data');
    if (!!savedData && savedData !== null) {
      console.log(`has Data`);
      setData(savedData);
    }
  };

  useEffect(() => {
    getSavedData();
  }, []);

  const viewProps = {getSavedData, handleChange, handleSaveData, data};

  return <StoragePageView {...viewProps} />;
};

export const getServerSideProps = () => {
  return {
    props: {}, // will be passed to the page component as props
  };
};

export default StoragePage;
