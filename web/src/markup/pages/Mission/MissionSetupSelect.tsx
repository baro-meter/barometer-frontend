import HeaderView from "@/markup/components/HeaderView";
import Button from "@/markup/components/ButtonView";
import Title from "@/markup/components/TitleView";
import MissionProgressView from "@/markup/components/MissionProgressView";
import scss from "@/styles/pages/mission.module.scss";
import classNames from "classnames/bind";
const cn = classNames.bind(scss);

const MissionSetupSelect = () => {
  return (
    <div className="wrap">
      <main className="main mission">
        <HeaderView headerType="progress" progressWidth={75} />
        <div className="contents">
          <div className="mission-content">
            <Title
              title="일과 후 산책 <br />이번 주에 얼마나 도전할까요?"
              description="횟수보다는 완수하는 것이 더 중요해요."
              titleType="full"
              allowHtml={true}
            />

            <div className={cn("mission-progress-container")}>
              <MissionProgressView
                currentDay={3}
                variant="large"
                title="미션 횟수"
                missionType="routine"
              />
            </div>
          </div>
        </div>
        <div className="fixed-area">
          <Button
            shape="default"
            as="a"
            href="/"
            label="이전"
            onClick={() => {}}
          />
          <Button
            shape="default"
            as="a"
            href="/"
            label="다음"
            onClick={() => {}}
          />
        </div>
      </main>
    </div>
  );
};

export default MissionSetupSelect;
