import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import MissionProgressView from "@/markup/components/MissionProgressView";
import { MISSION_COLOR_KEYS, MissionProgressType } from "@/types/mission";
import { getColorValue } from "@/utils/colors";
import { Color } from "@/types/color";

const meta = {
  title: "Markup/Components/MissionProgress",
  component: MissionProgressView,
  tags: ["autodocs"],
  parameters: {
    controls: {
      exclude: ["onDayClick", "onCurrentDayChange"],
    },
  },
} satisfies Meta<typeof MissionProgressView>;

export default meta;
type Story = StoryObj<typeof MissionProgressView>;

// 기본 버전 (상단: Compact)
export const Default: Story = {
  args: {
    currentDay: 3,
    variant: "default",
    title: "미션 횟수",
    showLabels: true,
  },
};

// 큰 버전 (하단에 큰 텍스트)
export const Large: Story = {
  args: {
    currentDay: 3,
    variant: "large",
    showLabels: true,
  },
};

// 라벨 없는 버전
export const WithoutLabels: Story = {
  args: {
    currentDay: 3,
    variant: "default",
    showLabels: false,
  },
};

// 색상 정보 컴포넌트
const ColorInfo = ({ missionType }: { missionType: MissionProgressType }) => {
  const colorKey = MISSION_COLOR_KEYS[missionType] as Color;
  const colorValue = getColorValue(colorKey);
  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
      <div
        style={{
          width: "20px",
          height: "20px",
          backgroundColor: colorValue,
          borderRadius: "4px",
          marginRight: "8px",
        }}
      />
      <span style={{ color: "#797c80", fontSize: "12px" }}>{colorKey}</span>
    </div>
  );
};

// 미션 타입 예제들
export const MissionTypes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h3 style={{ color: "white", marginBottom: "10px" }}>규칙적인 생활</h3>
        <ColorInfo missionType="routine" />
        <MissionProgressView
          currentDay={4}
          variant="default"
          missionType="routine"
          title="규칙적인 생활"
        />
      </div>
      <div>
        <h3 style={{ color: "white", marginBottom: "10px" }}>체중 관리</h3>
        <ColorInfo missionType="weight" />
        <MissionProgressView
          currentDay={4}
          variant="default"
          missionType="weight"
          title="체중 관리"
        />
      </div>
      <div>
        <h3 style={{ color: "white", marginBottom: "10px" }}>마음의 여유</h3>
        <ColorInfo missionType="calm" />
        <MissionProgressView
          currentDay={4}
          variant="default"
          missionType="calm"
          title="마음의 여유"
        />
      </div>
      <div>
        <h3 style={{ color: "white", marginBottom: "10px" }}>자기 개발</h3>
        <ColorInfo missionType="growth" />
        <MissionProgressView
          currentDay={4}
          variant="default"
          missionType="growth"
          title="자기 개발"
        />
      </div>
      <div>
        <h3 style={{ color: "white", marginBottom: "10px" }}>자유 미션</h3>
        <ColorInfo missionType="free" />
        <MissionProgressView
          currentDay={4}
          variant="default"
          missionType="free"
          title="자유 미션"
        />
      </div>
    </div>
  ),
};
