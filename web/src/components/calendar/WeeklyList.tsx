import ProgresListView from "@/markup/components/ProgressListView";
import { ProgressProps } from "@/markup/components/ProgressView";
import React, { useEffect, useState } from "react";

interface WeeklyListViewProps {
  progressList: ProgressProps[];
  handleActiveProgress: (item: ProgressProps) => void;
}

const WeeklyListView = ({
  progressList,
  handleActiveProgress,
}: WeeklyListViewProps) => {
  return (
    <>
      <div
        style={{
          padding: "20px",
          position: "fixed",
          right: 0,
          left: 0,
          bottom: 0,
          top: "155.5px",
        }}
      >
        <ProgresListView
          alignment={"vertical"}
          progressList={progressList}
          onActiveProgress={handleActiveProgress}
        ></ProgresListView>
        <button
          style={{
            position: "fixed",
            background: "black",
            color: "white",
            padding: "10px",
            left: "50%",
            transform: "translate(-50%, 0)",
            bottom: "30px",
          }}
        >
          오늘의 바로미터 작성
        </button>
      </div>
    </>
  );
};

interface WeeklyListPageProps {
  year: number;
  month: number;
  date: number;
}

export default function WeeklyList({ year, month, date }: WeeklyListPageProps) {
  const initData = [
    { task: "일이삼사오육칠팔", width: 70, count: "2번" },
    { task: "걸어서 회사가기", width: 10, count: "매일" },
    { task: "우유 한잔 마시기", width: 50, count: "4번" },
    { task: "근력 운동 하기", width: 20, count: "2번", isActive: true },
    {
      task: "출퇴근할때 계단으로 오르내리기 더써볼까 이거 계속늘어남 이게 맞을까~~~~?",
      width: 90,
      count: "1번",
    },
    { task: "이제 더이상 할게 없는데", width: 80, count: "2번" },
    {
      task: "모름..",
      width: 60,
      count: "2번",
      isActive: true,
    },
  ];

  const [progressList, setProgressList] = useState(initData);
  const handleActiveProgress = (item: ProgressProps) => {
    // TODO 나중에 VO 만들어서 task id로 비교
    console.log(`클릭됨: ${item.task}`);
    const findIndex = progressList.findIndex((_) => _ === item);
    setProgressList((prev) => {
      const changed = [...prev];
      changed[findIndex].isActive = true;
      // TODO api data 포맷 기획에 맞게 변경 후 api response값으로 계산 후 적용 필요
      return changed;
    });
    // TODO 활성화 api 호출
  };

  useEffect(() => {
    // TODO api 조회
    setProgressList(initData);
  }, [year, month, date]);

  const viewProps = { progressList, handleActiveProgress };

  return <WeeklyListView {...viewProps} />;
}
