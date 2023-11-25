// 웹 -> 앱 데이터 보내는 타입
export interface CommunicateDataType {
  eventKey: string;
  data?: any;
}

export function isCommunicateDataType(
  object: any,
): object is CommunicateDataType {
  return 'eventKey' in object;
}

export type ReceiveDataEventsType = {
  [eventKey: string]: (data: any) => void;
};
