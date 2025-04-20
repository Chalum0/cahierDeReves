import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Modal, Title, Paragraph, Button } from 'react-native-paper';

export default function DreamDetailsModal({ dream, visible, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {dream && (
            <>
              <Title>{dream.dreamTitle || 'Title'}</Title>
              <Paragraph>{dream.dreamText}</Paragraph>
              {dream.tags && dream.tags.length > 0 && (
                <View style={styles.tagsContainer}>
                  {dream.tags.map((tag, index) => (
                    <Text key={index} style={styles.tagText}>{tag}</Text>
                  ))}
                </View>
              )}
              <Paragraph>{dream.dreamType}</Paragraph>
              <Paragraph style={styles.detailsText}>
                {dream.dreamTonality + " - " + dream.dreamLocation}
              </Paragraph>
            </>
          )}
          <Button mode="contained" onPress={onClose} style={styles.button}>
            Close
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // positions the modal at the bottom
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  tagText: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
    fontSize: 12,
  },
  detailsText: {
    marginTop: 16,
    fontStyle: 'italic',
  },
  button: {
    alignSelf: 'center',
    marginTop: 16,
  },
});
