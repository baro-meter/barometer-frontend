import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface ModalMissionDeleteViewProps {
  visible: boolean;
  onClose: () => void;
}

const ModalMissionDeleteView = ({
  visible,
  onClose,
}: ModalMissionDeleteViewProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose()}>
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => onClose()}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>This is a Modal!</Text>
          <TouchableOpacity onPress={() => onClose()} style={styles.button}>
            <Text style={styles.buttonText}>Close Modal</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

interface ModalMissionDeleteProps {
  visible: boolean;
  onClose: () => void;
}

export default function ModalMissionDelete({
  visible,
  onClose,
}: ModalMissionDeleteProps) {
  const viewProps = {visible, onClose};

  return <ModalMissionDeleteView {...viewProps} />;
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
