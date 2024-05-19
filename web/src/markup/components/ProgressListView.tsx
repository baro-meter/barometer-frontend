import React from "react";
import classNames from "classnames/bind";
import scss from "styles/components/progress.module.scss";
import ProgressView from "markup/components/ProgressView"
const cn = classNames.bind(scss);

interface ProgresListView {
  alignment: "vertical" | "horizontal"
}

const ProgresListView = ({ alignment }: ProgresListView) => {
  return (
    <div className={cn("progress-list", `${alignment}`)}>
      <ProgressView task="일이삼사오육칠팔" width={70} count="2번" />
      <ProgressView task="걸어서 회사가기" width={10} count="매일" />
      <ProgressView task="우유 한잔 마시기" width={50} count="4번" isActive={true} />
      <ProgressView task="근력 운동 하기" width={20} count="2번" isActive={true} />
      <ProgressView task="출퇴근할때 계단으로 오르내리기 더써볼까 이거 계속늘어남 이게 맞을까~~~~?" width={90} count="1번" />
      <ProgressView task="이제 더이상 할게 없는데" width={80} count="2번" />
      <ProgressView task="모름.." width={60} count="2번" isActive={true} />
    </div>
  )
}

export default ProgresListView;