import ProgresListView from "markup/components/ProgressListView";
import { ProgressProps } from "markup/components/ProgressView";
import React from "react";

interface WeeklyListViewProps {
  progressList: ProgressProps[];
}

const WeeklyListView = ({ progressList }: WeeklyListViewProps) => {
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

interface WeeklyListPageProps {}

const WeeklyList = ({}: WeeklyListPageProps) => {
  // TODO api 조회
  const progressList = [
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
  const viewProps = { progressList };

  return <WeeklyListView {...viewProps} />;
};

export const getServerSideProps = () => {
  // TODO api로 오늘 목표 조회
  return {
    props: {}, // will be passed to the page component as props
  };
};

export default WeeklyList;
