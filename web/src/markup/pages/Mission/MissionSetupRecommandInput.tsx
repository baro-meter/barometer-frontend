import HeaderView from "@/markup/components/HeaderView";
import Button from "@/markup/components/ButtonView";
import Title from "@/markup/components/TitleView";
import Input from "@/markup/components/InputView";
import scss from "@/styles/pages/mission.module.scss";
import classNames from "classnames/bind";
const cn = classNames.bind(scss);

const MissionSetupRecommandInput = () => {
  return (
    <div className="wrap">
      <main className="main mission">
        <HeaderView headerType="progress" progressWidth={50} />
        <div className="contents">
          <div className="mission-content">
            <Title
              title="도전할 미션의 <br />이름은 무엇인가요?"
              titleType="full"
              allowHtml={true}
            />
            <div className={cn("mission-input")}>
              <Input id="mission-name" placeholder="미션명을 작성해주세요" />
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

export default MissionSetupRecommandInput;
