import HeaderView from "@/markup/components/HeaderView";
import Button from "@/markup/components/ButtonView";
import Title from "@/markup/components/TitleView";
import MissionLabel from "@/markup/components/MissionLabelView";
import scss from "@/styles/pages/mission.module.scss";
import classNames from "classnames/bind";
const cn = classNames.bind(scss);

const MissionSetup = () => {
  const missions = [
    {
      title: "규칙적인 생활",
      description: "일상의 규칙을 만들어 건강하게 생활해요.",
      iconType: true,
    },
    {
      title: "체중 관리",
      description: "식습관과 운동 관리로 가벼운 몸을 유지해요.",
      iconType: true,
    },
    {
      title: "마음의 여유",
      description: "평온한 하루를 위해 나에게 시간을 주세요.",
      iconType: true,
    },
    {
      title: "자기 개발",
      description: "지적 호기심을 높여 지식과 역량을 높여요.",
      iconType: true,
    },
    {
      title: "자유 미션",
      iconType: false,
    },
  ];

  return (
    <div className="wrap">
      <main className="main mission">
        <HeaderView headerType="progress" progressWidth={25} />
        <div className="contents">
          <div className="mission-content">
            <Title
              title="어떤 목적으로 <br />미션을 만드시나요?"
              titleType="full"
              description="적당한 미션을 만들 수 있도록 도와드릴게요."
              allowHtml={true}
            />
            <MissionLabel
              missions={missions}
              alignType={true}
              checkedIndex={0}
              onChange={() => {}}
            />
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

export default MissionSetup;
