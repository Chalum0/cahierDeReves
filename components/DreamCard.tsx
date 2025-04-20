import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

export default function DreamCard({ dream, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{dream.dreamTitle || 'Title'}</Title>
          <Paragraph style={styles.detailsText}>
            {"Tonalité " + dream.dreamTonality + " - Lieu " + dream.dreamLocation}
          </Paragraph>
          {dream.tags && dream.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {dream.tags.map((tag, index) => (
                <Text key={index} style={styles.tagText}>{tag}</Text>
              ))}
            </View>
          )}
          <Paragraph>{"Type: " + dream.dreamType}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
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
});
