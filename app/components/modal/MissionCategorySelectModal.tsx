import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ModalCommonProps} from '../../types/ModalType';
import {CategoryIcons} from '../../assets/icon';
import ResourceOfSvgIcon from '../../assets/icon/ResourceOfSvgIcon';

// TODO 추후 개발 시 type에 별도 명시 예정
export interface CategoryType {
  id: number;
  title: string;
  description: string;
  imageName: string;
}
interface MissionCategorySelectModalViewProps extends ModalCommonProps {
  categories: CategoryType[];
  selectedId: number | undefined;
  setSelectedId: React.Dispatch<React.SetStateAction<number | undefined>>;
  handleConfirm: () => void;
}

const MissionCategorySelectModalView = ({
  visible,
  categories,
  selectedId,
  setSelectedId,
  handleConfirm,
  onClose,
}: MissionCategorySelectModalViewProps) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>카테고리 선택</Text>
        <Text style={styles.subtitle}>설정한 미션 이름을 변경해보세요.</Text>

        <FlatList
          data={categories}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.categoryItem,
                selectedId === item.id && styles.selectedCategory,
              ]}
              onPress={() => setSelectedId(item.id)}>
              <ResourceOfSvgIcon
                style={styles.icon}
                iconSources={CategoryIcons}
                name={item.imageName}
              />
              {/* <Image source={item.image} style={styles.icon} /> */}
              <View>
                <Text style={styles.categoryTitle}>{item.title}</Text>
                <Text style={styles.categoryDescription}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          )}
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

interface MissionCategorySelectModalProps extends ModalCommonProps {
  onConfirm: (selectedCategory: CategoryType) => void;
}

export default function MissionCategorySelectModal({
  visible,
  onConfirm,
  onClose,
}: MissionCategorySelectModalProps) {
  const [selectedId, setSelectedId] = useState<number>();
  const categories = [
    {
      id: 1,
      title: '규칙적인 생활',
      description: '일상의 규칙을 만들어 건강하게 생활해요.',
      imageName: 'CategoryIcon1',
    },
    {
      id: 2,
      title: '체중 관리',
      description: '식습관과 운동 관리로 가벼운 몸을 유지해요.',
      imageName: 'CategoryIcon2',
    },
    {
      id: 3,
      title: '마음의 여유',
      description: '평온한 하루를 위해 나에게 시간을 주세요.',
      imageName: 'CategoryIcon3',
    },
    {
      id: 4,
      title: '자기 개발',
      description: '평온한 하루를 위해 나에게 시간을 주세요.',
      imageName: 'CategoryIcon4',
    },
  ];
  const handleConfirm = useCallback(() => {
    const selectedCategory = categories.find(it => it.id === selectedId);
    if (selectedCategory) {
      onConfirm(selectedCategory);
      onClose();
    }
  }, [selectedId]);

  const viewProps = {
    visible,
    categories,
    selectedId,
    setSelectedId,
    handleConfirm,
    onClose,
  };

  return <MissionCategorySelectModalView {...viewProps} />;
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
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedCategory: {
    backgroundColor: '#333',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  categoryTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  categoryDescription: {
    fontSize: 12,
    color: '#aaa',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
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
