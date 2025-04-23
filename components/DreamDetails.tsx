import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
  Platform,
} from 'react-native';
import { Title, Paragraph, Button } from 'react-native-paper';
import type { Dream } from '@/components/DreamForm';
import { useNavigation, TabActions } from '@react-navigation/native';

interface Props {
  dream: Dream | null;
  visible: boolean;
  onClose: () => void;
  onEdit: (dream: Dream) => void;
}

export default function DreamDetailsModal({
                                            dream,
                                            visible,
                                            onClose,
                                            onEdit,
                                          }: Props) {
  if (!visible || !dream) return null;
  const navigation = useNavigation();

  const handlePress = () => {
    // 1️⃣  Pass the draft to Home *inside* the Tabs navigator.
    //     ― If your Tabs are the root navigator, drop the first arg and call
    //       navigation.navigate('Home', { dreamToEdit: dream });
    navigation.navigate('index', { dreamToEdit: dream }); // tab route name
    navigation.dispatch(TabActions.jumpTo('index'));

    // navigation.navigate('Root', {
    //   screen: 'index',                // Tab route name
    //   params: { dreamToEdit: dream } // what HomeScreen will read
    // });                               // :contentReference[oaicite:0]{index=0}

    // 2️⃣  Focus Tab 1 immediately.
    navigation.dispatch(TabActions.jumpTo('index')); // :contentReference[oaicite:1]{index=1}
  };

  return (
      <Modal
          transparent
          animationType="slide"
          visible={visible}
          onRequestClose={onClose}
          statusBarTranslucent
      >
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View style={styles.sheet}>
          <ScrollView contentContainerStyle={styles.content}>
            <Title style={styles.title}>{dream.title || 'Untitled'}</Title>

            {dream.description && (
                <Paragraph style={styles.text}>{dream.description}</Paragraph>
            )}

            {!!dream.tags?.length && (
                <View style={styles.tagsRow}>
                  {dream.tags.map(tag => (
                      <Text style={styles.tag} key={tag}>
                        {tag}
                      </Text>
                  ))}
                </View>
            )}

            {[dream.tonality, dream.location].some(Boolean) && (
                <Paragraph style={styles.meta}>
                  {[dream.tonality, dream.location]
                      .filter(Boolean)
                      .join(' · ')}
                </Paragraph>
            )}
          </ScrollView>

          <Button mode="outlined" onPress={handlePress} style={styles.editBtn}>
            Edit this dream
          </Button>

          <Button mode="contained" onPress={onClose} style={styles.closeBtn}>
            Close
          </Button>
        </View>
      </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: '#00000099' },
  sheet: {
    backgroundColor: '#fff',
    maxHeight: Platform.OS === 'web' ? '90vh' : '85%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 'auto',
  },
  content: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 32 },
  title: { fontSize: 22, fontWeight: '600', lineHeight: 28 },
  text: { fontSize: 16, lineHeight: 22 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 },
  tag: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 12,
  },
  meta: { marginTop: 16, fontStyle: 'italic' },
  editBtn: { marginHorizontal: 24, marginBottom: 12 },
  closeBtn: { marginHorizontal: 24 },
});
