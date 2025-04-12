import HeaderView from "@/markup/components/HeaderView";
import Button from "@/markup/components/ButtonView";
import Title from "@/markup/components/TitleView";
import MissionLabel from "@/markup/components/MissionLabelView";
import scss from "@/styles/pages/mission.module.scss";
import classNames from "classnames/bind";
const cn = classNames.bind(scss);

const MissionSetupRecommand = () => {
  const missions = [
    {
      title: "일정한 수면 시간",
      description: "수면 패턴으로 체내 리듬을 규칙적으로 유지합니다.",
      iconType: false,
    },
    {
      title: "일과 후 산책",
      description: "지친 업무에서 벗어나 사색하며 스트레스를 관리합니다.",
      iconType: false,
    },
    {
      title: "충분한 한 끼 식사",
      description: "식사 시간을 일정하게 함으로써 소화기능을 향상시킵니다.",
      iconType: false,
    },
    {
      title: "매일 밤 독서",
      description: "시간이나 독서량을 정해 집중력과 사고력을 높여보세요.",
      iconType: false,
    },
    {
      title: "직접 입력",
      description: "생각해 둔 미션이 있다면 직접 입력해주세요.",
      iconType: false,
    },
  ];

  return (
    <div className="wrap">
      <main className="main mission">
        <HeaderView headerType="progress" progressWidth={50} />
        <div className="contents">
          <div className="mission-content">
            <Title
              title="규칙적인 생활을 만들 수 있는 <br />미션을 추천드릴게요"
              titleType="full"
              allowHtml={true}
            />
            <MissionLabel
              missions={missions}
              checkedIndex={0}
              onChange={() => {}}
            />
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

export default MissionSetupRecommand;
