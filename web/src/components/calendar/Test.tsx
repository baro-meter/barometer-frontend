import React from 'react';

interface TestViewProps {}

const TestView = ({}: TestViewProps) => {
  return <></>;
};

interface TestProps {}

export default function Test({}: TestProps) {
  const viewProps = {};

  return <TestView {...viewProps} />;
}
