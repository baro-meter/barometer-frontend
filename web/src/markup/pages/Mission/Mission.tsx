import React from "react";
import classNames from "classnames/bind";
import Header from "@/markup/components/HeaderView";
import Button from "@/markup/components/ButtonView";
import Text from "@/markup/components/TextView";
import MissionListView from "@/markup/components/MissionListView";
import { SubMissionItem } from "@/types/mission";
import scss from "@/styles/pages/mission.module.scss";

const cn = classNames.bind(scss);

const exampleSubMissions: Record<string, SubMissionItem[]> = {
  routine: [
    { title: "6시 기상하기", date: 1 },
    { title: "물 2L 마시기", date: 3 },
  ],
  weight: [
    { title: "30분 걷기", date: 4 },
    { title: "저녁 식사 절제하기", date: 5 },
  ],
  calm: [
    { title: "명상 10분", date: 6 },
    { title: "감사일기 쓰기", date: 7 },
  ],
  growth: [
    { title: "책 30페이지 읽기", date: 1 },
    { title: "영어 단어 20개 외우기", date: 3 },
  ],
};

interface MissionProps {
  hasMission: boolean;
}
const Mission = ({ hasMission }: MissionProps) => {
  const mainClassName = `main ${hasMission ? "mission" : "mission-none"}`;

  return (
    <div className="wrap">
      <main className={mainClassName}>
        <Header headerType="basic" titleText="이번 주 미션" />
        <div className="contents">
          {hasMission ? (
            <MissionListView viewType="both" subMissions={exampleSubMissions} />
          ) : (
            <>
              <Text
                as="p"
                size={16}
                color="color-system-gray-gray90"
                align="center"
                bold="semi-bold"
              >
                아직 미션을 설정하지 않았네요!
              </Text>
              <Text
                as="p"
                size={15}
                color="color-system-gray-gray40"
                align="center"
                className={cn("mission-text")}
              >
                간단한 것이라도 좋아요. <br /> 꾸준히 이뤄나가는 것이
                중요하니까요.
              </Text>
              <div className={cn("btn-area")}>
                <Button as="a" href="/" label="미션 추가" />
              </div>
            </>
          )}
        </div>

        {hasMission && (
          <div className="fixed-area">
            <Button as="a" href="/" label="미션 추가" />
          </div>
        )}
      </main>
    </div>
  );
};

export default Mission;
