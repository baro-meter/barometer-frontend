export type BaroMeterScoreType = 1 | 2 | 3 | 4;

// api report 타입
export interface BaroMeterType {
  id: number;
  score: BaroMeterScoreType;
  date: string;
}
