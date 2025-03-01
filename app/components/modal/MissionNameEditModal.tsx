import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ModalCommonProps} from '../../types/ModalType';

// TODO Modal기본 팝업
interface MissionNameEditModalViewProps extends ModalCommonProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  handleConfirm: () => void;
}

const MissionNameEditModalView = ({
  visible,
  name,
  onClose,
  handleConfirm,
  setName,
}: MissionNameEditModalViewProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>미션 수정</Text>
          <Text style={styles.subtitle}>설정한 미션 이름을 변경해보세요.</Text>

          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="미션 이름 입력"
            placeholderTextColor="#aaa"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleConfirm}>
              <Text style={styles.buttonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

interface MissionNameEditModalProps extends ModalCommonProps {
  missionName?: string;
  onConfirm: (result: string) => void;
}

export default function MissionNameEditModal({
  missionName,
  visible,
  onClose,
  onConfirm,
}: MissionNameEditModalProps) {
  const [name, setName] = useState(missionName ?? '');
  const handleConfirm = () => {
    onConfirm(name);
    onClose();
  };
  const viewProps = {name, visible, onClose, handleConfirm, setName};

  return <MissionNameEditModalView {...viewProps} />;
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    backgroundColor: '#222',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    backgroundColor: '#222',
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
