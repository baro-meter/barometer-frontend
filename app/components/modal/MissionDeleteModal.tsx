import React, {useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CheckboxIcon} from '../../assets/icon';
import {ModalCommonProps as ModalCommonProps} from '../../types/ModalType';

interface MissionDeleteModalViewProps extends ModalCommonProps {
  missions: MissionType[];
  toggleSelection: (item: MissionType) => void;
  getMissionStatus: (id: string) => 'checked' | 'unchecked';
}

const MissionDeleteModalView = ({
  visible,
  missions,
  onClose,
  toggleSelection,
  getMissionStatus,
}: MissionDeleteModalViewProps) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* 제목 */}
          <Text style={styles.title}>미션 삭제</Text>
          <Text style={styles.subtitle}>진행을 멈출 미션을 선택해주세요.</Text>

          {/* 미션 리스트 */}
          <FlatList
            data={missions}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.missionItem}
                onPress={() => toggleSelection(item)}>
                <Text style={styles.missionText}>{item.title}</Text>
                <CheckboxIcon
                  isChecked={getMissionStatus(item.id) === 'checked'}
                />
              </TouchableOpacity>
            )}
          />

          {/* 버튼 영역 */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>이전</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.nextButton]}>
              <Text style={styles.buttonText}>다음</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

interface MissionDeleteModalProps extends ModalCommonProps {}

interface MissionType {
  id: string;
  title: string;
}

export default function MissionDeleteModal({
  visible,
  onClose,
}: MissionDeleteModalProps) {
  const [selectedMissions, setSelectedMissions] = useState<{
    [key: string]: MissionType;
  }>({});

  const missions = [
    {id: '1', title: '일이삼사오육칠팔구십일이삼사오'},
    {id: '2', title: '일이삼사오육칠팔구십일이삼사오'},
    {id: '3', title: '일이삼사오육칠팔구십일이삼사오'},
    {id: '4', title: '일이삼사오육칠팔구십일이삼사오'},
  ] as Array<MissionType>;

  // 체크박스 선택 핸들러
  const toggleSelection = (item: MissionType) => {
    setSelectedMissions(prev => {
      let result = {...prev};
      if (!!result[item.id]) {
        delete result[item.id];
      } else {
        result[item.id] = item;
      }
      return result;
    });
  };

  const getMissionStatus = (id: string) => {
    return !!selectedMissions[id] ? 'checked' : 'unchecked';
  };

  const viewProps = {
    visible,
    missions,
    onClose,
    toggleSelection,
    getMissionStatus,
  };

  return <MissionDeleteModalView {...viewProps} />;
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
    marginVertical: 10,
  },
  missionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
  },
  missionText: {
    color: '#fff',
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  nextButton: {
    backgroundColor: '#444',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
