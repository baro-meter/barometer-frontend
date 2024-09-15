import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';

export type TestAppRootStackParamList = {
  BaroMeter: NavigatorScreenParams<HomeTabParamList>;
  Home: undefined;
  Test: undefined;
  WebView: {uri: string};
  Storage: {uri: string};
};

export type TestAppRootStackScreenProps<
  T extends keyof TestAppRootStackParamList,
> = StackScreenProps<TestAppRootStackParamList, T>;

export type HomeTabParamList = {
  Calendar: undefined;
  Mission: undefined;
  Analytics: undefined;
  Setting: undefined;
};

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    TestAppRootStackScreenProps<keyof TestAppRootStackParamList>
  >;
