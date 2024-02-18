import {Image, View} from 'react-native';
import {RootStackParamList} from '../utils/routerType';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<RootStackParamList, 'TestImage'>;

const TestImageViewerScreen = ({route}: Props) => {
  const {imageUrl} = route.params;
  return (
    <View>
      <Image
        source={{
          uri: imageUrl,
        }}
        style={{width: 300, height: 300}}
      />
    </View>
  );
};

export default TestImageViewerScreen;
