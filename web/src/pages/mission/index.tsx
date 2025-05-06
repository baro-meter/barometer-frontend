import WeeklyCalendar from "@/components/calendar/WeeklyCalendar";
import dayjs from "dayjs";
import { GetServerSidePropsContext } from "next";
import React, { useEffect, useMemo, useState } from "react";
import weekOfYear from "dayjs/plugin/weekOfYear";
import utc from "dayjs/plugin/utc";
import { getFormatDayjs } from "@/utils/calendarUtil";
import WeeklyList from "@/components/calendar/MissionFiltering";
import "swiper/css";
import Header from "@/markup/components/HeaderView";
import {
  LastSavedDateForMissionState,
  lastSavedDateForMissionState,
} from "@/recoils/mission";
import { useRecoilState, useSetRecoilState } from "recoil";
import { selectedTabState } from "@/recoils/tab";
import { TabEnum } from "@/types/tab";
import { selectedDayjsState } from "@/recoils/calendar";
import { setHttpClientCredentials } from "@/services/httpClient";
import { QueryClient } from "@tanstack/react-query";

dayjs.extend(weekOfYear);
dayjs.extend(utc);

interface MissionPageViewProps {
  isLastWeek: boolean;
}

const MissionPageView = ({ isLastWeek }: MissionPageViewProps) => {
  return (
    <div className="wrap">
      {/* weekly: main에 weekly-view 클래스 추가 (하단 bottom-area가 스크롤 될 수 있도록) */}
      <main className="main calendar weekly-view">
        <Header
          headerType="basic"
          titleText={isLastWeek ? "LAST WEEK" : "THIS WEEK"}
        />
        <div className="contents">
          <div className="calendar-area">
            <WeeklyCalendar />
          </div>
        </div>
        <WeeklyList type="weekly" />
      </main>
    </div>
  );
};

interface MissonPageProps {
  isLastWeek?: boolean;
}

/**
 * 선택된 날짜 기준으로 week 구하는 법 (api 호출 기준)
 * - year: weekYear(https://day.js.org/docs/en/plugin/week-year)
 * - week: weekOfYear(https://day.js.org/docs/en/plugin/week-of-year)
 */

const MissionPage = ({}: MissonPageProps) => {
  const setSelectedTab = useSetRecoilState(selectedTabState);
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDayjsState);

  const [savedDate, setSavedDate] = useRecoilState(
    lastSavedDateForMissionState
  );
  const [hasMission, setHasMission] = useState<Boolean>();

  setSelectedTab(TabEnum.MISSION);

  useEffect(() => {
    let newSavedDate: LastSavedDateForMissionState = {
      lastAccessDate: getFormatDayjs(dayjs()),
      savedMissionDate: undefined,
    };
    let activeDate = dayjs(); // 캘린더 표시 기준 날짜 설정

    if (savedDate !== undefined) {
      // 저장된 미션 데이터가 있는 경우
      if (savedDate.savedMissionDate !== undefined) {
        // 저장된 데이터가 지난주 이후 데이터인 경우에만 저장된 미션을 사용한다.
        const today = dayjs();
        if (
          today.year() == savedDate.savedMissionDate.year &&
          today.week() - savedDate.savedMissionDate.week <= 1
        ) {
          newSavedDate.savedMissionDate = savedDate.savedMissionDate;
          setHasMission(true);
          activeDate = dayjs()
            .year(savedDate.savedMissionDate.year)
            .week(savedDate.savedMissionDate.week);
        } else {
          setHasMission(false);
        }
      } else {
        setHasMission(false);
      }
    }

    setSavedDate(savedDate);
    setSelectedDate(activeDate);
  }, []);

  const isLastWeek = useMemo(() => {
    if (selectedDate) {
      return selectedDate.isBefore(dayjs().subtract(7, "day"));
    }
    return false;
  }, [selectedDate]);

  if (hasMission === undefined) {
    // TODO 저장된 미션 날짜가 없는 경우 미션 설정 화면 표시
    return <></>;
  }

  if (hasMission === false) {
    // TODO 저장된 미션 날짜가 없는 경우 미션 설정 화면 표시
    return (
      <>
        <div style={{ color: "white" }}>NO MISSON</div>
      </>
    );
  }

  const viewProps = {
    isLastWeek,
  };

  return <MissionPageView {...viewProps} />;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {},
  };
};

export default MissionPage;
