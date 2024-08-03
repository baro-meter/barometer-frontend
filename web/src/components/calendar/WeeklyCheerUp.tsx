import React, { useMemo } from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/cheerup.module.scss";

const cn = classNames.bind(scss);

interface WeeklyCheerUpViewProps {
  text: string;
  btnImage?: string;
}

const WeeklyCheerUpView = ({ text, btnImage }: WeeklyCheerUpViewProps) => {
  return (
    // <div className={cn('frame')}>
    //   <div className={cn('text-wrapper')}>BARO</div>
    //   <div className={cn('div')}>{text}</div>
    //   {btnImage && (
    //     <Image
    //       className={cn('vector')}
    //       alt="btn"
    //       src={btnImage}
    //       width={16}
    //       height={16}
    //     />
    //   )}
    // </div>
    <div className={cn("frame")}>
      <div className={cn("div")}>
        <div className={cn("div-2")}>
          <p className={cn("text-wrapper")}>{text}</p>
          <div className={cn("group")}>
            <div className={cn("rectangle")} />
          </div>
        </div>
        <div className={cn("element-wrapper")}>
          <p className={cn("element")}>
            <span className={cn("span")}>74</span>
            <span className={cn("text-wrapper-2")}>%</span>
          </p>
        </div>
      </div>
    </div>
  );
};

interface WeeklyCheerUpProps {
  state: "init" | "before" | "increase" | "finish";
}

// TODO global state로 관리하는게 나을수도?
/**
 * 주간 목표 격려 (상태에 따른 텍스트 표시)
 * - [init] 주간 목표 설정 전 (한 주의 시작): 이번 주도 주간목표를 설정해볼까요?
 * - [before] 목표 입력 전: 사소한 노력이 큰 변화를 만든답니다. 힘내세요!
 * - [increase] 목표 개수 증감 안내: 좋은 습관이 생겼네요. 목표를 더 늘려볼까요?
 * - [finish] 리워드 제공: 축하해요! 목표달성 선물을 드릴게요
 */
export default function WeeklyCheerUp({ state = "init" }: WeeklyCheerUpProps) {
  const text = useMemo(() => {
    switch (state) {
      case "before":
        return "사소한 노력이 큰 변화를 만든답니다. 힘내세요!";
      case "increase":
        return "좋은 습관이 생겼네요. 목표를 더 늘려볼까요?";
      case "finish":
        return "축하해요! 목표달성 선물을 드릴게요";
      default:
        return "이번 주도 주간목표를 설정해볼까요?";
    }
  }, [state]);
  const btnImage = useMemo(() => {
    if (state === "finish") {
      return `/calendar/cheerup_reward.svg`;
    } else if (state === "init") {
      return `/calendar/cheerup_next.svg`;
    }
    return undefined;
  }, [state]);
  const viewProps = { text, btnImage };

  return <WeeklyCheerUpView {...viewProps} />;
}
