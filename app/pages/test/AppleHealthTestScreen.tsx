import {useEffect, useState} from 'react';
import {
  NativeAppEventEmitter,
  NativeEventEmitter,
  NativeModules,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppleHealthKit, {permissions} from '../../utils/AppleHealthKit';
import {HealthObserver, HealthValue} from 'react-native-health';

const AppleHealthTestScreen = () => {
  const [authStatus, setAuthStatus] = useState<any>({});
  const [heartRates, setHeartRates] = useState<HealthValue[]>([]);
  const [stepCounts, setStepCounts] = useState<HealthValue>();
  const [dailySteps, setDailySteps] = useState<Array<Object>>([]);

  useEffect(() => {
    new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
      'healthKit:HeartRateVariabilitySDNN:new',
      () => {
        console.log('--> observer triggered');
        // getDataForObserver().then(()=>console.log('Success at fetching observed data'))
      },
    );
  }, []);

  /*
  TODO observer, background 설정
  - 근데 공식문서가 업데이트가 안되어있는 것 같다.
  useEffect(() => {
    AppleHealthKit.setObserver({type: HealthObserver.HeartRate});
    NativeAppEventEmitter.addListener(
      'healthKit:HeartRate:sample',
      async () => {
        console.log('--> observer triggered');
      },
    );
    // TODO background
    // new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
    //   'healthKit:HeartRate:new',
    //   async () => {
    //     console.log('--> observer triggered');
    //   },
    // );
  });
  */

  const handlePressGetAuthStatus = () => {
    AppleHealthKit.getAuthStatus(permissions, (err, result) => {
      if (err) {
        console.error(err);
      }
      setAuthStatus(result);
    });
  };

  const handlePressGetHeartRates = () => {
    let options = {
      startDate: new Date(2021, 0, 0).toISOString(), // required
      endDate: new Date().toISOString(), // optional; default now
      ascending: false, // optional; default false
      limit: 10, // optional; default no limit
    };

    AppleHealthKit.getHeartRateSamples(
      options,
      (callbackError: string, results: HealthValue[]) => {
        /* Samples are now collected from HealthKit */
        if (callbackError) {
          console.error(`getHeartRateSamples error: ${callbackError}`);
        } else {
          setHeartRates(results);
        }
      },
    );
  };

  // 걸음 입력했는데 안 갖고 와짐
  const handlePressGetStepCounts = () => {
    let options = {
      date: new Date().toISOString(), // optional; default now
      includeManuallyAdded: false, // optional: default true
    };

    AppleHealthKit.getStepCount(options, (err: Object, result: HealthValue) => {
      /* Samples are now collected from HealthKit */
      if (err) {
        console.error(`getStepCount error: ${err}`);
      } else {
        setStepCounts(result);
      }
    });
  };

  const handlePressDailyStepCount = () => {
    let options = {
      startDate: new Date(2016, 1, 1).toISOString(), // required
      endDate: new Date().toISOString(), // optional; default now
    };

    AppleHealthKit.getDailyStepCountSamples(
      options,
      (err: Object, results: Array<Object>) => {
        if (err) {
          console.error(`getDailyStepCountSamples error: ${err}`);
        } else {
          setDailySteps(results);
        }
      },
    );
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>React Native Health Example</Text>
          <Text onPress={handlePressGetAuthStatus}>
            Press me to get Auth Status
          </Text>
          <Text onPress={handlePressGetHeartRates}>
            Press me to get Heart Rates
          </Text>
          <Text onPress={handlePressGetStepCounts}>
            Press me to get Step Counts
          </Text>
          <Text onPress={handlePressDailyStepCount}>
            Press me to get Daily Step Counts
          </Text>
          <Text style={styles.sectionDescription}>
            authStatus
            {JSON.stringify(authStatus, null, 2)}
          </Text>
          <Text style={styles.sectionDescription}>
            heartRates
            {JSON.stringify(heartRates, null, 2)}
          </Text>
          <Text style={styles.sectionDescription}>
            stepCounts
            {JSON.stringify(stepCounts, null, 2)}
          </Text>
          <Text style={styles.sectionDescription}>
            Daily stepCounts
            {JSON.stringify(dailySteps, null, 2)}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default AppleHealthTestScreen;
