import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Text, RefreshControl } from 'react-native';
import { Searchbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DreamCard from '@/components/DreamCard';
import DreamDetailsModal from '@/components/DreamDetails';

const { width } = Dimensions.get('window');

export default function PageTwo() {
  const [dreams, setDreams] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDreams, setFilteredDreams] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDream, setSelectedDream] = useState(null);

  // Load dreams from AsyncStorage
  const loadDreams = async () => {
    try {
      const storedDreams = await AsyncStorage.getItem('dreamFormDataArray');
      const parsedDreams = storedDreams ? JSON.parse(storedDreams) : [];
      setDreams(parsedDreams);
      setFilteredDreams(parsedDreams);
    } catch (error) {
      console.error("Error loading dreams:", error);
    }
  };

  useEffect(() => {
    loadDreams();
  }, []);

  // Filter dreams by tags only based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredDreams(dreams);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = dreams.filter(dream =>
        dream.tags && dream.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
      setFilteredDreams(filtered);
    }
  }, [searchQuery, dreams]);

  // Refresh handler for pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await loadDreams();
    setRefreshing(false);
  };

  // When a dream card is tapped, show modal with details
  const onDreamPress = (dream) => {
    setSelectedDream(dream);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <DreamCard dream={item} onPress={() => onDreamPress(item)} />
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search by tags..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      <FlatList
        data={filteredDreams}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No dreams found</Text>}
        contentContainerStyle={styles.listContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <DreamDetailsModal
        dream={selectedDream}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchbar: {
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
