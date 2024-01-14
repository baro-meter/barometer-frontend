import React from 'react';
import classNames from 'classnames/bind';
import scss from 'styles/barometerDate.module.scss';
import Image from 'next/image';

const cn = classNames.bind(scss);

type scoreType = 0 | 1 | 2 | 3 | 4;
type succesGoalCountType = 0 | 1 | 2 | 3 | 4 | 5;

interface BaroMeterDateViewProps {
  date: number;
  score: scoreType;
  successGoalCount: succesGoalCountType;
}

const BaroMeterDateView = ({
  date,
  score,
  successGoalCount,
}: BaroMeterDateViewProps) => {
  return (
    <div className={cn('date', 'date-today', 'calendar-column')}>
      <div className={cn('group')}>
        <Image
          className={cn('vector')}
          alt="Vector"
          fill
          src={'calendar/date-today.svg'}
        />
        <div className={cn('text-wrapper')}>{date}</div>
      </div>
      <div className={cn('frame')}>
        <div className={cn('ellipse')} />
        <div className={cn('ellipse')} />
        <div className={cn('ellipse')} />
        <div className={cn('ellipse')} />
        <div className={cn('ellipse')} />
      </div>
    </div>
  );
};

interface BaroMeterDateProps {
  date: number;
  score: scoreType;
  successGoalCount: succesGoalCountType;
}

export default function BaroMeterDate({
  date,
  score,
  successGoalCount,
}: BaroMeterDateProps) {
  const viewProps = {date, score, successGoalCount};

  return <BaroMeterDateView {...viewProps} />;
}
