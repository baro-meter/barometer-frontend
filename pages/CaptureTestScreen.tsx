import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../utils/routerType';
import {
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import CustomWebView from '../components/CustomWebView';
import {useState} from 'react';

type Props = NativeStackScreenProps<RootStackParamList, 'Capture'>;

const CaptureTestScreen = ({navigation, route}: Props) => {
  const {uri} = route.params;
  const isDarkMode = useColorScheme() === 'dark';
  const [imageBase64, setImageBase64] = useState<string>();

  const saveImage = (imageUrl: string) => {
    // 일단 테스트로 이미지가 제대로 표시되는지 확인함
    // TODO 나중에 지우기
    navigation.navigate('TestImage', {imageUrl});
    // 이 부분 활용하여 로컬 디바이스에 파일 저장되게 구현
    // TODO https://www.npmjs.com/package/rn-fetch-blob
    setImageBase64(imageUrl);
  };

  const receiveDataEventsType = {
    saveImage: saveImage,
  };
  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.root}>
        <CustomWebView uri={uri} receiveDataEvents={receiveDataEventsType} />
        {imageBase64 && <Image source={{uri: imageBase64}} />}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});

export default CaptureTestScreen;
