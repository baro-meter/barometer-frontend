import HeaderView from "@/markup/components/HeaderView";
import Button from "@/markup/components/ButtonView";
import Text from "@/markup/components/TextView";
import MissionProgressView from "@/markup/components/MissionProgressView";
import MissionItemView from "@/markup/components/MissionItemView";
import scss from "@/styles/pages/mission.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import { basePath } from "next.config";
const cn = classNames.bind(scss);

const MissionSetupSelect = () => {
  return (
    <div className="wrap">
      <main className="main mission">
        <HeaderView headerType="back" />
        <div className="contents">
          <div className="mission-content">
            <Text as="h2" size={26} align="center" bold="bold" color="white">
              일과 후 산책
            </Text>
            <Text
              as="p"
              size={16}
              align="center"
              color="color-system-gray-gray50"
              className={cn("mission-description")}
            >
              더 건강해질 모습이 벌써 기대되네요!
            </Text>
            <Image
              src={`${basePath}/img/img-mission-complete.svg`}
              width={250}
              height={160}
              alt=""
              className={cn("mission-complete-image")}
            />
            <div className={cn("mission-progress-container")}>
              <MissionItemView
                mission={{
                  title: "일과 후 산책",
                  description: "더 건강해질 모습이 벌써 기대되네요!",
                  missionType: "routine", // 규칙적인 생활 타입
                }}
                viewType="missionOnly"
              >
                <button className={cn("mission-item-button")}>
                  <Image
                    src={`${basePath}/img/icon-change.svg`}
                    width={20}
                    height={20}
                    alt="미션 변경"
                  />
                </button>
              </MissionItemView>
              <MissionProgressView
                currentDay={5}
                variant="default"
                title="미션 횟수"
                missionType="routine"
              />
            </div>
          </div>
        </div>
        <div className="fixed-area">
          <Button
            shape="full"
            as="a"
            href="/"
            label="완료"
            onClick={() => {}}
          />
        </div>
      </main>
    </div>
  );
};

export default MissionSetupSelect;
