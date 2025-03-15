import React from "react";
import classNames from "classnames/bind";
import Header from "@/markup/components/HeaderView";
import Button from "@/markup/components/ButtonView";
import Text from "@/markup/components/TextView";
import scss from "@/styles/pages/mission.module.scss";

const cn = classNames.bind(scss);

interface MissionProps {
  hasMission: boolean;
}
const Mission = ({ hasMission }: MissionProps) => {
  return (
    <div className="wrap">
      <main className="main">
        <Header headerType="basic" titleText="이번 주 미션" />
        <div className="contents">
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
            간단한 것이라도 좋아요. <br /> 꾸준히 이뤄나가는 것이 중요하니까요.
          </Text>

          {!hasMission && (
            <div className={cn("btn-area")}>
              <Button as="a" href="/" label="미션 추가" />
            </div>
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
