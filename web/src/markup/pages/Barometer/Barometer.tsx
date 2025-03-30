import React from "react";
import CalendarHeader from "@/markup/components/calendar/CalendarHeaderView";
import { Title } from "@/markup/components/TitleView";
import { StatusLabel, StatusOption } from "@/markup/components/StatusLabelView";
import Textarea from "@/markup/components/TextareaView";
import ProgressList from "@/markup/components/ProgressListView";
import { Button } from "@/markup/components/ButtonView";
import Divider from "@/markup/components/Divider";
import HeaderView from "@/markup/components/HeaderView";
const Barometer = () => {
  const titleInfo = {
    title: "오늘 하루는 어땠나요?",
    titleType: "basic" as const,
    description: "생각한 하루와 다르다면 직접 수정해주세요.",
  };

  const statusOptions: StatusOption[] = [
    { status: "excellent", statusText: "완벽했어요" },
    { status: "good", statusText: "적당해요" },
    { status: "insufficient", statusText: "노력했어요" },
    { status: "poor", statusText: "못했어요" },
  ];

  const [selectedIndex, setSelectedIndex] = React.useState<number | undefined>(
    undefined
  );

  const handleStatusChange = (index: number) => {
    setSelectedIndex(index);
  };

  const progressList = [
    { task: "필라테스 주 5회", count: 5, isDone: true },
    { task: "Speak 주 7회", count: 7, isDone: false },
    { task: "하루에 7시간 이상 잠자기 🛌 ", count: 7, isDone: false },
  ];

  return (
    <div className="wrap">
      <main className="main">
        <HeaderView headerType="back" />
        <div className="contents">
          <Title {...titleInfo} />
          <StatusLabel
            options={statusOptions}
            checkedIndex={selectedIndex}
            onChange={handleStatusChange}
          />
          <Textarea
            textareaId="textarea"
            textareaName="textarea"
            fileId="file"
            fileName="file"
            placeholder="오늘 내 몸을 어떻게 관리했는지 알려주세요. 자세히 메모할수록 한번에 모아보기 좋아요."
            text=""
          />
          <Divider spacing={30} />
          <Title title="완료한 미션이 더 있나요?" titleType="sub" />
          <ProgressList
            alignment="vertical"
            progressList={progressList}
            onActiveProgress={() => {}}
          />
          {/* <Button type="submit" label="완료" shape="full" onClick={() => {}} /> */}
        </div>
        <div className="bottom-area">
          <div className="inner">
            <Button
              type="submit"
              label="완료"
              shape="full"
              onClick={() => {}}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Barometer;
