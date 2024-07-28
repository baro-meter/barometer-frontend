import MonthlyCalendar from "@/components/Calendar/MonthlyCalendar";
import React, { useCallback } from "react";

interface CapturePageViewProps {
  handleSaveCaptureImage: () => void;
}

const CapturePageView = ({ handleSaveCaptureImage }: CapturePageViewProps) => {
  return (
    <div>
      <div id="capture_container">
        <MonthlyCalendar
          year={2024}
          month={5}
          date={29}
          onChangeViewMode={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
      <button onClick={handleSaveCaptureImage}>capture 이미지 저장</button>
    </div>
  );
};

interface CapturePageProps {}

const CapturePage = ({}: CapturePageProps) => {
  const handleSaveCaptureImage = useCallback(() => {}, []);
  const viewProps = { handleSaveCaptureImage };

  return <CapturePageView {...viewProps} />;
};

export const getServerSideProps = () => {
  return {
    props: {}, // will be passed to the page component as props
  };
};

export default CapturePage;
