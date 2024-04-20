import {Alert, Linking} from 'react-native';
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health';

const {HeartRate, Steps, StepCount} = AppleHealthKit.Constants.Permissions;

/* Permission options */
export const permissions = {
  permissions: {
    read: [HeartRate, StepCount],
    write: [StepCount],
  },
} as HealthKitPermissions;

export const hasHealthKitAuth = (callback: (available: boolean) => void) => {
  /**
   * NotDetermined = 0,
   * SharingDenied = 1,
   * SharingAuthorized = 2
   */
  AppleHealthKit.getAuthStatus(permissions, (err, results) => {
    if (err) {
      console.log('error getAuthStatus Healthkit: ', err);
      return;
    }
    console.log(results);

    // 일단 읽기 권한만 체크함
    const isDenied = results.permissions.read.find(p => p < 2);
    switch (isDenied) {
      case 0:
        Alert.alert(
          '건강 데이터 권한 없음',
          '앱 사용을 위해서 건강 데이터 권한 허용이 필요합니다.',
          [
            {
              text: '취소',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: '확인', onPress: () => requestHealthAuthorization()},
          ],
        );
        break;
      case 1:
      // TODO 확인 필요 - 설정 읽기 데이터 on/off와 상관없이 걍 1로 나오고 있음.. (심박수)
      // 2로 나왔다 1로 나왔다 지맘대로
      // Alert.alert(
      //   '건강 데이터 연동 실패',
      //   '공유가 허용되지 않은 데이터가 있습니다. 설정 > 건강 > 앱 데이터에서 공유 설정을 해주세요.',
      //   [
      //     {
      //       text: '취소',
      //       onPress: () => console.log('Cancel Pressed'),
      //       style: 'cancel',
      //     },
      //     {text: '확인', onPress: () => Linking.openSettings()},
      //   ],
      // );
      // break;
      default: // 읽기 권한 다 있음
        callback(true);
    }
  });
};

// 아예 권한이 없을 때만 창이 켜지고, 이후엔 설정에 들어가서 수정 필요
export const requestHealthAuthorization = () => {
  AppleHealthKit.initHealthKit(permissions, (error: string) => {
    /* Called after we receive a response from the system */

    if (error) {
      console.log('[ERROR] Cannot grant permissions!');
    }

    /* Can now read or write to HealthKit */

    const options = {
      startDate: new Date(2020, 1, 1).toISOString(),
    };

    AppleHealthKit.getHeartRateSamples(
      options,
      (callbackError: string, results: HealthValue[]) => {
        /* Samples are now collected from HealthKit */
      },
    );
  });
};

export default AppleHealthKit;
