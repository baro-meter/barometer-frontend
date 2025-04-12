import React from "react";
import MissionSetup from "@/markup/pages/Mission/MissionSetup";
import MissionSetupRecommand from "@/markup/pages/Mission/MissionSetupRecommand";
import MissionSetupRecommandInput from "@/markup/pages/Mission/MissionSetupRecommandInput";
import MissionSetupSelect from "@/markup/pages/Mission/MissionSetupSelect";
import MissionSetupComplete from "@/markup/pages/Mission/MissionSetupComplete";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Markup/Pages/Mission/MissionSetup",
  component: MissionSetup,
} satisfies Meta<typeof MissionSetup>;

export default meta;
type Story = StoryObj<typeof meta>;

// 미션 선택 화면
export const Default: Story = {};

// 미션 추천 화면
export const Recommand: Story = {
  render: () => <MissionSetupRecommand />,
};

// 미션 추천 입력 화면
export const RecommandInput: Story = {
  render: () => <MissionSetupRecommandInput />,
};

// 미션 선택 화면
export const Select: Story = {
  render: () => <MissionSetupSelect />,
};

// 미션 완료 화면
export const Complete: Story = {
  render: () => <MissionSetupComplete />,
};
